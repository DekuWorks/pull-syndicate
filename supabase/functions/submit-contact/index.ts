import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const hits = new Map<string, { count: number; reset: number }>()

function rateLimited(ip: string) {
  const now = Date.now()
  const current = hits.get(ip)
  if (!current || current.reset < now) {
    hits.set(ip, { count: 1, reset: now + 10 * 60 * 1000 })
    return false
  }
  current.count += 1
  return current.count > 8
}

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return json(405, { error: { code: 'method_not_allowed', message: 'POST only.' } })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (rateLimited(ip)) {
    return json(429, { error: { code: 'rate_limited', message: 'Try again later.' } })
  }

  const payload = await req.json().catch(() => null) as {
    name?: string
    email?: string
    subject?: string
    message?: string
    company?: string
  } | null

  if (!payload) {
    return json(400, { error: { code: 'validation_error', message: 'Invalid JSON.' } })
  }

  if (payload.company?.trim()) {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  const name = payload.name?.trim() ?? ''
  const email = payload.email?.trim() ?? ''
  const subject = payload.subject?.trim() ?? ''
  const message = payload.message?.trim() ?? ''

  if (!name || !email.includes('@') || !subject || message.length < 10 || message.length > 4000) {
    return json(400, { error: { code: 'validation_error', message: 'Check the form fields.' } })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    { auth: { persistSession: false } },
  )

  const { error } = await supabase.from('contact_submissions').insert({
    name,
    email,
    subject,
    message,
    user_agent: req.headers.get('user-agent'),
  })

  if (error) {
    return json(500, { error: { code: 'insert_failed', message: 'Could not store the message.' } })
  }

  return json(200, { ok: true })
})
