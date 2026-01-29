<template>
  <div>
    <h1 class="text-h4 mb-2">Settings</h1>
    <p class="text-medium-emphasis mb-6">Audio/microphone permissions, exam preferences, and progress data management.</p>

    <v-card rounded="xl" elevation="0" class="pa-4 mb-4">
      <div class="text-h6 mb-2">Permission Manager</div>
      <div class="mb-3">Microphone permission state: <strong>{{ micState }}</strong></div>
      <div class="d-flex ga-2 flex-wrap">
        <v-btn color="primary" :loading="checkingPerm" @click="probePermission">Refresh Permission</v-btn>
        <v-btn variant="tonal" :loading="requestingMic" @click="requestMic">Request Microphone Access</v-btn>
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
      <v-btn color="error" variant="tonal" @click="confirmReset = true">Reset All Progress</v-btn>
    </v-card>

    <v-dialog v-model="confirmReset" max-width="420">
      <v-card>
        <v-card-title>Reset all progress?</v-card-title>
        <v-card-text>This will permanently delete local scores and attempt history.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="confirmReset = false">Cancel</v-btn>
          <v-btn color="error" @click="resetProgress">Reset</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="toast" timeout="1800" color="success">{{ toastText }}</v-snackbar>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProgressStore } from '../stores/progress'

const store = useProgressStore()
const micState = ref('unknown')
const fileInput = ref(null)
const checkingPerm = ref(false)
const requestingMic = ref(false)
const confirmReset = ref(false)
const toast = ref(false)
const toastText = ref('')

const showToast = (text) => {
  toastText.value = text
  toast.value = true
}

const probePermission = async () => {
  checkingPerm.value = true
  try {
    if (!navigator.permissions) {
      micState.value = 'unavailable-api'
      return
    }
    const p = await navigator.permissions.query({ name: 'microphone' })
    micState.value = p.state
  } catch {
    micState.value = 'unknown'
  } finally {
    checkingPerm.value = false
  }
}

const requestMic = async () => {
  requestingMic.value = true
  try {
    const s = await navigator.mediaDevices.getUserMedia({ audio: true })
    micState.value = 'granted'
    s.getTracks().forEach((t) => t.stop())
    showToast('Microphone access granted.')
  } catch {
    micState.value = 'denied'
    showToast('Microphone access denied.')
  } finally {
    requestingMic.value = false
  }
}

const exportProgress = () => {
  const blob = new Blob([store.exportJson()], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `toefl-progress-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(a.href)
  showToast('Progress exported.')
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
    showToast('Progress imported successfully.')
  } catch {
    showToast('Invalid JSON file.')
  }
  e.target.value = ''
}

const resetProgress = () => {
  store.resetAll()
  confirmReset.value = false
  showToast('Progress reset.')
}

onMounted(probePermission)
</script>
