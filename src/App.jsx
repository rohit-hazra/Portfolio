import { motion, useScroll, useSpring } from 'framer-motion'
import {
  achievements,
  aboutInfo,
  certifications,
  contactDetails,
  education,
  experience,
  profile,
  projects,
  skillGroups,
  stats,
  techStack,
} from './data/portfolio'
import AnimatedButton from './components/AnimatedButton'
import BackToTopButton from './components/BackToTopButton'
import BackgroundEffects from './components/BackgroundEffects'
import Counter from './components/Counter'
import Footer from './components/Footer'
import GlassCard from './components/GlassCard'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ProjectCard from './components/ProjectCard'
import SectionTitle from './components/SectionTitle'
import SkillNode from './components/SkillNode'
import SocialLinks from './components/SocialLinks'
import Timeline from './components/Timeline'
import { Send, Sparkles } from 'lucide-react'
import profilePhoto from './assets/profile_photo1.png'

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  return (
    <>
      <motion.div className="scroll-progress fixed left-0 top-0 z-[80] h-1 origin-left" style={{ scaleX }} />
      <BackgroundEffects />
      <Navbar />
      <main className="theme-transition">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Achievements />
        <TechStack />
        <Contact />
      </main>
      <BackToTopButton />
      <Footer />
    </>
  )
}

