import { useEffect, useRef } from 'react'

/**
 * Writes `--pk-par-x` / `--pk-par-y` on the element as the pointer moves across
 * it, for a shallow parallax on whatever reads those variables. Deliberately
 * tiny — a few pixels — so it registers as depth rather than as a toy.
 *
 * `pointermove` is already coalesced to one event per frame, so the values are
 * written straight through rather than via requestAnimationFrame, which some
 * embedded contexts throttle to a standstill. The element rect is cached and
 * refreshed on enter/resize/scroll so the hot path does no layout reads.
 *
 * Skipped entirely for coarse pointers and for reduced-motion users.
 */
export function usePointerParallax(strength = 8) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || calm.matches) return

    let rect = null

    const measure = () => {
      rect = node.getBoundingClientRect()
    }

    const onMove = (e) => {
      if (!rect) measure()
      // -1..1 out from the centre of the panel, inverted so the image drifts
      // against the cursor.
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * -2 * strength
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -2 * strength
      node.style.setProperty('--pk-par-x', `${x.toFixed(2)}px`)
      node.style.setProperty('--pk-par-y', `${y.toFixed(2)}px`)
    }

    const onLeave = () => {
      rect = null
      node.style.setProperty('--pk-par-x', '0px')
      node.style.setProperty('--pk-par-y', '0px')
    }

    node.addEventListener('pointerenter', measure)
    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', measure, { passive: true })
    window.addEventListener('scroll', measure, { passive: true })
    return () => {
      node.removeEventListener('pointerenter', measure)
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure)
    }
  }, [strength])

  return ref
}
