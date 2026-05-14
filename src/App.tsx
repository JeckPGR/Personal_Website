import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import SplashScreen from './components/SplashScreen'
import { SmoothCursor } from './components/ui/smooth-cursor'
import About from './pages/About'
import Education from './pages/Education'
import Home from './pages/Home'
import TechStack from './pages/TechStack'
import WhatIDo from './pages/WhatIDo'
import Work from './pages/Work'
import WorkDetail from './pages/WorkDetail'

function PortfolioRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="what-i-do" element={<WhatIDo />} />
        <Route path="work" element={<Work />} />
        <Route path="work/:slug" element={<WorkDetail />} />
        <Route path="tech-stack" element={<TechStack />} />
        <Route path="education" element={<Education />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

function App() {
  const [splashDone, setSplashDone] = useState(
    () => sessionStorage.getItem('splashShown') === 'true',
  )

  const handleSplashDone = useCallback(() => {
    setSplashDone(true)
  }, [])

  return (
    <BrowserRouter>
      <SmoothCursor />
      <motion.div
        initial={false}
        animate={{ opacity: splashDone ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <PortfolioRoutes />
      </motion.div>
      <AnimatePresence>
        {!splashDone ? <SplashScreen onDone={handleSplashDone} /> : null}
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default App
