import { create } from 'zustand'
import { supabase } from '../lib/supabase'

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

const stateKeys = Object.keys(defaultState())

const persistLocal = (get) => {
  const s = get()
  const data = {}
  stateKeys.forEach((k) => { data[k] = s[k] })
  localStorage.setItem(KEY, JSON.stringify(data))
}

// Upsert current state to Supabase for the logged-in user
const persistToSupabase = async (get, userId) => {
  if (!userId) return
  const s = get()
  await supabase.from('user_progress').upsert({
    user_id: userId,
    practice_sessions: s.practiceSessions,
    mock_exams_taken: s.mockExamsTaken,
    reading_scores: s.readingScores,
    listening_scores: s.listeningScores,
    writing_submissions: s.writingSubmissions,
    speaking_attempts: s.speakingAttempts,
    last_reading_attempt: s.lastReadingAttempt,
    last_listening_attempt: s.lastListeningAttempt,
  }, { onConflict: 'user_id' })
}

export const useProgressStore = create((set, get) => ({
  ...defaultState(),

  async hydrate(userId) {
    // Try Supabase first if logged in
    if (userId) {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (!error && data) {
        const merged = {
          practiceSessions: data.practice_sessions ?? 0,
          mockExamsTaken: data.mock_exams_taken ?? 0,
          readingScores: data.reading_scores ?? [],
          listeningScores: data.listening_scores ?? [],
          writingSubmissions: data.writing_submissions ?? 0,
          speakingAttempts: data.speaking_attempts ?? 0,
          lastReadingAttempt: data.last_reading_attempt ?? null,
          lastListeningAttempt: data.last_listening_attempt ?? null,
        }
        set(merged)
        localStorage.setItem(KEY, JSON.stringify(merged))
        return
      }
      // No Supabase row yet — fall through to localStorage, then we'll sync up on next write
    }

    // Fallback: localStorage
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
    persistLocal(get)
  },

  resetAll(userId) {
    const ds = defaultState()
    set(ds)
    localStorage.setItem(KEY, JSON.stringify(ds))
    if (userId) persistToSupabase(get, userId)
  },

  addReading(score, detail = null, userId) {
    set((s) => ({
      practiceSessions: s.practiceSessions + 1,
      readingScores: [...s.readingScores, score],
      lastReadingAttempt: detail,
    }))
    persistLocal(get)
    persistToSupabase(get, userId)
  },

  addListening(score, detail = null, userId) {
    set((s) => ({
      practiceSessions: s.practiceSessions + 1,
      listeningScores: [...s.listeningScores, score],
      lastListeningAttempt: detail,
    }))
    persistLocal(get)
    persistToSupabase(get, userId)
  },

  addWriting(userId) {
    set((s) => ({
      practiceSessions: s.practiceSessions + 1,
      writingSubmissions: s.writingSubmissions + 1,
    }))
    persistLocal(get)
    persistToSupabase(get, userId)
  },

  addSpeaking(userId) {
    set((s) => ({
      practiceSessions: s.practiceSessions + 1,
      speakingAttempts: s.speakingAttempts + 1,
    }))
    persistLocal(get)
    persistToSupabase(get, userId)
  },

  addMockExam(userId) {
    set((s) => ({ mockExamsTaken: s.mockExamsTaken + 1 }))
    persistLocal(get)
    persistToSupabase(get, userId)
  },
}))
