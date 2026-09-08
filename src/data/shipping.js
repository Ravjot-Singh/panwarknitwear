/* Delivery methods.

   These live in data rather than inline in the checkout markup because the
   chosen method has to reach the order total, which is computed in
   CartContext. Previously the three options were hardcoded radio labels and
   the total ignored them entirely — express delivery said ₹250 and then
   charged nothing. */

export const SHIPPING_METHODS = [
  {
    id: 'standard',
    name: 'Standard surface',
    blurb: '4–7 working days · tracked',
    cost: 0,
    label: 'Free',
  },
  {
    id: 'express',
    name: 'Express air',
    blurb: '2 working days · metro PINs only',
    cost: 250,
    label: '₹250',
  },
  {
    /* Freight is settled with the transporter at the destination, so it adds
       nothing to the total here — the label has to say so rather than reading
       as free delivery. */
    id: 'freight',
    name: 'Bulk freight (wholesale)',
    blurb: 'Carton-wise, freight to pay at destination',
    cost: 0,
    label: 'To pay',
  },
]

export const DEFAULT_SHIPPING = 'standard'

export const getShipping = (id) =>
  SHIPPING_METHODS.find((m) => m.id === id) ??
  SHIPPING_METHODS.find((m) => m.id === DEFAULT_SHIPPING)
