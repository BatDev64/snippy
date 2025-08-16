import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { type Database } from '@/types/database.types'

export async function createClient() {
  const cookieStore = await cookies()
  const clientId = cookieStore.get("clientId")?.value;

  if (!clientId) {
    throw new Error("Client ID not found in cookies. Please ensure the middleware has run.");
  }

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
          }
        },
      },
      global: {
        headers: {
          "x-client-id": clientId,
        },
      },
    }
  )
}
