import { Hero } from '../sections/Hero'
import { Services } from '../sections/Services'
import { Gallery } from '../sections/Gallery'
import { Contact } from '../sections/Contact'

export function Home(){
  return (
    <main>
      <Hero />
      <Services />
      <Gallery />
      <Contact />
    </main>
  )
}