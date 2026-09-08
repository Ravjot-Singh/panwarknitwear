import { forwardRef } from 'react'

/** Filter / mode / size / survey chip. `accent` overrides the active fill.
 *
 * forwardRef so a caller can move focus to a chip — the size popover on
 * ProductCard focuses its first option when it opens.
 *
 * `active` defaults to undefined rather than false so that aria-pressed is
 * omitted entirely when a chip is an action rather than a toggle. Announcing
 * "not pressed" on a button that simply adds a size would be misleading.
 */
const Chip = forwardRef(function Chip(
  { label, active, accent, size = false, onClick, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={['pk-chip', size ? 'pk-chip--size' : '', active ? 'is-active' : '']
        .filter(Boolean)
        .join(' ')}
      aria-pressed={active}
      style={accent ? { '--pk-chip-accent': accent } : undefined}
      onClick={onClick}
      {...rest}
    >
      {label}
    </button>
  )
})

export default Chip
