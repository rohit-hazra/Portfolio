import { motion } from 'framer-motion'

function SkillNode({ group, index }) {
  const Icon = group.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55 }}
      className={`skill-node skill-node-${group.accent}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-primary mt-2 text-xl font-semibold">{group.title}</h3>
        </div>
        <div className="node-icon">
          <Icon size={22} />
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span key={skill} className="skill-chip">
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default SkillNode
