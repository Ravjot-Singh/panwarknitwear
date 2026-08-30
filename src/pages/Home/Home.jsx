import { Link, useNavigate } from 'react-router-dom'
import Reveal from '../../components/ui/Reveal'
import WordReveal from '../../components/ui/WordReveal'
import ComicPanel from '../../components/ui/ComicPanel'
import ComicImage from '../../components/ui/ComicImage'
import { usePointerParallax } from '../../hooks/usePointerParallax'
import ProductCard from '../../components/product/ProductCard'
import { useCart } from '../../context/CartContext'
import { PRODUCTS, FEATURED_IDS } from '../../data/products'
import { CRAFT_STAGES, JOURNAL, IMAGES } from '../../data/site'
import './home.css'

const HERO_STATS = [
  { value: '160–480', label: 'GSM range' },
  { value: '20–28g', label: 'Machine gauge' },
  { value: '48 pc', label: 'Lowest MOQ' },
]

export default function Home() {
  const navigate = useNavigate()
  const { setMode } = useCart()
  const heroRef = usePointerParallax(9)
  const featured = PRODUCTS.filter((p) => FEATURED_IDS.includes(p.id))

  const goWholesale = () => {
    setMode('wholesale')
    navigate('/collection')
  }

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="pk-shell pk-hero">
        <div>
          <Reveal as="div" className="pk-eyebrow pk-hero__kicker">
            Established 1996 · Two labels, one mill
          </Reveal>
          <WordReveal
            as="h1"
            className="pk-h1 pk-h1--hero"
            delay={120}
            step={62}
            text="Knitwear engineered at the loom, finished by hand."
          />
          <Reveal as="p" className="pk-hero__lede" delay={640}>
            We knit, dye, cut and finish under one roof in Ludhiana — combed ring-spun
            cotton at 160 to 480 GSM, on 20- to 28-gauge circular frames.{' '}
            <em>ZONIXA</em> carries the fleece and heavier fashion knits;{' '}
            <em>MSP&nbsp;SPORTS</em> carries the jersey, socks and shirting.
          </Reveal>

          <Reveal className="pk-row pk-hero__cta" delay={720}>
            <Link to="/collection" className="pk-btn">
              View the collection
            </Link>
            <button type="button" className="pk-btn pk-btn--ghost" onClick={goWholesale}>
              Wholesale pricing
            </button>
          </Reveal>

          <div className="pk-hero__stats">
            {HERO_STATS.map((s, i) => (
              <ComicPanel key={s.label} flat className="pk-stat" delay={820 + i * 110}>
                <div className="pk-stat__value">
                  <span className="pk-word">
                    <span className="pk-word__in">{s.value}</span>
                  </span>
                </div>
                <div className="pk-stat__label">{s.label}</div>
              </ComicPanel>
            ))}
          </div>
        </div>

        <div className="pk-hero__frame" ref={heroRef}>
          <ComicImage
            src={IMAGES.hero}
            alt="ZONIXA loopback hoodies flat-laid across the season's colour range"
            placeholder="Hero — ZONIXA loopback, colour range"
            caption="Plate 01 — ZONIXA loopback, 380 GSM"
            tick="No. 01"
            ratio="4 / 5"
            delay={140}
            className="pk-hero__media"
          />
          {/* Print registration marks — the corner crosshairs on a press sheet. */}
          <span className="pk-reg pk-reg--tl" aria-hidden="true" />
          <span className="pk-reg pk-reg--br" aria-hidden="true" />
        </div>
      </section>

      {/* ---------- The two labels ---------- */}
      <section className="pk-band">
        <div className="pk-shell pk-labels">
          <ComicPanel className="pk-label" tick="Label 01">
            <div className="pk-label__body">
              <div className="pk-eyebrow">Label 01</div>
              <h2 className="pk-label__name">ZONIXA</h2>
              <p className="pk-label__copy">
                Fleece-weight fashion knits. Hoodies, chest-print hoodies, full-zips, crew
                sweatshirts and collared half-sleeve knits — 220 to 400 GSM, brushed or
                loopback, pieced with twin-needle seams.
              </p>
              <Link to="/collection?label=ZONIXA" className="pk-textlink">
                See 5 styles
              </Link>
            </div>
          </ComicPanel>

          <ComicPanel className="pk-label" tick="Label 02" delay={110}>
            <div className="pk-label__body">
              <div className="pk-eyebrow pk-eyebrow--moss">Label 02</div>
              <h2 className="pk-label__name">MSP Sports</h2>
              <p className="pk-label__copy">
                Everyday jersey and hosiery. Plain and round-neck tees in 160–180 GSM
                combed single jersey, terry-heel crew socks, yarn-dyed oxford shirting and
                bonded double-knit jackets.
              </p>
              <Link
                to="/collection?label=MSP%20SPORTS"
                className="pk-textlink pk-textlink--moss"
              >
                See 5 styles
              </Link>
            </div>
          </ComicPanel>
        </div>
      </section>

      {/* ---------- Current run (product cards — plain by design) ---------- */}
      <section className="pk-shell pk-section">
        <Reveal className="pk-split" style={{ marginBottom: 'clamp(28px,3vw,44px)' }}>
          <h2 className="pk-h2" style={{ maxWidth: '22ch' }}>
            Current run
          </h2>
          <Link to="/collection" className="pk-textlink">
            All styles
          </Link>
        </Reveal>

        <div className="pk-pgrid">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 80} />
          ))}
        </div>
      </section>

      {/* ---------- The craft ---------- */}
      <section className="pk-band--dark">
        <div className="pk-shell pk-craft">
          <div>
            <Reveal as="div" className="pk-eyebrow pk-eyebrow--tan">
              The craft
            </Reveal>
            <Reveal as="h2" className="pk-h2 pk-craft__head" delay={60}>
              Three stages, all of them ours.
            </Reveal>

            <div className="pk-craft__stages">
              {CRAFT_STAGES.map((s, i) => (
                <Reveal key={s.n} className="pk-stage" delay={120 + i * 100}>
                  <span className="pk-stage__n">{s.n}</span>
                  <div>
                    <h3 className="pk-stage__title">{s.title}</h3>
                    <p className="pk-stage__body">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <ComicImage
            src={IMAGES.craft}
            alt="Hooded fleece knits finished and tagged, ready for dispatch"
            placeholder="Finished fleece — 24 g circular"
            caption="Plate — 24 g circular"
            tick="No. 02"
            ratio="1 / 1"
            delay={120}
          />
        </div>
      </section>

      {/* ---------- Journal ---------- */}
      <section className="pk-shell pk-section">
        <Reveal style={{ marginBottom: 'clamp(28px,3vw,44px)' }}>
          <div className="pk-eyebrow">Journal</div>
          <h2 className="pk-h2" style={{ maxWidth: '26ch' }}>
            Care guides, written by the people who made it
          </h2>
        </Reveal>

        <div className="pk-journal">
          {JOURNAL.map((j, i) => (
            <article key={j.id} className="pk-jcard">
              <ComicImage
                src={j.image}
                alt={j.alt}
                placeholder={j.alt}
                ratio="3 / 2"
                tick={`No. 0${i + 3}`}
                delay={i * 110}
              />
              <div className="pk-jcard__kicker">{j.kicker}</div>
              <h3 className="pk-jcard__title">{j.title}</h3>
              <p className="pk-jcard__body">{j.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
