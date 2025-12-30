'use client'

import { ProjectData } from '@/app/server/get-profile-data'
import Link from 'next/link'

export default function ProjectCard({
  project,
  isOwner,
  img,
}: {
  project: ProjectData
  isOwner: boolean
  img: string
}) {
  const projectUrl = project.projectUrl || '#'
  const formattedUrl =
    projectUrl === '#'
      ? '#'
      : projectUrl.startsWith('http')
        ? projectUrl
        : `https://${projectUrl}`

  function handleClick() {
    console.log('clicked') // TODO: implementar analytics
  }

  if (formattedUrl === '#') {
    return (
      <div onClick={handleClick} className='cursor-pointer'>
        <div className='bg-background-secondary hover:border-border-secondary flex h-[132px] w-[340px] gap-5 rounded-[20px] border border-transparent p-3'>
          <div className='size-24 flex-shrink-0 overflow-hidden rounded-md'>
            <img
              src={img || '/uploads/placeholder.svg'}
              alt='Projeto'
              className='h-full w-full object-cover'
            />
          </div>
          <div className='flex flex-col gap-2'>
            {isOwner && (
              <span className='text-accent-green text-xs font-bold uppercase'>
                {project.totalVisits || 0} cliques
              </span>
            )}

            <div className='flex flex-col'>
              <span className='font-bold text-white'>
                {project.projectName}
              </span>
              <span className='text-content-body text-sm'>
                {project.projectDescription}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link href={formattedUrl} target='_blank' onClick={handleClick}>
      <div className='bg-background-secondary hover:border-border-secondary flex h-[132px] w-[340px] gap-5 rounded-[20px] border border-transparent p-3'>
        <div className='size-24 flex-shrink-0 overflow-hidden rounded-md'>
          <img
            src={img || '/uploads/placeholder.svg'}
            alt='Projeto'
            className='h-full w-full object-cover'
          />
        </div>
        <div className='flex flex-col gap-2'>
          {isOwner && (
            <span className='text-accent-green text-xs font-bold uppercase'>
              {project.totalVisits || 0} cliques
            </span>
          )}

          <div className='flex flex-col'>
            <span className='font-bold text-white'>{project.projectName}</span>
            <span className='text-content-body text-sm'>
              {project.projectDescription}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
