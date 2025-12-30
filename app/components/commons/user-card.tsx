import { Github, Instagram, Linkedin, Twitter } from 'lucide-react'
import EditSocialLinks from './edit-social-links'
import Button from '../ui/button'
import Link from 'next/link'
import { ProfileData } from '@/app/server/get-profile-data'
import AddCustomLink from '../commons/add-custom-links'
import { formatUrl } from '@/app/lib/utils'

export default function UserCard({
  profileData,
}: {
  profileData?: ProfileData
}) {
  return (
    <div className='border-opacity-10 flex w-[348px] flex-col items-center gap-5 rounded-3xl border border-white bg-[#121212] p-5 text-white'>
      <div className='size-48'>
        <img
          src='https://avatars.githubusercontent.com/u/15050029?v=4'
          alt='Marlon Denis'
          className='h-full w-full rounded-full object-cover'
        />
      </div>
      <div className='flex w-full flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <h3 className='min-w-0 overflow-hidden text-3xl font-bold'>Marlon</h3>
        </div>
        <p className='opacity-40'>
          &rdquo;Sou programador web e faço produtos incríveis para a
          Internet&rdquo;
        </p>
      </div>
      <div className='flex w-full flex-col gap-2'>
        <span className='text-xs font-medium uppercase'>Links</span>

        <div className='flex gap-3'>
          {profileData?.socialMedias?.github && (
            <Link
              href={profileData?.socialMedias?.github}
              target='_blank'
              className='rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]'
            >
              <Github />
            </Link>
          )}
          {profileData?.socialMedias?.instagram && (
            <Link
              href={profileData?.socialMedias?.instagram}
              target='_blank'
              className='rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]'
            >
              <Instagram />
            </Link>
          )}
          {profileData?.socialMedias?.linkedin && (
            <Link
              href={profileData?.socialMedias?.linkedin}
              target='_blank'
              className='rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]'
            >
              <Linkedin />
            </Link>
          )}
          {profileData?.socialMedias?.twitter && (
            <Link
              href={profileData?.socialMedias?.twitter}
              target='_blank'
              className='rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]'
            >
              <Twitter />
            </Link>
          )}

          <EditSocialLinks socialMedias={profileData?.socialMedias} />
        </div>
      </div>
      <div className='flex h-[172px] w-full flex-col gap-3'>
        <div className='flex w-full flex-col items-center gap-3'>
          {profileData?.link1 && (
            <Link
              href={formatUrl(profileData?.link1.url)}
              target='_blank'
              className='w-full'
            >
              <Button className='w-full'>{profileData.link1.title}</Button>
            </Link>
          )}
          {profileData?.link2 && (
            <Link
              href={formatUrl(profileData?.link2.url)}
              target='_blank'
              className='w-full'
            >
              <Button className='w-full'>{profileData.link2.title}</Button>
            </Link>
          )}
          {profileData?.link3 && (
            <Link
              href={formatUrl(profileData?.link3.url)}
              target='_blank'
              className='w-full'
            >
              <Button className='w-full'>{profileData.link3.title}</Button>
            </Link>
          )}
        </div>
      </div>
      <AddCustomLink />
    </div>
  )
}
