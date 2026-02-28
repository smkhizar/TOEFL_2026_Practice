<template>
  <div>
    <!-- Header -->
    <div class="d-flex align-center justify-space-between mb-2">
      <div>
        <h1 class="text-h5 font-weight-bold">Mock Test {{ examId }} — Live Exam</h1>
        <p class="text-caption text-medium-emphasis">{{ mockData.difficulty }} · ~{{ mockData.estMinutes }} min · 2026 Format</p>
      </div>
      <v-btn size="small" color="secondary" variant="tonal" @click="enterFullscreen">Fullscreen</v-btn>
    </div>

    <v-alert v-if="focusWarnings > 0" type="warning" variant="tonal" density="compact" class="mb-3">
      Focus warnings: {{ focusWarnings }}/3. Switching tabs repeatedly will forfeit this exam.
    </v-alert>

    <!-- Section progress chips -->
    <div class="d-flex ga-1 mb-3 flex-wrap">
      <v-chip
        v-for="b in sectionBadges"
        :key="b.id"
        :color="b.active ? 'primary' : b.done ? 'success' : 'default'"
        size="x-small"
        :variant="b.active ? 'flat' : 'tonal'"
      >
        {{ b.label }}
      </v-chip>
    </div>

    <SectionTimer :label="timerLabel" :time="timer.formatted" :percent="timer.percent" class="mb-4" />

    <!-- ── READING / LISTENING ─────────────────────────────────── -->
    <v-card v-if="isReadingListening" rounded="xl" elevation="0" class="pa-5 mb-4">
      <div class="d-flex justify-space-between align-center mb-1">
        <div class="text-overline">{{ phaseDisplayName }} · Question {{ qIndex + 1 }} / {{ phaseQuestions.length }}</div>
        <v-chip size="x-small" :color="isHardStage2 ? 'error' : isStage2 ? 'info' : 'default'" variant="tonal">
          {{ stageLabel }}
        </v-chip>
      </div>
      <div class="text-caption text-medium-emphasis mb-3">{{ currentItem?.type }}</div>

      <!-- ── Complete the Words (text-fill) ──────────────────── -->
      <template v-if="isCTWItem">
        <div class="text-caption text-medium-emphasis mb-2">
          Each truncated word (e.g. <code>inves___</code>) is missing its ending. Type the complete word.
        </div>
        <div
          class="mb-4 pa-3 rounded text-body-1"
          style="background: rgba(0,0,0,0.04); border-left: 3px solid rgba(var(--v-theme-primary), 0.4); line-height: 1.9"
        >
          {{ currentItem.passageText }}
        </div>
        <div class="mb-4">
          <div
            v-for="(blank, bi) in currentItem.blanks"
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
              @keyup.enter="advanceItem"
            />
          </div>
        </div>
        <v-btn
          color="primary"
          :disabled="!ctwAllFilled"
          @click="advanceItem"
        >
          {{ isLastItem ? 'Finish Section →' : 'Next Question →' }}
        </v-btn>
      </template>

      <!-- ── Listening transcript ──────────────────────────────── -->
      <template v-else-if="currentItem?.transcript">
        <div
          class="mb-4 pa-3 rounded"
          style="background: rgba(0,0,0,0.04); border-left: 3px solid rgba(var(--v-theme-secondary), 0.4)"
        >
          <div class="text-caption text-medium-emphasis mb-1">
            Audio transcript (in the real TOEFL, you hear this — no text on screen)
          </div>
          <div class="text-body-2 font-italic">{{ currentItem.transcript }}</div>
          <v-btn
            size="x-small"
            variant="tonal"
            color="secondary"
            class="mt-2"
            @click="playTranscript"
          >▶ Play Audio</v-btn>
        </div>

        <p class="font-weight-medium mb-4 text-body-1">{{ currentItem?.prompt }}</p>

        <v-radio-group v-model="selected" class="mb-2">
          <v-radio
            v-for="(opt, i) in currentItem?.options"
            :key="i"
            :label="opt"
            :value="i"
            class="mb-1"
          />
        </v-radio-group>

        <v-btn color="primary" :disabled="selected === null" @click="advanceItem">
          {{ isLastItem ? 'Finish Section →' : 'Next Question →' }}
        </v-btn>
      </template>

      <!-- ── Standard MCQ (passage-based reading) ──────────────── -->
      <template v-else>
        <div
          v-if="currentItem?.passage"
          class="mb-4 pa-3 rounded text-body-2"
          style="background: rgba(0,0,0,0.04); border-left: 3px solid rgba(var(--v-theme-primary), 0.4)"
        >
          {{ currentItem.passage }}
        </div>

        <p class="font-weight-medium mb-4 text-body-1">{{ currentItem?.prompt }}</p>

        <v-radio-group v-model="selected" class="mb-2">
          <v-radio
            v-for="(opt, i) in currentItem?.options"
            :key="i"
            :label="opt"
            :value="i"
            class="mb-1"
          />
        </v-radio-group>

        <v-btn color="primary" :disabled="selected === null" @click="advanceItem">
          {{ isLastItem ? 'Finish Section →' : 'Next Question →' }}
        </v-btn>
      </template>
    </v-card>

    <!-- ── WRITING ──────────────────────────────────────────────── -->
    <v-card v-if="phase === 'writing'" rounded="xl" elevation="0" class="pa-5 mb-4">
      <div class="d-flex justify-space-between align-center mb-1">
        <div class="text-overline">Writing · Task {{ qIndex + 1 }} / {{ writingItems.length }}</div>
        <v-chip size="x-small" color="secondary" variant="tonal">{{ currentItem?.type }}</v-chip>
      </div>

      <!-- Build a Sentence — chunk arrangement -->
      <template v-if="currentItem?.type === 'Build a Sentence'">
        <p class="font-weight-medium mb-3 text-body-1">
          Arrange the phrase chunks into the correct sentence:
        </p>

        <div class="text-caption text-medium-emphasis mb-1">Your arrangement:</div>
        <div
          class="d-flex ga-2 flex-wrap pa-3 rounded mb-3"
          style="min-height: 52px; background: rgba(var(--v-theme-primary), 0.06); border: 1px dashed rgba(var(--v-theme-primary), 0.3)"
        >
          <v-chip
            v-for="(chunk, ci) in writingChunks"
            :key="`wc-${ci}`"
            color="primary"
            variant="flat"
            size="small"
            @click="removeWritingChunk(ci)"
          >
            {{ chunk }}
            <v-icon size="x-small" class="ml-1">mdi-close</v-icon>
          </v-chip>
          <span
            v-if="!writingChunks.length"
            class="text-caption text-medium-emphasis align-self-center"
          >Click chunks below to build your sentence</span>
        </div>

        <div class="text-caption text-medium-emphasis mb-2">Available chunks:</div>
        <div class="d-flex ga-2 flex-wrap mb-4">
          <v-chip
            v-for="chunk in writingAvailableChunks"
            :key="chunk"
            color="secondary"
            variant="tonal"
            size="small"
            style="cursor: pointer"
            @click="addWritingChunk(chunk)"
          >
            {{ chunk }}
          </v-chip>
        </div>

        <v-btn
          color="primary"
          :disabled="writingChunks.length !== (currentItem.chunks?.length ?? 0)"
          @click="advanceItem"
        >
          {{ isLastItem ? 'Finish Writing →' : 'Submit & Next Task →' }}
        </v-btn>
      </template>

      <!-- Write an Email — show bullet points + textarea -->
      <template v-else-if="currentItem?.type === 'Write an Email'">
        <div
          v-if="currentItem.scenario"
          class="mb-3 pa-3 rounded"
          style="background: rgba(0,0,0,0.04); border-left: 3px solid rgba(var(--v-theme-primary),0.5)"
        >
          <div class="text-overline mb-1">Scenario</div>
          <p class="text-body-2 mb-2">{{ currentItem.scenario }}</p>
          <div class="d-flex ga-2 flex-wrap">
            <v-chip size="x-small" variant="tonal" color="primary">To: {{ currentItem.recipient }}</v-chip>
            <v-chip size="x-small" variant="tonal" color="secondary">{{ currentItem.register }}</v-chip>
          </div>
        </div>

        <div
          v-if="currentItem.bulletPoints"
          class="mb-3 pa-3 rounded"
          style="background: rgba(var(--v-theme-warning), 0.07)"
        >
          <div class="text-caption font-weight-bold text-warning mb-2">
            ✦ Your email MUST address all 3 of these points:
          </div>
          <div
            v-for="(point, i) in currentItem.bulletPoints"
            :key="i"
            class="d-flex ga-2 align-start mb-1"
          >
            <v-icon size="x-small" color="warning" class="mt-1">mdi-circle-medium</v-icon>
            <span class="text-body-2">{{ point }}</span>
          </div>
        </div>

        <p class="font-weight-medium mb-2 text-body-1">{{ currentItem.prompt }}</p>

        <v-textarea
          v-model="writingResponse"
          label="Write your email here"
          rows="10"
          auto-grow
          variant="outlined"
          class="mb-1"
        />
        <div class="text-caption text-medium-emphasis mb-3">
          Word count: {{ writingWordCount }}
          <span v-if="currentItem?.minWords"> · Minimum: {{ currentItem.minWords }} words</span>
        </div>

        <v-btn color="primary" @click="advanceItem">
          {{ isLastItem ? 'Finish Writing →' : 'Submit & Next Task →' }}
        </v-btn>
      </template>

      <!-- Academic Discussion -->
      <template v-else>
        <p class="font-weight-medium mb-2 text-body-1">{{ currentItem?.prompt }}</p>

        <div
          v-if="currentItem?.context"
          class="mb-3 pa-2 rounded text-caption text-medium-emphasis"
          style="background: rgba(0,0,0,0.04)"
        >
          <strong>Context:</strong> {{ currentItem.context }}
        </div>

        <v-textarea
          v-model="writingResponse"
          label="Write your discussion post here"
          rows="10"
          auto-grow
          variant="outlined"
          class="mb-1"
        />
        <div class="text-caption text-medium-emphasis mb-3">
          Word count: {{ writingWordCount }}
          <span v-if="currentItem?.minWords"> · Minimum: {{ currentItem.minWords }} words</span>
        </div>

        <v-btn color="primary" @click="advanceItem">
          {{ isLastItem ? 'Finish Writing →' : 'Submit & Next Task →' }}
        </v-btn>
      </template>
    </v-card>

    <!-- ── SPEAKING ─────────────────────────────────────────────── -->
    <v-card v-if="phase === 'speaking'" rounded="xl" elevation="0" class="pa-5 mb-4">
      <div class="d-flex justify-space-between align-center mb-1">
        <div class="text-overline">Speaking · Task {{ qIndex + 1 }} / {{ speakingItems.length }}</div>
        <v-chip
          size="x-small"
          :color="currentItem?.type === 'Listen and Repeat' ? 'info' : 'secondary'"
          variant="tonal"
        >
          {{ currentItem?.type }}
        </v-chip>
      </div>

      <!-- Listen and Repeat -->
      <template v-if="currentItem?.type === 'Listen and Repeat'">
        <div v-if="currentItem?.scene" class="text-caption text-medium-emphasis mb-2 font-italic">
          Scene: {{ currentItem.scene }}
        </div>
        <p class="font-weight-medium mb-4 text-body-1">{{ currentItem?.promptAudioText }}</p>
      </template>

      <!-- Take an Interview — sub-questions -->
      <template v-else-if="currentItem?.type === 'Take an Interview' && currentItem.questions">
        <div class="text-caption text-medium-emphasis mb-2">
          Topic: <strong>{{ currentItem.topic }}</strong>
        </div>

        <!-- Sub-question progress chips -->
        <div class="d-flex ga-1 mb-3">
          <v-chip
            v-for="(q, qi) in currentItem.questions"
            :key="qi"
            :color="qi === speakingSubIndex ? 'secondary' : qi < speakingSubIndex ? 'success' : 'default'"
            :variant="qi === speakingSubIndex ? 'flat' : 'tonal'"
            size="x-small"
          >
            Q{{ qi + 1 }}: {{ q.questionType }}
          </v-chip>
        </div>

        <div class="text-caption font-weight-medium text-secondary mb-1">
          Question {{ speakingSubIndex + 1 }} of {{ currentItem.questions.length }}
        </div>
        <p class="font-weight-medium mb-4 text-body-1">
          {{ currentItem.questions[speakingSubIndex]?.promptAudioText }}
        </p>
      </template>

      <div class="d-flex ga-2 mb-4 flex-wrap align-center">
        <v-btn color="secondary" variant="tonal" size="small" @click="playPromptSpeech">
          ▶ Play Prompt
        </v-btn>
        <span class="text-caption text-medium-emphasis">
          Response: ~{{ currentItem?.type === 'Listen and Repeat' ? currentItem.expectedSeconds : currentItem?.questions?.[speakingSubIndex]?.expectedSeconds ?? 45 }}s
        </span>
      </div>

      <v-textarea
        v-model="speakingText"
        label="Notes / key points (optional — speak your answer aloud)"
        rows="3"
        auto-grow
        variant="outlined"
        class="mb-2"
      />

      <v-btn color="primary" class="mt-1" @click="advanceItem">
        {{ speakingNextLabel }}
      </v-btn>
    </v-card>

    <v-alert type="warning" variant="tonal" density="compact" class="mt-2">
      Leaving this page will forfeit your current exam session.
    </v-alert>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { useTimer } from '../../composables/useTimer'
