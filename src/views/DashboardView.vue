<template>
  <div>
    <h1 class="text-h4 mb-1">Welcome back</h1>
    <p class="text-medium-emphasis mb-5">Your TOEFL 2026 preparation dashboard.</p>

    <!-- KPI cards -->
    <v-row class="mb-4">
      <v-col cols="6" sm="4" md="2" v-for="card in cards" :key="card.title">
        <v-card rounded="xl" elevation="0" class="pa-4">
          <div class="text-caption text-medium-emphasis mb-1">{{ card.title }}</div>
          <div class="text-h5 font-weight-bold">{{ card.value }}</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Format overview -->
    <v-card rounded="xl" elevation="0" class="pa-5 mb-4">
      <div class="text-h6 mb-3">2026 TOEFL Format Overview</div>
      <v-row dense>
        <v-col cols="12" sm="6" md="3" v-for="section in formatSections" :key="section.name">
          <div class="pa-3 rounded mb-2" style="background: rgba(0,0,0,0.04)">
            <div class="text-overline" :style="{ color: section.color }">{{ section.name }}</div>
            <div class="text-body-2 font-weight-medium mb-1">{{ section.tasks }}</div>
            <div class="text-caption text-medium-emphasis">{{ section.detail }}</div>
          </div>
        </v-col>
      </v-row>
      <div class="text-caption text-medium-emphasis mt-2">
        Total test time: ~67–85 min · Score: 1–6 banded scale (CEFR-aligned)
      </div>
    </v-card>

    <!-- Quick actions -->
    <v-card rounded="xl" elevation="0" class="pa-4">
      <div class="text-h6 mb-3">Quick Actions</div>
      <div class="d-flex ga-2 flex-wrap">
        <v-btn color="primary" :to="'/practice'">Practice Sections</v-btn>
        <v-btn color="secondary" :to="'/exam'">Take a Mock Exam</v-btn>
        <v-btn variant="tonal" :to="'/analytics'">View Analytics</v-btn>
      </div>
    </v-card>
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
  { title: 'Writing Done', value: String(s.writingSubmissions) },
  {
    title: 'Est. Band (1–6)',
    value: overallPercent.value ? String(useBandEstimate(overallPercent.value)) : '—',
  },
])

const formatSections = [
  {
    name: 'Reading',
    color: 'rgb(var(--v-theme-primary))',
    tasks: 'Adaptive · 2 stages',
    detail: 'Complete the Words · Read in Daily Life · Academic Passage',
  },
  {
    name: 'Listening',
    color: 'rgb(var(--v-theme-secondary))',
    tasks: 'Adaptive · 2 stages',
    detail: 'Choose a Response · Conversation · Announcement · Academic Talk',
  },
  {
    name: 'Writing',
    color: '#4CAF50',
    tasks: '3 task types',
    detail: 'Build a Sentence · Write an Email · Academic Discussion',
  },
  {
    name: 'Speaking',
    color: '#FF9800',
    tasks: '11 tasks total',
    detail: '7 Listen & Repeat (8–12s) · 4 Take an Interview (45s each)',
  },
]
</script>
