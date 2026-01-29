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

      <v-textarea v-model="response" label="Your response" rows="8" auto-grow :disabled="submitting" />
      <div class="text-caption text-medium-emphasis mb-3">Word count: {{ words }} · Quality estimate: {{ quality }}/5</div>

      <div class="d-flex ga-2 flex-wrap">
        <v-btn color="primary" :loading="submitting" :disabled="!response.trim() || submitted" @click="submit">Submit Task</v-btn>
        <v-btn variant="tonal" :disabled="submitting" @click="nextTask">Next Task</v-btn>
      </div>
    </v-card>

    <transition name="page-fade">
      <v-alert v-if="submitted" :type="words >= task.minWords ? 'success' : 'warning'" variant="tonal">
        {{ words >= task.minWords ? 'Good length and submitted.' : `Below suggested minimum (${task.minWords}).` }}
      </v-alert>
    </transition>

    <v-snackbar v-model="toast" timeout="1800" color="success">Task submitted and saved.</v-snackbar>
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
const submitting = ref(false)
const toast = ref(false)

const task = computed(() => writingTasks[i.value])
const words = computed(() => (response.value.trim() ? response.value.trim().split(/\s+/).length : 0))
const quality = computed(() => {
  const lengthScore = Math.max(1, Math.min(5, Math.round((words.value / task.value.minWords) * 5)))
  const sentenceCount = response.value.split(/[.!?]+/).filter(Boolean).length
  const structureScore = Math.max(1, Math.min(5, sentenceCount >= 3 ? 5 : sentenceCount + 1))
  return Math.round((lengthScore + structureScore) / 2)
})
const timer = useTimer(task.value.time)

const restartTimer = () => {
  timer.reset(task.value.time)
  timer.start(() => {
    submitted.value = true
  })
}

watch(task, restartTimer)
restartTimer()

const submit = async () => {
  if (!response.value.trim() || submitted.value) return
  submitting.value = true
  await new Promise((r) => setTimeout(r, 250))
  submitted.value = true
  submitting.value = false
  toast.value = true
  progress.addWriting()
}

const nextTask = () => {
  i.value = (i.value + 1) % writingTasks.length
  response.value = ''
  submitted.value = false
  submitting.value = false
}
</script>
