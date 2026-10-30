import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowUp, CornerDownLeft, Maximize, Minimize, Volume2, VolumeX } from 'lucide-react';
import { chapters, experiences, type Chapter } from './content';

function Landscape() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reducedMotion || !matchMedia('(pointer: fine)').matches) return;
    const move = (e: PointerEvent) => {
      ref.current?.style.setProperty('--px', `${(e.clientX / innerWidth - .5) * 10}px`);
      ref.current?.style.setProperty('--py', `${(e.clientY / innerHeight - .5) * 6}px`);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [reducedMotion]);
  return <div className="landscape" aria-hidden="true" ref={ref}>
    <div className="landscape-photo" />
    <div className="landscape-tint" /><div className="moon" /><div className="mist mist-one" /><div className="mist mist-two" />
    <div className="stars">{Array.from({length: 22}, (_, i) => <i key={i} style={{left: `${35 + (i * 29 % 64)}%`, top: `${8 + (i * 13 % 45)}%`, animationDelay: `${i * .63}s`}} />)}</div>
    <div className="landscape-shade" /><div className="grain" />
  </div>;
}

function ExperienceLog() {
  const [active, setActive] = useState(0);
  const entry = experiences[active];
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectEntry = (index: number) => {
    const next = (index + experiences.length) % experiences.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return <div className="experience-log">
    <div className="experience-index">
      <div className="log-heading"><span>Career archive</span><strong>{String(experiences.length).padStart(2, '0')} ENTRIES</strong></div>
      <div className="experience-tabs" role="tablist" aria-label="Professional experience">
        {experiences.map((experience, index) => <button
          key={`${experience.company}-${experience.dates}`}
          ref={element => { tabs.current[index] = element; }}
          className={`experience-tab ${active === index ? 'active' : ''}`}
          role="tab"
          aria-selected={active === index}
          aria-controls="experience-detail"
          tabIndex={active === index ? 0 : -1}
          onClick={() => setActive(index)}
          onKeyDown={event => {
            if (['ArrowDown', 'ArrowRight'].includes(event.key)) { event.preventDefault(); selectEntry(active + 1); }
            if (['ArrowUp', 'ArrowLeft'].includes(event.key)) { event.preventDefault(); selectEntry(active - 1); }
            if (event.key === 'Home') { event.preventDefault(); selectEntry(0); }
            if (event.key === 'End') { event.preventDefault(); selectEntry(experiences.length - 1); }
          }}
        >
          <span className="experience-marker" aria-hidden="true">{active === index ? '◆' : '◇'}</span>
          <span className="experience-tab-copy"><strong>{experience.company}</strong><small>{experience.role}</small></span>
          <span className="experience-year">{experience.dates.match(/\d{4}/)?.[0]}</span>
        </button>)}
      </div>
      <p className="experience-controls">↑ ↓ SELECT ENTRY</p>
    </div>

    <AnimatePresence mode="wait">
      <motion.article
        id="experience-detail"
        className="experience-detail"
        role="tabpanel"
        key={`${entry.company}-${entry.dates}`}
        initial={{opacity: 0, x: 12}}
        animate={{opacity: 1, x: 0}}
        exit={{opacity: 0, x: -8}}
        transition={{duration: .22}}
      >
        <div className="experience-status"><span /> {entry.status}</div>
        <p className="experience-entry-number">ENTRY / {String(active + 1).padStart(2, '0')}</p>
        <h3>{entry.company}</h3>
        <p className="experience-role">{entry.role}</p>
        <div className="experience-meta"><span>{entry.dates}</span><span>{entry.location}</span></div>
        <div className="experience-divider"><span>Mission record</span></div>
        <ul className="achievement-list">
          {entry.accomplishments.map((accomplishment, index) => <li key={accomplishment}><span className="achievement-number">0{index + 1}</span><p>{accomplishment}</p></li>)}
        </ul>
        <div className="technology-list" aria-label="Technologies used">
          {entry.technologies.map(technology => <span key={technology}>{technology}</span>)}
        </div>
      </motion.article>
    </AnimatePresence>
  </div>;
}

function ChapterPanel({chapter, onBack}: {chapter: Chapter; onBack: () => void}) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus(); }, [chapter]);
  return <motion.section className={`chapter-panel ${chapter.id === 'experience' ? 'experience-chapter' : ''}`} key={chapter.id} initial={{opacity: 0, y: 14}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -8}} transition={{duration: .3}} aria-labelledby="chapter-title">
    <button className="back-button" onClick={onBack}><ArrowLeft size={15} /> Back to main menu <kbd>ESC</kbd></button>
    <p className="eyebrow">CHAPTER {String(chapters.indexOf(chapter) + 1).padStart(2, '0')} / {chapter.subtitle}</p>
    <h2 id="chapter-title" tabIndex={-1} ref={heading}>{chapter.label}</h2>
    <p className="chapter-description">{chapter.description}</p>
    {chapter.id === 'experience' ? <ExperienceLog /> : <div className="placeholder-panel"><span className="diamond">◇</span><p className="eyebrow">{chapter.detail}</p><p>{chapter.placeholder}</p><span className="draft-label">A NEW CHAPTER IS TAKING SHAPE</span></div>}
  </motion.section>;
}

