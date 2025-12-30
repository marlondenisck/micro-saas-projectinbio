'use client'

import useOnClickOutside from '@/app/hooks/useOnClickOuside'
import { useRef } from 'react'

export default function Modal({
  children,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  const ref = useRef<HTMLDivElement>(null!)

  useOnClickOutside(ref, () => {
    setIsOpen(false)
  })

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-[#787878]/10 backdrop-blur-md'>
      <div ref={ref}>{children}</div>
    </div>
  )
}
