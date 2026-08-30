import { useState } from 'react'
import './knit-plate.css'

/**
 * The product plate.
 *
 * With an `image` it shows the garment photograph under a top/bottom scrim so
 * the brand and plate captions stay legible against the dark studio floor.
 * Without one — or if the photo fails to load — it falls back to the design's
 * woven knit swatch.
 *
 * Product imagery stays plain: no comic treatment, so the goods read straight
 * and the editorial panels around them carry the personality.
 */
export default function KnitPlate({
  image,
  alt = '',
  brand,
  plate,
  ratio = '4 / 5',
  direction = '90deg',
  className = '',
  ...rest
}) {
  const [failed, setFailed] = useState(false)
  const showPhoto = Boolean(image) && !failed

  return (
    <div
      className={['pk-knit', showPhoto ? 'pk-knit--photo' : '', className]
        .filter(Boolean)
        .join(' ')}
      style={{ aspectRatio: ratio }}
      {...rest}
    >
      {showPhoto ? (
        <img
          className="pk-knit__img pk-plate__weave"
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className="pk-knit__weave pk-plate__weave"
          aria-hidden="true"
          style={{
            background: `repeating-linear-gradient(${direction}, var(--pk-swatch-a) 0 4px, var(--pk-swatch-b) 4px 8px)`,
          }}
        />
      )}

      <span className="pk-knit__sheen" aria-hidden="true" />
      {brand ? <span className="pk-knit__brand">{brand}</span> : null}
      {plate ? <span className="pk-knit__plate">{plate}</span> : null}
    </div>
  )
}
