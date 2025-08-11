import { NavLink, Link } from 'react-router-dom'
import { site } from '../content/site'

export function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          <img src={site.logoUrl} alt="logo" className="brand-logo"/>
          <span className="brand-name">{site.businessName}</span>
        </Link>
        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </div>
    </header>
  )
}