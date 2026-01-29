<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      :permanent="!smAndDown"
      :temporary="smAndDown"
      width="260"
      class="border-e"
    >
      <v-list nav density="comfortable">
        <v-list-subheader>TOEFL 2026 Prep</v-list-subheader>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" to="/" @click="onNavClick" />
        <v-list-item prepend-icon="mdi-school" title="Practice" to="/practice" @click="onNavClick" />
        <v-list-item prepend-icon="mdi-file-document-multiple" title="Mock Exams" to="/exam" @click="onNavClick" />
        <v-list-item prepend-icon="mdi-chart-line" title="Analytics" to="/analytics" @click="onNavClick" />
        <v-list-item prepend-icon="mdi-cog" title="Settings" to="/settings" @click="onNavClick" />
      </v-list>

      <v-divider class="my-2" />

      <v-list nav density="compact">
        <v-list-subheader>Quick Sections</v-list-subheader>
        <v-list-item prepend-icon="mdi-book-open-page-variant" title="Reading" to="/practice/reading" @click="onNavClick" />
        <v-list-item prepend-icon="mdi-headphones" title="Listening" to="/practice/listening" @click="onNavClick" />
        <v-list-item prepend-icon="mdi-microphone" title="Speaking" to="/practice/speaking" @click="onNavClick" />
        <v-list-item prepend-icon="mdi-pencil" title="Writing" to="/practice/writing" @click="onNavClick" />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app flat class="border-b glass-bar">
      <v-app-bar-nav-icon v-if="smAndDown" @click="drawer = !drawer" />
      <v-app-bar-title class="text-truncate">TOEFL iBT 2026 — Practice Suite</v-app-bar-title>
      <v-chip color="primary" variant="flat" class="me-2">Phase 5</v-chip>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-3 pa-sm-6 page-shell">
        <router-view v-slot="{ Component }">
          <transition name="page-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()
const drawer = ref(!smAndDown.value)

watch(smAndDown, (v) => {
  drawer.value = !v
})

const onNavClick = () => {
  if (smAndDown.value) drawer.value = false
}
</script>
