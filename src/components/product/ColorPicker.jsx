import './color-picker.css'

/* Colourway selector.
 *
 * Colour is carried by the swatch, so each button also names the colour in its
 * accessible label and marks the active one with aria-pressed — colour alone
 * is never the only signal. The selected swatch takes an ink ring rather than
 * a tick, because a tick over a pale fill reads poorly. */
export default function ColorPicker({ colors, value, onChange, idPrefix = 'c' }) {
  if (!colors?.length) return null

  return (
    <div className="pk-colors" role="group" aria-label="Colour">
      {colors.map((c) => {
        const active = value === c.name
        return (
          <button
            key={c.name}
            type="button"
            className={['pk-colors__dot', active ? 'is-active' : ''].filter(Boolean).join(' ')}
            style={{ '--pk-dot': c.hex }}
            aria-pressed={active}
            aria-label={c.name}
            title={c.name}
            onClick={() => onChange(c.name)}
            id={`${idPrefix}-${c.name.replace(/\s+/g, '-').toLowerCase()}`}
          />
        )
      })}
    </div>
  )
}
