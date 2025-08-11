export function Contact(){
  return (
    <section className="section" id="contact">
      <div className="container contact-card">
        <div>
          <h2 className="section-title">Get in touch</h2>
          <p className="muted">Tell us a little about what you need. We’ll reply within one business day.</p>
          <form className="form" onSubmit={(e)=>{e.preventDefault(); alert('Thanks!')}}>
            <label> Name <input required placeholder="Your name" /></label>
            <label> Email <input type="email" required placeholder="you@example.com" /></label>
            <label> Message <textarea rows={5} required placeholder="How can we help?" /></label>
            <button className="btn" type="submit">Send</button>
          </form>
        </div>
        <aside className="aside">
          <div className="aside-card">
            <div className="kicker">Location</div>
            <div>Whim Therapy · Your City, ST</div>
          </div>
          <div className="aside-card">
            <div className="kicker">Hours</div>
            <div>By appointment only</div>
          </div>
        </aside>
      </div>
    </section>
  )
}