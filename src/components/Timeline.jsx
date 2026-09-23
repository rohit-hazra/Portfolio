import { motion } from 'framer-motion'

function Timeline({ items, compact = false, variant = 'work' }) {
  return (
    <div className={`timeline ${compact ? 'mt-5' : ''}`} data-variant={variant}>
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <motion.article
            key={`${item.title}-${item.period}`}
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.55, delay: index * 0.06 }}
            className="timeline-item group"
          >
            <div className="timeline-marker">
              <Icon size={18} />
            </div>
            <div className="timeline-panel">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-accent text-sm">{item.meta}</p>
                  <h3 className="text-primary mt-1 text-xl font-semibold">{item.title}</h3>
                </div>
                <span className="period-pill">
                  {item.period}
                </span>
              </div>
              <p className="text-secondary mt-4 max-w-3xl text-sm leading-6">{item.copy}</p>
              {item.responsibilities && (
                <ul className="timeline-list">
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility}>
                      <span />
                      {responsibility}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.article>
        )
      })}
    </div>
  )
}

export default Timeline
