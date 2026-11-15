import { useState } from 'react'
import { Code2, Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/useTheme'

function Playground() {
  const [mode, setMode] = useState('focus')
  const { isDark, toggleTheme } = useTheme()
  const snippets = { focus: ['const interface =', '  thoughtful + useful', '', 'ship(interface)'], motion: ['const motion =', '  purpose > decoration', '', 'respect(reducedMotion)'] }
  return <section id="playground" className="playground"><div className="playground-copy"><p className="eyebrow">Lab / 01</p><h2>Small details, <em>working systems.</em></h2><p>A compact interaction lab—built to be used, not just observed.</p><div className="lab-tabs"><button type="button" className={mode === 'focus' ? 'active' : ''} onClick={() => setMode('focus')}>Focus mode</button><button type="button" className={mode === 'motion' ? 'active' : ''} onClick={() => setMode('motion')}>Motion rule</button></div></div><div className="lab-terminal"><div className="terminal-top"><span><Code2 size={16} /> rohit@workstation</span><button type="button" onClick={toggleTheme}>{isDark ? <Sun size={16} /> : <Moon size={16} />}{isDark ? 'Light surface' : 'Dark surface'}</button></div><pre>{snippets[mode].map((line, index) => <code key={index}><i>{String(index + 1).padStart(2, '0')}</i>{line}</code>)}</pre><div className="terminal-result">✓ {mode === 'focus' ? 'Interface intent: clear' : 'Motion budget: respected'}</div></div></section>
}
export default Playground
