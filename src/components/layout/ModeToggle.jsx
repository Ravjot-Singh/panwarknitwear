import { useCart } from '../../context/CartContext'

const MODES = [
  { id: 'retail', label: 'Retail' },
  { id: 'wholesale', label: 'Wholesale' },
]

/* Retail vs wholesale pricing, surfaced in the header.
 *
 * The mode persists to localStorage under `pk-mode`, so before this existed a
 * visitor who once tapped "Wholesale" on the collection page saw wholesale
 * per-piece rates on every page, on every later visit, with nothing on screen
 * saying why the prices looked wrong or how to change them back. The basis for
 * every price on the site now stays visible and reversible from anywhere.
 *
 * aria-pressed toggle buttons in a labelled group, matching the existing Chip
 * component's pattern rather than introducing a second convention.
 */
export default function ModeToggle({ className = '' }) {
  const { mode, setMode } = useCart()

  return (
    <div
      className={['pk-modeswitch', className].filter(Boolean).join(' ')}
      role="group"
      aria-label="Pricing basis"
    >
      {MODES.map((m) => (
        <button
          key={m.id}
          type="button"
          className={['pk-modeswitch__btn', mode === m.id ? 'is-on' : '']
            .filter(Boolean)
            .join(' ')}
          aria-pressed={mode === m.id}
          onClick={() => setMode(m.id)}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}
