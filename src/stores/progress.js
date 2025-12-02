import { defineStore } from 'pinia'

const KEY = 'toefl-progress-v1'

export const useProgressStore = defineStore('progress', {
  state: () => ({
    practiceSessions: 0,
    mockExamsTaken: 0,
    readingScores: [],
    listeningScores: [],
    writingSubmissions: 0,
    speakingAttempts: 0,
  }),
  getters: {
    avgReading: (s) => (s.readingScores.length ? Math.round(s.readingScores.reduce((a, b) => a + b, 0) / s.readingScores.length) : 0),
    avgListening: (s) => (s.listeningScores.length ? Math.round(s.listeningScores.reduce((a, b) => a + b, 0) / s.listeningScores.length) : 0),
  },
  actions: {
    hydrate() {
      const raw = localStorage.getItem(KEY)
      if (raw) Object.assign(this, JSON.parse(raw))
    },
    persist() {
      localStorage.setItem(KEY, JSON.stringify(this.$state))
    },
    addReading(score) {
      this.practiceSessions += 1
      this.readingScores.push(score)
      this.persist()
    },
    addListening(score) {
      this.practiceSessions += 1
      this.listeningScores.push(score)
      this.persist()
    },
    addWriting() {
      this.practiceSessions += 1
      this.writingSubmissions += 1
      this.persist()
    },
    addSpeaking() {
      this.practiceSessions += 1
      this.speakingAttempts += 1
      this.persist()
    },
    addMockExam() {
      this.mockExamsTaken += 1
      this.persist()
    },
  },
})
