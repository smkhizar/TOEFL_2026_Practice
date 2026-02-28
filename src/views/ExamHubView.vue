<template>
  <div>
    <h1 class="text-h4 mb-2">Mock Exams</h1>
    <p class="text-medium-emphasis mb-6">18 full TOEFL-style timed simulations.</p>

    <v-row>
      <v-col cols="12" md="6" lg="4" v-for="m in mocks" :key="m.id">
        <v-card rounded="xl" elevation="0" class="pa-4 h-100 d-flex flex-column interactive-card">
          <div class="text-overline">{{ m.title }}</div>
          <div class="text-body-2 text-medium-emphasis mb-2">Adaptive Reading + Listening · {{ m.estMinutes }} min</div>
          <v-chip size="small" class="mb-4" color="secondary" variant="tonal">{{ m.difficulty }}</v-chip>
          <v-spacer />
          <v-btn color="primary" :to="`/exam/${m.id}/start`">Start Test</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { mockTests as mocks } from '../data/mocks'
</script>
