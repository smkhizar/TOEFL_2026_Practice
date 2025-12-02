<template>
  <div>
    <h1 class="text-h4 mb-2">Practice Hub</h1>
    <p class="text-medium-emphasis mb-6">Choose a section to train with 2026-style tasks.</p>

    <v-row>
      <v-col cols="12" md="6" lg="3" v-for="item in sections" :key="item.title">
        <v-card :to="item.to" rounded="xl" elevation="0" class="pa-4 h-100">
          <v-icon :icon="item.icon" size="30" class="mb-2" color="primary" />
          <div class="text-h6">{{ item.title }}</div>
          <div class="text-body-2 text-medium-emphasis">{{ item.desc }}</div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const sections = [
  { title: 'Reading', desc: 'Complete words, daily-life and academic passages', to: '/practice/reading', icon: 'mdi-book-open-page-variant' },
  { title: 'Listening', desc: 'Conversations, announcements, academic talks', to: '/practice/listening', icon: 'mdi-headphones' },
  { title: 'Speaking', desc: 'Listen & Repeat and Interview tasks', to: '/practice/speaking', icon: 'mdi-microphone' },
  { title: 'Writing', desc: 'Sentence build, email, discussion writing', to: '/practice/writing', icon: 'mdi-pencil' },
]
</script>
