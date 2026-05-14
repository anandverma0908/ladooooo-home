import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
import '../styles/Screen1.css'

function Rain() {
  const drops = useMemo(() => {
    const layers = []
    for (let i = 0; i < 80; i++) {
      layers.push({
        id: `b${i}`, left: Math.random() * 110 - 5,
        height: 55 + Math.random() * 40, width: 0.7,
        duration: 0.45 + Math.random() * 0.35, delay: Math.random() * 3,
        opacity: 0.12 + Math.random() * 0.1, slant: -12 + Math.random() * 6,
      })
    }
    for (let i = 0; i < 70; i++) {
      layers.push({
        id: `m${i}`, left: Math.random() * 110 - 5,
        height: 70 + Math.random() * 60, width: 1,
        duration: 0.55 + Math.random() * 0.4, delay: Math.random() * 3,
        opacity: 0.18 + Math.random() * 0.14, slant: -14 + Math.random() * 5,
      })
    }
    for (let i = 0; i < 40; i++) {
      layers.push({
        id: `f${i}`, left: Math.random() * 110 - 5,
        height: 90 + Math.random() * 70, width: 1.5 + Math.random() * 0.8,
        duration: 0.7 + Math.random() * 0.5, delay: Math.random() * 3,
        opacity: 0.22 + Math.random() * 0.18, slant: -16 + Math.random() * 4,
      })
    }
    return layers
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

function Smoke() {
  const puffs = [
    { id: 1, x: 0, delay: 0 }, { id: 2, x: -8, delay: 0.15 },
    { id: 3, x: 10, delay: 0.3 }, { id: 4, x: -4, delay: 0.5 },
  ]
  return (
    <div className="smoke-wrap">
      {puffs.map(p => (
        <motion.div key={p.id} className="smoke-puff"
          initial={{ opacity: 0, y: 0, x: p.x, scale: 0.3 }}
          animate={{ opacity: [0, 0.5, 0], y: -70, x: p.x + (p.id % 2 === 0 ? 15 : -15), scale: 1.8 }}
          transition={{ duration: 1.8, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

function Candle({ blown, onBlow }) {
  return (
    <div
      className={`candle-wrap candle-clickable${blown ? ' blown' : ''}`}
      style={{ position: 'relative', cursor: blown ? 'default' : 'pointer' }}
      onClick={!blown ? onBlow : undefined}
    >
      <div className="glow-ring" style={{ opacity: blown ? 0 : 1, transition: 'opacity 0.8s' }} />
      <AnimatePresence>
        {!blown && (
          <motion.div className="flame" key="flame"
            exit={{ scaleY: 0, scaleX: 0, opacity: 0, transition: { duration: 0.3 } }}
          />
        )}
      </AnimatePresence>
      {blown && <Smoke />}
      <div className="candle-body" style={{ position: 'relative' }}>
        <div className="candle-drip" />
        <div className="candle-wick" />
      </div>
      <div className="candle-base" />
    </div>
  )
}

function BookReveal({ onOpen }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div className="s1-book-scene"
      initial={{ opacity: 0, y: 60, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.3, ease: 'easeOut' }}
    >
      <motion.div
        className="s1-book-3d"
        animate={{ rotateY: hovered ? -8 : 0 }}
        transition={{ type: 'spring', stiffness: 140, damping: 20 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onOpen}
        style={{ cursor: 'pointer', perspective: 1200 }}
      >
        <div className="s1-book-spine" />
        <div className="s1-book-face">
          <img src="/images/book-cover.jpg" className="s1-book-img" alt="Little Women" />
          <div className="s1-book-shine" />
        </div>
      </motion.div>
      <motion.p className="s1-book-hint"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
      >
        {/* click to open */}
      </motion.p>
    </motion.div>
  )
}

export default function Screen1_Opening({ onNext }) {
  const [blown, setBlown] = useState(false)
  const [showBook, setShowBook] = useState(false)

  const handleBlow = () => {
    setBlown(true)
    setTimeout(() => setShowBook(true), 1700)
  }

  return (
    <motion.div
      className="screen s1-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <Rain />
      <div className="s1-vignette" />

      <AnimatePresence mode="wait">
        {!showBook ? (
          <motion.div key="candle-scene" className="s1-center"
            exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 2 }}
            >
              <Candle blown={blown} onBlow={handleBlow} />
            </motion.div>
            <motion.p className="s1-tagline"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 2 }}
            >
              Ladooo blow this candle to know why
            </motion.p>
          </motion.div>
        ) : (
          <motion.div key="book-scene">
            <BookReveal onOpen={onNext} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
