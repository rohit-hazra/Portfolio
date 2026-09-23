import { motion } from 'framer-motion'

function SectionTitle({ eyebrow, copy }) {
  // const supportingCopy = [title, copy].filter(Boolean).join(' ')

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10 max-w-3xl"
    >
      <h2 className="text-primary text-3xl font-semibold leading-tight md:text-5xl">{eyebrow}</h2>
      {copy && <p className="text-secondary mt-4 max-w-2xl text-base leading-7 md:text-lg">{copy}</p>}
    </motion.div>
  )
}

export default SectionTitle
