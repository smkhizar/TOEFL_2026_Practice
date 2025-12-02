<template>
  <div>
    <h1 class="text-h4 mb-2">Settings</h1>
    <p class="text-medium-emphasis mb-6">Audio/microphone permissions and exam preferences.</p>

    <v-card rounded="xl" elevation="0" class="pa-4 mb-4">
      <div class="text-h6 mb-2">Permission Manager</div>
      <div class="mb-3">Microphone permission state: <strong>{{ micState }}</strong></div>
      <div class="d-flex ga-2 flex-wrap">
        <v-btn color="primary" @click="probePermission">Refresh Permission</v-btn>
        <v-btn variant="tonal" @click="requestMic">Request Microphone Access</v-btn>
      </div>
      <div class="text-caption mt-3 text-medium-emphasis">If denied, re-enable mic in browser site settings.</div>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const micState = ref('unknown')

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

onMounted(probePermission)
</script>
