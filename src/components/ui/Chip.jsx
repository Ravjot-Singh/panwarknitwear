/** Filter / mode / size / survey chip. `accent` overrides the active fill. */
export default function Chip({
  label,
  active = false,
  accent,
  size = false,
  onClick,
  ...rest
}) {
  return (
    <button
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
}
