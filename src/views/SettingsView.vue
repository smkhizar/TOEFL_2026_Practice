<template>
  <div>
    <h1 class="text-h4 mb-2">Settings</h1>
    <p class="text-medium-emphasis mb-6">Audio/microphone permissions, exam preferences, and progress data management.</p>

    <v-card rounded="xl" elevation="0" class="pa-4 mb-4">
      <div class="text-h6 mb-2">Permission Manager</div>
      <div class="mb-3">Microphone permission state: <strong>{{ micState }}</strong></div>
      <div class="d-flex ga-2 flex-wrap">
        <v-btn color="primary" @click="probePermission">Refresh Permission</v-btn>
        <v-btn variant="tonal" @click="requestMic">Request Microphone Access</v-btn>
      </div>
      <div class="text-caption mt-3 text-medium-emphasis">If denied, re-enable mic in browser site settings.</div>
    </v-card>

    <v-card rounded="xl" elevation="0" class="pa-4 mb-4">
      <div class="text-h6 mb-2">Progress Backup</div>
      <div class="d-flex ga-2 flex-wrap">
        <v-btn color="secondary" @click="exportProgress">Export Progress JSON</v-btn>
        <v-btn variant="tonal" @click="triggerImport">Import Progress JSON</v-btn>
        <input ref="fileInput" type="file" accept="application/json" class="d-none" @change="onImportFile" />
      </div>
      <div class="text-caption mt-3 text-medium-emphasis">Import overwrites current local progress.</div>
    </v-card>

    <v-card rounded="xl" elevation="0" class="pa-4">
      <div class="text-h6 mb-2">Danger Zone</div>
      <v-btn color="error" variant="tonal" @click="resetProgress">Reset All Progress</v-btn>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProgressStore } from '../stores/progress'

const store = useProgressStore()
const micState = ref('unknown')
const fileInput = ref(null)

const probePermission = async () => {
  try {
    if (!navigator.permissions) {
      micState.value = 'unavailable-api'
      return
    }
    const p = await navigator.permissions.query({ name: 'microphone' })
    micState.value = p.state
  } catch {
    micState.value = 'unknown'
  }
}

const requestMic = async () => {
  try {
    const s = await navigator.mediaDevices.getUserMedia({ audio: true })
    micState.value = 'granted'
    s.getTracks().forEach((t) => t.stop())
  } catch {
    micState.value = 'denied'
  }
}

const exportProgress = () => {
  const blob = new Blob([store.exportJson()], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `toefl-progress-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(a.href)
}

const triggerImport = () => {
  fileInput.value?.click()
}

const onImportFile = async (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  const text = await file.text()
  try {
    store.importJson(text)
    alert('Progress imported successfully.')
  } catch {
    alert('Invalid JSON file.')
  }
  e.target.value = ''
}

const resetProgress = () => {
  const ok = window.confirm('Delete all progress data?')
  if (!ok) return
  store.resetAll()
}

onMounted(probePermission)
</script>
