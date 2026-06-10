import './Rules.css'

const rules = [
  {
    emoji: '🪪',
    color: 'green',
    title: 'No License Needed!',
    body: 'If you are 14 or younger, you do NOT need a fishing license in Washington state. Just grab a rod and go!',
    note: null,
  },
  {
    emoji: '🎉',
    color: 'yellow',
    title: 'Free Fishing Weekend',
    body: 'Every year, the first weekend after the first Monday in June — ANYONE can fish for free, even grown-ups without a license!',
    note: 'Check wdfw.wa.gov for the exact dates each year.',
  },
  {
    emoji: '📋',
    color: 'orange',
    title: 'Salmon & Steelhead Need a Card',
    body: 'If you want to catch salmon or steelhead, even kids need a free Catch Record Card. Ask a grown-up to help get one at a local fishing store or online.',
    note: 'It\'s free — you just need to fill it out.',
  },
  {
    emoji: '🔢',
    color: 'blue',
    title: 'Catch Limits',
    body: 'There are rules about how many fish you can keep in a day. These limits protect the fish so there are plenty for everyone. Only keep what the rules allow!',
    note: 'Limits are different for each lake or river — check before you go.',
  },
  {
    emoji: '🤲',
    color: 'teal',
    title: 'Be Kind to Fish',
    body: 'If you\'re letting a fish go (catch and release), be gentle! Wet your hands before touching the fish — dry hands hurt their skin. Hold them in the water until they swim away on their own.',
    note: null,
  },
  {
    emoji: '🚯',
    color: 'green',
    title: 'Leave No Trace',
    body: 'Pack out everything you bring — snack wrappers, fishing line, bait containers. Old fishing line is really dangerous for birds and other animals.',
    note: null,
  },
]

export default function Rules() {
  return (
    <div className="page rules-page">
      <h1 className="rules-title">📋 Rules for Kids</h1>
      <p className="rules-intro">Fishing has a few simple rules. Follow them and everyone (including the fish!) has a great time.</p>

      <div className="rules-list">
        {rules.map((rule) => (
          <div key={rule.title} className={`rule-card rule-card--${rule.color}`}>
            <div className="rule-emoji" aria-hidden="true">{rule.emoji}</div>
            <div className="rule-content">
              <h2>{rule.title}</h2>
              <p>{rule.body}</p>
              {rule.note && <p className="rule-note">👉 {rule.note}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="rules-wdfw-box">
        <div className="rules-wdfw-icon" aria-hidden="true">🔗</div>
        <div>
          <p><strong>Rules can change every year!</strong></p>
          <p>
            Always look up the current rules at{' '}
            <a href="https://wdfw.wa.gov" target="_blank" rel="noopener noreferrer">
              wdfw.wa.gov
            </a>{' '}
            with a grown-up before your trip. It's the official Washington state fishing website.
          </p>
        </div>
      </div>
    </div>
  )
}
