import Hero from '@/app/components/landing-page/hero'
import Header from '@/app/components/landing-page/header'

export default function Home() {
  return (
    <div className='mx-auto max-w-7xl'>
      <Hero />

      <Header />
      {/*<VideoExplanation />
      <Pricing />
      <FAQ /> */}
    </div>
  )
}