function About() {
  return (
    <section id="about" className="section-shell">
      <SectionTitle
        eyebrow="About"
        copy="A CSE student building practical full-stack products with clean UI, strong fundamentals, and a steady learning rhythm."
      />
      <div className="grid items-center gap-6 lg:grid-cols-[0.78fr_1.22fr]">
        <motion.div {...reveal}>
          <GlassCard className="about-photo-card">
            <div className="photo-glow" />
            <div className="photo-frame">
              {/* Replace this placeholder with your real image: */}
              <img src={profilePhoto} alt="Rohit Hazra" className="profile-photo" />

              {/* <div className="profile-photo-placeholder" aria-label="Rohit Hazra photo placeholder">
                RH
              </div> */}
            </div>
            <div className="photo-badge">MERN Developer</div>
          </GlassCard>
        </motion.div>
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
          <GlassCard className="h-full p-6 md:p-8">
            <div className="text-accent flex items-center gap-3">
              <Sparkles size={20} />
              <span className="text-sm uppercase tracking-[0.28em]">About Me</span>
            </div>
            <p className="text-secondary mt-6 text-lg leading-8">
              I am {profile.name}, currently pursuing B.Tech in Computer Science & Engineering at Balasore College of Engineering & Technology (BCET) a BPUT, Rourkela-affiliated
              institution. My focus is full stack development, especially building scalable MERN applications that are
              responsive, efficient, and easy to use. I enjoy solving problems, learning modern development tools, and
              turning ideas into clean digital experiences.
            </p>
            <div className="info-grid mt-7">
              {aboutInfo.map(([label, value]) => (
                <div key={label} className="info-tile">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <GlassCard key={stat.label} className="p-5">
            <Counter {...stat} />
          </GlassCard>
        ))}
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section-shell">
      <SectionTitle
        eyebrow="Skills"
        copy="A practical MERN toolkit with strong computer science roots, organized around the tools I use to design, build, debug, and deploy modern web applications."
      />
      <motion.div
        {...reveal}
        className="skill-board"
      >
        <div className="absolute inset-0 constellation-grid opacity-60" />
        <div className="relative grid gap-4 md:grid-cols-3">
          {skillGroups.map((group, index) => (
            <SkillNode key={group.title} group={group} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="section-shell">
      <SectionTitle
        eyebrow="Featured Work"
        copy="Projects built around real product problems, with a focus on usability, structure, and full-stack implementation rather than just surface-level UI."
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="section-shell">
      <SectionTitle
        eyebrow="Internship Experience"
        copy="Hands-on development exposure across web and software projects, including two internship experiences that strengthened my frontend execution, engineering workflow, and practical problem-solving."
      />
      <Timeline items={experience} />
    </section>
  )
}

function Education() {
  return (
    <section id="education" className="section-shell">
      <SectionTitle eyebrow="Education" copy="A focused academic path in Computer Science & Engineering." />
      <Timeline items={education} variant="academic" />
    </section>
  )
}

function Certifications() {
  return (
    <section id="certifications" className="section-shell">
      <SectionTitle
        eyebrow="Certifications"
        copy="Professional certifications and internship credentials that reflect my continuous learning and practical experience."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {certifications.map((certificate, index) => (
          <motion.div
            key={certificate.title}
            {...reveal}
            transition={{
              ...reveal.transition,
              delay: index * 0.08,
            }}
            className="h-full"
          >
            <GlassCard className="group relative flex h-full flex-col overflow-hidden p-0">
              {/* Top accent */}
              <div className="h-1 w-full bg-[linear-gradient(90deg,var(--accent),transparent)]" />

              {/* Certificate visual */}
              <div className="relative mx-5 mt-5 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--glass-strong)] p-5">
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--accent)] opacity-10 blur-2xl transition-all duration-500 group-hover:scale-150" />

                <div className="relative flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-[var(--border)] bg-[var(--glass)] text-[var(--accent)]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-6 w-6"
                    >
                      <path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                      <path d="M8 7h8M8 11h8M8 15h5" />
                    </svg>
                  </div>

                  <span className="rounded-full border border-[var(--border)] bg-[var(--glass)] px-3 py-1 text-xs font-medium text-secondary">
                    {certificate.year}
                  </span>
                </div>

                <div className="mt-7">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                    {certificate.type}
                  </p>

                  <div className="mt-3 h-px w-16 bg-[var(--accent)] opacity-60" />

                  <p className="mt-3 text-xs text-secondary">
                    Certificate of Achievement
                  </p>
                </div>
              </div>

              {/* Certificate details */}
              <div className="flex flex-1 flex-col p-5 pt-4">
                <h3 className="text-primary text-xl font-semibold leading-snug transition-colors duration-300 group-hover:text-accent">
                  {certificate.title}
                </h3>

                <div className="mt-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />

                  <p className="text-sm text-secondary">
                    {certificate.issuer}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4">
                  <span className="text-xs text-secondary">
                    Issued in {certificate.year}
                  </span>

                  {/* <span className="text-xs font-medium text-accent transition-transform duration-300 group-hover:translate-x-1">
                    Verified Credential →
                  </span> */}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Achievements() {
  return (
    <section id="achievements" className="section-shell">
      <SectionTitle eyebrow="Achievements" copy="A few numbers with momentum behind them." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((item, index) => (
          <motion.div key={item.label} {...reveal} transition={{ ...reveal.transition, delay: index * 0.05 }}>
            <GlassCard className="p-5">
              <Counter {...item} />
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function TechStack() {
  return (
    <section id="stack" className="section-shell">
      <SectionTitle
        eyebrow="Tech Stack"
        copy="The stack I use to move from idea to deployed application."
      />
      <motion.div
      {...reveal}
      className="relative mx-auto mt-10 max-w-6xl"
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {techStack.map((tech, index) => (
          <motion.div
            key={tech}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              delay: index * 0.06,
            }}
            whileHover={{
              y: -8,
              scale: 1.04,
            }}
            className="group relative"
          >
            <div className="relative flex min-h-[105px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--glass-strong)] p-4 text-center backdrop-blur-xl transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_12px_40px_var(--shadow)]">
              
              {/* Hover glow */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[var(--accent)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20" />

              {/* Index */}
              <span className="absolute right-3 top-3 text-[10px] font-medium text-secondary opacity-50">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Icon placeholder */}
              <div className="relative mb-3 grid h-11 w-11 place-items-center rounded-xl border border-[var(--border)] bg-[var(--glass)] text-sm font-bold text-accent transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--accent)]">
                {tech
                  .split(' ')
                  .map((word) => word[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              {/* Technology name */}
              <span className="relative text-sm font-medium text-primary transition-colors duration-300 group-hover:text-accent">
                {tech}
              </span>

              {/* Bottom indicator */}
              <div className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-[var(--accent)] transition-all duration-300 group-hover:w-1/2" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section-shell pb-24">
      <SectionTitle
        eyebrow="Contact"
        copy="Let’s connect about internships, full-time roles, or MERN projects. Use the form or reach out through any of the links below."
      />
      <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
        <motion.div {...reveal}>
          <GlassCard className="h-full p-6">
            <div className="space-y-4">
              {contactDetails.map(({ label, value, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="contact-link"
                >
                  <Icon size={18} className="text-accent" />
                  <span>
                    <span className="block text-xs uppercase tracking-[0.2em] opacity-70">{label}</span>
                    <strong className="font-medium">{value}</strong>
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-8">
              <SocialLinks />
            </div>
          </GlassCard>
        </motion.div>
        <motion.form
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.08 }}
          className="form-panel md:p-7"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input aria-label="Name" placeholder="Name" className="field" />
            <input aria-label="Email" type="email" placeholder="Email" className="field" />
          </div>
          <input aria-label="Subject" placeholder="Subject" className="field mt-4" />
          <textarea aria-label="Message" placeholder="Message" rows="6" className="field mt-4 resize-none" />
          <AnimatedButton className="mt-5" icon={Send}>
            Send Message
          </AnimatedButton>
        </motion.form>
      </div>
    </section>
  )
}

export default App
