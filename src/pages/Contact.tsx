import { site } from '../content/site'

export default function Contact(){
  return (
    <section className="section" id="contact">
      <div className="container">
        <h1>Contact</h1>
        <p>Call or text <a href={`tel:${site.phone}`}>{site.phone}</a> or email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
        <form className="card form" onSubmit={(e)=>{e.preventDefault(); alert('Thanks! We will get back to you.')}}>
          <label>
            Name
            <input required placeholder="Your name"/>
          </label>
          <label>
            Email
            <input type="email" required placeholder="you@example.com"/>
          </label>
          <label>
            Message
            <textarea rows={5} required placeholder="How can we help?"/>
          </label>
          <button className="btn" type="submit">Send</button>
        </form>
      </div>
    </section>
  )
}