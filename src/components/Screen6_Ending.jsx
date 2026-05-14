import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import Confetti from 'react-confetti'
import '../styles/Screen6.css'

function Rain() {
  const drops = useMemo(() => {
    const arr = []
    for (let i = 0; i < 60; i++) arr.push({
      id: `a${i}`, left: Math.random() * 110 - 5, height: 55 + Math.random() * 50,
      width: 0.8, duration: 0.5 + Math.random() * 0.4, delay: Math.random() * 3,
      opacity: 0.1 + Math.random() * 0.1, slant: -13 + Math.random() * 5,
    })
    for (let i = 0; i < 35; i++) arr.push({
      id: `b${i}`, left: Math.random() * 110 - 5, height: 75 + Math.random() * 60,
      width: 1.2, duration: 0.65 + Math.random() * 0.45, delay: Math.random() * 3,
      opacity: 0.13 + Math.random() * 0.1, slant: -15 + Math.random() * 4,
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

export default function Screen6_Ending() {
  const [forgiven, setForgiven] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const handle = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])

  const handleForgive = () => {
    setForgiven(true)
    setConfetti(true)
    setTimeout(() => setConfetti(false), 6000)
  }

  return (
    <motion.div
      className="screen s6-bg"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <Rain />
      {confetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          colors={['#C9A84C', '#E8C97A', '#f9d4e2', '#fff', '#4A1020', '#FFD700']}
          numberOfPieces={280}
          recycle={false}
        />
      )}

      <div className="s6-content">
        {/* Candle */}
        <motion.div
          className="s6-candle-wrap"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        >
          <div className="candle-wrap">
            <div className="glow-ring" style={{ width: '180px', height: '180px', top: '-60px' }} />
            <div className="flame" style={{ width: '22px', height: '50px' }} />
            <div className="candle-body" style={{ width: '30px', height: '100px' }}>
              <div className="candle-drip" />
            </div>
            <div className="candle-base" style={{ width: '40px' }} />
          </div>
        </motion.div>

        {/* Apology text */}
        <motion.div
          className="s6-text-block"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
        >
          <p className="s6-main-text">I am truly sorry, Ladoo.</p>
          <p className="s6-main-text gold">For everything I put you through.</p>
        </motion.div>

        <motion.div
          className="s6-lines"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1.5 }}
        >
          <p className="s6-line">I know words are not enough.</p>
          <p className="s6-line">But I mean every single one of them.</p>
          <p className="s6-line italic">I'm not going anywhere.</p>
          <p className="s6-line italic gold-dim">Whenever you're ready — I'll be right here.</p>
        </motion.div>

        {/* Forgive button or post-forgive message */}
        {!forgiven ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.5, duration: 1 }}
          >
            <button className="gold-btn forgive-btn" onClick={handleForgive}>
              💗 Forgive Me
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="s6-forgiven-wrap"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.p
              className="s6-forgiven-text"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: 2, duration: 0.5 }}
            >
              💗 Thank you. That means everything to me. 💗
            </motion.p>
            <motion.p
              className="s6-forgiven-sub"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              I will spend every day making sure you never regret this.
            </motion.p>
          </motion.div>
        )}

        <motion.p
          className="s6-footer"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 5.5, duration: 2 }}
        >
          Made with every ounce of love I have, Ladoo. 🕯️
        </motion.p>
      </div>
    </motion.div>
  )
}