import SectionTimer from '../../components/SectionTimer.vue'
import { useProgressStore } from '../../stores/progress'
import { readingAdaptive } from '../../data/reading'
import { listeningAdaptive } from '../../data/listening'
import { speakingTasks as allSpeakingTasks } from '../../data/speaking'
import { writingTasks as allWritingTasks } from '../../data/writing'
import { mockTests } from '../../data/mocks'

const progress = useProgressStore()
const route = useRoute()
const router = useRouter()
const examId = route.params.id

// ── Lookup tables ────────────────────────────────────────────────
const mockData = mockTests.find((m) => String(m.id) === String(examId)) || mockTests[0]

const readingMap = Object.fromEntries(
  [...readingAdaptive.stage1, ...readingAdaptive.stage2Easy, ...readingAdaptive.stage2Hard].map(
    (q) => [q.id, q]
  )
)
const listeningMap = Object.fromEntries(
  [...listeningAdaptive.stage1, ...listeningAdaptive.stage2Easy, ...listeningAdaptive.stage2Hard].map(
    (q) => [q.id, q]
  )
)
const writingMap = Object.fromEntries(allWritingTasks.map((t) => [t.id, t]))
const speakingMap = Object.fromEntries(allSpeakingTasks.map((t) => [t.id, t]))

