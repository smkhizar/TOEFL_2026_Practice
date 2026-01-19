<template>
  <div>
    <h1 class="text-h4 mb-2">Reading Practice (Adaptive)</h1>
    <p class="text-medium-emphasis mb-4">Stage 1 determines Stage 2 difficulty, similar to 2026 adaptive behavior.</p>

    <SectionTimer label="Reading Section Timer" :time="timer.formatted" :percent="timer.percent" />

    <div class="mb-3 d-flex ga-2 flex-wrap">
      <v-chip
        v-for="(item, i) in currentSet"
        :key="item.id"
        :color="i === idx ? 'primary' : answered[i] ? 'success' : undefined"
        @click="jump(i)"
      >
        Q{{ i + 1 }}
      </v-chip>
    </div>

    <v-alert v-if="finished" type="success" variant="tonal" class="mb-4">
      Score: {{ score }}/{{ currentSet.length }} ({{ percent }}%) · Estimated Band: <strong>{{ band }}</strong> · Stage 2: <strong>{{ stage2Mode }}</strong>
    </v-alert>

    <v-card v-if="!finished" rounded="xl" elevation="0" class="pa-5">
      <div class="text-overline mb-2">Question {{ idx + 1 }} / {{ currentSet.length }} · {{ q.type }}</div>
      <p v-if="q.passage" class="mb-3">{{ q.passage }}</p>
      <p class="font-weight-medium mb-4">{{ q.prompt }}</p>

      <v-radio-group v-model="selected" class="mb-4">
        <v-radio v-for="(opt, i) in q.options" :key="i" :label="opt" :value="i" />
      </v-radio-group>

      <v-btn color="primary" @click="submitAnswer">{{ idx === currentSet.length - 1 ? 'Finish Section' : 'Next' }}</v-btn>
    </v-card>

    <v-card v-if="finished" rounded="xl" elevation="0" class="pa-4 mt-3">
      <div class="text-h6 mb-2">Question Review</div>
      <v-expansion-panels>
        <v-expansion-panel v-for="(item, i) in currentSet" :key="item.id">
          <v-expansion-panel-title>
            Q{{ i + 1 }} · {{ responses[i] === item.answer ? 'Correct' : 'Incorrect' }}
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="mb-2">{{ item.prompt }}</div>
            <div>Your answer: <strong>{{ item.options[responses[i]] ?? 'Not answered' }}</strong></div>
            <div>Correct answer: <strong>{{ item.options[item.answer] }}</strong></div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>

    <v-btn class="mt-4" variant="text" @click="restart">Restart</v-btn>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { readingAdaptive } from '../../data/reading'
import { useProgressStore } from '../../stores/progress'
import { useTimer } from '../../composables/useTimer'
import { useBandEstimate } from '../../composables/useBandEstimate'
import SectionTimer from '../../components/SectionTimer.vue'

const progress = useProgressStore()
const timer = useTimer(14 * 60)

const stage2Mode = ref('pending')
const pool = ref([...readingAdaptive.stage1])
const idx = ref(0)
const selected = ref(null)
const score = ref(0)
const finished = ref(false)
const answered = ref({})
const responses = ref({})

const q = computed(() => pool.value[idx.value])
const currentSet = computed(() => pool.value)
const percent = computed(() => Math.round((score.value / currentSet.value.length) * 100))
const band = computed(() => useBandEstimate(percent.value))

const finalize = () => {
  if (finished.value) return
  finished.value = true
  timer.stop()
  progress.addReading(score.value, {
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
  if (prev === q.value.answer) score.value -= 1

  answered.value[idx.value] = true
  responses.value[idx.value] = selected.value
  if (selected.value === q.value.answer) score.value += 1

  if (idx.value < pool.value.length - 1) {
    idx.value += 1
    selected.value = responses.value[idx.value] ?? null
    return
  }

  if (stage2Mode.value === 'pending') {
    stage2Mode.value = score.value >= 3 ? 'hard' : 'easy'
    pool.value = [
      ...pool.value,
      ...(stage2Mode.value === 'hard' ? readingAdaptive.stage2Hard : readingAdaptive.stage2Easy),
    ]
    idx.value += 1
    selected.value = null
    return
  }

  finalize()
}

const restart = () => {
  stage2Mode.value = 'pending'
  pool.value = [...readingAdaptive.stage1]
  idx.value = 0
  score.value = 0
  selected.value = null
  finished.value = false
  answered.value = {}
  responses.value = {}
  timer.reset(14 * 60)
  timer.start(finalize)
}

onMounted(restart)
</script>
