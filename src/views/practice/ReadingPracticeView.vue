<template>
  <div>
    <h1 class="text-h4 mb-1">Reading Practice</h1>
    <p class="text-medium-emphasis mb-4">
      2026 adaptive format: Stage 1 (15 questions) → Stage 2 Easy or Hard based on your score.
    </p>

    <SectionTimer label="Reading Section Timer" :time="timer.formatted" :percent="timer.percent" />

    <!-- Question navigation chips -->
    <div class="mb-3 d-flex ga-1 flex-wrap">
      <v-chip
        v-for="(item, i) in currentSet"
        :key="item.id"
        :color="i === idx ? 'primary' : answered[i] ? 'success' : undefined"
        size="x-small"
        @click="jump(i)"
      >
        Q{{ i + 1 }}
      </v-chip>
    </div>

    <!-- Stage indicator -->
    <div class="mb-3 d-flex ga-2 align-center">
      <v-chip size="small" :color="stage2Mode !== 'pending' ? (stage2Mode === 'hard' ? 'error' : 'info') : 'default'" variant="tonal">
        {{ stage2Mode === 'pending' ? 'Stage 1 — Foundation' : stage2Mode === 'hard' ? 'Stage 2 — Hard (Academic)' : 'Stage 2 — Easy (Daily Life)' }}
      </v-chip>
      <span v-if="stage2Mode !== 'pending'" class="text-caption text-medium-emphasis">
        Stage 1 score: {{ stage1Score }}/{{ readingAdaptive.stage1.length }}
      </span>
    </div>

    <!-- Results banner -->
    <v-alert v-if="finished" type="success" variant="tonal" class="mb-4">
      <div class="d-flex flex-wrap ga-4 align-center">
        <div>Score: <strong>{{ score }}/{{ currentSet.length }}</strong> ({{ percent }}%)</div>
        <div>Estimated Band: <strong>{{ band }}</strong></div>
        <div>Stage 2 taken: <strong>{{ stage2Mode }}</strong></div>
      </div>
    </v-alert>

    <!-- Question card -->
    <v-card v-if="!finished" rounded="xl" elevation="0" class="pa-5">
      <div class="d-flex justify-space-between align-center mb-1">
        <div class="text-overline">Question {{ idx + 1 }} / {{ currentSet.length }}</div>
        <div class="text-caption text-medium-emphasis">{{ q.type }}</div>
      </div>

      <!-- ── Complete the Words — text-fill ──────────────────── -->
      <template v-if="q.type === 'Complete the Words'">
        <div class="text-caption text-medium-emphasis mb-2">
          Read the passage. Each truncated word (e.g. <code>inves___</code>) has a blank.
          Type the complete word in the field below it.
        </div>

        <div
          class="mb-4 pa-3 rounded text-body-1"
          style="background: rgba(0,0,0,0.04); border-left: 3px solid rgba(var(--v-theme-primary), 0.4); line-height: 1.9"
        >
          {{ q.passageText }}
        </div>

        <div class="mb-4">
          <div
            v-for="(blank, bi) in q.blanks"
            :key="bi"
            class="d-flex align-center ga-3 mb-3"
          >
            <v-chip size="small" color="primary" variant="tonal" class="flex-shrink-0">
              {{ blank.incomplete }}
            </v-chip>
            <v-text-field
              v-model="ctwAnswers[bi]"
              :label="`Complete word ${bi + 1}`"
              variant="outlined"
              density="compact"
              hide-details
              style="max-width: 220px"
              @keyup.enter="submitAnswer"
            />
            <v-icon
              v-if="answered[idx]"
              :color="ctwAnswers[bi]?.toLowerCase().trim() === blank.answer.toLowerCase() ? 'success' : 'error'"
              size="small"
            >
              {{ ctwAnswers[bi]?.toLowerCase().trim() === blank.answer.toLowerCase() ? 'mdi-check-circle' : 'mdi-close-circle' }}
            </v-icon>
          </div>
        </div>

        <v-alert
          v-if="answered[idx]"
          :type="responses[idx] === 1 ? 'success' : 'error'"
          variant="tonal"
          density="compact"
          class="mb-3"
        >
          <span v-if="responses[idx] === 1">All blanks correct!</span>
          <span v-else>
            Correct answers:
            <strong>{{ q.blanks.map(b => b.answer).join(', ') }}</strong>
          </span>
        </v-alert>

        <v-btn
          color="primary"
          :disabled="!ctwAllFilled"
          @click="submitAnswer"
        >
          {{ idx === currentSet.length - 1 ? 'Finish Section' : 'Next' }}
        </v-btn>
      </template>

      <!-- ── MCQ (Daily Life / Academic Passage) ──────────────── -->
      <template v-else>
        <div
          v-if="q.passage"
          class="mb-4 pa-3 rounded text-body-2"
          style="background: rgba(0,0,0,0.04); border-left: 3px solid rgba(var(--v-theme-primary), 0.4)"
        >
          {{ q.passage }}
        </div>

        <p class="font-weight-medium mb-4 text-body-1">{{ q.prompt }}</p>

        <v-radio-group v-model="selected" class="mb-4">
          <v-radio v-for="(opt, i) in q.options" :key="i" :label="opt" :value="i" class="mb-1" />
        </v-radio-group>

        <v-btn color="primary" :disabled="selected === null" @click="submitAnswer">
          {{ idx === currentSet.length - 1 ? 'Finish Section' : 'Next' }}
        </v-btn>
      </template>
    </v-card>

    <!-- Review card -->
    <v-card v-if="finished" rounded="xl" elevation="0" class="pa-4 mt-3">
      <div class="text-h6 mb-3">Question Review</div>
      <v-expansion-panels>
        <v-expansion-panel v-for="(item, i) in currentSet" :key="item.id">
          <v-expansion-panel-title>
            <div class="d-flex ga-2 align-center">
              <v-icon
                :color="responses[i] === 1 || (item.answer !== undefined && responses[i] === item.answer) ? 'success' : 'error'"
                size="small"
              >
                {{ responses[i] === 1 || (item.answer !== undefined && responses[i] === item.answer) ? 'mdi-check-circle' : 'mdi-close-circle' }}
              </v-icon>
              Q{{ i + 1 }} · {{ item.type }}
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <!-- CTW review -->
            <template v-if="item.type === 'Complete the Words'">
              <div
                class="mb-2 pa-2 rounded text-body-2 text-medium-emphasis"
                style="background: rgba(0,0,0,0.04)"
              >
                {{ item.passageText }}
              </div>
              <div v-for="(b, bi) in item.blanks" :key="bi" class="mb-1 text-body-2">
                <span class="text-medium-emphasis">{{ b.incomplete }}</span>
                → Correct: <strong class="text-success">{{ b.answer }}</strong>
              </div>
            </template>
            <!-- MCQ review -->
            <template v-else>
              <div
                v-if="item.passage"
                class="mb-2 pa-2 rounded text-body-2 text-medium-emphasis"
                style="background: rgba(0,0,0,0.04)"
              >
                {{ item.passage }}
              </div>
              <div class="mb-2">{{ item.prompt }}</div>
              <div class="mb-1">
                Your answer:
                <strong :class="responses[i] === item.answer ? 'text-success' : 'text-error'">
                  {{ item.options?.[responses[i]] ?? 'Not answered' }}
                </strong>
              </div>
              <div>
                Correct answer: <strong class="text-success">{{ item.options?.[item.answer] }}</strong>
              </div>
            </template>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>

    <v-btn class="mt-4" variant="text" @click="restart">↺ Restart</v-btn>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { readingAdaptive } from '../../data/reading'
