<template>
  <div>
    <h1 class="text-h4 mb-2">Writing Practice</h1>
    <p class="text-medium-emphasis mb-4">Build a Sentence, Email, and Academic Discussion timed tasks.</p>

    <SectionTimer label="Writing Task Timer" :time="timer.formatted" :percent="timer.percent" />

    <v-card rounded="xl" elevation="0" class="pa-5 mb-4">
      <div class="d-flex justify-space-between align-center mb-3">
        <div>
          <div class="text-overline">{{ task.type }}</div>
          <div class="text-body-1">{{ task.prompt }}</div>
        </div>
        <v-chip>{{ task.minWords }}+ words</v-chip>
      </div>

      <v-textarea v-model="response" label="Your response" rows="8" auto-grow />
      <div class="text-caption text-medium-emphasis mb-3">Word count: {{ words }} · Quality estimate: {{ quality }}/5</div>

      <div class="d-flex ga-2 flex-wrap">
        <v-btn color="primary" @click="submit">Submit Task</v-btn>
        <v-btn variant="tonal" @click="nextTask">Next Task</v-btn>
      </div>
    </v-card>

    <v-alert v-if="submitted" :type="words >= task.minWords ? 'success' : 'warning'" variant="tonal">
      {{ words >= task.minWords ? 'Good length and submitted.' : `Below suggested minimum (${task.minWords}).` }}
    </v-alert>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { writingTasks } from '../../data/writing'
import { useTimer } from '../../composables/useTimer'
import SectionTimer from '../../components/SectionTimer.vue'
import { useProgressStore } from '../../stores/progress'

const progress = useProgressStore()
const i = ref(0)
const response = ref('')
const submitted = ref(false)

const task = computed(() => writingTasks[i.value])
const words = computed(() => response.value.trim() ? response.value.trim().split(/\s+/).length : 0)
const quality = computed(() => {
  const lengthScore = Math.max(1, Math.min(5, Math.round((words.value / task.value.minWords) * 5)))
  const sentenceCount = response.value.split(/[.!?]+/).filter(Boolean).length
  const structureScore = Math.max(1, Math.min(5, sentenceCount >= 3 ? 5 : sentenceCount + 1))
  return Math.round((lengthScore + structureScore) / 2)
})
const timer = useTimer(task.value.time)

watch(task, (val) => {
  timer.reset(val.time)
  timer.start()
})

timer.start()

const submit = () => {
  submitted.value = true
  progress.addWriting()
}

const nextTask = () => {
  i.value = (i.value + 1) % writingTasks.length
  response.value = ''
  submitted.value = false
}
</script>
