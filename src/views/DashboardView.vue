<template>
  <div>
    <h1 class="text-h4 mb-2">Welcome back</h1>
    <p class="text-medium-emphasis mb-6">Your TOEFL 2026 prep command center.</p>

    <v-row>
      <v-col cols="12" md="3" v-for="card in cards" :key="card.title">
        <v-card rounded="xl" elevation="0" class="pa-4">
          <div class="text-overline text-medium-emphasis">{{ card.title }}</div>
          <div class="text-h5 font-weight-bold">{{ card.value }}</div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProgressStore } from '../stores/progress'
import { useBandEstimate } from '../composables/useBandEstimate'

const s = useProgressStore()

const overallPercent = computed(() => {
  const vals = [s.avgReading, s.avgListening].filter((x) => x > 0)
  return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0
})

const cards = computed(() => [
  { title: 'Practice Sessions', value: String(s.practiceSessions) },
  { title: 'Mock Exams Taken', value: String(s.mockExamsTaken) },
  { title: 'Reading Avg', value: s.avgReading ? `${s.avgReading}%` : '—' },
  { title: 'Listening Avg', value: s.avgListening ? `${s.avgListening}%` : '—' },
  { title: 'Estimated Overall Band', value: overallPercent.value ? String(useBandEstimate(overallPercent.value)) : '—' },
])
</script>
