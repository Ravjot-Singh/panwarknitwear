/** Labelled form control. Renders input, textarea or select from `as`.
 *
 * `invalid` marks the control for both sighted users (a rust border, via the
 * is-invalid class) and assistive tech (aria-invalid), so a validation failure
 * is visible against the field itself rather than only in a message at the
 * bottom of the form.
 */
export default function Field({
  label,
  as = 'input',
  wide = false,
  invalid = false,
  children,
  ...rest
}) {
  const Tag = as
  return (
    <label
      className={['pk-field', wide ? 'pk-field--wide' : '', invalid ? 'is-invalid' : '']
        .filter(Boolean)
        .join(' ')}
    >
      <span>{label}</span>
      <Tag {...rest} aria-invalid={invalid || undefined}>
        {children}
      </Tag>
    </label>
  )
}
