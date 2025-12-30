import { auth } from '@/app/lib/auth'
import Button from '../ui/button'
import Image from 'next/image'
import { manageAuth } from '@/app/actions/manage-auth'

export default async function Header() {
  const session = await auth()
  return (
    <div className='absolute top-0 right-0 left-0 mx-auto flex max-w-7xl items-center justify-between py-10'>
      <div className='flex items-center gap-4'>
        <Image src='/logo.svg' alt='ProjectInBio Logo' width={40} height={40} />
        <h3 className='text-2xl font-bold text-white'>ProjectInBio</h3>
      </div>
      <div className='flex items-center gap-4'>
        {session && <Button>Minha Página</Button>}
        <form action={manageAuth}>
          <Button>{session ? 'Sair' : 'Login'}</Button>
        </form>
      </div>
    </div>
  )
}
