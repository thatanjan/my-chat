'use server'
import createClientForServer from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const login = async () => {
  const supabase = await createClientForServer()

  const auth_callback_url = `${process.env.SITE_URL}/auth/callback`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: auth_callback_url,
    },
  })

  if (error) {
    console.log(error)
  }

  redirect(data.url || '')
}

const logout = async () => {
  const supabase = await createClientForServer()
  await supabase.auth.signOut()

  redirect('/auth')
}

export { login, logout }
