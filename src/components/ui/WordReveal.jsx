import { Fragment } from 'react'
import { useReveal } from '../../hooks/useReveal'

/**
 * Headline treatment: each word sits in its own clipped box and swings up into
 * place on a stagger, like type being set line by line. Falls back to a plain
 * fade under reduced motion (handled in animations.css).
 */
export default function WordReveal({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  step = 68,
  style,
  ...rest
}) {
  const [ref, shown] = useReveal()
  const words = String(text).split(' ')

  return (
    <Tag
      ref={ref}
      className={['pk-words', shown ? 'is-in' : '', className].filter(Boolean).join(' ')}
      style={style}
      {...rest}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="pk-word" style={{ '--pk-delay': `${delay + i * step}ms` }}>
            <span className="pk-word__in">{word}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