import { useProgressStore } from '../../stores/progress'
import { useTimer } from '../../composables/useTimer'
import { useBandEstimate } from '../../composables/useBandEstimate'
import SectionTimer from '../../components/SectionTimer.vue'

const progress = useProgressStore()
const TOTAL_TIME = 30 * 60 // 30 minutes for full adaptive session

const timer = useTimer(TOTAL_TIME)

const stage2Mode = ref('pending')
const stage1Score = ref(0)
const pool = ref([...readingAdaptive.stage1])
const idx = ref(0)
const selected = ref(null)
const ctwAnswers = ref([])
const score = ref(0)
const finished = ref(false)
const answered = ref({})
const responses = ref({})

const q = computed(() => pool.value[idx.value])
const currentSet = computed(() => pool.value)
const percent = computed(() =>
  currentSet.value.length ? Math.round((score.value / currentSet.value.length) * 100) : 0
)
const band = computed(() => useBandEstimate(percent.value))

const isCTW = computed(() => q.value?.type === 'Complete the Words')
const ctwAllFilled = computed(() =>
  isCTW.value && q.value.blanks
    ? q.value.blanks.every((_, i) => ctwAnswers.value[i]?.trim())
    : false
)

// Reset CTW answers when question changes
watch(idx, () => {
  if (isCTW.value && q.value.blanks) {
    ctwAnswers.value = new Array(q.value.blanks.length).fill('')
  } else {
    ctwAnswers.value = []
  }
  selected.value = responses.value[idx.value] ?? null
})

