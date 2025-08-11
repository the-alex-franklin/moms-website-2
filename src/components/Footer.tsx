export function Footer(){
  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <div>© {new Date().getFullYear()} Whim Therapy</div>
        <div className="small">By appointment only</div>
      </div>
    </footer>
  )
}