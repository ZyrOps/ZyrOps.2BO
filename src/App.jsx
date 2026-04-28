import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView
} from 'framer-motion';
import {
  ChevronDown,
  Instagram,
  Mail,
  Twitter,
  X
} from 'lucide-react';
import brandLogo from '../logo.png';
import clientShowreel from '../2bo Assets/WhatsApp Video 2026-04-26 at 11.34.17 PM.mp4';

const imageModules = import.meta.glob('../2bo Assets/*.{jpeg,jpg,png,webp,JPEG,JPG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const CLIENT_SHOWREEL = clientShowreel;
const CLIENT_IMAGES = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({
    src,
    name: path.split('/').pop(),
  }));

const pickImage = (index) => CLIENT_IMAGES[index % CLIENT_IMAGES.length]?.src || brandLogo;
const imageGroup = (start, count) => Array.from({ length: count }, (_, index) => pickImage(start + index));

const PAGES = [
  {
    id: 'artists',
    eyebrow: '01 / Artist Systems',
    title: 'Shows That Move Like Architecture',
    desc: 'Visual direction, content surfaces, light language, and cue-ready scenic systems for artists who need the room to feel intentional from the first second.',
    variant: 'cinema',
    images: imageGroup(0, 4),
  },
  {
    id: 'festivals',
    eyebrow: '02 / Festival Grounds',
    title: 'Large Format Atmosphere, Built For Pressure',
    desc: 'A festival page should feel different from a studio reel: wide scale, crowd energy, fast decisions, and production discipline.',
    variant: 'split',
    images: imageGroup(4, 3),
  },
  {
    id: 'brands',
    eyebrow: '03 / Brand Worlds',
    title: 'Launch Moments With A Physical Memory',
    desc: 'Brand activations become spatial campaigns with light, motion, staging, and camera-first detail in the same operating language.',
    variant: 'mosaic',
    images: imageGroup(7, 6),
  },
  {
    id: 'spaces',
    eyebrow: '04 / Permanent Spaces',
    title: 'Rooms That Keep Performing After Opening Night',
    desc: 'Permanent installations, venue signatures, and architainment systems designed to survive daily use without losing the visual charge.',
    variant: 'poster',
    images: imageGroup(13, 3),
  },
  {
    id: 'production',
    eyebrow: '05 / Production Control',
    title: 'From Sketch To Show Call',
    desc: 'We connect creative intent with technical schedules, control logic, media playback, and the people who need the system to work live.',
    variant: 'strip',
    images: imageGroup(16, 7),
  },
  {
    id: 'culture',
    eyebrow: '06 / Cultural Moments',
    title: 'Public Work With A Shared Pulse',
    desc: 'For galleries, plazas, private events, and civic stages, the visual system has to carry emotion without becoming noise.',
    variant: 'index',
    images: imageGroup(2, 8),
  },
  {
    id: 'studio',
    eyebrow: '07 / Studio Method',
    title: 'Research, Render, Rehearse, Repeat',
    desc: 'Each project moves through concept boards, content tests, fixture logic, cue rehearsal, and final calibration as one continuous process.',
    variant: 'lab',
    images: imageGroup(10, 5),
  },
  {
    id: 'portfolio',
    eyebrow: '08 / Client Asset Reel',
    title: 'Selected Frames From The Field',
    desc: 'A denser page for the new client images, letting the real production material carry the site instead of generic moodboard styling.',
    variant: 'archive',
    images: imageGroup(0, 12),
  },
];

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  ...PAGES.map((page) => ({ label: page.id, href: `#${page.id}` })),
  { label: 'Contact', href: '#contact' },
];

const BrandLogo = ({ className = '', alt = 'TOBEORGANISED logo' }) => (
  <img
    src={brandLogo}
    alt={alt}
    className={`max-w-full h-auto object-contain ${className}`}
  />
);

const MediaImage = ({ src, alt, className = '', delay = 0 }) => (
  <motion.img
    src={src}
    alt={alt}
    loading="lazy"
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.35 }}
    transition={{ duration: 0.7, delay }}
    className={`h-full w-full object-cover ${className}`}
  />
);

