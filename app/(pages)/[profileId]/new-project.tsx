'use client'

import { useState } from 'react'
import Button from '@/app/components/ui/button'
import Modal from '@/app/components/ui/modal'
import TextArea from '@/app/components/ui/text-area'
import TextInput from '@/app/components/ui/text-input'
import { ArrowUpFromLine, Plus } from 'lucide-react'

export default function NewProject({ profileId }: { profileId: string }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  return (
    <>
      <button
        onClick={handleOpenModal}
        className='bg-background-secondary border-border-secondary flex h-[132px] w-[340px] items-center justify-center gap-2 rounded-[20px] hover:border hover:border-dashed'
      >
        <Plus className='text-accent-green size-10' />
        <span>Novo projeto</span>
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='bg-background-primary flex flex-col justify-between gap-10 rounded-[20px] p-8'>
          <p className='text-xl font-bold text-white'>Novo projeto</p>
          <div className='flex gap-10'>
            <div className='flex flex-col items-center gap-3 text-xs'>
              <div className='bg-background-tertiary h-[100px] w-[100px] overflow-hidden rounded-xl'>
                <button className='h-full w-full'>100x100</button>
              </div>
              <button className='flex items-center gap-2 text-white'>
                <ArrowUpFromLine className='size-4' />
                <span>Adicionar imagem</span>
              </button>
              <input
                type='file'
                id='imageInput'
                accept='image/*'
                className='hidden'
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
                />
              </div>
            </div>
          </div>
          <div className='flex justify-end gap-4'>
            <button className='font-bold text-white'>Voltar</button>
            <Button>Salvar</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
