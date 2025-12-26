import { cn } from '@/app/lib/utils'

export default function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      {...props}
      className={cn(
        `bg-background-secondary placeholder:text-content-placeholder hover:border-border-secondary hover:text-content-body active:border-border-tertiary w-full rounded-xl border border-transparent p-3 text-white`,
        props.className
      )}
    />
  )
}