// ── Exam state ───────────────────────────────────────────────────
const phase = ref('reading_s1')
const qIndex = ref(0)
const active = ref(true)
const focusWarnings = ref(0)
const timer = useTimer(1080) // start with R S1 = 18 min

const selected = ref(null)
const ctwAnswers = ref([])
const writingResponse = ref('')
const writingChunks = ref([]) // for Build a Sentence in exam
const speakingText = ref('')
const speakingSubIndex = ref(0)
const readingS1Score = ref(0)
const listeningS1Score = ref(0)
const readingStage2Mode = ref(null) // 'easy' | 'hard'
const listeningStage2Mode = ref(null)

const examResult = ref({
  reading: { correct: 0, total: 0, adaptive: '' },
  listening: { correct: 0, total: 0, adaptive: '' },
  writing: { tasks: [] },
  speaking: { tasks: [] },
})

// ── Question sets per phase ──────────────────────────────────────
const readingS1Items = computed(() =>
  mockData.reading.stage1.map((id) => readingMap[id]).filter(Boolean)
)
const readingS2EasyItems = computed(() =>
  mockData.reading.stage2Easy.map((id) => readingMap[id]).filter(Boolean)
)
const readingS2HardItems = computed(() =>
  mockData.reading.stage2Hard.map((id) => readingMap[id]).filter(Boolean)
)
const listeningS1Items = computed(() =>
  mockData.listening.stage1.map((id) => listeningMap[id]).filter(Boolean)
)
const listeningS2EasyItems = computed(() =>
  mockData.listening.stage2Easy.map((id) => listeningMap[id]).filter(Boolean)
)
const listeningS2HardItems = computed(() =>
  mockData.listening.stage2Hard.map((id) => listeningMap[id]).filter(Boolean)
)
const writingItems = computed(() => mockData.writing.map((id) => writingMap[id]).filter(Boolean))
const speakingItems = computed(() => mockData.speaking.map((id) => speakingMap[id]).filter(Boolean))

