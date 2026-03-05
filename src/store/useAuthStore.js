import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,

  async init() {
    const { data: { session } } = await supabase.auth.getSession()
    set({ session, user: session?.user ?? null, loading: false })

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null, loading: false })
    })
  },

  async signIn(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  },

  async signUp(email, password) {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
  },

  async signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
    if (error) throw error
  },

  async signOut() {
    await supabase.auth.signOut()
    set({ user: null, session: null })
  },

  async resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth`,
    })
    if (error) throw error
  },

  async updatePassword(password) {
    const { error } = await supabase.auth.updateUser({ password })
    if (error) throw error
  },
}))
