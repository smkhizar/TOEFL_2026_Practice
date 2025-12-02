<template>
  <v-card rounded="xl" elevation="0" class="pa-4 mb-4">
    <div class="d-flex align-center justify-space-between mb-2">
      <div class="text-subtitle-2">{{ label }}</div>
      <div class="text-h6">{{ time }}</div>
    </div>
    <v-progress-linear :model-value="percent" color="primary" height="10" rounded />
  </v-card>
</template>

<script setup>
defineProps({
  label: { type: String, default: 'Time Remaining' },
  time: { type: String, required: true },
  percent: { type: Number, required: true },
})
</script>
