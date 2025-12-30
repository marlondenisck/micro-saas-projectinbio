import Header from '@/app/components/landing-page/header'

import CreateLinkForm from './create-link-form'

import { Rocket } from 'lucide-react'

export default function CriarPage() {
  return (
    <div>
      <Header />
      <div className='mx-auto flex h-screen max-w-xl flex-col items-center justify-center gap-10'>
        <div className='flex items-center gap-4'>
          <h1 className='text-4xl font-bold text-white'>Escolha seu link</h1>
          <Rocket className='size-10' />
        </div>
        <CreateLinkForm />
      </div>
    </div>
  )
}
