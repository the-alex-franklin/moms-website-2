import { Hero } from '../components/Hero'
import { site } from '../content/site'

export default function Home(){
  return (
    <>
      <Hero />
      <section className="section">
        <div className="container cols">
          <div>
            <h2>Personalized physical therapy</h2>
            <p>{site.blurb}</p>
          </div>
          <div className="card">
            <h3>New clients</h3>
            <ul className="list">
              <li>1:1 assessments</li>
              <li>Rehab and mobility plans</li>
              <li>Strength and posture coaching</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}