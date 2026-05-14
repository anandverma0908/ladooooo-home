import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect, useRef, useMemo } from 'react'
import '../styles/Screen2.css'

const PAGE_1 = [
  "Maybe you won't reply. Maybe this message sits unread at the bottom of your screen, buried under everything",
  "I should have said before it came to this. Maybe I'll say your name tonight to an empty room",
  "just to hear how it sounds when there's no one left to answer back. Maybe I won't hear your voice again.",
  "That voice warm like the first sip of something on a cold evening maybe I've had my last of it",
  "and didn't even know to hold on a little longer. That thought alone is enough to undo me.",
  "I'm not going to dress this up. I hurt you. Not accidentally, not without warning signs I hurt you,",
  "and somewhere inside me I knew better and I still didn't do better. That's the part I carry.",
  "Every single day. Like a stone in the chest that reminds me you had something rare",
  "and you were not careful enough with it.",
]

const PAGE_2 = [
  "Ladoo — Do you know what it's like to look back at a moment and see exactly where you went wrong?",
  "To replay it, over and over, like a song stuck on the worst line — wishing you could reach",
  "back through time and shake yourself — wake up. Look at her. She is right there. Don't lose her.",
  "That's where I live now. In that in-between — between who I was and who I should have been for you.",
  "I think about the small things. The way you noticed when something was off with me,",
  "before I'd said a single word. The way you'd fight for what was right, quietly but completely —",
  "no noise, just conviction. The way you loved with your whole self — no half measures, no holding back.",
  "You gave me all of you, Ladoo. And I — I gave you reasons to regret it.",
  "That is my fault. Mine alone. And I will not place it anywhere else.",
]

const PAGE_3 = [
  "I know sorry is just a word if there's nothing behind it. So let me tell you what's behind mine —",
  "A person who has sat in the quiet of his own mistakes and finally, fully, understood their weight.",
  "A person who doesn't want to be forgiven so he can feel better — but who wants to be forgiven",
  "so he can spend every day after this proving that he heard you. That he changed.",
  "That it meant something. That you meant something. You do, Ladoo. More than I ever showed you.",
  "More than I knew how to say when it mattered most.",
  "I'm not asking you to forget. I'm not asking you to pretend none of it happened.",
  "I'm asking — if somewhere in you there is still a small, quiet place that remembers what we were —",
  "give me one more chance to be worthy of it. Just one. I will not waste it this time.",
]

const PAGE_4 = [
  "I know you loved Little Women because Jo never gave up on the people she loved —",
  "even when it was hard, even when it cost her. I always admired that in you.",
  "That same stubborn, beautiful love. I'm asking you now to turn just a little of it toward me.",
  "Not because I deserve it — I know I may not. But because what we have",
  "is not something that comes around again. And I think, somewhere — you know that too.",
  "Maybe you won't reply. But Ladoo — if you ever do, I will be here.",
  "Not going anywhere. Not giving up. Not letting the silence convince me",
  "that you were never worth fighting for. Because you are. You always were. You always will be.",
]

const PAGE_5 = [
  "I am sorry. For the hurt. For the carelessness. For every moment you felt like you were",
  "too much, or not enough, because of something I did. You were never too much.",
  "You were exactly enough. You were more than enough.",
  "And I — I was just too foolish to treat you that way when it counted.",
  "",
  "I'm sorry. If you forgive me, Ladoo — I will spend every day after",
  "making sure you never have to wonder again.",
  "I promise.",
]

const PAGES = [PAGE_1, PAGE_2, PAGE_3, PAGE_4, PAGE_5]

const PAGE_HEADINGS = [
  "To Ladoo",
  "What I Carry",
  "What Sorry Means",
  "Little Women",
  "I Promise",
]

// ──────────────────────────────────────────

function Rain() {
  const drops = useMemo(() => {
    const arr = []
    for (let i = 0; i < 80; i++) arr.push({
      id: `b${i}`, left: Math.random() * 110 - 5, height: 55 + Math.random() * 40,
      width: 0.7, duration: 0.45 + Math.random() * 0.35, delay: Math.random() * 3,
      opacity: 0.1 + Math.random() * 0.08, slant: -12 + Math.random() * 6,
    })
    for (let i = 0; i < 60; i++) arr.push({
      id: `m${i}`, left: Math.random() * 110 - 5, height: 70 + Math.random() * 60,
      width: 1, duration: 0.55 + Math.random() * 0.4, delay: Math.random() * 3,
      opacity: 0.13 + Math.random() * 0.1, slant: -14 + Math.random() * 5,
    })
    return arr
  }, [])
  return (
    <div className="rain-container">
      {drops.map(d => (
        <div key={d.id} className="rain-drop" style={{
          left: `${d.left}%`, height: `${d.height}px`, width: `${d.width}px`,
          animationDuration: `${d.duration}s`, animationDelay: `${d.delay}s`,
          opacity: d.opacity, '--slant': `${d.slant}deg`,
        }} />
      ))}
    </div>
  )
}

