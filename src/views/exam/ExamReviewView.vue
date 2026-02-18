<template>
  <div>
    <h1 class="text-h4 mb-2">Mock Exam {{ route.params.id }} — Review</h1>
    <p class="text-medium-emphasis mb-4">Section summary from your latest mock attempt.</p>

    <v-row>
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="0" class="pa-4">
          <div class="text-overline">Reading</div>
          <div class="text-h6">{{ last?.reading?.correct ?? 0 }}/{{ last?.reading?.total ?? 1 }} correct</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="0" class="pa-4">
          <div class="text-overline">Listening</div>
          <div class="text-h6">{{ last?.listening?.correct ?? 0 }}/{{ last?.listening?.total ?? 1 }} correct</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="0" class="pa-4">
          <div class="text-overline">Writing</div>
          <div class="text-h6">{{ last?.writing?.submitted ? `Submitted (${last?.writing?.words} words)` : 'Not submitted' }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="0" class="pa-4">
          <div class="text-overline">Speaking</div>
          <div class="text-h6">{{ last?.speaking?.submitted ? `Submitted (${last?.speaking?.words} words)` : 'Not submitted' }}</div>
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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProgressStore } from '../../stores/progress'

const route = useRoute()
const s = useProgressStore()
const last = ref(null)

onMounted(() => {
  const raw = localStorage.getItem('toefl-last-exam')
  if (raw) {
    try {
      last.value = JSON.parse(raw)
    } catch {
      last.value = null
    }
  }
})
</script>
