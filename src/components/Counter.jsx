import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function Counter({ value, suffix = '', label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame = 0
    const frames = 42
    const timer = window.setInterval(() => {
      frame += 1
      setCount(Math.round((value * frame) / frames))
      if (frame >= frames) window.clearInterval(timer)
    }, 24)
    return () => window.clearInterval(timer)
  }, [inView, value])

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className="text-primary text-3xl font-semibold md:text-4xl">
        {count}
        <span className="text-accent">{suffix}</span>
      </div>
      <p className="text-secondary mt-2 text-sm">{label}</p>
    </motion.div>
  )
}

export default Counter
