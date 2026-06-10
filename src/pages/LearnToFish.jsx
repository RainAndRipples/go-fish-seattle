import { useState } from 'react'
import './LearnToFish.css'

const sections = [
  { id: 'rod',   emoji: '🎣', label: 'Parts of a Rod' },
  { id: 'cast',  emoji: '💨', label: 'How to Cast' },
  { id: 'knot',  emoji: '🪢', label: 'Tie a Knot' },
  { id: 'bait',  emoji: '🪱', label: 'Pick Your Bait' },
]

const castSteps = [
  { n: 1, emoji: '✋', title: 'Hold the rod', body: 'Grip the handle firmly with your dominant hand. Put your pointer finger on the line against the rod.' },
  { n: 2, emoji: '🔓', title: 'Open the bail', body: 'Flip the little metal arm on your reel — this is called the bail. It lets the line go free when you cast.' },
  { n: 3, emoji: '↙️', title: 'Bring it back', body: 'Swing the rod tip smoothly back over your shoulder, like you\'re about to throw a ball.' },
  { n: 4, emoji: '↗️', title: 'Swing forward & release', body: 'Swing the rod tip forward. When it points toward your target, lift your finger off the line — the bait flies out!' },
  { n: 5, emoji: '🔒', title: 'Close the bail', body: 'Flip the bail arm back to the closed position. Now slowly turn the reel handle to bring the line in if nothing bites.' },
]

const knotSteps = [
  { n: 1, emoji: '🧵', title: 'Thread the line', body: 'Push 6 inches of fishing line through the hook\'s eye (the little hole at the top).' },
  { n: 2, emoji: '🔄', title: 'Wrap 5 times', body: 'Hold both pieces of line together and wrap the loose end around both pieces five times, going away from the hook.' },
  { n: 3, emoji: '👆', title: 'Push through', body: 'Take the loose end and push it through the small loop right next to the hook eye.' },
  { n: 4, emoji: '🔁', title: 'Push through again', body: 'Now push that same loose end back through the big loop you just made.' },
  { n: 5, emoji: '💧', title: 'Wet and pull tight', body: 'Lick the knot to make it slippery, then pull the main line and the loose end in opposite directions until it\'s snug.' },
  { n: 6, emoji: '✂️', title: 'Trim the tail', body: 'Clip the leftover loose end close to the knot with scissors. That\'s a clinch knot — nice work!' },
]

const baits = [
  {
    name: 'Nightcrawlers',
    emoji: '🪱',
    color: '#795548',
    tagline: 'The classic! Works on almost everything.',
    pros: ['Trout and perch love them', 'Cheap — find them at any bait shop', 'You can dig them up after rain!'],
    howTo: 'Push the hook through the worm two or three times so it stays on. Leave a little wiggling off the end.',
    bestFor: 'Trout, Perch, Bass, Bluegill',
  },
  {
    name: 'PowerBait',
    emoji: '🟣',
    color: '#7b1fa2',
    tagline: 'Magic dough that trout can\'t resist!',
    pros: ['Made to smell irresistible to trout', 'Comes in bright colors — easy to see', 'Stays on the hook better than worms'],
    howTo: 'Roll a small ball and push it onto your hook so it covers the hook completely. It floats — which trout love!',
    bestFor: 'Stocked Rainbow Trout',
  },
  {
    name: 'Salmon Eggs',
    emoji: '🟠',
    color: '#e64a19',
    tagline: 'Bright orange balls trout go crazy for.',
    pros: ['Super easy — just put one on the hook', 'Great for streams and rivers', 'Bright color attracts fish'],
    howTo: 'Push your hook through one egg. That\'s it — seriously, it\'s that easy!',
    bestFor: 'Trout, Cutthroat',
  },
  {
    name: 'Small Jigs',
    emoji: '🎨',
    color: '#0288d1',
    tagline: 'A tiny fake fish that dances in the water.',
    pros: ['Reusable — buy once, use forever', 'Great for piers and deeper water', 'No live bait needed'],
    howTo: 'Tie it to your line with a clinch knot. Slowly reel it in with little twitches — make it look alive!',
    bestFor: 'Perch, Salmon (piers), Bass',
  },
]

const rodParts = [
  { id: 'tip',     label: 'Tip',         desc: 'The very end of the rod — bends when a fish pulls!', x: '92%', y: '18%' },
  { id: 'guides',  label: 'Guides',      desc: 'The little rings along the rod — the line runs through them.', x: '68%', y: '28%' },
  { id: 'blank',   label: 'Blank',       desc: 'The long pole part of the rod.', x: '50%', y: '42%' },
  { id: 'reel',    label: 'Reel',        desc: 'The spinning wheel that holds your fishing line.', x: '22%', y: '62%' },
  { id: 'handle',  label: 'Handle/Grip', desc: 'Where you hold the rod — usually has a comfy grip.', x: '10%', y: '72%' },
]