const readingS2Items = computed(() =>
  readingStage2Mode.value === 'hard' ? readingS2HardItems.value : readingS2EasyItems.value
)
const listeningS2Items = computed(() =>
  listeningStage2Mode.value === 'hard' ? listeningS2HardItems.value : listeningS2EasyItems.value
)

// ── Current phase questions ──────────────────────────────────────
const phaseQuestions = computed(() => {
  if (phase.value === 'reading_s1') return readingS1Items.value
  if (phase.value === 'reading_s2') return readingS2Items.value
  if (phase.value === 'listening_s1') return listeningS1Items.value
  if (phase.value === 'listening_s2') return listeningS2Items.value
  return []
})

const currentItem = computed(() => {
  if (phase.value === 'writing') return writingItems.value[qIndex.value]
  if (phase.value === 'speaking') return speakingItems.value[qIndex.value]
  return phaseQuestions.value[qIndex.value]
})

// ── Derived booleans ─────────────────────────────────────────────
const isReadingListening = computed(() =>
  ['reading_s1', 'reading_s2', 'listening_s1', 'listening_s2'].includes(phase.value)
)
const isStage2 = computed(() => ['reading_s2', 'listening_s2'].includes(phase.value))
const isHardStage2 = computed(
  () =>
    (phase.value === 'reading_s2' && readingStage2Mode.value === 'hard') ||
    (phase.value === 'listening_s2' && listeningStage2Mode.value === 'hard')
)
const isCTWItem = computed(
  () => isReadingListening.value && currentItem.value?.type === 'Complete the Words'
)
const ctwAllFilled = computed(() =>
  isCTWItem.value && currentItem.value?.blanks
    ? currentItem.value.blanks.every((_, i) => ctwAnswers.value[i]?.trim())
    : false
)
const isLastItem = computed(() => {
  if (phase.value === 'writing') return qIndex.value === writingItems.value.length - 1
  if (phase.value === 'speaking') {
    const item = currentItem.value
    if (item?.type === 'Take an Interview' && item.questions) {
      return (
        qIndex.value === speakingItems.value.length - 1 &&
        speakingSubIndex.value === item.questions.length - 1
      )
    }
    return qIndex.value === speakingItems.value.length - 1
  }
  return qIndex.value === phaseQuestions.value.length - 1
})

