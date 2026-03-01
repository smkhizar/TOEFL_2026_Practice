import { create } from 'zustand'

const KEY = 'toefl-progress-v1'

const defaultState = () => ({
  practiceSessions: 0,
  mockExamsTaken: 0,
  readingScores: [],
  listeningScores: [],
  writingSubmissions: 0,
  speakingAttempts: 0,
  lastReadingAttempt: null,
  lastListeningAttempt: null,
})

const getAvg = (arr) =>
  arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0

const stateKeys = Object.keys(defaultState())

const persistState = (get) => {
  const s = get()
  const data = {}
  stateKeys.forEach((k) => { data[k] = s[k] })
  localStorage.setItem(KEY, JSON.stringify(data))
}

export const useProgressStore = create((set, get) => ({
  ...defaultState(),

  hydrate() {
    const raw = localStorage.getItem(KEY)
    if (!raw) return
    try { set(JSON.parse(raw)) } catch {}
  },

  exportJson() {
    const s = get()
    const data = {}
    stateKeys.forEach((k) => { data[k] = s[k] })
    return JSON.stringify(data, null, 2)
  },

  importJson(raw) {
    const parsed = JSON.parse(raw)
    set({ ...defaultState(), ...parsed })
    persistState(get)
  },

  resetAll() {
    const ds = defaultState()
    set(ds)
    localStorage.setItem(KEY, JSON.stringify(ds))
  },

  addReading(score, detail = null) {
    set((s) => ({
      practiceSessions: s.practiceSessions + 1,
      readingScores: [...s.readingScores, score],
      lastReadingAttempt: detail,
    }))
    persistState(get)
  },

  addListening(score, detail = null) {
    set((s) => ({
      practiceSessions: s.practiceSessions + 1,
      listeningScores: [...s.listeningScores, score],
      lastListeningAttempt: detail,
    }))
    persistState(get)
  },

  addWriting() {
    set((s) => ({
      practiceSessions: s.practiceSessions + 1,
      writingSubmissions: s.writingSubmissions + 1,
    }))
    persistState(get)
  },

  addSpeaking() {
    set((s) => ({
      practiceSessions: s.practiceSessions + 1,
      speakingAttempts: s.speakingAttempts + 1,
    }))
    persistState(get)
  },

  addMockExam() {
    set((s) => ({ mockExamsTaken: s.mockExamsTaken + 1 }))
    persistState(get)
  },
}))
