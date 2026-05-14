import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import '../styles/Screen4.css'

const PROMISES = [
  { text: "I will never make you feel unimportant again.", delay: 0.5 },
  { text: "I will choose honesty, even when it's hard.", delay: 1.8 },
  { text: "You deserve better from me — and I will be better.", delay: 3.1 },
  { text: "I will listen. Really listen.", delay: 4.4 },
  { text: "I will never take your love for granted.", delay: 5.7 },
  { text: "Ladoo, you are my person. Always.", delay: 7.0 },
]

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

export default function Screen4_Promises({ onNext }) {
  const [allShown, setAllShown] = useState(false)

  useEffect(() => {
    const lastDelay = PROMISES[PROMISES.length - 1].delay
    const t = setTimeout(() => setAllShown(true), (lastDelay + 2) * 1000)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      className="screen s4-bg"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <Rain />
      <div className="s4-candle-corner">
        <div className="candle-wrap" style={{ transform: 'scale(0.7)' }}>
          <div className="glow-ring" />
          <div className="flame" />
          <div className="candle-body"><div className="candle-drip" /></div>
          <div className="candle-base" />
        </div>
      </div>

      <div className="s4-content">
        <motion.div
          className="s4-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="s4-ornament">❧</div>
          <h2 className="s4-title">My Promises to You</h2>
          <div className="s4-ornament-line" />
        </motion.div>

        <div className="promises-list">
          {PROMISES.map((p, i) => (
            <motion.div
              key={i}
              className="promise-item"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: p.delay, duration: 1.2 }}
            >
              <span className="promise-mark">✦</span>
              <p className="promise-text">{p.text}</p>
            </motion.div>
          ))}
        </div>

        {allShown && (
          <motion.div
            className="s4-footer"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
          >
            <p className="s4-footer-text">— written with every bit of sincerity I have left.</p>
            <button className="gold-btn" onClick={onNext} style={{ marginTop: '24px' }}>
              There's one more thing...
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