export default function App() {
  const [selected, setSelected] = useState(0);
  const [chapter, setChapter] = useState<Chapter | null>(() => chapters.find(c => `#${c.id}` === location.hash) ?? null);
  const [sound, setSound] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [notice, setNotice] = useState('');
  const menuRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const audio = useRef<AudioContext | null>(null);
  const returning = useRef(false);
  const play = () => {
    if (!sound) return;
    try {
      const context = audio.current ??= new AudioContext();
      void context.resume();
      const oscillator = context.createOscillator(); const gain = context.createGain();
      oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(440, context.currentTime);
      gain.gain.setValueAtTime(.025, context.currentTime); gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + .12);
      oscillator.connect(gain); gain.connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime + .12);
    } catch { /* Sound is an optional enhancement. */ }
  };
  const openChapter = (c: Chapter) => { play(); location.hash = c.id; };
  const back = () => { returning.current = true; history.pushState(null, '', location.pathname + location.search); setChapter(null); };
  useEffect(() => {
    const sync = () => setChapter(chapters.find(c => `#${c.id}` === location.hash) ?? null);
    const full = () => setFullscreen(Boolean(document.fullscreenElement));
    window.addEventListener('hashchange', sync); window.addEventListener('popstate', sync); document.addEventListener('fullscreenchange', full);
    return () => { window.removeEventListener('hashchange', sync); window.removeEventListener('popstate', sync); document.removeEventListener('fullscreenchange', full); void audio.current?.close(); };
  }, []);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (chapter) { if (e.key === 'Escape') back(); return; }
      if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) return;
      if (document.activeElement instanceof HTMLButtonElement && !menuRefs.current.includes(document.activeElement)) return;
      e.preventDefault();
      const next = e.key === 'Home' ? 0 : e.key === 'End' ? chapters.length - 1 : (selected + (e.key === 'ArrowDown' ? 1 : -1) + chapters.length) % chapters.length;
      setSelected(next); menuRefs.current[next]?.focus(); play();
    };
    window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key);
  }, [chapter, selected, sound]);
  const toggleFullscreen = async () => {
    try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); }
    catch { setNotice('Fullscreen is unavailable in this browser.'); }
  };
  return <MotionConfig reducedMotion="user"><div className="app-shell">
    <Landscape />
    <div className="top-bar" aria-hidden="true" />
    <main id="main-content">
      <AnimatePresence mode="wait">
        {chapter ? <ChapterPanel key={chapter.id} chapter={chapter} onBack={back} /> : <motion.div key="menu" className="main-menu" initial={{opacity: 0, y: 12}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, x: -12}} transition={{duration: .65}} onAnimationComplete={() => { if (returning.current && menuRefs.current[selected]?.isConnected) { menuRefs.current[selected]?.focus(); returning.current = false; } }}>
          <p className="eyebrow intro-label"><span /> A PORTFOLIO BY</p>
          <h1>CHARMAINE<br /><span>LEE</span><span className="title-period">.</span></h1>
          <div className="profession"><span /> SOFTWARE ENGINEER <span /></div>
          <p className="intro-copy">A software engineer with a creative outlet who loves turning random ideas into little projects.</p>
          <nav aria-label="Portfolio chapters" className="menu-options">{chapters.map((item, index) => <button key={item.id} ref={el => { menuRefs.current[index] = el; }} className={`menu-option ${selected === index ? 'selected' : ''}`} onMouseEnter={() => { if (selected !== index) play(); setSelected(index); }} onFocus={() => setSelected(index)} onClick={() => openChapter(item)}><span className="menu-cursor">◇</span><span className="menu-label">{item.label}</span><span className="menu-number">0{index + 1}</span></button>)}</nav>
          <div className="menu-hint"><span><kbd><ArrowUp size={10}/></kbd><kbd><ArrowDown size={10}/></kbd> NAVIGATE</span><span><kbd><CornerDownLeft size={11}/></kbd> SELECT</span></div>
        </motion.div>}
      </AnimatePresence>
    </main>
    {!chapter && <aside className="landscape-caption" aria-hidden="true"><span>come explore my around my portfolio!</span></aside>}
    <footer className="bottom-bar controls-only"><div className="utility-controls"><button onClick={() => setSound(s => !s)} aria-pressed={sound} aria-label={sound ? 'Disable interface sound' : 'Enable interface sound'}>{sound ? <Volume2 size={15}/> : <VolumeX size={15}/>}<span>SOUND {sound ? 'ON' : 'OFF'}</span></button><span className="utility-divider"/>{document.fullscreenEnabled && <button onClick={toggleFullscreen} aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>{fullscreen ? <Minimize size={15}/> : <Maximize size={15}/>}</button>}</div></footer>
    <div role="status" className="notice">{notice}</div>
  </div></MotionConfig>;
}
