import { useEffect, useRef } from 'react'
import { guideFor } from '../../data/sizeGuide'
import './size-guide.css'

/* Measurement chart, opened from beside the size chips.
 *
 * A dialog rather than an inline expander because the table is wide and the
 * shopper is comparing it against a garment, not scanning the page. Focus
 * moves in on open and returns to the trigger on close, Escape closes, and Tab
 * is kept inside — without that, a keyboard user tabs into the page behind an
 * overlay they cannot see past. */
export default function SizeGuide({ category, sizes, onClose, returnFocusTo }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const returnTo = useRef(null)

  const guide = guideFor(category)

  useEffect(() => {
    /* Prefer the element the opener named. document.activeElement is only a
       fallback: it is whatever happened to be focused, which is the body when
       the trigger was activated in a way that did not focus it. */
    returnTo.current = returnFocusTo?.current ?? document.activeElement
    closeRef.current?.focus()

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const focusables = panelRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey, true)
    return () => {
      document.removeEventListener('keydown', onKey, true)
      document.body.style.overflow = prevOverflow
      /* Send focus back where it came from, so closing does not dump the
         keyboard user at the top of the document. */
      const back = returnTo.current
      if (back instanceof HTMLElement && back !== document.body) back.focus()
    }
  }, [onClose, returnFocusTo])

  if (!guide) return null

  return (
    <div className="pk-sgwrap" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="pk-sg"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pk-sg-title"
      >
        <div className="pk-sg__head">
          <div>
            <div className="pk-eyebrow" style={{ marginBottom: 8 }}>
              Size guide
            </div>
            <h2 className="pk-sg__title" id="pk-sg-title">
              {guide.title}
            </h2>
          </div>
          <button
            type="button"
            className="pk-sg__close"
            ref={closeRef}
            onClick={onClose}
            aria-label="Close size guide"
          >
            ×
          </button>
        </div>

        <p className="pk-sg__note">{guide.note}</p>

        {/* Wide tables scroll inside their own box rather than pushing the
            page sideways. */}
        <div className="pk-sg__scroll">
          <table className="pk-sg__table">
            <caption className="pk-sr-only">
              {guide.title} measurements in inches
            </caption>
            <thead>
              <tr>
                {guide.columns.map((c) => (
                  <th key={c} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guide.rows.map((row) => {
                /* Rows for sizes this style is not cut in are dimmed, so the
                   chart matches what can actually be ordered. */
                const offered = !sizes || sizes.includes(row[0])
                return (
                  <tr key={row[0]} className={offered ? '' : 'is-off'}>
                    <th scope="row">
                      {row[0]}
                      {offered ? '' : ' *'}
                    </th>
                    {row.slice(1).map((cell, i) => (
                      <td key={i} className="pk-num">
                        {cell}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {sizes && guide.rows.some((r) => !sizes.includes(r[0])) ? (
          <p className="pk-sg__foot">* Not cut in this style.</p>
        ) : null}

        <p className="pk-sg__foot">
          All measurements in inches. Between two sizes, take the larger — knitwear
          relaxes about half an inch across the chest after the first wash.
        </p>
      </div>
    </div>
  )
}
