import { useState } from 'react'
import ComicPanel from './ComicPanel'
import './comic-image.css'

/**
 * A photograph inside a comic panel. If the image fails to load we fall
 * back to the design's woven-swatch placeholder rather than a broken box.
 */
export default function ComicImage({
  src,
  alt = '',
  ratio = '4 / 5',
  caption,
  tick,
  placeholder,
  delay = 0,
  className = '',
  style,
}) {
  const [failed, setFailed] = useState(!src)

  return (
    <ComicPanel
      delay={delay}
      caption={caption}
      tick={tick}
      className={['pk-cimg', className].filter(Boolean).join(' ')}
      style={{ aspectRatio: ratio, ...style }}
    >
      {failed ? (
        <span className="pk-cimg__fallback" aria-hidden="true">
          <span className="pk-cimg__fallback-label">{placeholder || alt}</span>
        </span>
      ) : (
        <img
          className="pk-cimg__img"
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </ComicPanel>
  )
}
