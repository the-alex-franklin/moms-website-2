import { useEffect, useState } from 'react'

type Photo = { src: string; caption?: string }

export function GalleryGrid(){
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    fetch('/photos/manifest.json')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((items: Photo[]) => setPhotos(items))
      .catch(async () => {
        const candidates = Array.from({length:40}, (_,i)=>`/photos/${i+1}.jpg`)
        const results: Photo[] = []
        await Promise.all(candidates.map(async src => {
          try {
            const r = await fetch(src, { method: 'HEAD' })
            if (r.ok) results.push({ src })
          } catch {}
        }))
        setPhotos(results)
      })
  }, [])

  if (photos.length === 0) return <p className="muted">Add images to <code>public/photos</code> to populate the gallery.</p>

  return (
    <div className="grid gallery-grid">
      {photos.map((p, i) => (
        <figure className="card" key={i}>
          <img loading="lazy" src={p.src} alt={p.caption ?? `Photo ${i+1}`}/>
          {p.caption && <figcaption className="caption">{p.caption}</figcaption>}
        </figure>
      ))}
    </div>
  )
}