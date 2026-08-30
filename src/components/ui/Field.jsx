/** Labelled form control. Renders input, textarea or select from `as`. */
export default function Field({ label, as = 'input', wide = false, children, ...rest }) {
  const Tag = as
  return (
    <label className={['pk-field', wide ? 'pk-field--wide' : ''].filter(Boolean).join(' ')}>
      <span>{label}</span>
      <Tag {...rest}>{children}</Tag>
    </label>
  )
}
