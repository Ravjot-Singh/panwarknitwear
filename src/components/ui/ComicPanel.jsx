import { useReveal } from '../../hooks/useReveal'

/**
 * The Spider-Verse panel treatment.
 *
 * Used for every card and image that is NOT a product card: the hero and
 * craft plates, journal entries, the timeline, the buyer-services band,
 * stat blocks, reviews and the contact plate.
 *
 * What it does, all of it kept low-amplitude on purpose:
 *   - a hard inked frame with an offset print shadow
 *   - a Ben-Day halftone dot screen that fades in with the panel
 *   - a one-shot cyan/magenta misregistration flash as it lands
 *   - a 2–3px CMYK split on hover, plus a small lift
 *   - an optional caption plate and page-corner tick
 *
 * `flat` drops the frame and shadow but keeps the dots and ink split —
 * use it where a border would fight the surrounding layout.
 */
export default function ComicPanel({
  as: Tag = 'div',
  delay = 0,
  caption,
  tick,
  flat = false,
  krackle = false,
  className = '',
  style,
  children,
  ...rest
}) {
  const [ref, shown] = useReveal()

  return (
    <Tag
      ref={ref}
      className={[
        'pk-comic',
        'pk-reveal',
        flat ? 'pk-comic--flat' : '',
        krackle ? 'pk-comic--krackle' : '',
        shown ? 'is-in' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ '--pk-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      <span className="pk-comic__ink" aria-hidden="true" />
      <span className="pk-comic__dots" aria-hidden="true" />
      {tick ? (
        <span className="pk-comic__tick" aria-hidden="true">
          {tick}
        </span>
      ) : null}
      {children}
      {caption ? <span className="pk-comic__caption">{caption}</span> : null}
    </Tag>
  )
}
