import { site } from '../content/site'

export default function About(){
  return (
    <section className="section">
      <div className="container">
        <h1>About {site.ownerName}</h1>
        <p>{site.about}</p>
      </div>
    </section>
  )
}