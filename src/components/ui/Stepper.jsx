/** Quantity stepper. `small` is the in-cart variant. */
export default function Stepper({ value, onDecrease, onIncrease, small = false, label = 'Quantity' }) {
  return (
    <div className={['pk-stepper', small ? 'pk-stepper--sm' : ''].filter(Boolean).join(' ')}>
      <button type="button" onClick={onDecrease} aria-label={`Decrease ${label.toLowerCase()}`}>
        −
      </button>
      <span aria-live="polite">{value}</span>
      <button type="button" onClick={onIncrease} aria-label={`Increase ${label.toLowerCase()}`}>
        +
      </button>
    </div>
  )
}
