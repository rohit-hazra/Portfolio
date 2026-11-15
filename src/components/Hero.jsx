import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Mail, Rocket, Sparkles } from 'lucide-react'
import AnimatedButton from './AnimatedButton'
import SocialLinks from './SocialLinks'
import { profile } from '../data/portfolio'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const typingDelay = 85
const deletingDelay = 45
const holdDelay = 1300

function Hero() {
  const titles = useMemo(
    () => [
      profile.title,
      'AI Full Stack Developer',
      'React Developer',
      'Problem Solver',
      'AI Tools Enthusiast',
    ],
    [],
  )
  const [titleIndex, setTitleIndex] = useState(0)
  const [letterCount, setLetterCount] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const currentTitle = titles[titleIndex]
    const isComplete = letterCount === currentTitle.length
    const isEmpty = letterCount === 0

    const timer = window.setTimeout(
      () => {
        if (!deleting && isComplete) {
          setDeleting(true)
          return
        }
        if (deleting && isEmpty) {
          setDeleting(false)
          setTitleIndex((index) => (index + 1) % titles.length)
          return
        }
        setLetterCount((count) => count + (deleting ? -1 : 1))
      },
      !deleting && isComplete ? holdDelay : deleting ? deletingDelay : typingDelay,
    )

    return () => window.clearTimeout(timer)
  }, [deleting, letterCount, titleIndex, titles])

  const typedTitle = titles[titleIndex].slice(0, letterCount)

  return (
    <section id="home" className="hero-section">
      <motion.div className="hero-content" variants={container} initial="hidden" animate="visible">
        <motion.div variants={item} className="availability-badge">
          <Sparkles size={16} aria-hidden="true" />
          <span>{profile.availability}</span>
        </motion.div>

        <motion.div variants={item}>
          <h1 className="hero-heading">
            <span>Hello, I am</span>
            <strong>{profile.name}</strong>
          </h1>
        </motion.div>

        <motion.p variants={item} className="hero-title">
          <span>{typedTitle}</span>
          <span className="typing-caret" aria-hidden="true" />
        </motion.p>

        <motion.p variants={item} className="hero-intro">
          {profile.intro}
        </motion.p>

        <motion.div variants={item} className="hero-actions">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <AnimatedButton href="#projects" icon={Rocket}>
              View Projects
            </AnimatedButton>
            <AnimatedButton
              href={profile.resumeHref}
              icon={Download}
              variant="ghost"
              target="_blank"
              rel="noopener noreferrer"
              download="Rohit_Hazra_Resume.pdf"
            >
              Download Resume
            </AnimatedButton>
            <AnimatedButton href="#contact" icon={Mail} variant="ghost">
              Contact Me
            </AnimatedButton>
          </div>
        </motion.div>

        <motion.div variants={item} className="hero-socials">
          <div className="flex justify-center">
            <SocialLinks />
          </div>
        </motion.div>
      </motion.div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to about">
        <ArrowDown size={18} />
      </a>
    </section>
  )
}

export default Hero