function RodDiagram() {
  const [active, setActive] = useState(null)
  const part = rodParts.find(p => p.id === active)

  return (
    <div className="rod-section">
      <p className="rod-instruction">Tap a part to learn what it does!</p>
      <div className="rod-diagram-wrap">
        {/* SVG rod illustration */}
        <svg className="rod-svg" viewBox="0 0 360 160" aria-hidden="true">
          {/* Rod blank */}
          <line x1="330" y1="20" x2="30" y2="130" stroke="#8d6e63" strokeWidth="5" strokeLinecap="round" />
          {/* Guides */}
          {[
            [290, 32], [240, 50], [190, 68], [140, 86],
          ].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="5" ry="8"
              fill="none" stroke="#546e7a" strokeWidth="2"
              transform={`rotate(-30 ${x} ${y})`} />
          ))}
          {/* Reel seat */}
          <rect x="55" y="108" width="42" height="18" rx="5" fill="#455a64" />
          {/* Reel spool */}
          <ellipse cx="76" cy="117" rx="12" ry="9" fill="#607d8b" />
          <ellipse cx="76" cy="117" rx="6" ry="4" fill="#90a4ae" />
          {/* Handle */}
          <rect x="18" y="118" width="42" height="14" rx="7" fill="#6d4c41" />
          {/* Tip guide ring */}
          <circle cx="330" cy="20" r="4" fill="none" stroke="#546e7a" strokeWidth="2" />
          {/* Line */}
          <line x1="330" y1="20" x2="330" y2="5" stroke="#b0bec5" strokeWidth="1.5" strokeDasharray="3,2" />
        </svg>

        {/* Tap targets */}
        {rodParts.map(p => (
          <button
            key={p.id}
            className={`rod-dot ${active === p.id ? 'rod-dot--active' : ''}`}
            style={{ left: p.x, top: p.y }}
            onClick={() => setActive(active === p.id ? null : p.id)}
            aria-label={p.label}
          >
            <span className="rod-dot-label">{p.label}</span>
          </button>
        ))}
      </div>

      {/* Info box */}
      <div className={`rod-info-box ${part ? 'rod-info-box--visible' : ''}`}>
        {part
          ? <><strong>{part.label}:</strong> {part.desc}</>
          : <span style={{opacity: 0.5}}>Tap a dot above ↑</span>
        }
      </div>
    </div>
  )
}

export default function LearnToFish() {
  const [activeSection, setActiveSection] = useState('rod')

  return (
    <div className="learn-page">
      {/* Tab nav */}
      <div className="learn-tabs">
        {sections.map(s => (
          <button
            key={s.id}
            className={`learn-tab ${activeSection === s.id ? 'learn-tab--active' : ''}`}
            onClick={() => setActiveSection(s.id)}
          >
            <span aria-hidden="true">{s.emoji}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      <div className="learn-content page">

        {/* ── Parts of a rod ── */}
        {activeSection === 'rod' && (
          <section>
            <h1 className="learn-title">🎣 Parts of a Rod</h1>
            <p className="learn-subtitle">Every fishing rod has the same basic parts. Get to know them!</p>
            <RodDiagram />
          </section>
        )}

        {/* ── How to cast ── */}
        {activeSection === 'cast' && (
          <section>
            <h1 className="learn-title">💨 How to Cast</h1>
            <p className="learn-subtitle">Casting gets easier with practice. Try it a few times in the backyard first!</p>
            <div className="steps-list">
              {castSteps.map(step => (
                <div key={step.n} className="step-card">
                  <div className="step-number">{step.n}</div>
                  <div className="step-emoji" aria-hidden="true">{step.emoji}</div>
                  <div className="step-body">
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="learn-tip">
              💡 <strong>Tip:</strong> Start with a practice cast using a small weight instead of a hook — much safer while you're learning!
            </div>
          </section>
        )}

        {/* ── Clinch knot ── */}
        {activeSection === 'knot' && (
          <section>
            <h1 className="learn-title">🪢 Tie a Clinch Knot</h1>
            <p className="learn-subtitle">The clinch knot is the most useful knot in fishing. Once you know it, you can attach any hook!</p>
            <div className="steps-list">
              {knotSteps.map(step => (
                <div key={step.n} className="step-card">
                  <div className="step-number">{step.n}</div>
                  <div className="step-emoji" aria-hidden="true">{step.emoji}</div>
                  <div className="step-body">
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="learn-tip">
              💡 <strong>Tip:</strong> Practice with a piece of string and a pencil before using a real hook. Knots get much easier after a few tries!
            </div>
          </section>
        )}

        {/* ── Bait ── */}
        {activeSection === 'bait' && (
          <section>
            <h1 className="learn-title">🪱 Pick Your Bait</h1>
            <p className="learn-subtitle">Different fish like different food. Here are the best baits for Seattle-area fishing!</p>
            <div className="bait-grid">
              {baits.map(b => (
                <div key={b.name} className="bait-card" style={{ '--bcolor': b.color }}>
                  <div className="bait-header">
                    <span className="bait-emoji" aria-hidden="true">{b.emoji}</span>
                    <div>
                      <h2>{b.name}</h2>
                      <p className="bait-tagline">{b.tagline}</p>
                    </div>
                  </div>
                  <ul className="bait-pros">
                    {b.pros.map(p => <li key={p}>✅ {p}</li>)}
                  </ul>
                  <div className="bait-howto">
                    <strong>How to use it:</strong> {b.howTo}
                  </div>
                  <div className="bait-best">
                    🎯 <strong>Best for:</strong> {b.bestFor}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
