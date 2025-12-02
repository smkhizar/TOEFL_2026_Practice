<template>
  <div>
    <h1 class="text-h4 mb-2">Mock Exams</h1>
    <p class="text-medium-emphasis mb-6">Full TOEFL-style timed simulations.</p>

    <v-row>
      <v-col cols="12" md="6" lg="4" v-for="n in 3" :key="n">
        <v-card rounded="xl" elevation="0" class="pa-4">
          <div class="text-overline">Mock Test {{ n }}</div>
          <div class="text-body-2 text-medium-emphasis mb-4">Adaptive Reading + Listening enabled</div>
          <v-btn color="primary" :to="`/exam/${n}/start`">Start Test</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
