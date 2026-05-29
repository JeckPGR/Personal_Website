import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import SplashScreen from './components/SplashScreen'
import About from './pages/About'
import Certification from './pages/Certification'
import Education from './pages/Education'
import Home from './pages/Home'
import Project from './pages/Project'
import TechStack from './pages/TechStack'
import Work from './pages/Work'
import WorkDetail from './pages/WorkDetail'
import ChatWidget from './components/ui/ChatWidget'
import NotFound from './pages/NotFound'

function PortfolioRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />  
        <Route path="work" element={<Work />} />
        <Route path="project" element={<Project />} />
        <Route path="work/:slug" element={<WorkDetail />} />
        <Route path="tech-stack" element={<TechStack />} />
        <Route path="education" element={<Education />} />
        <Route path="certification" element={<Certification />} />
        <Route path="*" element={<NotFound />} />
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

      <ChatWidget/>
    </BrowserRouter>
  )
}

export default App
