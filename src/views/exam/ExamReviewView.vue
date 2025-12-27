<template>
  <div>
    <h1 class="text-h4 mb-2">Mock Exam {{ route.params.id }} — Review</h1>
    <p class="text-medium-emphasis mb-4">Section summary and latest performance estimate.</p>

    <v-row>
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="0" class="pa-4">
          <div class="text-overline">Reading</div>
          <div class="text-h6">{{ readingSummary }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="0" class="pa-4">
          <div class="text-overline">Listening</div>
          <div class="text-h6">{{ listeningSummary }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="0" class="pa-4">
          <div class="text-overline">Writing</div>
          <div class="text-h6">Submissions: {{ s.writingSubmissions }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="0" class="pa-4">
          <div class="text-overline">Speaking</div>
          <div class="text-h6">Attempts: {{ s.speakingAttempts }}</div>
        </v-card>
      </v-col>
    </v-row>

    <v-card rounded="xl" elevation="0" class="pa-4 mt-4">
      <div class="text-overline">Completed</div>
      <div class="text-h6 mb-2">Exam session recorded</div>
      <div class="text-body-2 text-medium-emphasis mb-3">Total mock exams taken: {{ s.mockExamsTaken }}</div>
      <v-btn color="primary" :to="'/exam'">Back to Mock Exams</v-btn>
    </v-card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProgressStore } from '../../stores/progress'

const route = useRoute()
const s = useProgressStore()

const readingSummary = computed(() => {
  const r = s.lastReadingAttempt
  return r ? `Score ${r.score}/${r.total} · ${r.percent}% · Band ${r.band}` : 'No recent attempt'
})

const listeningSummary = computed(() => {
  const l = s.lastListeningAttempt
  return l ? `Score ${l.score}/${l.total} · ${l.percent}% · Band ${l.band}` : 'No recent attempt'
})
</script>