const speakingNextLabel = computed(() => {
  const item = currentItem.value
  if (item?.type === 'Take an Interview' && item.questions) {
    if (speakingSubIndex.value < item.questions.length - 1) {
      return `Next Question (Q${speakingSubIndex.value + 2}/${item.questions.length}) →`
    }
  }
  if (isLastItem.value) return 'Finish Exam ✓'
  return 'Next Task →'
})

// ── Display labels ───────────────────────────────────────────────
const stageLabel = computed(() => {
  if (!isStage2.value) return 'Stage 1 — Foundation'
  return isHardStage2.value ? 'Stage 2 — Hard' : 'Stage 2 — Easy'
})

const phaseDisplayName = computed(() => {
  if (phase.value.startsWith('reading')) return 'Reading'
  if (phase.value.startsWith('listening')) return 'Listening'
  return ''
})

const timerLabel = computed(() => {
  const map = {
    reading_s1: 'Reading — Stage 1 Timer (18 min)',
    reading_s2: 'Reading — Stage 2 Timer (12 min)',
    listening_s1: 'Listening — Stage 1 Timer (18 min)',
    listening_s2: 'Listening — Stage 2 Timer (11 min)',
    writing: 'Writing Task Timer',
    speaking: 'Speaking Task Timer',
  }
  return map[phase.value] || 'Timer'
})

const writingWordCount = computed(() =>
  writingResponse.value.trim() ? writingResponse.value.trim().split(/\s+/).length : 0
)

// ── Build a Sentence chunk state (exam writing phase) ────────────
const writingShuffledChunks = computed(() => {
  const item = currentItem.value
  if (item?.type !== 'Build a Sentence' || !item.chunks) return []
  const seed = item.id.charCodeAt(item.id.length - 1)
  return [...item.chunks].sort(
    (a, b) => (a.charCodeAt(0) * seed + a.length) % 11 - (b.charCodeAt(0) * seed + b.length) % 11
  )
})
const writingAvailableChunks = computed(() =>
  writingShuffledChunks.value.filter((c) => !writingChunks.value.includes(c))
)
const addWritingChunk = (chunk) => {
  if (!writingChunks.value.includes(chunk)) writingChunks.value.push(chunk)
}
const removeWritingChunk = (i) => {
  writingChunks.value.splice(i, 1)
}

