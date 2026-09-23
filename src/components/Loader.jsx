import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function Loader() {
  const [dots, setDots] = useState('.')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? '.' : prev + '.'))
    }, 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="loader-screen fixed inset-0 z-[100] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45 } }}
    >
      {/* Loader Circle */}
      <div className="relative flex items-center justify-center">
        <motion.div
          className="h-20 w-20 rounded-full border-4 border-cyan-500 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
        />

        {/* Center Text */}
        <span className="absolute text-2xl font-bold tracking-wider text-cyan-400 select-none">
          RH
        </span>
      </div>

      {/* Loading Text */}
      <p className="mt-6 text-sm font-medium tracking-[0.25em] text-slate-300">
        Loading{dots}
      </p>
    </motion.div>
  )
}

export default Loader