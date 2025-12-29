import { TRIAL_DAYS } from '@/app/lib/config'
import Button from '../ui/button'

export default function Pricing() {
  return (
    <div className='my-[150px] flex flex-col items-center gap-14'>
      <div className='flex flex-col items-center gap-6'>
        <h3 className='text-4xl font-bold text-white'>
          Um valor acessível para todos
        </h3>
        <p className='text-content-body text-center text-xl'>
          Junte-se à comunidade de criadores profissionais que já estão elevando
          sua <br />
          presença online. Teste gratuitamente por{' '}
          <strong className='text-accent-pink'>{TRIAL_DAYS} dias</strong>, sem
          compromisso!
        </p>
      </div>
      <div className='flex items-end gap-9'>
        <div className='flex w-76 flex-col gap-7 rounded-2xl border border-[#1E1E1E] p-8'>
          <div className='flex flex-col'>
            <span className='text-2xl font-bold text-white'>Mensal</span>
            <span className='text-content-body'>Apenas</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-[48px] font-bold text-white'>R$9,90</span>
            <span className='text-content-headline text-2xl'>/mês</span>
          </div>
          <Button variant='secondary'>Assinar</Button>
        </div>
        <div className='flex flex-col'>
          <div className='flex w-76 items-center justify-center rounded-t-2xl bg-[linear-gradient(90deg,#4B2DBB_0%,#B5446B_100%)] p-2'>
            <span className='text-xs font-bold uppercase'>Recomendado</span>
          </div>
          <div className='rounded-b-2xl bg-[linear-gradient(90deg,#4B2DBB_0%,#B5446B_100%)] p-[1.6px]'>
            <div className='bg-background-secondary flex w-full flex-col gap-7 rounded-b-2xl p-8'>
              <div className='flex flex-col'>
                <span className='text-2xl font-bold text-white'>Vitalício</span>
                <span className='text-content-body'>Economize com</span>
              </div>
              <div className='flex items-center gap-1'>
                <span className='text-[48px] font-bold text-white'>
                  R$99,90
                </span>
              </div>
              <Button variant='secondary'>Assinar</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