// ── Section progress badges ──────────────────────────────────────
const sectionBadges = computed(() => {
  const phases = [
    'reading_s1', 'reading_s2',
    'listening_s1', 'listening_s2',
    'writing', 'speaking',
  ]
  const labels = ['Read S1', 'Read S2', 'Listen S1', 'Listen S2', 'Writing', 'Speaking']
  const curr = phases.indexOf(phase.value)
  return phases.map((p, i) => ({
    id: p,
    label: labels[i],
    active: i === curr,
    done: i < curr,
  }))
})

// ── Phase timer durations (2026 spec) ────────────────────────────
const getPhaseDuration = (p, item) => {
  if (p === 'reading_s1') return 1080   // 18 min
  if (p === 'reading_s2') return 720    // 12 min
  if (p === 'listening_s1') return 1080 // 18 min
  if (p === 'listening_s2') return 660  // 11 min
  if (p === 'writing' && item) {
    if (item.type === 'Build a Sentence') return 120
    if (item.type === 'Write an Email') return 420
    return 600 // Academic Discussion
  }
  if (p === 'speaking' && item) {
    if (item.type === 'Listen and Repeat') return item.expectedSeconds + 8 // small buffer
    return 53 // 45s + 8s buffer per interview sub-question
  }
  return 300
}

// ── Save current answer ──────────────────────────────────────────
const saveCurrentAnswer = () => {
  const item = currentItem.value
  if (!item) return

  if (isReadingListening.value) {
    let correct = 0
    if (isCTWItem.value && item.blanks) {
      const allCorrect = item.blanks.every(
        (b, i) => ctwAnswers.value[i]?.toLowerCase().trim() === b.answer.toLowerCase()
      )
      correct = allCorrect ? 1 : 0
    } else {
      correct = selected.value === item.answer ? 1 : 0
    }
    if (phase.value === 'reading_s1') readingS1Score.value += correct
    if (phase.value === 'listening_s1') listeningS1Score.value += correct
    const section = phase.value.startsWith('reading') ? 'reading' : 'listening'
    examResult.value[section].correct += correct
    examResult.value[section].total += 1
  } else if (phase.value === 'writing') {
    const responseText =
      item.type === 'Build a Sentence'
        ? writingChunks.value.join(' ')
        : writingResponse.value
    examResult.value.writing.tasks.push({
      id: item.id,
      type: item.type,
      words: responseText.trim().split(/\s+/).filter(Boolean).length,
      submitted: responseText.trim().length > 0,
    })
  } else if (phase.value === 'speaking') {
    examResult.value.speaking.tasks.push({
      id: item.id,
      type: item.type,
      notes: speakingText.value.trim(),
    })
  }
}

// ── Phase transitions ────────────────────────────────────────────
const determineNextPhase = (currentPhase) => {
  switch (currentPhase) {
    case 'reading_s1':
      readingStage2Mode.value =
        readingS1Score.value / readingS1Items.value.length >= 0.5 ? 'hard' : 'easy'
      examResult.value.reading.adaptive = readingStage2Mode.value
      return 'reading_s2'
    case 'reading_s2':
      return 'listening_s1'
    case 'listening_s1':
      listeningStage2Mode.value =
        listeningS1Score.value / listeningS1Items.value.length >= 0.5 ? 'hard' : 'easy'
      examResult.value.listening.adaptive = listeningStage2Mode.value
      return 'listening_s2'
    case 'listening_s2':
      return 'writing'
    case 'writing':
      return 'speaking'
    case 'speaking':
      return 'done'
    default:
      return 'done'
  }
}

const loadPhase = (newPhase) => {
  phase.value = newPhase
  qIndex.value = 0
  selected.value = null
  ctwAnswers.value = []
  writingResponse.value = ''
  writingChunks.value = []
  speakingText.value = ''
  speakingSubIndex.value = 0
  speechSynthesis.cancel()

  const firstItem =
    newPhase === 'writing'
      ? writingItems.value[0]
      : newPhase === 'speaking'
      ? speakingItems.value[0]
      : null

  const dur = getPhaseDuration(newPhase, firstItem)
  timer.reset(dur)
  timer.start(advanceItem)
}

