/* Measurement charts, keyed by garment category.

   Fit uncertainty is the main reason apparel shoppers abandon, and until now
   the only sizing information on a product page was a size chip and a spec row
   reading "fits true to chart" — with no chart anywhere on the site.

   `garment` measurements are of the garment laid flat, which is what a
   knitwear unit actually measures and what a buyer can check against a
   garment they already own. Demo data, consistent with the stated size runs.
   All values in inches. */

export const SIZE_GUIDES = {
  hoodie: {
    title: 'Hoodies & sweatshirts',
    note: 'Measured flat, garment. Chest is half-measure doubled; allow 1 inch tolerance on knitwear.',
    columns: ['Size', 'Chest', 'Length', 'Sleeve'],
    rows: [
      ['S', '38', '26', '23.5'],
      ['M', '40', '27', '24'],
      ['L', '42', '28', '24.5'],
      ['XL', '44', '29', '25'],
      ['XXL', '46', '30', '25.5'],
    ],
  },
  sweatshirt: { alias: 'hoodie' },
  jacket: {
    title: 'Knitted jackets',
    note: 'Cut with a little more room across the chest to layer over a sweatshirt.',
    columns: ['Size', 'Chest', 'Length', 'Sleeve'],
    rows: [
      ['S', '39', '26.5', '24'],
      ['M', '41', '27.5', '24.5'],
      ['L', '43', '28.5', '25'],
      ['XL', '45', '29.5', '25.5'],
      ['XXL', '47', '30.5', '26'],
    ],
  },
  tee: {
    title: 'T-shirts',
    note: 'Measured flat, garment. Residual shrinkage is held under 3% after three washes.',
    columns: ['Size', 'Chest', 'Length', 'Shoulder'],
    rows: [
      ['XS', '34', '25', '15.5'],
      ['S', '36', '26', '16.5'],
      ['M', '38', '27', '17.5'],
      ['L', '40', '28', '18.5'],
      ['XL', '42', '29', '19.5'],
      ['XXL', '44', '30', '20.5'],
    ],
  },
  polo: {
    title: 'Polos',
    note: 'Slightly trimmer through the body than the plain tee, with a drop-tail hem.',
    columns: ['Size', 'Chest', 'Length', 'Shoulder'],
    rows: [
      ['S', '37', '26.5', '16.5'],
      ['M', '39', '27.5', '17.5'],
      ['L', '41', '28.5', '18.5'],
      ['XL', '43', '29.5', '19.5'],
      ['XXL', '45', '30.5', '20.5'],
    ],
  },
  shirt: {
    title: 'Shirts',
    note: 'Shirt sizes are collar measurements in inches, not alpha sizes.',
    columns: ['Collar', 'Chest', 'Length', 'Sleeve'],
    rows: [
      ['38', '40', '29', '24'],
      ['40', '42', '30', '24.5'],
      ['42', '44', '30.5', '25'],
      ['44', '46', '31', '25.5'],
    ],
  },
  socks: {
    title: 'Socks',
    note: 'One size, knitted with covered elastane in the welt to fit across the range.',
    columns: ['Size', 'UK shoe', 'Welt'],
    rows: [['One size', '7–11', '2.5']],
  },
}

/* Follows an alias so sweatshirts share the hoodie chart. */
export const guideFor = (category) => {
  const entry = SIZE_GUIDES[category]
  if (!entry) return null
  return entry.alias ? SIZE_GUIDES[entry.alias] : entry
}
