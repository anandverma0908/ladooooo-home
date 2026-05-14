import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import '../styles/Screen5.css'

function Rain() {
  const drops = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    height: `${50 + Math.random() * 70}px`,
    duration: `${0.7 + Math.random() * 0.9}s`,
    delay: `${Math.random() * 2}s`,
  }))
  return (
    <div className="rain-container">
      {drops.map(d => (
        <div key={d.id} className="rain-drop" style={{
          left: d.left, height: d.height,
          animationDuration: d.duration, animationDelay: d.delay,
        }} />
      ))}
    </div>
  )
}

function GiftBox({ onClick }) {
  const [hovering, setHovering] = useState(false)
  return (
    <motion.div
      className="gift-area"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 1, type: 'spring' }}
    >
      <motion.p
        className="gift-pretext"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
      >
        I recorded something
      </motion.p>
      <motion.p
        className="gift-pretext gold"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
      >
        just for you, Ladoo...
      </motion.p>

      <motion.div
        className={`gift-box ${hovering ? 'shake' : ''}`}
        onClick={onClick}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        {/* Gift box SVG */}
        <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" className="gift-svg">
          {/* Box body */}
          <rect x="20" y="75" width="120" height="75" rx="4" fill="#4A1020" stroke="#C9A84C" strokeWidth="1.5"/>
          {/* Box lid */}
          <rect x="15" y="58" width="130" height="22" rx="4" fill="#6B1A2A" stroke="#C9A84C" strokeWidth="1.5"/>
          {/* Ribbon vertical */}
          <rect x="72" y="58" width="16" height="92" fill="#C9A84C" opacity="0.8"/>
          {/* Ribbon horizontal */}
          <rect x="15" y="64" width="130" height="10" fill="#C9A84C" opacity="0.8"/>
          {/* Bow left loop */}
          <ellipse cx="58" cy="52" rx="22" ry="14" fill="#E8C97A" transform="rotate(-20,58,52)" opacity="0.9"/>
          {/* Bow right loop */}
          <ellipse cx="102" cy="52" rx="22" ry="14" fill="#C9A84C" transform="rotate(20,102,52)" opacity="0.9"/>
          {/* Bow center */}
          <circle cx="80" cy="56" r="10" fill="#E8C97A"/>
          <circle cx="80" cy="56" r="5" fill="#4A1020"/>
          {/* Sparkles */}
          <text x="14" y="48" fontSize="14" fill="#E8C97A" opacity="0.8">✦</text>
          <text x="132" y="48" fontSize="14" fill="#E8C97A" opacity="0.8">✦</text>
          <text x="130" y="140" fontSize="10" fill="#C9A84C" opacity="0.5">✦</text>
          <text x="18" y="140" fontSize="10" fill="#C9A84C" opacity="0.5">✦</text>
        </svg>

        <motion.p
          className="gift-click-hint"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          tap to open 🎁
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

function VideoMessage({ onNext }) {
  const vidRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const togglePlay = () => {
    if (!vidRef.current) return
    if (playing) { vidRef.current.pause(); setPlaying(false) }
    else { vidRef.current.play(); setPlaying(true) }
  }

  return (
    <motion.div
      className="video-msg-wrap"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, type: 'spring' }}
    >
      <div className="video-frame">
        <div className="video-frame-corner tl" />
        <div className="video-frame-corner tr" />
        <div className="video-frame-corner bl" />
        <div className="video-frame-corner br" />

        <video
          ref={vidRef}
          className="video-player"
          src="/videos/your-message.mp4"
          playsInline
          onEnded={() => setPlaying(false)}
        />

        {!playing && (
          <motion.button
            className="play-overlay"
            onClick={togglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="play-icon">▶</span>
          </motion.button>
        )}

        {playing && (
          <button className="pause-overlay" onClick={togglePlay}>⏸</button>
        )}
      </div>

      <p className="video-caption">— A message, from my heart to yours 🕯️</p>

      <motion.button
        className="gold-btn"
        onClick={onNext}
        style={{ marginTop: '24px', fontSize: '13px' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
      >
        One last thing...
      </motion.button>
    </motion.div>
  )
}

export default function Screen5_Surprise({ onNext }) {
  const [opened, setOpened] = useState(false)

  return (
    <motion.div
      className="screen s5-bg"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Rain />
      <div className="s5-glow" />

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div key="gift" exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.6 }}>
            <GiftBox onClick={() => setOpened(true)} />
          </motion.div>
        ) : (
          <motion.div key="video" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <VideoMessage onNext={onNext} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
