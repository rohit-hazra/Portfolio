import { motion } from 'framer-motion'

function GlassCard({ children, className = '' }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={`glass-card ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default GlassCard
