import { site } from '../content/site'

export function Hero(){
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <h1>{site.tagline}</h1>
          <p>{site.subtagline}</p>
          <a className="btn" href="#contact">Book a session</a>
        </div>
        <img className="hero-img" src={site.heroImageUrl} alt="Physical therapy"/>
      </div>
    </section>
  )
}