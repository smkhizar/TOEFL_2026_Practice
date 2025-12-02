<template>
  <v-app>
    <v-navigation-drawer app permanent width="260" class="border-e">
      <v-list nav density="comfortable">
        <v-list-subheader>TOEFL 2026 Prep</v-list-subheader>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" to="/" />
        <v-list-item prepend-icon="mdi-school" title="Practice" to="/practice" />
        <v-list-item prepend-icon="mdi-file-document-multiple" title="Mock Exams" to="/exam" />
        <v-list-item prepend-icon="mdi-chart-line" title="Analytics" to="/analytics" />
        <v-list-item prepend-icon="mdi-cog" title="Settings" to="/settings" />
      </v-list>

      <v-divider class="my-2" />

      <v-list nav density="compact">
        <v-list-subheader>Quick Sections</v-list-subheader>
        <v-list-item prepend-icon="mdi-book-open-page-variant" title="Reading" to="/practice/reading" />
        <v-list-item prepend-icon="mdi-headphones" title="Listening" to="/practice/listening" />
        <v-list-item prepend-icon="mdi-microphone" title="Speaking" to="/practice/speaking" />
        <v-list-item prepend-icon="mdi-pencil" title="Writing" to="/practice/writing" />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app flat class="border-b">
      <v-app-bar-title>TOEFL iBT 2026 — Practice Suite</v-app-bar-title>
      <v-chip color="primary" variant="flat" class="me-2">Phase 1</v-chip>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
