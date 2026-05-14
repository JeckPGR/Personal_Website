import { motion } from 'framer-motion'
import BentoGrid from '../components/BentoGrid'

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-0 flex-1 flex-col gap-[14px] lg:h-full"
    >
      <BentoGrid />
    </motion.div>
  )
}

export default Home
