export function Hero(){
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1>Move freely.<br/>Live comfortably.</h1>
          <p>One-on-one physical therapy with thoughtful, evidence-based care.</p>
          <a className="btn" href="#contact">Schedule a session</a>
        </div>
        <div className="hero-image-wrap">
          <img src="/hero.jpg" alt="Therapist working with client" className="hero-image"/>
          <div className="badge">Personalized · Gentle · Effective</div>
        </div>
      </div>
    </section>
  )
}