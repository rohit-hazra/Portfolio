import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '../context/useTheme'

const links = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Skills', 'skills'],
  ['Work', 'projects'],
  ['Contact', 'contact'],
]

function Navbar() {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const current = links
        .map(([, id]) => document.getElementById(id))
        .filter(Boolean)
        .findLast((section) => section.getBoundingClientRect().top < 180)
      if (current) setActive(current.id)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
  }

  return (
    <header className="fixed left-0 right-0 top-4 z-[90] px-4">
      <motion.nav
        className="nav-shell"
        animate={{
          width: scrolled ? "75%" : "92%",
          paddingTop: scrolled ? 8 : 12,
          paddingBottom: scrolled ? 8 : 12,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <button type="button" onClick={() => goTo('home')} className="brand-mark" aria-label="Go to home">
          RH
        </button>
        <div className="hidden items-center gap-1 md:flex">
          {links.map(([label, id]) => (
            <button key={id} type="button" onClick={() => goTo(id)} className="nav-link">
              {active === id && <motion.span layoutId="active-pill" className="active-pill" />}
              <span>{label}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            aria-pressed={isDark}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              className="theme-toggle-thumb"
              animate={{
                x: isDark ? 33 : 0,
                rotate: isDark ? 360 : 0,
                scale: [0.94, 1.08, 1],
              }}
              transition={{
                x: { type: 'spring', stiffness: 420, damping: 28 },
                rotate: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? 'moon' : 'sun'}
                  className="grid place-items-center"
                  initial={{ rotate: -90, scale: 0.45, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  {isDark ? <Moon size={16} /> : <Sun size={16} />}
                </motion.span>
              </AnimatePresence>
            </motion.span>
          </motion.button>
          <button
            type="button"
            className="icon-button md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mobile-menu"
          >
            {links.map(([label, id]) => (
              <button key={id} type="button" onClick={() => goTo(id)} className="mobile-link">
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
