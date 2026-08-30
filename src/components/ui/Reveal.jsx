import { useReveal } from '../../hooks/useReveal'

/**
 * Quiet scroll-in wrapper. `delay` staggers siblings in a grid.
 * `variant` picks the travel direction.
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className = '',
  style,
  children,
  ...rest
}) {
  const [ref, shown] = useReveal()

  const variantClass =
    variant === 'left' ? 'pk-reveal--left' : variant === 'scale' ? 'pk-reveal--scale' : ''

  return (
    <Tag
      ref={ref}
      className={['pk-reveal', variantClass, shown ? 'is-in' : '', className]
        .filter(Boolean)
        .join(' ')}
      style={{ '--pk-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