const PageChrome = ({ page, total, children, align = 'left' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.45 });

  return (
    <section
      id={page.id}
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden snap-start bg-black px-5 py-28 text-white md:px-10 lg:px-16"
    >
      <div className="absolute inset-x-0 top-0 z-20 h-28 bg-gradient-to-b from-black via-black/70 to-transparent" />
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-14rem)] max-w-[1560px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: align === 'left' ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: align === 'left' ? -40 : 40 }}
          transition={{ duration: 0.8 }}
          className={`${align === 'left' ? 'lg:order-1' : 'lg:order-2'} max-w-3xl`}
        >
          <div className="mb-7 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.28em] text-magenta">
            <span>{page.eyebrow}</span>
            <span className="h-px w-14 bg-magenta/80" />
            <span className="text-white/35">{total}</span>
          </div>
          <h2 className="max-w-4xl text-[clamp(2.7rem,8vw,8.5rem)] font-black uppercase leading-[0.82] tracking-normal text-white">
            {page.title}
          </h2>
          <p className="mt-8 max-w-2xl font-mono text-sm leading-7 text-white/64 md:text-base">
            {page.desc}
          </p>
        </motion.div>
        <div className={`${align === 'left' ? 'lg:order-2' : 'lg:order-1'}`}>
          {children}
        </div>
      </div>
    </section>
  );
};

