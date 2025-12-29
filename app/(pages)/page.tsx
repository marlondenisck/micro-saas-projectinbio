import Hero from '@/app/components/landing-page/hero'
import Header from '@/app/components/landing-page/header'
import VideoExplanation from '@/app/components/landing-page/video-explanation'
import Pricing from '@/app/components/landing-page/pricing'
import FAQ from '@/app/components/landing-page/faq'

export default function Home() {
  return (
    <div className='mx-auto max-w-7xl'>
      <Hero />
      <Header />
      <VideoExplanation />
      <Pricing />
      <FAQ />
    </div>
  )
}
