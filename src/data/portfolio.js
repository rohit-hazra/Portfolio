import {
  BadgeCheck,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  GitBranch,
  Globe2,
  GraduationCap,
  Layers3,
  Mail,
  MonitorSmartphone,
  Palette,
  Phone,
  Server,
  ShieldCheck,
  TerminalSquare,
  WalletCards,
  Workflow,
} from 'lucide-react'
import expenseFlowImage from '../assets/ExpenseFlow.png'
import portfolioImage from '../assets/portfolio.png'
import resolveNowImage from '../assets/ResolveNow.png'
import resumePdf from '../assets/Rohit_Resume.pdf'

export const profile = {
  name: 'Rohit Hazra',
  shortName: 'Rohit',
  title: 'MERN Full Stack Developer',
  availability: 'Available for Internship & Full-Time Opportunities',
  intro:
    'I build modern, scalable, and responsive web applications with the MERN stack. My work focuses on clean interfaces, secure backend flows, and user-friendly experiences while I continue sharpening my skills with modern tools and technologies.',
  resumeHref: resumePdf,
  location: 'Balasore, Odisha, 756083',
  email: 'l.rohit.hazra@gmail.com',
  phone: '+91 9692332032',
  linkedin: 'https://www.linkedin.com/in/rohit-hazra-3b9615317/',
  github: 'https://github.com/rohit-hazra',
}

export const socials = [
  { label: 'GitHub', href: profile.github, icon: GitBranch },
  { label: 'LinkedIn', href: profile.linkedin, icon: BriefcaseBusiness },
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail },
]

export const stats = [
  { value: 2, suffix: '', label: 'Internships completed' },
  { value: 3, suffix: '+', label: 'MERN projects built' },
  { value: 2027, suffix: '', label: 'B.Tech graduation' },
]

export const aboutInfo = [
  ['Name', profile.name],
  ['Role', profile.title],
  ['Education', 'B.Tech in Computer Science & Engineering'],
  ['University', 'BPUT, Rourkela'],
  ['Location', profile.location],
  ['Experience', '2 Internships'],
]

export const skillGroups = [
  {
    title: 'Frontend',
    icon: MonitorSmartphone,
    accent: 'cyan',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    icon: Server,
    accent: 'blue',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'Authentication'],
  },
  {
    title: 'Database',
    icon: Database,
    accent: 'violet',
    skills: ['MongoDB', 'SQL', 'Schema Design', 'Data Modeling'],
  },
  {
    title: 'Programming',
    icon: Code2,
    accent: 'cyan',
    skills: ['Python', 'C', 'Java', 'Problem Solving', 'Logic Building'],
  },
  {
    title: 'Version Control',
    icon: GitBranch,
    accent: 'blue',
    skills: ['Git', 'GitHub', 'Branching', 'Collaboration'],
  },
  {
    title: 'Core CS',
    icon: BrainCircuit,
    accent: 'violet',
    skills: ['Data Structures', 'Algorithms', 'DBMS', 'Operating Systems', 'Computer Networks', 'Computer Architecture'],
  },
  {
    title: 'AI & Dev Tools',
    icon: TerminalSquare,
    accent: 'cyan',
    skills: ['ChatGPT (GPT-4)', 'Google Gemini 2.5', 'DeepSeek', 'VS Code', 'Vercel'],
  },
]

export const projects = [
  {
    title: 'ResolveNow - Digital Complaint & Resolution System',
    category: 'Full-Stack Platform',
    description:
      'A web-based complaint management platform for submitting, tracking, and resolving complaints with secure authentication and role-based access.',
    stack: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB'],
    features: [
      'Secure user authentication',
      'Role-based complaint management',
      'Responsive tracking interface',
    ],
    github: 'https://github.com/rohit-hazra/ResolveNow',
    demo: '#',
    metric: 'Complaint workflow',
    image: resolveNowImage,
  },
  {
    title: 'ExpenseFlow',
    category: 'MERN Finance App',
    description:
      'A full-stack expense tracker that helps users manage income, expenses, budgets, and financial insights through a clean dashboard.',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    features: [
      'Income and expense tracking',
      'Budget-focused dashboard',
      'Insight-driven financial overview',
    ],
    github: profile.github,
    demo: '#',
    metric: 'Personal finance UI',
    image: expenseFlowImage,
  },
  {
    title: 'Personal Portfolio',
    category: 'Responsive Portfolio',
    description:
      'A modern portfolio showcasing projects, technical skills, internships, and achievements with premium UI, smooth animation, and dark/light themes.',
    stack: [
      'MongoDB',
      'Express.js',
      'React',
      'Node.js',
      'Tailwind CSS',
      'Framer Motion',
    ],
    features: [
      'Theme-aware design system',
      'Smooth section animations',
      'Fully responsive layout',
    ],
    github: profile.github,
    demo: '#',
    metric: 'Personal brand',
    image: portfolioImage,
  },
]