const UniquePage = ({ page, index, total }) => {
  const [main, second, third, fourth, fifth, sixth, seventh, eighth] = page.images;

  if (page.variant === 'cinema') {
    return (
      <PageChrome page={page} total={total}>
        <div className="relative min-h-[58vh] overflow-hidden border border-white/15">
          <MediaImage src={main} alt={`${page.id} primary production frame`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 gap-2 p-3 md:p-5">
            {[second, third, fourth].map((src, imageIndex) => (
              <MediaImage
                key={src}
                src={src}
                alt={`${page.id} supporting frame ${imageIndex + 1}`}
                delay={0.1 + imageIndex * 0.08}
                className="aspect-[16/9] border border-white/18"
              />
            ))}
          </div>
        </div>
      </PageChrome>
    );
  }

  if (page.variant === 'split') {
    return (
      <PageChrome page={page} total={total} align="right">
        <div className="grid gap-4 md:grid-cols-[1.18fr_0.82fr]">
          <MediaImage src={main} alt={`${page.id} large production frame`} className="min-h-[66vh] border border-white/15" />
          <div className="grid gap-4">
            <MediaImage src={second} alt={`${page.id} detail frame one`} className="h-[31vh] border border-white/15" delay={0.1} />
            <MediaImage src={third} alt={`${page.id} detail frame two`} className="h-[31vh] border border-white/15" delay={0.18} />
          </div>
        </div>
      </PageChrome>
    );
  }

  if (page.variant === 'mosaic') {
    return (
      <PageChrome page={page} total={total}>
        <div className="grid min-h-[64vh] grid-cols-6 grid-rows-6 gap-3">
          <MediaImage src={main} alt={`${page.id} mosaic frame one`} className="col-span-6 row-span-3 border border-white/15 md:col-span-4 md:row-span-4" />
          <MediaImage src={second} alt={`${page.id} mosaic frame two`} className="col-span-3 row-span-2 border border-white/15 md:col-span-2 md:row-span-3" delay={0.08} />
          <MediaImage src={third} alt={`${page.id} mosaic frame three`} className="col-span-3 row-span-2 border border-white/15 md:col-span-2 md:row-span-3" delay={0.16} />
          <MediaImage src={fourth} alt={`${page.id} mosaic frame four`} className="col-span-2 row-span-1 border border-white/15 md:col-span-2 md:row-span-2" delay={0.22} />
          <MediaImage src={fifth} alt={`${page.id} mosaic frame five`} className="col-span-2 row-span-1 border border-white/15 md:col-span-2 md:row-span-2" delay={0.28} />
          <MediaImage src={sixth} alt={`${page.id} mosaic frame six`} className="col-span-2 row-span-1 border border-white/15 md:col-span-2 md:row-span-2" delay={0.34} />
        </div>
      </PageChrome>
    );
  }

  if (page.variant === 'poster') {
    return (
      <PageChrome page={page} total={total} align="right">
        <div className="relative min-h-[68vh] overflow-hidden border border-magenta/45 bg-magenta/10">
          <MediaImage src={main} alt={`${page.id} architectural frame`} className="opacity-85" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.92),rgba(0,0,0,.18),rgba(0,0,0,.75))]" />
          <div className="absolute inset-y-0 right-5 flex items-center">
            <span className="writing-vertical font-mono text-xs uppercase tracking-[0.55em] text-white/60">Permanent installation study</span>
          </div>
          <div className="absolute bottom-6 left-6 right-20 grid grid-cols-2 gap-3">
            <MediaImage src={second} alt={`${page.id} secondary frame`} className="aspect-[16/9] border border-white/18" delay={0.12} />
            <MediaImage src={third} alt={`${page.id} tertiary frame`} className="aspect-[16/9] border border-white/18" delay={0.2} />
          </div>
        </div>
      </PageChrome>
    );
  }

  if (page.variant === 'strip') {
    return (
      <PageChrome page={page} total={total}>
        <div className="relative py-8">
          <div className="absolute left-0 top-0 h-px w-full bg-white/20" />
          <div className="absolute bottom-0 left-0 h-px w-full bg-white/20" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-7">
            {page.images.map((src, imageIndex) => (
              <MediaImage
                key={`${src}-${imageIndex}`}
                src={src}
                alt={`${page.id} production strip ${imageIndex + 1}`}
                delay={imageIndex * 0.04}
                className={`${imageIndex % 2 === 0 ? 'h-[52vh]' : 'h-[38vh] self-center'} border border-white/15`}
              />
            ))}
          </div>
        </div>
      </PageChrome>
    );
  }

  if (page.variant === 'index') {
    return (
      <PageChrome page={page} total={total} align="right">
        <div className="grid gap-4 md:grid-cols-2">
          {page.images.slice(0, 4).map((src, imageIndex) => (
            <div key={`${src}-${imageIndex}`} className="relative min-h-[25vh] overflow-hidden border border-white/15">
              <MediaImage src={src} alt={`${page.id} indexed frame ${imageIndex + 1}`} delay={imageIndex * 0.06} />
              <span className="absolute left-4 top-4 font-mono text-xs text-white/65">0{imageIndex + 1}</span>
            </div>
          ))}
        </div>
      </PageChrome>
    );
  }

  if (page.variant === 'lab') {
    return (
      <PageChrome page={page} total={total}>
        <div className="grid gap-5">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {page.images.map((src, imageIndex) => (
              <MediaImage
                key={`${src}-${imageIndex}`}
                src={src}
                alt={`${page.id} method frame ${imageIndex + 1}`}
                delay={imageIndex * 0.08}
                className={`${imageIndex === 0 ? 'col-span-2 md:col-span-2' : ''} h-[24vh] border border-white/15`}
              />
            ))}
          </div>
          <div className="grid gap-3 border-y border-white/12 py-6 font-mono text-xs uppercase tracking-[0.22em] text-white/60 md:grid-cols-4">
            {['Concept', 'Visual Test', 'Control', 'Show Call'].map((step) => (
              <span key={step}>{step}</span>
            ))}
          </div>
        </div>
      </PageChrome>
    );
  }

  return (
    <section
      id={page.id}
      className="relative min-h-screen w-full overflow-hidden snap-start bg-black px-5 py-28 text-white md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-[1560px]">
        <div className="mb-10 flex items-end justify-between gap-8">
          <div>
            <div className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-magenta">{page.eyebrow} / {total}</div>
            <h2 className="max-w-5xl text-[clamp(2.6rem,7vw,8rem)] font-black uppercase leading-[0.86] tracking-normal">{page.title}</h2>
          </div>
          <p className="hidden max-w-md font-mono text-sm leading-7 text-white/60 lg:block">{page.desc}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {page.images.map((src, imageIndex) => (
            <MediaImage
              key={`${src}-${imageIndex}`}
              src={src}
              alt={`${page.id} archive frame ${imageIndex + 1}`}
              delay={imageIndex * 0.03}
              className={`${imageIndex % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''} aspect-[16/10] border border-white/15`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 z-[100] flex w-full items-center justify-between p-5 mix-blend-difference md:p-6">
        <a href="#home" className="flex flex-col items-start gap-2" aria-label="TOBEORGANISED home">
          <BrandLogo className="h-10 md:h-12" />
          <span className="text-[10px] font-mono tracking-[0.4em] text-magenta">VISUAL ARCHITECTURE</span>
        </a>

        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-4"
          aria-label="Open navigation menu"
        >
          <span className="hidden text-xs font-mono font-bold tracking-widest text-white md:block">MENU</span>
          <span className="space-y-1.5">
            <span className="block h-0.5 w-8 bg-white transition-colors group-hover:bg-magenta" />
            <span className="block h-0.5 w-8 bg-white transition-colors group-hover:bg-magenta" />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.5, ease: 'circOut' }}
            className="fixed inset-0 z-[110] flex flex-col justify-between bg-black p-8 md:p-10"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-sm tracking-widest text-magenta">[ NAVIGATION ]</span>
              <button onClick={() => setIsOpen(false)} className="text-white transition-colors hover:text-magenta" aria-label="Close navigation menu">
                <X size={32} />
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {NAV_ITEMS.map((item, idx) => (
                <motion.a
                  key={item.href}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + idx * 0.035 }}
                  href={item.href}
                  className="text-4xl font-black uppercase tracking-normal text-white transition-colors hover:text-magenta md:text-7xl"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            <div className="flex items-end justify-between border-t border-white/10 pt-8">
              <div className="flex gap-8">
                <Instagram className="cursor-pointer text-white/40 hover:text-magenta" />
                <Twitter className="cursor-pointer text-white/40 hover:text-magenta" />
                <Mail className="cursor-pointer text-white/40 hover:text-magenta" />
              </div>
              <p className="font-mono text-[10px] tracking-widest text-white/20">© 2026 TOBEORGANISED GROUP</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <motion.div
      className="fixed left-0 top-0 z-[120] hidden h-8 w-8 rounded-full border border-magenta mix-blend-difference pointer-events-none md:block"
      animate={{ x: pos.x - 16, y: pos.y - 16 }}
      transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-1 w-1 rounded-full bg-magenta" />
      </div>
    </motion.div>
  );
};

export default function App() {
  const total = String(PAGES.length).padStart(2, '0');

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white selection:bg-magenta selection:text-black">
      <CustomCursor />
      <Navbar />

      <main className="h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory no-scrollbar">
        <section id="home" className="relative flex h-screen w-full snap-start flex-col items-center justify-center overflow-hidden bg-black p-6 text-center">
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ scale: 1.1, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
          >
            <video
              src={CLIENT_SHOWREEL}
              aria-label="TOBEORGANISED client showreel background"
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
            <div className="absolute inset-0 bg-black/58" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-black/80" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-10 mb-8 flex flex-col items-center"
          >
            <span className="mb-4 block font-mono text-xs uppercase tracking-[0.5em] text-magenta">Client Showreel / Real Assets</span>
            <h1 className="sr-only">TOBEORGANISED</h1>
            <BrandLogo
              className="w-[92vw] max-w-[1700px] drop-shadow-[0_8px_35px_rgba(0,0,0,0.6)] sm:w-[88vw] md:w-[82vw] lg:w-[78vw]"
              alt="TOBEORGANISED official logo"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="relative z-10 flex flex-col items-center"
          >
            <p className="mb-10 max-w-lg font-mono text-sm tracking-widest text-white/46">
              A CREATIVE STUDIO DEDICATED TO ATMOSPHERE, SHOW CONTROL, AND REAL-WORLD TECHNICAL PRECISION.
            </p>
            <ChevronDown className="animate-bounce text-magenta" size={32} />
          </motion.div>
        </section>

        {PAGES.map((page, index) => (
          <UniquePage
            key={page.id}
            page={page}
            index={index}
            total={`${String(index + 1).padStart(2, '0')} / ${total}`}
          />
        ))}

        <section id="contact" className="relative flex min-h-screen w-full snap-start flex-col items-center justify-center overflow-hidden bg-black p-8 text-center">
          <div className="absolute inset-0 grid grid-cols-4 opacity-28">
            {imageGroup(12, 4).map((src, index) => (
              <MediaImage key={`${src}-${index}`} src={src} alt={`contact atmosphere frame ${index + 1}`} className="h-full" delay={index * 0.08} />
            ))}
          </div>
          <div className="absolute inset-0 bg-black/78" />
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="relative z-10">
            <h3 className="mb-10 text-[clamp(3rem,9vw,9rem)] font-black uppercase leading-[0.85] tracking-normal text-white">
              Let's Sync <br /> <span className="text-magenta italic">Frequencies.</span>
            </h3>

            <div className="flex flex-col justify-center gap-5 md:flex-row">
              <a href="mailto:hello@tobeorganised.com" className="bg-magenta px-10 py-5 text-sm font-black uppercase tracking-widest text-black transition-colors hover:bg-white">
                Project Inquiry
              </a>
              <a href={CLIENT_SHOWREEL} className="border border-white/20 px-10 py-5 text-sm font-black uppercase tracking-widest text-white transition-colors hover:border-magenta hover:text-magenta">
                Showreel 2026
              </a>
            </div>

            <div className="mt-16 font-mono text-[10px] uppercase tracking-[0.5em] text-white/28">
              India / Middle East / Global Touring
            </div>
          </motion.div>
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .writing-vertical {
          writing-mode: vertical-rl;
        }
        @font-face {
          font-family: 'Space Mono';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/spacemono/v13/i74Mm69yb9e7Z2Wy9rc3e595.woff2) format('woff2');
        }
      `}} />
    </div>
  );
}
