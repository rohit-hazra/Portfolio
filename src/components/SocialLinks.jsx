import { socials } from '../data/portfolio'

function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-3">
      {socials.map(({ label, href, icon: Icon }) => (
        <a key={label} href={href} className="social-link" aria-label={label}>
          <Icon size={18} />
          <span>{label}</span>
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
