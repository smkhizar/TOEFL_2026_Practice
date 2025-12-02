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

const s = useProgressStore()

const cards = computed(() => [
  { title: 'Practice Sessions', value: String(s.practiceSessions) },
  { title: 'Mock Exams Taken', value: String(s.mockExamsTaken) },
  { title: 'Reading Avg', value: s.avgReading ? `${s.avgReading}%` : '—' },
  { title: 'Listening Avg', value: s.avgListening ? `${s.avgListening}%` : '—' },
])
</script>
