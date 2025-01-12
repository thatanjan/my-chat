import { login } from '@/actions/login'
import { Button } from '@/components/ui/button'
import createClientForServer from '@/utils/supabase/server'
import { FcGoogle } from 'react-icons/fc'

const Page = async () => {
  const supabase = await createClientForServer()

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-900'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold text-white mb-6'>Sign in</h1>
        <form action={login}>
          <Button className='bg-white text-gray-900 hover:bg-gray-100'>
            <FcGoogle className='mr-2 h-4 w-4' />
            Sign in with Google
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Page
