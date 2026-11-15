import { useEffect, useState } from 'react'
import { Command, Search } from 'lucide-react'
import { profile } from '../data/portfolio'

const actions = [
  ['Go to work', 'projects'], ['About Rohit', 'about'], ['Open playground', 'playground'], ['Get in touch', 'contact'],
]

function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  useEffect(() => {
    const onKey = event => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setOpen(value => !value) }; if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey)
  }, [])
  const matches = actions.filter(([label]) => label.toLowerCase().includes(query.toLowerCase()))
  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); setQuery('') }
  return <><button type="button" className="command-trigger" onClick={() => setOpen(true)} aria-label="Open command palette"><Command size={15} /><span>Explore</span><kbd>⌘ K</kbd></button>{open && <div className="command-backdrop" onMouseDown={() => setOpen(false)}><section className="command-dialog" role="dialog" aria-modal="true" aria-label="Quick navigation" onMouseDown={e => e.stopPropagation()}><div><Search size={16} /><input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Where to?" /></div>{matches.map(([label, id]) => <button type="button" onClick={() => go(id)} key={id}>{label}<span>↵</span></button>)}<a href={profile.github} target="_blank" rel="noreferrer">GitHub <span>↗</span></a></section></div>}</>
}
export default CommandPalette
