import { supabase } from '@/lib/supabase'
import type { EventRecord } from '@/types'

export async function fetchPublishedEvents(): Promise<EventRecord[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('events')
    .select(
      'id,title,slug,description,location,start_time,end_time,image,event_url,featured',
    )
    .eq('published', true)
    .order('start_time', { ascending: true })

  if (error) throw error
  return data ?? []
}
