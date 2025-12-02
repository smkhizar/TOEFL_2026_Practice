<template>
  <div>
    <h1 class="text-h4 mb-2">Reading Practice (Adaptive)</h1>
    <p class="text-medium-emphasis mb-4">Stage 1 determines Stage 2 difficulty, similar to 2026 adaptive behavior.</p>

    <SectionTimer label="Reading Section Timer" :time="timer.formatted" :percent="timer.percent" />

    <v-alert v-if="finished" type="success" variant="tonal" class="mb-4">
      Score: {{ score }}/{{ currentSet.length }} | Stage 2: <strong>{{ stage2Mode }}</strong>
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

    <v-btn class="mt-4" variant="text" @click="restart">Restart</v-btn>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { readingAdaptive } from '../../data/reading'
import { useProgressStore } from '../../stores/progress'
import { useTimer } from '../../composables/useTimer'
import SectionTimer from '../../components/SectionTimer.vue'

const progress = useProgressStore()
const timer = useTimer(14 * 60)

const stage2Mode = ref('pending')
const pool = ref([...readingAdaptive.stage1])
const idx = ref(0)
const selected = ref(null)
const score = ref(0)
const finished = ref(false)

const q = computed(() => pool.value[idx.value])
const currentSet = computed(() => pool.value)

const submitAnswer = () => {
  if (selected.value === null) return
  if (selected.value === q.value.answer) score.value += 1

  if (idx.value < pool.value.length - 1) {
    idx.value += 1
    selected.value = null
    return
  }

  if (stage2Mode.value === 'pending') {
    stage2Mode.value = score.value >= 2 ? 'hard' : 'easy'
    pool.value = [
      ...pool.value,
      ...(stage2Mode.value === 'hard' ? readingAdaptive.stage2Hard : readingAdaptive.stage2Easy),
    ]
    idx.value += 1
    selected.value = null
    return
  }

  finished.value = true
  timer.stop()
  progress.addReading(score.value)
}

const restart = () => {
  stage2Mode.value = 'pending'
  pool.value = [...readingAdaptive.stage1]
  idx.value = 0
  score.value = 0
  selected.value = null
  finished.value = false
  timer.reset(14 * 60)
  timer.start(() => {
    finished.value = true
  })
}

onMounted(restart)
</script>
