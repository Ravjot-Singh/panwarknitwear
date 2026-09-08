import Reveal from '../../components/ui/Reveal'
import ComicPanel from '../../components/ui/ComicPanel'
import ComicImage from '../../components/ui/ComicImage'
import {
  ABOUT_STATS,
  MILESTONES,
  BUYER_SERVICES,
  LEADERSHIP,
  FABRICS,
  IMAGES,
} from '../../data/site'
import Seo from '../../components/seo/Seo'
import { ROUTE_SEO, breadcrumbJsonLd } from '../../data/seo'
import './about.css'

export default function About() {
  return (
    <>
      <Seo
        {...ROUTE_SEO['/about']}
        jsonLd={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />

      {/* ---------- Intro ---------- */}
      <section className="pk-shell pk-about__intro">
        <div>
          <Reveal as="div" className="pk-eyebrow">
            About
          </Reveal>
          <Reveal as="h1" className="pk-about__h1" delay={60}>
            A knitting unit that kept its own finishing floor.
          </Reveal>
          <Reveal as="p" className="pk-about__lede" delay={120}>
            Panwar Knitwear started in 1996 with four circular frames on Gill Road. Most
            units around us grew by outsourcing the dyeing and the finish. We did the
            opposite — we bought the compactor. Every metre we sell has been knitted,
            processed and pressed by people whose names we know.
          </Reveal>
        </div>

        <ComicImage
          src={IMAGES.about}
          alt="Two-thread logo sweatshirts finished on the Gill Road floor"
          placeholder="The unit — a finished run"
          caption="The unit — Gill Road"
          tick="No. 01"
          ratio="1 / 1"
          delay={120}
        />
      </section>

      {/* ---------- Stats ---------- */}
      <section className="pk-band">
        <div className="pk-shell pk-about__stats">
          {ABOUT_STATS.map((s, i) => (
            <ComicPanel key={s.label} flat className="pk-astat" delay={i * 80}>
              <div className="pk-astat__value">{s.value}</div>
              <div className="pk-astat__label">{s.label}</div>
            </ComicPanel>
          ))}
        </div>
      </section>

      {/* ---------- Timeline ---------- */}
      <section className="pk-shell pk-section">
        <Reveal as="h2" className="pk-h2 pk-about__h2">
          Thirty years, told in machines
        </Reveal>

        <div className="pk-timeline">
          {MILESTONES.map((m, i) => (
            <ComicPanel key={m.year} className="pk-mile" delay={i * 90} tick={m.year}>
              <div className="pk-mile__body">
                <div className="pk-mile__year">{m.year}</div>
                <h3 className="pk-h3">{m.title}</h3>
                <p className="pk-mile__copy">{m.body}</p>
              </div>
            </ComicPanel>
          ))}
        </div>
      </section>

      {/* ---------- Fabrics ---------- */}
      <section className="pk-shell pk-section" style={{ paddingTop: 0 }}>
        <Reveal>
          <div className="pk-eyebrow">Our craftsmanship</div>
          <h2 className="pk-h2 pk-about__h2">Fabrics we run on the floor</h2>
        </Reveal>
        <div className="pk-fabrics">
          {FABRICS.map((f, i) => (
            <ComicPanel key={f} flat className="pk-fabric" delay={i * 45}>
              <span>{f}</span>
            </ComicPanel>
          ))}
        </div>
      </section>

      {/* ---------- Leadership ---------- */}
      <section className="pk-shell pk-section" style={{ paddingTop: 0 }}>
        <Reveal>
          <div className="pk-eyebrow">Our leadership</div>
          <h2 className="pk-h2 pk-about__h2">The people behind the floor</h2>
        </Reveal>
        <div className="pk-people">
          {LEADERSHIP.map((p, i) => (
            <ComicPanel key={p.name} className="pk-person" delay={i * 80} tick={`0${i + 1}`}>
              <div className="pk-person__body">
                <h3 className="pk-person__name">{p.name}</h3>
                <div className="pk-person__role">{p.role}</div>
              </div>
            </ComicPanel>
          ))}
        </div>
      </section>

      {/* ---------- Buyer services ---------- */}
      <section className="pk-band--dark">
        <div className="pk-shell pk-about__buyer">
          <Reveal as="h2" className="pk-h2" style={{ maxWidth: '26ch', marginBottom: 'clamp(28px,3vw,44px)' }}>
            What we can do for a buyer
          </Reveal>
          <div className="pk-services">
            {BUYER_SERVICES.map((s, i) => (
              <ComicPanel
                key={s.title}
                flat
                krackle
                className="pk-service"
                delay={i * 100}
              >
                <div className="pk-service__body">
                  <h3 className="pk-service__title">{s.title}</h3>
                  <p className="pk-service__copy">{s.body}</p>
                </div>
              </ComicPanel>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
