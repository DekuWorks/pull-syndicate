import { Button } from '@/components/ui/Button'
import { TextAreaField, TextField } from '@/components/ui/Field'
import { supabase } from '@/lib/supabase'
import { validateContactForm } from '@/utils/validation'
import { useState, type FormEvent } from 'react'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const payload = {
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      subject: String(form.get('subject') ?? ''),
      message: String(form.get('message') ?? ''),
      company: String(form.get('company') ?? ''),
    }

    const result = validateContactForm(payload)
    if (result.isSpam) {
      setStatus('sent')
      return
    }
    if (!result.ok) {
      setErrors(result.errors)
      return
    }

    setErrors({})
    setStatus('submitting')

    try {
      if (supabase) {
        const { error } = await supabase.functions.invoke('submit-contact', {
          body: payload,
        })
        if (error) throw error
      }
      setStatus('sent')
      event.currentTarget.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <p role="status" className="rounded-xl border border-gold/30 bg-gold/10 p-6">
        Message received. We will reply from the Syndicate desk.
      </p>
    )
  }

  return (
    <form className="relative grid gap-5" onSubmit={onSubmit} noValidate>
      <TextField id="name" name="name" label="Name" autoComplete="name" error={errors.name} />
      <TextField
        id="email"
        name="email"
        type="email"
        label="Email"
        autoComplete="email"
        error={errors.email}
      />
      <TextField id="subject" name="subject" label="Subject" error={errors.subject} />
      <TextAreaField id="message" name="message" label="Message" error={errors.message} />
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      {status === 'error' ? (
        <p role="alert" className="text-sm text-purple">
          Could not send right now. Email us or try again.
        </p>
      ) : null}
      <Button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}