export const experience = [
  {
    title: 'Web Design & Development Intern',
    meta: 'Oasis Infobyte',
    period: 'December 2025 - January 2026',
    icon: BriefcaseBusiness,
    copy:
      'Developed responsive web interfaces, built reusable frontend components, and improved UI consistency using HTML, CSS, JavaScript, and Tailwind CSS.',
    responsibilities: [
      'Developed responsive web interfaces.',
      'Built reusable frontend components.',
      'Worked with HTML, CSS, JavaScript, and Tailwind CSS.',
      'Improved UI consistency and responsiveness.',
    ],
  },
  {
    title: 'Software Developer Intern',
    meta: 'Integrated Test Range (ITR) - DRDO',
    period: 'June 2026 - July 2026',
    icon: Workflow,
    copy:
      'Worked on software development tasks in a real engineering environment, assisting with technical solutions and strengthening practical problem-solving skills.',
    responsibilities: [
      'Worked on software development projects.',
      'Assisted in developing technical solutions.',
      'Collaborated on real-world engineering tasks.',
      'Improved problem-solving and software development skills.',
    ],
  },
]

export const education = [
  {
    title: '10th',
    meta: 'Ramprasad Govt. High School, Baliapal, Balasore',
    period: 'Completed 2021',
    icon: BookOpen,
    copy: 'Built the academic foundation for science, mathematics, and structured learning.',
  },
  {
    title: 'Higher Secondary (+2)',
    meta: 'Laxmi Narayan Higher Secondary School, Jamsuli, Balasore',
    period: 'Completed 2023',
    icon: GraduationCap,
    copy: 'Completed higher secondary studies with a focus on preparing for engineering education.',
  },
  {
    title: 'Bachelor of Technology',
    meta: 'Computer Science & Engineering, Balasore College of Engineering & Technology',
    period: '2023 - 2027',
    icon: Layers3,
    copy: 'Pursuing CSE at a college affiliated to Biju Patnaik University of Technology (BPUT).',
  },
]

export const certifications = [
  {
    title: 'Summer Internship',
    issuer: 'Integrated Test Range (ITR) - DRDO',
    year: '2026',
    type: 'Internship Certificate',
  },
  {
    title: 'Web Development & Design',
    issuer: 'Oasis Infobyte',
    year: '2026',
    type: 'Internship Certificate',
  },
  {
    title: 'Getting Started With Artificial Intelligence',
    issuer: 'IBM',
    year: '2026',
    type: 'Professional Certificate',
  },
]

export const achievements = [
  { value: 2, suffix: '', label: 'Internship experiences' },
  { value: 7, suffix: '+', label: 'Core technologies' },
  { value: 3, suffix: '+', label: 'Featured projects' },
  { value: 2027, suffix: '', label: 'B.Tech completion target' },
]

export const techStack = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Tailwind CSS',
  'Node.js',
  'Express.js',
  'MongoDB',
  'SQL',
  'Python',
  'C',
  'Git',
  'GitHub',
  'VS Code',
  'Vercel',
  'Framer Motion',
]

export const contactDetails = [
  { label: 'Phone', value: profile.phone, href: '#', icon: Phone },
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: 'LinkedIn', value: 'Rohit Hazra', href: profile.linkedin, icon: BriefcaseBusiness },
  { label: 'GitHub', value: 'rohit-hazra', href: profile.github, icon: GitBranch },
  { label: 'Location', value: profile.location, href: '#', icon: Globe2 },
]

export const contactIntent = [
  { title: 'MERN Applications', icon: MonitorSmartphone },
  { title: 'Backend APIs', icon: Server },
  { title: 'Clean UI Systems', icon: BadgeCheck },
]
