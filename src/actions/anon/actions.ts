'use server'

import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { addMinutes } from 'date-fns'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import { revalidatePath } from "next/cache"



const FormSchema = z.object({

  ['original-url']: z.url(
    {
      error: (iss) => !iss.input || String(iss.input).trim() === '' ? 'URL is required' : 'Invalid URL',
      protocol: /^https?$/,
      hostname: z.regexes.domain,
    })
})

const CreateURL = FormSchema.required({

  ['original-url']: true
})



export type State = {
  errors?: {
    ['original-url']?: string[]
  }
  message?: string | null
  status?: 'idle' | 'success' | 'error' | null
}

export async function createAnonURL(prevState: State | undefined, formData: FormData): Promise<State> {

  const supabase = await createClient()

  const raw = String(formData.get('original-url') ?? '').trim()

  const validatedFields = CreateURL.safeParse({
    ['original-url']: raw
  })

  if (!validatedFields.success) {
    const state: State = {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: 'Missing Fields. Failed to Create URL',
      status: 'error'
    }

    return state
  }

  const { 'original-url': originalURL } = validatedFields.data

  const clientId = (await cookies()).get('clientId')?.value

  if (!clientId) {
    return {
      status: 'error',
      message: 'Client ID missing. Please enable cookies or refresh the page.',
      errors: {}
    } as State
  }


  try {
    const now = new Date()
    const expires = addMinutes(now, 30).toISOString()
    const shortCode = nanoid(7)

    const { error } = await supabase.from('anon_urls').insert([
      {
        client_id: clientId,
        original_url: originalURL,
        short_code: shortCode,
        expires_at: expires
      }
    ]).select().single()

    if (error) {
      console.error('Supabase insert error:', error)
      return { status: 'error', message: 'Failed to create URL.', errors: {} }
    }

    revalidatePath('/')

    return {
      status: 'success',
      message: 'URL created successfully!',
      errors: {},
    } as State
  } catch (err) {
    console.error('createAnonURL unexpected error', err)
    return { status: 'error', message: 'Unexpected server error. Try again.', errors: {} }
  }
}

export async function deleteAnonURL(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('anon_urls').delete().eq('id', id)

  revalidatePath('/')
}

