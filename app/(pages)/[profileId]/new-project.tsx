'use client'

import { useRouter } from 'next/navigation'
import React, { startTransition, useState } from 'react'

import Button from '@/app/components/ui/button'
import Modal from '@/app/components/ui/modal'
import TextArea from '@/app/components/ui/text-area'
import TextInput from '@/app/components/ui/text-input'
import { ArrowUpFromLine, Plus } from 'lucide-react'

import { createProject } from '@/app/actions/create-project'
import { compressFiles } from '@/app/lib/utils'

export default function NewProject({ profileId }: { profileId: string }) {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [projectUrl, setProjectUrl] = useState('')
  const [projectImage, setProjectImage] = useState<string | null>(null)
  const [isCreatingProject, setIsCreatingProject] = useState(false)

  const handleOpenModal = () => {
    setIsOpen(true)
  }
  function triggerImageInput(id: string) {
    document.getElementById(id)?.click()
  }

  function handleImageInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    if (file) {
      const imageURL = URL.createObjectURL(file)
      return imageURL
    }
    return null
  }

  async function handleCreateProject() {
    setIsCreatingProject(true)
    console.log('🚀 Iniciando criação do projeto...')

    const imagesInput = document.getElementById(
      'imageInput'
    ) as HTMLInputElement

    if (!imagesInput.files?.length) {
      console.log('❌ Nenhuma imagem selecionada')
      setIsCreatingProject(false)
      return
    }

    try {
      const compressedFile = await compressFiles(Array.from(imagesInput.files))
      console.log('📁 COMPRESSED FILE', compressedFile)

      const formData = new FormData()

      formData.append('file', compressedFile[0])
      formData.append('profileId', profileId)
      formData.append('projectName', projectName)
      formData.append('projectDescription', projectDescription)
      formData.append('projectUrl', projectUrl)

      console.log('💾 Chamando createProject...')
      const success = await createProject(formData)

      if (success) {
        console.log('✅ Projeto criado com sucesso!')
        startTransition(() => {
          setIsOpen(false)
          setIsCreatingProject(false)
          setProjectName('')
          setProjectDescription('')
          setProjectUrl('')
          setProjectImage(null)
          router.refresh()
        })
      } else {
        console.log('❌ Erro ao criar projeto')
        alert('Erro ao criar projeto. Tente novamente.')
        setIsCreatingProject(false)
      }
    } catch (error) {
      console.error('❌ Erro em handleCreateProject:', error)
      alert('Erro ao criar projeto. Tente novamente.')
      setIsCreatingProject(false)
    }
  }

  return (
    <>
      <button
        onClick={handleOpenModal}
        className='bg-background-secondary border-border-secondary flex h-33 w-85 cursor-pointer items-center justify-center gap-2 rounded-[20px] hover:border hover:border-dashed'
      >
        <Plus className='text-accent-green size-10' />
        <span>Novo projeto</span>
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='bg-background-primary flex flex-col justify-between gap-10 rounded-[20px] p-8'>
          <p className='text-xl font-bold text-white'>Novo projeto</p>
          <div className='flex gap-10'>
            <div className='flex cursor-pointer flex-col items-center gap-3 text-xs'>
              <div className='bg-background-tertiary h-25 w-25 cursor-pointer overflow-hidden rounded-xl'>
                {projectImage ? (
                  <img
                    src={projectImage}
                    alt='Project Image'
                    className='object-cover object-center'
                  />
                ) : (
                  <button
                    className='h-full w-full cursor-pointer'
                    onClick={() => triggerImageInput('imageInput')}
                  >
                    100x100
                  </button>
                )}
              </div>
              <button
                className='flex cursor-pointer items-center gap-2 text-white'
                onClick={() => triggerImageInput('imageInput')}
              >
                <ArrowUpFromLine className='size-4' />
                <span>Adicionar imagem</span>
              </button>
              <input
                type='file'
                id='imageInput'
                accept='image/*'
                className='hidden'
                onChange={(e) => setProjectImage(handleImageInput(e))}
              />
            </div>
            <div className='flex w-[293px] flex-col gap-4'>
              <div className='flex flex-col gap-1'>
                <label htmlFor='project-name' className='font-bold text-white'>
                  Titulo do projeto
                </label>
                <TextInput
                  id='project-name'
                  placeholder='Digite o nome do projeto'
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label
                  htmlFor='project-description'
                  className='font-bold text-white'
                >
                  Descrição
                </label>
                <TextArea
                  id='project-description'
                  placeholder='Dê uma breve descrição do seu projeto'
                  className='h-36'
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor='project-url' className='font-bold text-white'>
                  URL do projeto
                </label>
                <TextInput
                  type='url'
                  id='project-description'
                  placeholder='Digite a URL do projeto'
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='flex justify-end gap-4'>
            <button
              onClick={() => setIsOpen(false)}
              className='font-bold text-white'
            >
              Voltar
            </button>
            <Button onClick={handleCreateProject}>Salvar</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
