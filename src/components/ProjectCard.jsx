import { motion } from 'framer-motion'
import { ExternalLink, GitBranch } from 'lucide-react'
import GlassCard from './GlassCard'
import { useState } from 'react'

function ProjectCard({ project, index }) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, delay: index * 0.08 }}
      className="project-perspective"
    >
      <GlassCard className="project-card group">
        <div className="project-visual">
          {
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--surface)]">
                  <div className="project-loader" />
                </div>
              )}

              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-500 group-hover:scale-[1.03] ${imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
              />
            </>
          }
        </div>
        <p className="text-accent mt-5 text-sm">{project.category}</p>
        <h3 className="text-primary mt-2 text-2xl font-semibold">{project.title}</h3>
        <p className="text-secondary mt-3 text-sm leading-6">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="chip">
              {tech}
            </span>
          ))}
        </div>
        <ul className="text-secondary mt-5 space-y-2 text-sm">
          {project.features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-hover)]" />
              {feature}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between gap-3">
          <span className="text-primary text-sm font-medium">{project.metric}</span>
          <div className="flex gap-2">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="icon-button" aria-label={`${project.title} GitHub`}>
              <GitBranch size={18} />
            </a>
            <a href={project.demo} className="icon-button" aria-label={`${project.title} live demo`}>
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

export default ProjectCard
