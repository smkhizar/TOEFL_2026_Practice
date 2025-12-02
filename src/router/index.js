import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'dashboard', component: () => import('../views/DashboardView.vue') },
  { path: '/practice', name: 'practice', component: () => import('../views/PracticeHubView.vue') },
  { path: '/practice/reading', name: 'practice-reading', component: () => import('../views/practice/ReadingPracticeView.vue') },
  { path: '/practice/listening', name: 'practice-listening', component: () => import('../views/practice/ListeningPracticeView.vue') },
  { path: '/practice/speaking', name: 'practice-speaking', component: () => import('../views/practice/SpeakingPracticeView.vue') },
  { path: '/practice/writing', name: 'practice-writing', component: () => import('../views/practice/WritingPracticeView.vue') },
  { path: '/exam', name: 'exam', component: () => import('../views/ExamHubView.vue') },
  { path: '/exam/:id/start', name: 'exam-start', component: () => import('../views/exam/ExamStartView.vue') },
  { path: '/exam/:id/review', name: 'exam-review', component: () => import('../views/exam/ExamReviewView.vue') },
  { path: '/analytics', name: 'analytics', component: () => import('../views/AnalyticsView.vue') },
  { path: '/settings', name: 'settings', component: () => import('../views/SettingsView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
