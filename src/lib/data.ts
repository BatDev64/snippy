import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getAnonURLsByClientId() {
  const supabase = await createClient()
  const clientId = (await cookies()).get('clientId')?.value

  if (!clientId) {
    throw new Error("Client ID not found in cookies.");
  }

  try {
    const { data } = await supabase.from('anon_urls').select('*').eq('client_id', clientId).gt('expires_at', new Date().toISOString()).order('created_at', { ascending: false })

    return data
  } catch (err) {

    console.error('Database Error:', err);
    throw new Error('Failed to fetch URLs.');
  }
}

export async function getOriginalAnonURL(shortCode: string) {
  const supabase = await createClient()
  const {data, error} = await supabase.from('anon_urls').select('original_url').eq('short_code', shortCode).single()
  if (error) {
    throw new Error('URL not found')
  }
  if (!data) {
    throw new Error('URL not found')
  }
  return data.original_url
}