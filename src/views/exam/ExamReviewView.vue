<template>
  <div>
    <h1 class="text-h4 mb-2">Mock Exam {{ route.params.id }} — Review</h1>
    <p class="text-medium-emphasis mb-4">Phase 2 summary view (detailed rubric scoring in next phase).</p>

    <v-card rounded="xl" elevation="0" class="pa-4">
      <div class="text-overline">Completed</div>
      <div class="text-h6 mb-2">Exam session recorded</div>
      <div class="text-body-2 text-medium-emphasis mb-3">Total mock exams taken: {{ s.mockExamsTaken }}</div>
      <v-btn color="primary" :to="'/exam'">Back to Mock Exams</v-btn>
    </v-card>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useProgressStore } from '../../stores/progress'

const route = useRoute()
const s = useProgressStore()
</script>
