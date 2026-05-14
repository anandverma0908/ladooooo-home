import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useMemo } from 'react'
import '../styles/Screen3.css'

const SLIDES = [
  {
    type: 'video',
    src: '/videos/IMG1.mp4',
    quote: "I remember this moment.",
    sub: "How easy everything felt when it was just us.",
  },
  {
    type: 'image',
    src: '/images/IMG2.jpg',
    quote: "You were laughing at something I said.",
    sub: "I don't remember what. I just remember the laugh.",
  },
  {
    type: 'video',
    src: '/videos/IMG3.mp4',
    quote: "We didn't even have to be doing anything.",
    sub: "Being with you was always enough.",
  },
  {
    type: 'video',
    src: '/videos/IMG4.mp4',
    quote: "I'd give anything to go back to this.",
    sub: "To be right there, with you, one more time.",
  },
  {
    type: 'image',
    src: '/images/IMG5.jpg',
    quote: "This is one of my favourite versions of you.",
    sub: "Completely yourself. Completely beautiful.",
  },
  {
    type: 'image',
    src: '/images/together.jpg',
    quote: "This one. This is the one I keep coming back to.",
    sub: "My favourite memory of us. No competition.",
  },
]

function Rain() {
  const drops = useMemo(() => {
    const arr = []
    for (let i = 0; i < 60; i++) arr.push({
      id: `a${i}`, left: Math.random() * 110 - 5, height: 55 + Math.random() * 50,
      width: 0.8, duration: 0.5 + Math.random() * 0.4, delay: Math.random() * 3,
      opacity: 0.1 + Math.random() * 0.12, slant: -13 + Math.random() * 5,
    })
    for (let i = 0; i < 40; i++) arr.push({
      id: `b${i}`, left: Math.random() * 110 - 5, height: 75 + Math.random() * 60,
      width: 1.2, duration: 0.65 + Math.random() * 0.45, delay: Math.random() * 3,
      opacity: 0.14 + Math.random() * 0.1, slant: -15 + Math.random() * 4,
    })
    return arr
  }, [])
  return (
    <div className="rain-container s3-rain">
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

function VideoSlide({ src, quote, sub, onEnded }) {
  const vidRef = useRef(null)
  useEffect(() => {
    if (vidRef.current) vidRef.current.play().catch(() => {})
  }, [])
  return (
    <div className="slide-wrap">
      <video
        ref={vidRef}
        className="slide-media"
        src={src}
        muted
        playsInline
        onEnded={onEnded}
      />
      <div className="slide-vignette" />
      <motion.div
        className="slide-quote-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1.2 }}
      >
        <p className="slide-quote">{quote}</p>
        <p className="slide-sub">{sub}</p>
      </motion.div>
    </div>
  )
}

function ImageSlide({ src, quote, sub }) {
  return (
    <div className="slide-wrap">
      <div
        className="slide-media slide-img ken-burns"
        style={{ backgroundImage: `url(${src})` }}
      />
      <div className="slide-vignette" />
      <motion.div
        className="slide-quote-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1.2 }}
      >
        <p className="slide-quote">{quote}</p>
        <p className="slide-sub">{sub}</p>
      </motion.div>
    </div>
  )
}

export default function Screen3_Memories({ onNext }) {
  const [idx, setIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const progressRef = useRef(null)
  const slide = SLIDES[idx]

  const next = () => {
    if (idx < SLIDES.length - 1) {
      setIdx(i => i + 1)
      setProgress(0)
    } else {
      onNext()
    }
  }

  useEffect(() => {
    if (slide.type !== 'image') return
    setProgress(0)
    const start = Date.now()
    const duration = 5000
    const tick = () => {
      const elapsed = Date.now() - start
      const pct = Math.min(elapsed / duration, 1)
      setProgress(pct)
      if (pct < 1) progressRef.current = requestAnimationFrame(tick)
      else next()
    }
    progressRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(progressRef.current)
  }, [idx])

  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          className="slide-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
        >
          {slide.type === 'video'
            ? <VideoSlide {...slide} onEnded={next} />
            : <ImageSlide {...slide} />
          }
        </motion.div>
      </AnimatePresence>

      {/* Rain on top of slides */}
      <Rain />

      <div className="film-dots">
        {SLIDES.map((_, i) => (
          <div key={i} className={`film-dot ${i === idx ? 'active' : ''} ${i < idx ? 'past' : ''}`} />
        ))}
      </div>

      {slide.type === 'image' && (
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${progress * 100}%` }} />
        </div>
      )}

      <div className="film-corner tl">◼◼◼</div>
      <div className="film-corner tr">◼◼◼</div>

      <button className="s3-next-btn" onClick={next}>
        {idx < SLIDES.length - 1 ? '›' : '→'}
      </button>
    </motion.div>
  )
}
