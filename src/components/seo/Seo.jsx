import { useDocumentMeta } from '../../hooks/useDocumentMeta'

/* Renders nothing; sets the document head for the route.

   Exactly one <Seo> per page, and none in Layout. The tempting design — static
   metadata applied in the layout, pages overriding it — does not work: React
   runs child effects before parent effects, so the layout would win and clobber
   the product page's dynamic tags. One owner per route instead. */
export default function Seo(props) {
  useDocumentMeta(props)
  return null
}
