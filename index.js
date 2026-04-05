import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useInView 
} from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowUpRight, 
  Play, 
  Plus, 
  Instagram, 
  Twitter, 
  Mail 
} from 'lucide-react';

// --- Theme Constants ---
const COLORS = {
  black: '#000000',
  magenta: '#FF00FF',
  white: '#FFFFFF',
};

const SECTIONS = [
  {
    id: "01",
    label: "FOR ARTISTS",
    title: "VISUAL SHOW DESIGN & CREATIVE ART DIRECTION",
    desc: "From the idea to the final production, we always seek a perfect integration between art and technique.",
    type: "image",
    asset: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: "02",
    label: "FOR FESTIVALS",
    title: "STAGE DESIGN & TECHNICAL PRODUCTION",
    desc: "We meet the highest technical standards, respect deadlines and ensure agile development in complex environments.",
    type: "video_fallback", // Simulated with high-res image for stability
    asset: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: "03",
    label: "FOR BRANDS",
    title: "IMMERSIVE EXPERIENCES & BRAND ACTIVATIONS",
    desc: "We build bridges between brands and their audiences through unforgettable sensory experiences.",
    type: "image",
    asset: "https://images.unsplash.com/photo-1514525253361-bee8a187499b?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: "04",
    label: "FOR SPACES",
    title: "PERMANENT INSTALLATIONS & ARCHITAINMENT",
    desc: "Transforming physical environments into dynamic living canvases that breathe and respond.",
    type: "image",
    asset: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=2000",
  }
];

// --- Sub-Components ---

const Section = ({ data, total }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <section 
      ref={ref}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden snap-start"
    >
      {/* Background Layer */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={isInView ? { scale: 1 } : { scale: 1.1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img 
          src={data.asset} 
          alt={data.label} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </motion.div>

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          {/* Section Counter */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-[1px] w-8 bg-magenta" />
            <span className="font-mono text-sm tracking-widest text-white">
              [ {data.id} / {total} ] <span className="text-magenta ml-2 uppercase">TOBEORGANISED {data.label}</span>
            </span>
            <div className="h-[1px] w-8 bg-magenta" />
          </div>

          <h2 className="text-4xl md:text-7xl font-black uppercase text-white tracking-tighter mb-8 leading-[0.9]">
            {data.title}
          </h2>

          <p className="text-white/70 text-base md:text-xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed font-mono">
            {data.desc}
          </p>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-4 border border-white/20 hover:border-magenta transition-colors"
          >
            <span className="relative z-10 font-mono text-sm tracking-widest uppercase text-white group-hover:text-magenta transition-colors">
              [ Read ]
            </span>
            <div className="absolute inset-0 bg-magenta/0 group-hover:bg-magenta/5 transition-colors" />
          </motion.button>
        </motion.div>
      </div>

      {/* Vertical Indicator Line */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 h-20 w-[1px] bg-white/20">
        <motion.div 
          className="w-full bg-magenta shadow-[0_0_10px_#FF00FF]"
          initial={{ height: 0 }}
          animate={isInView ? { height: '100%' } : { height: 0 }}
          transition={{ duration: 1 }}
        />
      </div>
    </section>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] p-6 flex justify-between items-center mix-blend-difference">
        <div className="flex flex-col">
          <span className="text-2xl font-black tracking-tighter uppercase text-white leading-none">TOBEORGANISED.</span>
          <span className="text-[10px] font-mono tracking-[0.4em] text-magenta">VISUAL ARCHITECTURE</span>
        </div>
        
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-4 group"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-white hidden md:block">MENU</span>
          <div className="space-y-1.5">
            <div className="w-8 h-0.5 bg-white group-hover:bg-magenta transition-colors" />
            <div className="w-8 h-0.5 bg-white group-hover:bg-magenta transition-colors" />
          </div>
        </button>
      </nav>

      {/* Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.5, ease: "circOut" }}
            className="fixed inset-0 z-[110] bg-black p-10 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <span className="text-magenta font-mono text-sm tracking-widest">[ NAVIGATION ]</span>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-magenta transition-colors">
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col space-y-4">
              {['Home', 'Artists', 'Festivals', 'Corporate', 'Manifesto', 'Contact'].map((item, idx) => (
                <motion.a
                  key={item}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  href="#"
                  className="text-5xl md:text-8xl font-black uppercase text-white hover:text-magenta tracking-tighter transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="flex justify-between items-end border-t border-white/10 pt-10">
              <div className="flex space-x-8">
                <Instagram className="text-white/40 hover:text-magenta cursor-pointer" />
                <Twitter className="text-white/40 hover:text-magenta cursor-pointer" />
                <Mail className="text-white/40 hover:text-magenta cursor-pointer" />
              </div>
              <p className="text-[10px] font-mono text-white/20 tracking-widest">© 2024 TOBEORGANISED GROUP</p>
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
      className="fixed top-0 left-0 w-8 h-8 border border-magenta rounded-full pointer-events-none z-[120] hidden md:block mix-blend-difference"
      animate={{ x: pos.x - 16, y: pos.y - 16 }}
      transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1 h-1 bg-magenta rounded-full" />
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const containerRef = useRef(null);

  // Implement Infinite Loop Simulation
  // For a real infinite loop in React, we would clone the array, but for this landing page,
  // we use a snap-scrolling container that focuses the user experience on each section.

  return (
    <div className="bg-black min-h-screen selection:bg-magenta selection:text-black overflow-x-hidden scroll-smooth">
      <CustomCursor />
      <Navbar />

      <main 
        ref={containerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory no-scrollbar"
      >
        {/* Intro Hero with Full Screen Text Fade-up */}
        <section className="h-screen w-full flex flex-col items-center justify-center bg-black snap-start p-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="mb-8"
          >
             <span className="text-magenta font-mono tracking-[0.5em] uppercase text-xs mb-4 block">Enter the Narrative</span>
             <h1 className="text-6xl md:text-[12rem] font-black tracking-tighter text-white leading-none uppercase">
               TOBE<br/><span className="text-magenta">ORGANISED.</span>
             </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col items-center"
          >
            <p className="text-white/40 font-mono text-sm max-w-md mb-10 tracking-widest">
              A CREATIVE STUDIO DEDICATED TO THE ART OF ATMOSPHERE AND TECHNICAL PRECISION.
            </p>
            <ChevronDown className="text-magenta animate-bounce" size={32} />
          </motion.div>
        </section>

        {/* Dynamic Vertical Sections */}
        {SECTIONS.map((section) => (
          <Section key={section.id} data={section} total={`0${SECTIONS.length}`} />
        ))}

        {/* Contact/Footer Section */}
        <section className="h-screen w-full flex flex-col items-center justify-center bg-black snap-start p-10 text-center border-t border-magenta/20">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-8xl font-black uppercase text-white mb-12 tracking-tighter"
          >
            Let's Sync <br /> <span className="text-magenta italic">Frequencies.</span>
          </motion.h3>
          
          <div className="flex flex-col md:flex-row gap-8">
            <button className="bg-magenta text-black font-black uppercase px-12 py-6 text-sm tracking-widest hover:bg-white transition-colors">
              Project Inquiry
            </button>
            <button className="border border-white/20 text-white font-black uppercase px-12 py-6 text-sm tracking-widest hover:border-magenta hover:text-magenta transition-colors">
              Showreel 2024
            </button>
          </div>
          
          <div className="mt-20 font-mono text-[10px] text-white/20 tracking-[0.5em] uppercase">
            Berlin / New York / Tokyo / Aether
          </div>
        </section>
      </main>

      {/* Global Style overrides for scroll behavior */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
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