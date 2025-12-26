import { Github, Instagram, Linkedin, Plus, X } from 'lucide-react'
import Image from 'next/image'
import Button from '@/app/components/ui/button'

export default function UserCard() {
  const icons = [Github, Instagram, Linkedin, X, Plus]

  return (
    <div className='border-opacity-10 flex w-87 flex-col items-center gap-5 rounded-3xl border border-white bg-[#121212] p-5 text-white'>
      <div className='size-48'>
        <Image
          src='http://github.com/marlondenisck.png'
          alt='Marlon Denisck'
          width={192}
          height={192}
          className='h-full w-full rounded-full object-cover'
        />
      </div>
      <div className='flex w-full flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <h3 className='min-w-0 overflow-hidden text-3xl font-bold'>
            Marlon Denis
          </h3>
        </div>
        <p className='opacity-40'>
          &rdquo;Sou programador web e faço produtos incríveis para a
          Internet&rdquo;
        </p>
      </div>
      <div className='flex w-full flex-col gap-2'>
        <span className='text-xs font-medium uppercase'>Links</span>

        <div className='flex gap-3'>
          {icons.map((Icon, index) => (
            <button
              key={index}
              className='rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]'
            >
              <Icon />
            </button>
          ))}
        </div>

        <div className='flex h-43 w-full flex-col gap-3'>
          <div className='flex w-full flex-col items-center gap-3'>
            <Button className='w-full'>Compre Agora</Button>
            <button className='rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]'>
              <Plus />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
