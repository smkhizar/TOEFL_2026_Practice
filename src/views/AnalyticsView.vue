<template>
  <div>
    <h1 class="text-h4 mb-2">Analytics</h1>
    <p class="text-medium-emphasis mb-6">Section-level progress from your local attempts.</p>

    <v-row>
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="0" class="pa-4">
          <div class="text-overline">Reading Scores</div>
          <div class="text-h6">{{ readingText }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="0" class="pa-4">
          <div class="text-overline">Listening Scores</div>
          <div class="text-h6">{{ listeningText }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="0" class="pa-4">
          <div class="text-overline">Writing Submissions</div>
          <div class="text-h6">{{ s.writingSubmissions }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="0" class="pa-4">
          <div class="text-overline">Speaking Attempts</div>
          <div class="text-h6">{{ s.speakingAttempts }}</div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProgressStore } from '../stores/progress'

const s = useProgressStore()

const readingText = computed(() => s.readingScores.length ? s.readingScores.join(', ') : 'No attempts yet')
const listeningText = computed(() => s.listeningScores.length ? s.listeningScores.join(', ') : 'No attempts yet')
</script>