const finalize = () => {
  if (finished.value) return
  finished.value = true
  timer.stop()
  progress.addReading(percent.value, {
    stage2Mode: stage2Mode.value,
    score: score.value,
    total: currentSet.value.length,
    percent: percent.value,
    band: band.value,
    responses: responses.value,
  })
}

const jump = (i) => {
  idx.value = i
  selected.value = responses.value[i] ?? null
}

const submitAnswer = () => {
  const item = q.value
  let correct = 0

  if (item.type === 'Complete the Words') {
    if (!ctwAllFilled.value) return
    const allCorrect = item.blanks.every(
      (b, i) => ctwAnswers.value[i]?.toLowerCase().trim() === b.answer.toLowerCase()
    )
    correct = allCorrect ? 1 : 0
    // Store 1 or 0 (so review icon works: responses[i] === 1 means correct)
  } else {
    if (selected.value === null) return
    correct = selected.value === item.answer ? 1 : 0
  }

  // Undo previous score contribution for this question if re-answering
  const prev = responses.value[idx.value]
  if (prev !== undefined) {
    if (prev === 1 && item.type === 'Complete the Words') score.value -= 1
    else if (prev === item.answer && item.type !== 'Complete the Words') score.value -= 1
  }

  answered.value[idx.value] = true
  if (item.type === 'Complete the Words') {
    responses.value[idx.value] = correct // 1 or 0
  } else {
    responses.value[idx.value] = selected.value
  }
  score.value += correct

  // Still in stage 1 and questions remain
  if (idx.value < pool.value.length - 1) {
    idx.value += 1
    return
  }

  // End of current pool — check if we need to add stage 2
  if (stage2Mode.value === 'pending') {
    stage1Score.value = score.value
    const threshold = Math.ceil(readingAdaptive.stage1.length * 0.5)
    stage2Mode.value = score.value >= threshold ? 'hard' : 'easy'
    pool.value = [
      ...pool.value,
      ...(stage2Mode.value === 'hard' ? readingAdaptive.stage2Hard : readingAdaptive.stage2Easy),
    ]
    idx.value += 1
    selected.value = null
    ctwAnswers.value = []
    return
  }

  // All done
  finalize()
}

const restart = () => {
  stage2Mode.value = 'pending'
  stage1Score.value = 0
  pool.value = [...readingAdaptive.stage1]
  idx.value = 0
  score.value = 0
  selected.value = null
  ctwAnswers.value = []
  finished.value = false
  answered.value = {}
  responses.value = {}
  timer.reset(TOTAL_TIME)
  timer.start(finalize)
}

onMounted(restart)
</script>
