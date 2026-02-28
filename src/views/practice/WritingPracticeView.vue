<template>
  <div>
    <h1 class="text-h4 mb-1">Writing Practice</h1>
    <p class="text-medium-emphasis mb-4">
      2026 format: 3 task types — Build a Sentence (2 min), Write an Email (7 min), Academic Discussion (10 min).
    </p>

    <!-- Task type filter tabs -->
    <div class="d-flex ga-2 mb-4 flex-wrap">
      <v-btn
        v-for="type in taskTypes"
        :key="type"
        :color="filterType === type ? 'primary' : 'default'"
        :variant="filterType === type ? 'flat' : 'tonal'"
        size="small"
        @click="selectFilter(type)"
      >
        {{ type === 'all' ? 'All Tasks' : type }}
      </v-btn>
    </div>

    <!-- Task navigation chips -->
    <div class="mb-4 d-flex ga-1 flex-wrap">
      <v-chip
        v-for="(t, idx) in filteredTasks"
        :key="t.id"
        :color="currentIndex === idx ? 'primary' : completedIds.has(t.id) ? 'success' : 'default'"
        :variant="currentIndex === idx ? 'flat' : 'tonal'"
        size="x-small"
        @click="selectTask(idx)"
      >
        {{ idx + 1 }}
      </v-chip>
    </div>

    <SectionTimer label="Writing Task Timer" :time="timer.formatted" :percent="timer.percent" />

    <v-card rounded="xl" elevation="0" class="pa-5 mb-4">
      <div class="d-flex justify-space-between align-center mb-3">
        <div>
          <v-chip
            size="small"
            :color="taskTypeColor(task.type)"
            variant="tonal"
            class="mb-1"
          >
            {{ task.type }}
          </v-chip>
          <div class="text-caption text-medium-emphasis">
            Task {{ currentIndex + 1 }} of {{ filteredTasks.length }}
            · Timer: {{ formatTime(task.time) }}
          </div>
        </div>
        <v-chip v-if="task.type !== 'Build a Sentence'" size="small" variant="outlined">{{ task.minWords }}+ words</v-chip>
      </div>

      <!-- ── Build a Sentence ─────────────────────────────────── -->
      <div v-if="task.type === 'Build a Sentence'" class="mb-4">
        <p class="font-weight-medium mb-3 text-body-1">
          Arrange the phrase chunks into the correct sentence:
        </p>

        <!-- Arranged chunks (user's current answer) -->
        <div class="text-caption text-medium-emphasis mb-1">Your arrangement:</div>
        <div
          class="d-flex ga-2 flex-wrap pa-3 rounded mb-3"
          style="min-height: 52px; background: rgba(var(--v-theme-primary), 0.06); border: 1px dashed rgba(var(--v-theme-primary), 0.3)"
        >
          <v-chip
            v-for="(chunk, ci) in arrangedChunks"
            :key="`arr-${ci}`"
            color="primary"
            variant="flat"
            size="small"
            :disabled="submitted"
            @click="removeChunk(ci)"
          >
            {{ chunk }}
            <v-icon v-if="!submitted" size="x-small" class="ml-1">mdi-close</v-icon>
          </v-chip>
          <span
            v-if="!arrangedChunks.length"
            class="text-caption text-medium-emphasis align-self-center"
          >Click chunks below to build your sentence</span>
        </div>

        <!-- Available chunks to click -->
        <div class="text-caption text-medium-emphasis mb-2">Available chunks:</div>
        <div class="d-flex ga-2 flex-wrap mb-3">
          <v-chip
            v-for="chunk in availableChunks"
            :key="chunk"
            color="secondary"
            variant="tonal"
            size="small"
            :disabled="submitted"
            style="cursor: pointer"
            @click="addChunk(chunk)"
          >
            {{ chunk }}
          </v-chip>
          <span v-if="!availableChunks.length && !submitted" class="text-caption text-success">
            All chunks placed ✓
          </span>
        </div>

        <!-- Correctness hint after submit -->
        <v-alert
          v-if="submitted"
          :type="chunkArrangementCorrect ? 'success' : 'error'"
          variant="tonal"
          density="compact"
          class="mb-3"
        >
          <span v-if="chunkArrangementCorrect">Correct! Well done.</span>
          <span v-else>
            Not quite. The correct sentence is:
            <strong>{{ task.correct }}</strong>
          </span>
        </v-alert>
      </div>

      <!-- ── Write an Email ────────────────────────────────────── -->
      <div v-else-if="task.type === 'Write an Email'" class="mb-3">
        <div
          class="mb-3 pa-3 rounded"
          style="background: rgba(0,0,0,0.04); border-left: 3px solid rgba(var(--v-theme-primary), 0.5)"
        >
          <div class="text-overline mb-1">Scenario</div>
          <p class="text-body-2 mb-2">{{ task.scenario }}</p>
          <div class="d-flex ga-3 flex-wrap">
            <v-chip size="x-small" variant="tonal" color="primary">To: {{ task.recipient }}</v-chip>
            <v-chip size="x-small" variant="tonal" color="secondary">{{ task.register }}</v-chip>
          </div>
        </div>

        <!-- 3 mandatory bullet points -->
        <div class="mb-3 pa-3 rounded" style="background: rgba(var(--v-theme-warning), 0.07)">
          <div class="text-caption font-weight-bold text-warning mb-2">
            ✦ Your email MUST address all 3 of these points:
          </div>
          <div
            v-for="(point, i) in task.bulletPoints"
            :key="i"
            class="d-flex ga-2 align-start mb-1"
          >
            <v-icon size="x-small" color="warning" class="mt-1">mdi-circle-medium</v-icon>
            <span class="text-body-2">{{ point }}</span>
          </div>
        </div>

        <p class="font-weight-medium mb-3 text-body-1">{{ task.prompt }}</p>

        <v-textarea
          v-model="response"
          label="Write your email here"
          rows="10"
          auto-grow
          variant="outlined"
          :disabled="submitting || submitted"
          class="mb-1"
        />
        <div class="d-flex justify-space-between align-center mb-3">
          <div class="text-caption text-medium-emphasis">
            Word count: {{ words }}
            <span v-if="words < task.minWords" class="text-warning">
              ({{ task.minWords - words }} more needed)
            </span>
            <span v-else class="text-success">✓ Minimum met</span>
          </div>
          <div class="text-caption text-medium-emphasis">Quality estimate: {{ quality }}/5</div>
        </div>
      </div>

      <!-- ── Academic Discussion ──────────────────────────────── -->
      <div v-else class="mb-3">
        <p class="font-weight-medium mb-3 text-body-1" style="white-space: pre-line">{{ task.prompt }}</p>

        <div
          v-if="task.context"
          class="mb-3 pa-3 rounded text-caption text-medium-emphasis"
          style="background: rgba(0,0,0,0.04); border-left: 3px solid rgba(var(--v-theme-primary),0.4)"
        >
          <strong>Discussion context:</strong> {{ task.context }}
        </div>

        <v-textarea
          v-model="response"
          label="Write your discussion post"
          rows="10"
          auto-grow
          variant="outlined"
          :disabled="submitting || submitted"
          class="mb-1"
        />
        <div class="d-flex justify-space-between align-center mb-3">
          <div class="text-caption text-medium-emphasis">
            Word count: {{ words }}
            <span v-if="words < task.minWords" class="text-warning">
              ({{ task.minWords - words }} more needed)
            </span>
            <span v-else class="text-success">✓ Minimum met</span>
          </div>
          <div class="text-caption text-medium-emphasis">Quality estimate: {{ quality }}/5</div>
        </div>
      </div>

      <!-- Sample response toggle (only after submit) -->
      <div v-if="submitted && task.sample" class="mb-3">
        <v-btn size="x-small" variant="text" @click="showSample = !showSample">
          {{ showSample ? 'Hide' : 'Show' }} sample response
        </v-btn>
        <v-alert v-if="showSample" type="info" variant="tonal" density="compact" class="mt-2 text-body-2">
          <strong>Sample:</strong> {{ task.sample }}
        </v-alert>
      </div>

      <div class="d-flex ga-2 flex-wrap">
        <v-btn
          color="primary"
          :loading="submitting"
          :disabled="!canSubmit"
          @click="submit"
        >
          Submit Task
        </v-btn>
        <v-btn variant="tonal" :disabled="submitting" @click="nextTask">Next Task →</v-btn>
      </div>
    </v-card>

    <transition name="page-fade">
      <v-alert
        v-if="submitted && task.type !== 'Build a Sentence'"
        :type="words >= task.minWords ? 'success' : 'warning'"
        variant="tonal"
        density="compact"
      >
        {{ words >= task.minWords
          ? `Submitted! ${words} words — meets the minimum of ${task.minWords}.`
          : `Submitted with ${words} words. Aim for at least ${task.minWords} in the real exam.` }}
      </v-alert>
    </transition>

    <v-snackbar v-model="toast" timeout="1800" color="success">Task submitted and saved.</v-snackbar>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { writingTasks } from '../../data/writing'
import { useTimer } from '../../composables/useTimer'
import SectionTimer from '../../components/SectionTimer.vue'
import { useProgressStore } from '../../stores/progress'

const progress = useProgressStore()

const filterType = ref('all')
const taskTypes = ['all', 'Build a Sentence', 'Write an Email', 'Academic Discussion']

const filteredTasks = computed(() => {
  if (filterType.value === 'all') return writingTasks
  return writingTasks.filter((t) => t.type === filterType.value)
})

const currentIndex = ref(0)
const response = ref('')
const submitted = ref(false)
const submitting = ref(false)
const toast = ref(false)
const showSample = ref(false)
const completedIds = ref(new Set())

// ── Build a Sentence chunk state ──────────────────────────────────
const arrangedChunks = ref([])

const task = computed(() => filteredTasks.value[currentIndex.value] || writingTasks[0])

// Shuffle chunks deterministically by task id so order is scrambled but reproducible
const shuffledChunks = computed(() => {
  if (task.value.type !== 'Build a Sentence' || !task.value.chunks) return []
  const seed = task.value.id.charCodeAt(task.value.id.length - 1)
  return [...task.value.chunks].sort(
    (a, b) => (a.charCodeAt(0) * seed + a.length) % 11 - (b.charCodeAt(0) * seed + b.length) % 11
  )
})

const availableChunks = computed(() =>
  shuffledChunks.value.filter((c) => !arrangedChunks.value.includes(c))
)

const chunkArrangementCorrect = computed(() => {
  if (task.value.type !== 'Build a Sentence' || !task.value.chunks) return false
  return arrangedChunks.value.join(' ') === task.value.chunks.join(' ')
})

const addChunk = (chunk) => {
  if (!arrangedChunks.value.includes(chunk)) arrangedChunks.value.push(chunk)
}

const removeChunk = (i) => {
  arrangedChunks.value.splice(i, 1)
}

// ── Shared computed ───────────────────────────────────────────────
const words = computed(() =>
  response.value.trim() ? response.value.trim().split(/\s+/).length : 0
)

const quality = computed(() => {
  const lengthScore = Math.max(1, Math.min(5, Math.round((words.value / (task.value.minWords || 80)) * 5)))
  const sentenceCount = response.value.split(/[.!?]+/).filter(Boolean).length
  const structureScore = Math.max(1, Math.min(5, sentenceCount >= 4 ? 5 : sentenceCount + 1))
  return Math.round((lengthScore + structureScore) / 2)
})

const canSubmit = computed(() => {
  if (submitting.value || submitted.value) return false
  if (task.value.type === 'Build a Sentence') {
    return (
      task.value.chunks &&
      arrangedChunks.value.length === task.value.chunks.length
    )
  }
  return response.value.trim().length > 0
})

const formatTime = (sec) => {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return s === 0 ? `${m} min` : `${m}:${String(s).padStart(2, '0')}`
}

const taskTypeColor = (type) => {
  if (type === 'Build a Sentence') return 'success'
  if (type === 'Write an Email') return 'primary'
  return 'secondary'
}

const timer = useTimer(task.value.time)

const restartTimer = () => {
  timer.reset(task.value.time)
  timer.start(() => {
    if (!submitted.value) submit()
  })
}

const resetTaskState = () => {
  response.value = ''
  arrangedChunks.value = []
  submitted.value = false
  submitting.value = false
  showSample.value = false
}

watch(task, () => {
  restartTimer()
  resetTaskState()
})

restartTimer()

const selectFilter = (type) => {
  filterType.value = type
  currentIndex.value = 0
  resetTaskState()
}

const selectTask = (idx) => {
  currentIndex.value = idx
  resetTaskState()
}

const submit = async () => {
  if (!canSubmit.value) return
  submitting.value = true

  // For Build a Sentence, mirror arrangement into response for record-keeping
  if (task.value.type === 'Build a Sentence') {
    response.value = arrangedChunks.value.join(' ')
  }

  await new Promise((r) => setTimeout(r, 200))
  submitted.value = true
  submitting.value = false
  toast.value = true
  completedIds.value.add(task.value.id)
  progress.addWriting()
}

const nextTask = () => {
  currentIndex.value = (currentIndex.value + 1) % filteredTasks.value.length
  resetTaskState()
}
</script>
