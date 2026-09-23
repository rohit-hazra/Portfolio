import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function AnimatedButton({
  children,
  href = '#contact',
  icon: Icon = ArrowRight,
  className = '',
  variant = 'primary',
  target,
  rel,
  download,
}) {
  const Component = href ? 'a' : 'button'

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex ${className}`}
    >
      <Component
        href={href}
        target={target}
        rel={rel}
        download={download}
        className={`magnetic-button ${
          variant === 'ghost' ? 'magnetic-button-ghost' : ''
        }`}
      >
        <span>{children}</span>
        <Icon size={18} aria-hidden="true" />
      </Component>
    </motion.div>
  )
}

export default AnimatedButton
