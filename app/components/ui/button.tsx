import { cn } from '@/app/lib/utils'

export default function Button({
  children,
  variant = 'primary',
  ...props
}: {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        'rounded-xl p-3 font-bold whitespace-nowrap text-white hover:opacity-95 disabled:opacity-70',
        variant === 'primary' && 'bg-accent-purple',
        variant === 'secondary' && 'bg-background-tertiary',
        variant === 'ghost' && 'border-border-primary',
        props.className
      )}
    >
      {children}
    </button>
  )
}
