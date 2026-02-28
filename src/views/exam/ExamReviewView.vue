<template>
  <div>
    <h1 class="text-h4 mb-1">Mock Test {{ route.params.id }} — Results</h1>
    <p class="text-medium-emphasis mb-5">2026 format review · Adaptive scoring</p>

    <v-row>
      <!-- Reading -->
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="0" class="pa-4 h-100">
          <div class="d-flex justify-space-between align-center mb-2">
            <div class="text-overline">Reading</div>
            <v-chip size="x-small" :color="readingAdaptiveColor" variant="tonal">
              Stage 2: {{ last?.reading?.adaptive || '—' }}
            </v-chip>
          </div>
          <div class="text-h5 font-weight-bold mb-1">
            {{ last?.reading?.correct ?? 0 }} / {{ last?.reading?.total ?? 0 }}
          </div>
          <div class="text-caption text-medium-emphasis mb-3">correct answers</div>
          <v-progress-linear
            v-if="last?.reading?.total"
            :model-value="(last.reading.correct / last.reading.total) * 100"
            height="8"
            rounded
            color="primary"
            class="mb-1"
          />
          <div v-if="last?.reading?.total" class="text-caption">
            {{ Math.round((last.reading.correct / last.reading.total) * 100) }}% accuracy
            · Band estimate: <strong>{{ readingBand }}</strong>
          </div>
        </v-card>
      </v-col>

      <!-- Listening -->
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="0" class="pa-4 h-100">
          <div class="d-flex justify-space-between align-center mb-2">
            <div class="text-overline">Listening</div>
            <v-chip size="x-small" :color="listeningAdaptiveColor" variant="tonal">
              Stage 2: {{ last?.listening?.adaptive || '—' }}
            </v-chip>
          </div>
          <div class="text-h5 font-weight-bold mb-1">
            {{ last?.listening?.correct ?? 0 }} / {{ last?.listening?.total ?? 0 }}
          </div>
          <div class="text-caption text-medium-emphasis mb-3">correct answers</div>
          <v-progress-linear
            v-if="last?.listening?.total"
            :model-value="(last.listening.correct / last.listening.total) * 100"
            height="8"
            rounded
            color="primary"
            class="mb-1"
          />
          <div v-if="last?.listening?.total" class="text-caption">
            {{ Math.round((last.listening.correct / last.listening.total) * 100) }}% accuracy
            · Band estimate: <strong>{{ listeningBand }}</strong>
          </div>
        </v-card>
      </v-col>

      <!-- Writing -->
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="0" class="pa-4 h-100">
          <div class="text-overline mb-2">Writing</div>
          <div v-if="last?.writing?.tasks?.length">
            <div
              v-for="(task, i) in last.writing.tasks"
              :key="i"
              class="d-flex justify-space-between align-center mb-2"
            >
              <div>
                <div class="text-body-2 font-weight-medium">{{ task.type }}</div>
                <div class="text-caption text-medium-emphasis">Task {{ i + 1 }}</div>
              </div>
              <v-chip size="small" :color="task.submitted ? 'success' : 'warning'" variant="tonal">
                {{ task.submitted ? `${task.words} words` : 'Not submitted' }}
              </v-chip>
            </div>
          </div>
          <div v-else class="text-body-2 text-medium-emphasis">No writing data recorded</div>
        </v-card>
      </v-col>

      <!-- Speaking -->
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="0" class="pa-4 h-100">
          <div class="text-overline mb-2">Speaking</div>
          <div v-if="last?.speaking?.tasks?.length">
            <div class="text-h5 font-weight-bold mb-1">
              {{ last.speaking.tasks.length }} / 11
            </div>
            <div class="text-caption text-medium-emphasis mb-3">tasks completed</div>
            <div class="d-flex ga-1 flex-wrap">
              <v-chip
                v-for="(task, i) in last.speaking.tasks"
                :key="i"
                size="x-small"
                :color="task.type === 'Listen and Repeat' ? 'info' : 'secondary'"
                variant="tonal"
              >
                {{ task.type === 'Listen and Repeat' ? 'L&R' : 'Interview' }} {{ i + 1 }}
              </v-chip>
            </div>
          </div>
          <div v-else class="text-body-2 text-medium-emphasis">No speaking data recorded</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Summary card -->
    <v-card rounded="xl" elevation="0" class="pa-5 mt-4">
      <div class="text-overline mb-1">Overall Summary</div>
      <div class="text-h5 font-weight-bold mb-1">
        Estimated Band: {{ overallBand }}
      </div>
      <div class="text-caption text-medium-emphasis mb-4">
        Based on Reading + Listening accuracy · TOEFL 2026 1–6 scale
      </div>
      <div class="text-body-2 text-medium-emphasis mb-4">
        Total mock exams completed: {{ s.mockExamsTaken }}
      </div>
      <div class="d-flex ga-2 flex-wrap">
        <v-btn color="primary" :to="'/exam'">Back to Mock Exams</v-btn>
        <v-btn variant="tonal" :to="'/'">Dashboard</v-btn>
        <v-btn variant="text" :to="'/analytics'">View Analytics</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProgressStore } from '../../stores/progress'
import { useBandEstimate } from '../../composables/useBandEstimate'

const route = useRoute()
const s = useProgressStore()
const last = ref(null)

onMounted(() => {
  const raw = localStorage.getItem('toefl-last-exam')
  if (raw) {
    try {
      last.value = JSON.parse(raw)
    } catch {
      last.value = null
    }
  }
})

const readingPct = computed(() =>
  last.value?.reading?.total
    ? Math.round((last.value.reading.correct / last.value.reading.total) * 100)
    : 0
)
const listeningPct = computed(() =>
  last.value?.listening?.total
    ? Math.round((last.value.listening.correct / last.value.listening.total) * 100)
    : 0
)

const readingBand = computed(() => (readingPct.value ? useBandEstimate(readingPct.value) : '—'))
const listeningBand = computed(() =>
  listeningPct.value ? useBandEstimate(listeningPct.value) : '—'
)

const overallBand = computed(() => {
  const vals = [readingPct.value, listeningPct.value].filter((v) => v > 0)
  if (!vals.length) return '—'
  return useBandEstimate(Math.round(vals.reduce((a, b) => a + b, 0) / vals.length))
})

const readingAdaptiveColor = computed(() =>
  last.value?.reading?.adaptive === 'hard' ? 'error' : 'info'
)
const listeningAdaptiveColor = computed(() =>
  last.value?.listening?.adaptive === 'hard' ? 'error' : 'info'
)
</script>
