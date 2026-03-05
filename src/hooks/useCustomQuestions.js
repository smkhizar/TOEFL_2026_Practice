import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/useAuthStore'

// Returns { customMap, saveCustom, loading }
// customMap: { [stage]: { [index]: questionObject } }
// saveCustom(stage, index, question): saves to Supabase
export function useCustomQuestions(section) {
  const userId = useAuthStore((s) => s.user?.id)
  const [customMap, setCustomMap] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!userId) return
    setLoading(true)
    supabase
      .from('custom_questions')
      .select('stage, question_index, question_data')
      .eq('user_id', userId)
      .eq('section', section)
      .then(({ data, error }) => {
        setLoading(false)
        if (error || !data) return
        const map = {}
        data.forEach(({ stage, question_index, question_data }) => {
          if (!map[stage]) map[stage] = {}
          map[stage][question_index] = question_data
        })
        setCustomMap(map)
      })
  }, [userId, section])

  const saveCustom = useCallback(async (stage, index, question) => {
    const uid = useAuthStore.getState().user?.id
    if (!uid) return
    const { error } = await supabase.from('custom_questions').upsert(
      {
        user_id: uid,
        section,
        stage,
        question_index: index,
        question_data: question,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,section,stage,question_index' }
    )
    if (!error) {
      setCustomMap((prev) => ({
        ...prev,
        [stage]: { ...(prev[stage] || {}), [index]: question },
      }))
    }
  }, [section])

  return { customMap, saveCustom, loading }
}
