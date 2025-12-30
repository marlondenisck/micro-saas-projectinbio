'use client'

import { Github, Instagram, Linkedin, Plus, Twitter } from 'lucide-react'
import { startTransition, useState } from 'react'
import Modal from '../ui/modal'
import Button from '../ui/button'
import { useParams, useRouter } from 'next/navigation'
import createSocialLinks from '@/app/actions/create-social-links'
import TextInput from '../ui/text-input'

export default function EditSocialLinks({
  socialMedias,
}: {
  socialMedias?: {
    github: string
    instagram: string
    linkedin: string
    twitter: string
  }
}) {
  const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSavingSocialLinks, setIsSavingSocialLinks] = useState(false)

  const [github, setGithub] = useState(socialMedias?.github || '')
  const [instagram, setInstagram] = useState(socialMedias?.instagram || '')
  const [linkedin, setLinkedin] = useState(socialMedias?.linkedin || '')
  const [twitter, setTwitter] = useState(socialMedias?.twitter || '')

  const { profileId } = useParams()

  async function handleAddSocialLinks() {
    setIsSavingSocialLinks(true)

    if (!profileId) return

    await createSocialLinks({
      profileId: profileId as string,
      github,
      instagram,
      linkedin,
      twitter,
    })

    startTransition(() => {
      setIsModalOpen(false)
      setIsSavingSocialLinks(false)
      router.refresh()
    })
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className='rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]'
      >
        <Plus />
      </button>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className='bg-background-primary flex w-[514px] flex-col justify-between gap-10 rounded-[20px] p-8'>
          <p className='text-xl font-bold text-white'>
            Adicionar redes sociais
          </p>
          <div className='flex flex-col gap-4'>
            <div className='flex w-full items-center gap-2'>
              <Github />
              <TextInput
                type='text'
                placeholder='Link Github'
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>
            <div className='flex w-full items-center gap-2'>
              <Linkedin />
              <TextInput
                type='text'
                placeholder='Link LinkedIn'
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
            <div className='flex w-full items-center gap-2'>
              <Instagram />
              <TextInput
                type='text'
                placeholder='Link Instagram'
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div className='flex w-full items-center gap-2'>
              <Twitter />
              <TextInput
                type='text'
                placeholder='Link Twitter'
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
          </div>
          <div className='flex justify-end gap-4'>
            <button
              onClick={() => setIsModalOpen(false)}
              className='font-bold text-white'
            >
              Voltar
            </button>
            <Button
              onClick={handleAddSocialLinks}
              disabled={isSavingSocialLinks}
            >
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