// ── Advance logic ────────────────────────────────────────────────
const advanceItem = () => {
  if (!active.value) return

  // Handle speaking interview sub-questions first
  if (phase.value === 'speaking') {
    const item = currentItem.value
    if (item?.type === 'Take an Interview' && item.questions) {
      if (speakingSubIndex.value < item.questions.length - 1) {
        // Save this sub-question's notes and advance
        speakingSubIndex.value += 1
        speakingText.value = ''
        speechSynthesis.cancel()
        timer.reset(getPhaseDuration('speaking', item))
        timer.start(advanceItem)
        return
      }
      // All sub-questions done for this topic — fall through to advance task
      speakingSubIndex.value = 0
    }
  }

  saveCurrentAnswer()

  const items =
    phase.value === 'writing'
      ? writingItems.value
      : phase.value === 'speaking'
      ? speakingItems.value
      : phaseQuestions.value

  if (qIndex.value < items.length - 1) {
    qIndex.value += 1
    selected.value = null
    ctwAnswers.value = []
    writingResponse.value = ''
    writingChunks.value = []
    speakingText.value = ''
    speakingSubIndex.value = 0
    speechSynthesis.cancel()

    // Reset timer for per-task phases
    if (phase.value === 'writing' || phase.value === 'speaking') {
      const item = currentItem.value
      timer.reset(getPhaseDuration(phase.value, item))
      timer.start(advanceItem)
    }
    return
  }

  // Phase complete
  timer.stop()
  const nextPhase = determineNextPhase(phase.value)
  if (nextPhase === 'done') {
    finishExam()
    return
  }
  loadPhase(nextPhase)
}

const finishExam = () => {
  active.value = false
  progress.addMockExam()
  localStorage.setItem('toefl-last-exam', JSON.stringify(examResult.value))
  router.push(`/exam/${examId}/review`)
}

// ── Audio helpers ────────────────────────────────────────────────
const playTranscript = () => {
  const item = currentItem.value
  if (!item?.transcript) return
  speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(item.transcript)
  utt.rate = 0.92
  speechSynthesis.speak(utt)
}

const playPromptSpeech = () => {
  const item = currentItem.value
  if (!item) return
  speechSynthesis.cancel()
  let text = ''
  if (item.type === 'Take an Interview' && item.questions) {
    text = item.questions[speakingSubIndex.value]?.promptAudioText ?? ''
  } else {
    text = item.promptAudioText ?? ''
  }
  if (!text) return
  const utt = new SpeechSynthesisUtterance(text)
  utt.rate = 0.92
  speechSynthesis.speak(utt)
}

// ── Fullscreen ───────────────────────────────────────────────────
const enterFullscreen = async () => {
  const el = document.documentElement
  if (!document.fullscreenElement && el.requestFullscreen) {
    await el.requestFullscreen().catch(() => {})
  }
}

// ── Focus monitoring ─────────────────────────────────────────────
const forfeitExam = () => {
  active.value = false
  timer.stop()
  router.push('/exam')
}

const onVisibility = () => {
  if (!active.value) return
  if (document.visibilityState === 'hidden') {
    focusWarnings.value += 1
    if (focusWarnings.value >= 3) {
      alert('Exam forfeited due to repeated focus loss.')
      forfeitExam()
    }
  }
}

const onWindowBlur = () => {
  if (!active.value) return
  focusWarnings.value += 1
  if (focusWarnings.value >= 3) {
    alert('Exam forfeited due to repeated focus loss.')
    forfeitExam()
  }
}

onBeforeRouteLeave((to, from, next) => {
  if (!active.value) return next()
  const ok = window.confirm('Exam is in progress. Leave and forfeit?')
  if (ok) {
    active.value = false
    timer.stop()
    next()
  } else next(false)
})

onMounted(() => {
  loadPhase('reading_s1')
  document.addEventListener('visibilitychange', onVisibility)
  window.addEventListener('blur', onWindowBlur)
})

onUnmounted(() => {
  speechSynthesis.cancel()
  document.removeEventListener('visibilitychange', onVisibility)
  window.removeEventListener('blur', onWindowBlur)
})
</script>
