import { useEffect, useState } from 'react'
type Photo = { src: string; caption?: string }

export function Gallery(){
  const [photos, setPhotos] = useState<Photo[]>([])
  useEffect(()=>{
    fetch('/photos/manifest.json').then(r=>r.ok?r.json():Promise.reject())
    .then(setPhotos).catch(()=>setPhotos([]))
  },[])
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">In-session moments</h2>
        {photos.length === 0 ? <p className="muted small">Add photos to public/photos and a manifest.json to display the grid.</p> :
        <div className="masonry">
          {photos.map((p,i)=>(
            <figure key={i}>
              <img src={p.src} alt={p.caption ?? 'Photo'} loading="lazy"/>
              {p.caption && <figcaption>{p.caption}</figcaption>}
            </figure>
          ))}
        </div>}
      </div>
    </section>
  )
}