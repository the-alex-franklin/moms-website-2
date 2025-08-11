import { site } from '../content/site'

export function Footer(){
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong>{site.businessName}</strong> · {site.phone} · {site.city}
        </div>
        <div className="muted">© {new Date().getFullYear()} {site.businessName}. All rights reserved.</div>
      </div>
    </footer>
  )
}