function PoemTyper({ lines, onComplete }) {
  const [displayed, setDisplayed] = useState([])
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const firedRef = useRef(false)

  useEffect(() => {
    firedRef.current = false
    setDisplayed([])
    setLineIdx(0)
    setCharIdx(0)
  }, [lines])

  useEffect(() => {
    if (lineIdx >= lines.length) {
      if (!firedRef.current) {
        firedRef.current = true
        const t = setTimeout(onComplete, 1000)
        return () => clearTimeout(t)
      }
      return
    }
    const line = lines[lineIdx]
    if (line === '') {
      setDisplayed(prev => [...prev, ''])
      setLineIdx(l => l + 1)
      return
    }
    if (charIdx < line.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), 100)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setDisplayed(prev => [...prev, line])
      setLineIdx(l => l + 1)
      setCharIdx(0)
    }, 280)
    return () => clearTimeout(t)
  }, [lineIdx, charIdx, lines, onComplete])

  const activeLine = lineIdx < lines.length ? lines[lineIdx].slice(0, charIdx) : ''

  return (
    <div className="letter-content">
      {displayed.map((line, i) => (
        <p key={i} className={[
          'letter-line',
          line === '' ? 'empty-line' : '',
          line.startsWith('Ladoo —') ? 'salutation' : '',
          (line.includes('I promise') || line.startsWith("I'm sorry")) ? 'sign-off' : '',
        ].filter(Boolean).join(' ')}>
          {line || ' '}
        </p>
      ))}
      {lineIdx < lines.length && (
        <p className="letter-line">
          {activeLine}<span className="typewriter-cursor">|</span>
        </p>
      )}
    </div>
  )
}

function OpenBook({ onNext }) {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageKey, setPageKey] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [allDone, setAllDone] = useState(false)
  const controls = useAnimation()

  const handlePageComplete = async () => {
    if (isFlipping) return
    if (pageIndex < PAGES.length - 1) {
      setIsFlipping(true)
      await controls.start({
        rotateY: -90,
        transition: { duration: 0.38, ease: [0.4, 0, 1, 1] },
      })
      setPageIndex(i => i + 1)
      setPageKey(k => k + 1)
      controls.set({ rotateY: 90 })
      await controls.start({
        rotateY: 0,
        transition: { duration: 0.38, ease: [0, 0, 0.6, 1] },
      })
      setIsFlipping(false)
    } else {
      setAllDone(true)
    }
  }

  return (
    <div className="book-spread">
      {/* ── Left decorative page ── */}
      <div className="page-left">
        <div className="page-left-inner">
          <div className="lw-ornament-top">❦</div>
          <p className="lw-quote">
            "I am not afraid of storms,<br />
            for I am learning how to<br />
            sail my ship."
          </p>
          <p className="lw-quote-attr">— Jo March, Little Women</p>
          <div className="pressed-flower">
            <svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="40" cy="30" rx="12" ry="20" fill="#8B7355" transform="rotate(-20,40,30)"/>
              <ellipse cx="40" cy="30" rx="12" ry="20" fill="#8B7355" transform="rotate(20,40,30)"/>
              <ellipse cx="40" cy="30" rx="12" ry="20" fill="#7A6040" transform="rotate(60,40,30)"/>
              <ellipse cx="40" cy="30" rx="12" ry="20" fill="#7A6040" transform="rotate(-60,40,30)"/>
              <circle cx="40" cy="30" r="8" fill="#C9A84C"/>
              <line x1="40" y1="48" x2="40" y2="95" stroke="#5C4030" strokeWidth="2"/>
              <ellipse cx="30" cy="72" rx="10" ry="6" fill="#8B7355" transform="rotate(-30,30,72)"/>
              <ellipse cx="50" cy="80" rx="10" ry="6" fill="#7A6040" transform="rotate(20,50,80)"/>
            </svg>
          </div>
          {/* Page progress dots */}
          <div className="page-dots">
            {PAGES.map((_, i) => (
              <div key={i} className={`page-dot${i === pageIndex ? ' active' : i < pageIndex ? ' done' : ''}`} />
            ))}
          </div>
          <span className="page-num-left">
            {pageIndex + 1} / {PAGES.length}
          </span>
        </div>
      </div>

      {/* ── Right page (3D flip) ── */}
      <div className="page-right-perspective">
        <div className="page-back-paper" />

        <motion.div
          className="page-right"
          animate={controls}
          style={{ transformOrigin: 'left center', backfaceVisibility: 'hidden' }}
        >
          <p className="chapter-heading">{PAGE_HEADINGS[pageIndex]}</p>

          <PoemTyper
            key={pageKey}
            lines={PAGES[pageIndex]}
            onComplete={handlePageComplete}
          />

          <span className="page-num-right">{pageIndex + 1}</span>

          {!isFlipping && !allDone && pageIndex < PAGES.length - 1 && (
            <div className="page-corner-curl" />
          )}

          {allDone && (
            <motion.div
              className="next-btn-wrap"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button className="gold-btn" onClick={onNext}
                style={{ fontSize: '13px', padding: '10px 30px' }}>
                Turn the page →
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default function Screen2_Confession({ muted, onNext }) {
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio('/music/poem.mp3')
    audioRef.current.volume = 0.7
    audioRef.current.play().catch(() => {})
    return () => audioRef.current?.pause()
  }, [])

  return (
    <motion.div
      className="screen s2-bg"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <Rain />
      <div className="s2-candle-glow" />

      <motion.div
        className="s2-book-wrap"
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      >
        <OpenBook onNext={onNext} />
      </motion.div>
    </motion.div>
  )
}
