import { useState, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import Screen1_Opening from './components/Screen1_Opening'
import Screen2_Confession from './components/Screen2_Confession'
import Screen3_Memories from './components/Screen3_Memories'
import Screen4_Promises from './components/Screen4_Promises'
import Screen5_Surprise from './components/Screen5_Surprise'
import Screen6_Ending from './components/Screen6_Ending'
import '@fontsource/playfair-display/400.css'
import '@fontsource/playfair-display/700.css'
import '@fontsource/special-elite'
import '@fontsource/caveat/400.css'
import '@fontsource/caveat/700.css'
import './App.css'

export default function App() {
  const [screen, setScreen] = useState(1)
  const [muted, setMuted] = useState(false)
  const bgMusicRef = useRef(null)

  useEffect(() => {
    bgMusicRef.current = new Audio('/music/background.mp3')
    bgMusicRef.current.loop = true
    bgMusicRef.current.volume = 0.25

    // Try autoplay immediately; if browser blocks it, start on first interaction
    bgMusicRef.current.play().catch(() => {
      const tryPlay = () => {
        bgMusicRef.current.play().catch(() => {})
        document.removeEventListener('click', tryPlay)
        document.removeEventListener('touchstart', tryPlay)
      }
      document.addEventListener('click', tryPlay, { once: true })
      document.addEventListener('touchstart', tryPlay, { once: true })
    })

    return () => bgMusicRef.current?.pause()
  }, [])

  useEffect(() => {
    if (bgMusicRef.current) bgMusicRef.current.muted = muted
  }, [muted])

  // Lower bg music while poem audio plays on Screen 2
  useEffect(() => {
    if (!bgMusicRef.current) return
    bgMusicRef.current.volume = screen === 2 || screen === 5 ? 0.02 : 0.25
  }, [screen])

  const goTo = (n) => setScreen(n)

  return (
    <div className="app-root">
      <button className="mute-btn" onClick={() => setMuted(m => !m)} aria-label="toggle music">
        {muted ? '🔇' : '🎵'}
      </button>
      <AnimatePresence mode="wait">
        {screen === 1 && <Screen1_Opening key="s1" onNext={() => goTo(2)} />}
        {screen === 2 && <Screen2_Confession key="s2" muted={muted} onNext={() => goTo(3)} />}
        {screen === 3 && <Screen3_Memories key="s3" onNext={() => goTo(4)} />}
        {screen === 4 && <Screen4_Promises key="s4" onNext={() => goTo(5)} />}
        {screen === 5 && <Screen5_Surprise key="s5" onNext={() => goTo(6)} />}
        {screen === 6 && <Screen6_Ending key="s6" />}
      </AnimatePresence>
    </div>
  )
}
