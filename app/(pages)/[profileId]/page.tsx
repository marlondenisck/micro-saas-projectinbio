import ProjectCard from '@/app/components/commons/project-card'
import TotalVisits from '@/app/components/commons/total-visits'
import UserCard from '@/app/components/commons/user-card'
import { Plus } from 'lucide-react'

export default async function ProfilePage({
  params,
}: {
  params: { profileId: string }
}) {
  const { profileId } = await params
  console.log('Profile ID:', profileId)

  return (
    <div className='relative flex h-screen overflow-hidden p-20'>
      <div className='bg-background-tertiary fixed top-0 left-0 flex w-full items-center justify-center gap-1 py-2'>
        <span>Você está usando a versão trial.</span>
        <button className='text-accent-green font-bold'>
          Faça o upgrade agora!
        </button>
      </div>
      <div className='flex h-min w-1/2 justify-center'>
        <UserCard />
      </div>
      <div className='flex w-full flex-wrap content-start justify-center gap-4 overflow-y-auto'>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <button className='bg-background-secondary border-border-secondary flex h-33 w-85 items-center justify-center gap-2 rounded-[20px] hover:border hover:border-dashed'>
          <Plus className='text-accent-green size-10' />
          <span>Novo projeto</span>
        </button>
      </div>
      <div className='absolute right-0 bottom-4 left-0 mx-auto w-min'>
        <TotalVisits />
      </div>
    </div>
  )
}
