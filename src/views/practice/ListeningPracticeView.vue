<template>
  <div>
    <h1 class="text-h4 mb-1">Listening Practice</h1>
    <p class="text-medium-emphasis mb-4">
      2026 adaptive format: Stage 1 (15 questions) → Stage 2 Easy or Hard based on your score.
    </p>

    <SectionTimer label="Listening Section Timer" :time="timer.formatted" :percent="timer.percent" />

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
        {{ stage2Mode === 'pending' ? 'Stage 1 — Foundation' : stage2Mode === 'hard' ? 'Stage 2 — Hard (Academic Inference)' : 'Stage 2 — Easy (Daily Life)' }}
      </v-chip>
      <span v-if="stage2Mode !== 'pending'" class="text-caption text-medium-emphasis">
        Stage 1 score: {{ stage1Score }}/{{ listeningAdaptive.stage1.length }}
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
      <div class="d-flex justify-space-between align-center mb-2">
        <div class="text-overline">Question {{ idx + 1 }} / {{ currentSet.length }} · {{ q.type }}</div>
        <v-switch v-model="showTranscript" label="Show transcript" hide-details density="compact" inset />
      </div>

      <!-- Audio / TTS play button -->
      <div class="mb-3 d-flex ga-2 align-center flex-wrap">
        <audio
          v-if="q.audioUrl && !audioFailed[q.id]"
          :src="q.audioUrl"
          controls
          preload="none"
          @error="audioFailed[q.id] = true"
        />
        <v-btn v-else color="secondary" variant="tonal" size="small" @click="playAudio">
          ▶ Play Audio
        </v-btn>
        <span class="text-caption text-medium-emphasis">{{ q.type }}</span>
      </div>

      <!-- Transcript (optional) -->
      <v-alert v-if="showTranscript" type="info" variant="tonal" density="compact" class="mb-3">
        {{ q.transcript }}
      </v-alert>

      <p class="font-weight-medium mb-4 text-body-1">{{ q.prompt }}</p>

      <v-radio-group v-model="selected" class="mb-4">
        <v-radio v-for="(opt, i) in q.options" :key="i" :label="opt" :value="i" class="mb-1" />
      </v-radio-group>

      <v-btn color="primary" :disabled="selected === null" @click="submitAnswer">
        {{ idx === currentSet.length - 1 ? 'Finish Section' : 'Next' }}
      </v-btn>
    </v-card>

    <!-- Review card -->
    <v-card v-if="finished" rounded="xl" elevation="0" class="pa-4 mt-3">
      <div class="text-h6 mb-3">Question Review</div>
      <v-expansion-panels>
        <v-expansion-panel v-for="(item, i) in currentSet" :key="item.id">
          <v-expansion-panel-title>
            <div class="d-flex ga-2 align-center">
              <v-icon
                :color="responses[i] === item.answer ? 'success' : 'error'"
                size="small"
              >
                {{ responses[i] === item.answer ? 'mdi-check-circle' : 'mdi-close-circle' }}
              </v-icon>
              Q{{ i + 1 }} · {{ item.type }}
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="mb-2 text-caption font-italic text-medium-emphasis">
              Transcript: {{ item.transcript }}
            </div>
            <div class="mb-2">{{ item.prompt }}</div>
            <div class="mb-1">
              Your answer:
              <strong :class="responses[i] === item.answer ? 'text-success' : 'text-error'">
                {{ item.options[responses[i]] ?? 'Not answered' }}
              </strong>
            </div>
            <div>
              Correct answer: <strong class="text-success">{{ item.options[item.answer] }}</strong>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>

    <v-btn class="mt-4" variant="text" @click="restart">↺ Restart</v-btn>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { listeningAdaptive } from '../../data/listening'
import { useProgressStore } from '../../stores/progress'
import { useTimer } from '../../composables/useTimer'
import { useBandEstimate } from '../../composables/useBandEstimate'
import SectionTimer from '../../components/SectionTimer.vue'

const progress = useProgressStore()
const TOTAL_TIME = 22 * 60 // 22 minutes for full adaptive session
const timer = useTimer(TOTAL_TIME)

const stage2Mode = ref('pending')
const stage1Score = ref(0)
const pool = ref([...listeningAdaptive.stage1])
const idx = ref(0)
const selected = ref(null)
const score = ref(0)
const finished = ref(false)
const showTranscript = ref(false)
const answered = ref({})
const responses = ref({})
const audioFailed = ref({})

const q = computed(() => pool.value[idx.value])
const currentSet = computed(() => pool.value)
const percent = computed(() =>
  currentSet.value.length ? Math.round((score.value / currentSet.value.length) * 100) : 0
)
const band = computed(() => useBandEstimate(percent.value))

const playAudio = () => {
  speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(q.value.transcript)
  utt.rate = 0.92
  speechSynthesis.speak(utt)
}

const finalize = () => {
  if (finished.value) return
  finished.value = true
  timer.stop()
  speechSynthesis.cancel()
  progress.addListening(percent.value, {
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
  if (selected.value === null) return

  const prev = responses.value[idx.value]
  if (prev !== undefined && prev === q.value.answer) score.value -= 1

  answered.value[idx.value] = true
  responses.value[idx.value] = selected.value
  if (selected.value === q.value.answer) score.value += 1

  if (idx.value < pool.value.length - 1) {
    idx.value += 1
    selected.value = responses.value[idx.value] ?? null
    return
  }

  if (stage2Mode.value === 'pending') {
    stage1Score.value = score.value
    const threshold = Math.ceil(listeningAdaptive.stage1.length * 0.5)
    stage2Mode.value = score.value >= threshold ? 'hard' : 'easy'
    pool.value = [
      ...pool.value,
      ...(stage2Mode.value === 'hard' ? listeningAdaptive.stage2Hard : listeningAdaptive.stage2Easy),
    ]
    idx.value += 1
    selected.value = null
    return
  }

  finalize()
}

const restart = () => {
  speechSynthesis.cancel()
  stage2Mode.value = 'pending'
  stage1Score.value = 0
  pool.value = [...listeningAdaptive.stage1]
  idx.value = 0
  score.value = 0
  selected.value = null
  finished.value = false
  showTranscript.value = false
  answered.value = {}
  responses.value = {}
  audioFailed.value = {}
  timer.reset(TOTAL_TIME)
  timer.start(finalize)
}

onMounted(restart)
onUnmounted(() => speechSynthesis.cancel())
</script>
