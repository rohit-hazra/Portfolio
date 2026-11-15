import { memo, useEffect, useRef } from 'react'
import { useTheme } from '../context/useTheme'

function readColor(variableName, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim()
  return value || fallback
}

function getParticleCount(width) {
  if (width < 520) return 34
  if (width < 900) return 58
  return Math.min(96, Math.round(width / 15))
}

function getPalette(isDark) {
  const accent = readColor('--accent', isDark ? '#06b6d4' : '#0891b2')
  const accentHover = readColor('--accent-hover', isDark ? '#22d3ee' : '#06b6d4')

  return {
    particle: isDark ? accentHover : '#0e7490',
    particleCore: isDark ? '#bfdbfe' : accent,
    line: isDark ? accent : '#0f7490',
    glow: isDark ? accentHover : accent,
    cursorGlow: isDark ? 'rgba(34, 211, 238, ' : 'rgba(14, 116, 144, ',
    lineBase: isDark ? 0.16 : 0.12,
    lineMouse: isDark ? 0.34 : 0.24,
    dotBase: isDark ? 0.38 : 0.32,
  }
}

function HeroBackground() {
  const canvasRef = useRef(null)
  const objectLayerRef = useRef(null)
  const mouseRef = useRef({
    x: 0,
    y: 0,
    smoothX: 0,
    smoothY: 0,
    parallaxX: 0,
    parallaxY: 0,
    active: false,
    initialized: false,
  })
  const { isDark } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const section = canvas?.closest('.hero-section')
    const context = canvas?.getContext('2d')
    if (!canvas || !section || !context) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canUsePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const palette = getPalette(isDark)
    const particles = []
    let width = 0
    let height = 0
    let animationFrame = 0
    let resizeTimer = 0

    const createParticle = () => {
      const depth = 0.45 + Math.random() * 0.75
      const speed = reduceMotion ? 0 : (0.06 + Math.random() * 0.22) * depth
      const angle = Math.random() * Math.PI * 2
      const baseRadius = (0.9 + Math.random() * 2.3) * depth

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        drift: Math.random() * Math.PI * 2,
        driftSpeed: 0.004 + Math.random() * 0.008,
        depth,
        radius: baseRadius,
        alpha: palette.dotBase * (0.55 + Math.random() * 0.65),
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.012 + Math.random() * 0.018,
        energy: 0,
      }
    }

    const getCenterFade = (x, y) => {
      const centerX = width / 2
      const centerY = height * 0.48
      const normalizedX = Math.abs(x - centerX) / Math.max(width * 0.34, 1)
      const normalizedY = Math.abs(y - centerY) / Math.max(height * 0.32, 1)
      const distance = Math.hypot(normalizedX, normalizedY)

      return distance < 1 ? 0.58 + distance * 0.32 : 1
    }

    const resize = () => {
      const rect = section.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      const ratio = Math.min(window.devicePixelRatio || 1, 1.6)

      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const targetCount = reduceMotion ? Math.round(getParticleCount(width) * 0.45) : getParticleCount(width)
      while (particles.length < targetCount) particles.push(createParticle())
      particles.length = targetCount

      particles.forEach((particle) => {
        particle.x = Math.min(Math.max(particle.x, 0), width)
        particle.y = Math.min(Math.max(particle.y, 0), height)
      })
    }

    const queueResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(resize, 120)
    }

    const setMousePosition = (event) => {
      if (!canUsePointer || reduceMotion) return
      const rect = section.getBoundingClientRect()
      const mouse = mouseRef.current

      mouse.x = event.clientX - rect.left
      mouse.y = event.clientY - rect.top
      mouse.active = mouse.x >= 0 && mouse.x <= width && mouse.y >= 0 && mouse.y <= height

      if (!mouse.initialized) {
        mouse.smoothX = mouse.x
        mouse.smoothY = mouse.y
        mouse.initialized = true
      }
    }

    const clearMouse = () => {
      mouseRef.current.active = false
    }

    const drawCursorGlow = (mouse) => {
      if (!mouse.active) return

      const radius = width < 720 ? 180 : 260
      const gradient = context.createRadialGradient(mouse.smoothX, mouse.smoothY, 0, mouse.smoothX, mouse.smoothY, radius)
      gradient.addColorStop(0, `${palette.cursorGlow}${isDark ? 0.14 : 0.08})`)
      gradient.addColorStop(0.38, `${palette.cursorGlow}${isDark ? 0.07 : 0.045})`)
      gradient.addColorStop(1, `${palette.cursorGlow}0)`)

      context.fillStyle = gradient
      context.fillRect(mouse.smoothX - radius, mouse.smoothY - radius, radius * 2, radius * 2)
    }

    const updateParticles = (mouse) => {
      const interactionRadius = width < 720 ? 145 : 180

      particles.forEach((particle) => {
        particle.drift += particle.driftSpeed
        particle.pulse += particle.pulseSpeed
        particle.energy *= 0.9

        if (!reduceMotion) {
          particle.x += particle.vx + Math.sin(particle.drift) * 0.035 * particle.depth
          particle.y += particle.vy + Math.cos(particle.drift * 0.8) * 0.03 * particle.depth

          if (mouse.active) {
            const dx = particle.x - mouse.smoothX
            const dy = particle.y - mouse.smoothY
            const distance = Math.hypot(dx, dy)

            if (distance > 0 && distance < interactionRadius) {
              const force = (1 - distance / interactionRadius) ** 2
              const push = force * (1.85 + particle.depth * 0.9)
              particle.x += (dx / distance) * push
              particle.y += (dy / distance) * push
              particle.energy = Math.max(particle.energy, force)
            }
          }
        }

        if (particle.x < -24) particle.x = width + 24
        if (particle.x > width + 24) particle.x = -24
        if (particle.y < -24) particle.y = height + 24
        if (particle.y > height + 24) particle.y = -24
      })
    }

    const drawConnections = (mouse) => {
      const connectionDistance = width < 640 ? 105 : 145
      const nearbyMouseParticles = []

      for (let i = 0; i < particles.length; i += 1) {
        const first = particles[i]

        if (mouse.active && Math.hypot(first.x - mouse.smoothX, first.y - mouse.smoothY) < 180) {
          nearbyMouseParticles.push(first)
        }

        for (let j = i + 1; j < particles.length; j += 1) {
          const second = particles[j]
          const distance = Math.hypot(first.x - second.x, first.y - second.y)

          if (distance < connectionDistance) {
            const midpointX = (first.x + second.x) / 2
            const midpointY = (first.y + second.y) / 2
            const mouseDistance = mouse.active ? Math.hypot(midpointX - mouse.smoothX, midpointY - mouse.smoothY) : 999
            const mouseBoost = Math.max(0, 1 - mouseDistance / 190) * palette.lineMouse
            const depthBoost = (first.depth + second.depth) * 0.025
            const fade = getCenterFade(midpointX, midpointY)
            const alpha = (1 - distance / connectionDistance) * palette.lineBase * fade + mouseBoost

            context.beginPath()
            context.moveTo(first.x, first.y)
            context.lineTo(second.x, second.y)
            context.strokeStyle = palette.line
            context.globalAlpha = Math.min(0.48, alpha + depthBoost)
            context.lineWidth = 0.55 + Math.min(first.depth, second.depth) * 0.35
            context.stroke()
          }
        }
      }

      nearbyMouseParticles
        .sort((a, b) => Math.hypot(a.x - mouse.smoothX, a.y - mouse.smoothY) - Math.hypot(b.x - mouse.smoothX, b.y - mouse.smoothY))
        .slice(0, 5)
        .forEach((particle) => {
          const distance = Math.hypot(particle.x - mouse.smoothX, particle.y - mouse.smoothY)
          const alpha = Math.max(0, 1 - distance / 180) * (isDark ? 0.24 : 0.16)

          context.beginPath()
          context.moveTo(mouse.smoothX, mouse.smoothY)
          context.lineTo(particle.x, particle.y)
          context.strokeStyle = palette.line
          context.globalAlpha = alpha
          context.lineWidth = 0.6
          context.stroke()
        })
    }

    const drawParticles = () => {
      particles.forEach((particle) => {
        const pulse = (Math.sin(particle.pulse) + 1) / 2
        const rarePulse = pulse > 0.9 ? (pulse - 0.9) * 10 : 0
        const fade = getCenterFade(particle.x, particle.y)
        const radius = particle.radius + particle.energy * 2.4 + rarePulse * 0.55
        const alpha = Math.min(0.86, (particle.alpha + particle.energy * 0.34 + rarePulse * 0.12) * fade)

        context.beginPath()
        context.arc(particle.x, particle.y, radius + 3.5, 0, Math.PI * 2)
        context.fillStyle = palette.glow
        context.globalAlpha = alpha * (isDark ? 0.16 : 0.1)
        context.fill()

        context.beginPath()
        context.arc(particle.x, particle.y, radius, 0, Math.PI * 2)
        context.fillStyle = particle.energy > 0.15 ? palette.particleCore : palette.particle
        context.globalAlpha = alpha
        context.fill()
      })
    }

    const draw = () => {
      const mouse = mouseRef.current
      mouse.smoothX += (mouse.x - mouse.smoothX) * 0.13
      mouse.smoothY += (mouse.y - mouse.smoothY) * 0.13

      if (objectLayerRef.current && !reduceMotion) {
        const targetParallaxX = mouse.active ? (mouse.smoothX / width - 0.5) * -1 : 0
        const targetParallaxY = mouse.active ? (mouse.smoothY / height - 0.5) * -1 : 0
        mouse.parallaxX += (targetParallaxX - mouse.parallaxX) * 0.08
        mouse.parallaxY += (targetParallaxY - mouse.parallaxY) * 0.08
        objectLayerRef.current.style.setProperty('--hero-parallax-x', mouse.parallaxX.toFixed(3))
        objectLayerRef.current.style.setProperty('--hero-parallax-y', mouse.parallaxY.toFixed(3))
      }

      context.clearRect(0, 0, width, height)
      drawCursorGlow(mouse)
      updateParticles(mouse)
      drawConnections(mouse)
      drawParticles()
      context.globalAlpha = 1

      if (!reduceMotion) {
        animationFrame = window.requestAnimationFrame(draw)
      }
    }

    resize()
    draw()

    section.addEventListener('pointermove', setMousePosition)
    section.addEventListener('pointerleave', clearMouse)
    window.addEventListener('resize', queueResize)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.clearTimeout(resizeTimer)
      section.removeEventListener('pointermove', setMousePosition)
      section.removeEventListener('pointerleave', clearMouse)
      window.removeEventListener('resize', queueResize)
    }
  }, [isDark])

  return (
    <div className="hero-background" aria-hidden="true">
      <div className="hero-background-glow hero-background-glow-one" />
      <div className="hero-background-glow hero-background-glow-two" />
      <div className="hero-background-glow hero-background-glow-three" />
      
      <canvas ref={canvasRef} className="hero-network-canvas" />
    </div>
  )
}

export default memo(HeroBackground)
