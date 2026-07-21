import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import SplashScreen from './components/SplashScreen'
import About from './pages/About'
import Certification from './pages/Certification'
import Home from './pages/Home'
import Project from './pages/Project'
import TechStack from './pages/TechStack'
import Work from './pages/Work'
import WorkDetail from './pages/WorkDetail'
import ChatWidget from './components/ui/ChatWidget'
import CustomCursor from './components/CustomCursor'
import NotFound from './pages/NotFound'
import ProjectDetail from './pages/ProjectDetail'
import PageTransitionOverlay from './components/PageTransition'
import { usePageTransition } from './hooks/usePageTransition'

type RouteLocation = ReturnType<typeof useLocation>

function PortfolioRoutes({ location }: { location: RouteLocation }) {
  return (
    <Routes location={location}>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />  
        <Route path="work" element={<Work />} />
        <Route path="project" element={<Project />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="work/:slug" element={<WorkDetail />} />
        <Route path="tech-stack" element={<TechStack />} />
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
      <AppShell splashDone={splashDone} onSplashDone={handleSplashDone} />
    </BrowserRouter>
  )
}

type AppShellProps = {
  splashDone: boolean
  onSplashDone: () => void
}

/** Lives inside the router so it can drive the page-transition curtain. */
function AppShell({ splashDone, onSplashDone }: AppShellProps) {
  const { displayLocation, isTransitioning, target } = usePageTransition()

  return (
    <>
      <motion.div
        initial={false}
        animate={{ opacity: splashDone ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <PortfolioRoutes location={displayLocation} />
      </motion.div>
      <AnimatePresence>
        {!splashDone ? <SplashScreen onDone={onSplashDone} /> : null}
      </AnimatePresence>

      <PageTransitionOverlay active={isTransitioning} target={target} />
      <ChatWidget/>
      <CustomCursor />
    </>
  )
}

export default App
