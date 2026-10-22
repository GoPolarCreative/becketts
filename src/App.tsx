import { FormEvent, useCallback, useEffect, useState } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Clock3,
  Facebook,
  HardHat,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react';

const galleryImages = [
  '/images/gallery/1.jpg',
  '/images/gallery/2.jpg',
  '/images/gallery/3.jpg',
  '/images/gallery/4.jpg',
  '/images/gallery/5.jpg',
  '/images/gallery/6.jpg',
  '/images/gallery/Image-1_(2).jpeg',
  '/images/gallery/Image-1_(1).jpeg',
];

const services = [
  {
    title: 'Excavation',
    text: '14-tonne excavator services for site cuts, trenching, foundations, drainage and general earthmoving.',
  },
  {
    title: 'Demolition',
    text: 'Safe, efficient demolition of residential and commercial structures, with materials removed from site.',
  },
  {
    title: 'Earthworks',
    text: 'Reliable earthmoving and bulk earthworks for residential, commercial and civil projects.',
  },
  {
    title: 'Site Preparation',
    text: 'Clearing, levelling, grading and complete site preparation ready for your next build.',
  },
  {
    title: 'Land Clearing',
    text: 'Efficient removal of vegetation, trees, debris and unwanted materials to prepare your site.',
  },
  {
    title: 'Material Removal',
    text: 'Tipper truck transport for soil, concrete, green waste, rock and other materials.',
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length)), []);
  const nextImage = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i + 1) % galleryImages.length)), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, prevImage, nextImage]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState('sending');
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      setFormState('success');
    } catch {
      setFormState('error');
    }
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="Becketts Earthworx home">
            <img src="/images/IMG_2749.png" alt="Becketts Earthworx" />
          </a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About us</a>
            <a href="#work" onClick={() => setMenuOpen(false)}>Our work</a>
            <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Get a free quote <ArrowUpRight size={16} /></a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero section-dark">
          <div className="hero-grid container">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> Northern Rivers & Gold Coast</div>
              <h1>Built to move<br /><em>ground.</em></h1>
              <p className="hero-lede">Professional earthmoving and civil services, delivered with experience, precision and a work ethic you can depend on.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">Request a free quote <ArrowUpRight size={18} /></a>
                <a className="text-link light-link" href="tel:0423625166"><Phone size={16} /> 0423 625 166</a>
              </div>
              <div className="hero-proof">
                <div className="proof-item"><strong>15+</strong><span>Years<br />experience</span></div>
                <div className="proof-item"><strong>14T</strong><span>Excavator<br />capability</span></div>
                <div className="proof-item"><strong>100%</strong><span>Locally<br />focused</span></div>
              </div>
            </div>

            <div className="quote-card" id="contact">
              <div className="quote-card-top"><span className="card-kicker">Start your project</span></div>
              <h2>Let’s get<br /><span>to work.</span></h2>
              <p>Tell us what you need moved, cleared or prepared. We’ll be in touch to discuss your free quote.</p>
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="access_key" value="8d61216a-3f33-4fd7-b3df-a0d2bb549996" />
                <input type="hidden" name="subject" value="New enquiry from Becketts Earthworx website" />
                <input type="hidden" name="from_name" value="Becketts Earthworx website" />
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" />
                <div className="form-row"><label><span>Name</span><input required name="name" type="text" placeholder="Your name" /></label><label><span>Phone</span><input required name="phone" type="tel" placeholder="0423 625 166" /></label></div>
                <label><span>Email</span><input required name="email" type="email" placeholder="you@example.com" /></label>
                <label><span>How can we help?</span><textarea required name="message" rows={3} placeholder="Tell us a little about your project..." /></label>
                <button className="button button-accent submit-button" disabled={formState === 'sending'} type="submit">{formState === 'sending' ? 'Sending...' : 'Send enquiry'} <ArrowUpRight size={18} /></button>
                {formState === 'success' && <p className="form-message success-message"><CircleCheck size={16} /> Thanks, we’ll be in touch shortly.</p>}
                {formState === 'error' && <p className="form-message error-message">Something went wrong. Please call us on 0423 625 166.</p>}
              </form>
            </div>
          </div>
          <a className="scroll-cue" href="#services"><span>Scroll to explore</span><ChevronDown size={17} /></a>
        </section>

        <section className="intro section-light" id="about">
          <div className="container intro-grid">
            <div className="section-label"><span>01</span><span className="label-rule" /> Who we are</div>
            <div className="intro-content"><h2>Good ground<br /><em>starts here.</em></h2><div className="intro-text"><p>Becketts Earthworx is a family-owned and operated company providing professional earthmoving and civil services across the Northern Rivers and Gold Coast.</p><p>With more than 15 years of industry experience, we bring capable machinery, a steady hand and dependable service to every site.</p><a className="text-link dark-link" href="#contact">Talk to our team <ArrowUpRight size={16} /></a><div className="supply-callout"><img className="supply-badge" src="/images/supply-nation-registered.jpg" alt="Supply Nation Registered" /><p>Committed to greater Indigenous participation in procurement and trusted partnerships.</p></div></div></div>
          </div>
          <div className="service-strip"><div className="container strip-grid"><div><ShieldCheck size={24} /><span>Safety first<br /><small>On every site</small></span></div><div><HardHat size={24} /><span>Quality workmanship<br /><small>Built to last</small></span></div><div><Clock3 size={24} /><span>Dependable service<br /><small>When you need it</small></span></div><div><Truck size={24} /><span>Ready for the job<br /><small>Capable equipment</small></span></div></div></div>
        </section>

        <section className="services section-dark" id="services">
          <div className="container"><div className="section-heading"><div className="section-label light-label"><span>02</span><span className="label-rule" /> What we do</div><h2>Work that<br /><em>keeps moving.</em></h2><p>From the first cut to the final clean-up, we make the hard work look straightforward.</p></div><div className="services-grid">{services.map((service) => <article className="service-card" key={service.number}><span className="service-number">{service.number}</span><h3>{service.title}</h3><p>{service.text}</p><a href="#contact" aria-label={`Get a quote for ${service.title}`}><ArrowUpRight size={20} /></a></article>)}</div></div>
        </section>

        <section className="gallery-section section-light" id="work">
          <div className="container"><div className="gallery-heading"><div><div className="section-label"><span>03</span><span className="label-rule" /> On the job</div><h2>See the difference<br /><em>on the ground.</em></h2></div><p>Real projects. Real machinery. Real results across the Northern Rivers and Gold Coast.</p></div><div className="gallery-grid">{galleryImages.map((image, index) => <figure className={`gallery-item gallery-item-${index + 1}`} key={image} onClick={() => setLightboxIndex(index)} role="button" tabIndex={0} aria-label={`View project image ${index + 1} full size`} onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(index)}><img src={image} alt={`Becketts Earthworx project ${index + 1}`} loading="lazy" /></figure>)}</div></div>
        </section>

        {lightboxIndex !== null && (
          <div className="lightbox" onClick={closeLightbox} role="dialog" aria-modal="true" aria-label="Image viewer">
            <button className="lb-close" onClick={closeLightbox} aria-label="Close"><X size={24} /></button>
            <button className="lb-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }} aria-label="Previous image"><ChevronLeft size={30} /></button>
            <div className="lb-img-wrap" onClick={(e) => e.stopPropagation()}>
              <img src={galleryImages[lightboxIndex]} alt={`Becketts Earthworx project ${lightboxIndex + 1}`} />
              <span className="lb-counter">{lightboxIndex + 1} / {galleryImages.length}</span>
            </div>
            <button className="lb-next" onClick={(e) => { e.stopPropagation(); nextImage(); }} aria-label="Next image"><ChevronRight size={30} /></button>
          </div>
        )}

        <section className="closing-cta section-accent"><div className="container closing-inner"><div><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> Free quotes available</div><h2>Have a project<br /><em>in mind?</em></h2></div><a className="button button-dark" href="#contact">Let’s talk <ArrowUpRight size={18} /></a></div></section>
      </main>

      <footer className="site-footer"><div className="container footer-top"><a className="brand footer-brand" href="#top"><img src="/images/IMG_2749.png" alt="Becketts Earthworx" /></a><div className="footer-contact"><a href="tel:0423625166"><Phone size={16} /> 0423 625 166</a><a href="mailto:admin@beckettsearthworx.com.au"><Mail size={16} /> admin@beckettsearthworx.com.au</a><span><MapPin size={16} /> Northern Rivers & Gold Coast</span></div><div className="social-links"><a className="social-link" href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={20} /></a><a className="social-link" href="https://www.google.com/search?q=Becketts+Earthworx" target="_blank" rel="noreferrer" aria-label="Google Business Profile"><MapPin size={20} /></a></div></div><div className="container acknowledgement"><p>Becketts Earthworx acknowledges the Traditional Custodians of the lands we live and work on. We pay our respects to all Elders, past and present, of all Aboriginal and Torres Strait Islander nations.</p></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Becketts Earthworx. All rights reserved.</span><span>ABN 74 654 413 996</span><a href="https://www.itscold.com.au" target="_blank" rel="noreferrer">Website by Go Polar</a></div></footer>
    </div>
  );
}

export default App;
