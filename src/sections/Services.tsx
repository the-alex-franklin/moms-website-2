export function Services(){
  const items = [
    { title: 'Injury Rehab', desc: 'Targeted recovery plans for acute and chronic injuries.'},
    { title: 'Mobility & Posture', desc: 'Restore range of motion and reduce daily tension.'},
    { title: 'Strength & Stability', desc: 'Build resilient muscle and balanced mechanics.'},
  ]
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Services</h2>
        <ul className="card-grid">
          {items.map((it, i)=>(
            <li className="card" key={i}>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}