import './ClamShellfish.css'

const shellfish = [
  {
    name: 'Razor Clams',
    emoji: '🐚',
    color: '#e65100',
    where: 'Pacific Coast beaches',
    how: 'Dig with a clam gun or shovel — it\'s like a treasure hunt!',
    facts: [
      'Long, thin shells shaped like a straight razor',
      'Bury themselves fast — you have to dig quick!',
      'Found on WA ocean beaches like Long Beach and Kalaloch',
      'Really tasty — great for chowder and fry bread!',
    ],
    limit: 'Daily limit is 15 per person — check WDFW before going',
    license: 'No license needed for kids 14 and under. Adults need a shellfish/seaweed license.',
  },
  {
    name: 'Manila Clams',
    emoji: '🫙',
    color: '#1565c0',
    where: 'Puget Sound beaches',
    how: 'Rake just below the surface at low tide — they\'re close to the top!',
    facts: [
      'Small, oval shells with pretty patterns',
      'Live just under the sand or gravel at low tide',
      'Found on many Puget Sound beaches',
      'Steam them open with butter — delicious!',
    ],
    limit: 'Usually 40 per day — check current rules',
    license: 'No license needed for kids 14 and under. Adults need a shellfish/seaweed license.',
  },
  {
    name: 'Olympia Oysters',
    emoji: '🦪',
    color: '#2e7d32',
    where: 'Puget Sound tideflats',
    how: 'Pick by hand at low tide — look for clusters attached to rocks.',
    facts: [
      'WA\'s only native oyster — very small but very tasty',
      'Help clean the water — one oyster filters 50 gallons a day!',
      'Found in sheltered bays and inlets',
      'Population is recovering — be careful to take only what rules allow',
    ],
    limit: 'Varies by beach — always check before picking',
    license: 'No license needed for kids 14 and under. Adults need a shellfish/seaweed license.',
  },
]

export default function ClamShellfish() {
  return (
    <div className="page clam-page">
      <h1 className="clam-title">🦀 Clams &amp; Shellfish</h1>
      <p className="clam-intro">
        Washington has some of the best clamming and shellfishing in the country!
        Here's how to get started.
      </p>

      {/* SAFETY FIRST — must be the most prominent section */}
      <div className="clam-safety">
        <h2 className="clam-safety-title">⚠️ Check Before You Go — Every Single Time!</h2>
        <p className="clam-safety-desc">
          Shellfish can be unsafe to eat if the water has harmful bacteria or toxins.
          This changes all the time — a beach that was open last weekend might be closed this weekend.
          <strong> Always check both of these links the day before your trip:</strong>
        </p>
        <div className="clam-safety-links">
          <a
            className="clam-safety-btn"
            href="https://wdfw.wa.gov/fishing/shellfish/razor-clams"
            target="_blank"
            rel="noopener noreferrer"
          >
            🦪 WDFW Razor Clam Updates
          </a>
          <a
            className="clam-safety-btn"
            href="https://fortress.wa.gov/doh/biotoxin/biotoxin.aspx"
            target="_blank"
            rel="noopener noreferrer"
          >
            🗺️ WA DOH Shellfish Safety Map
          </a>
        </div>
        <p className="clam-safety-rule">
          🚫 <strong>Never eat shellfish from a closed beach.</strong> Biotoxins have no smell or taste
          — you cannot tell by looking.
        </p>
      </div>

      {/* Shellfish cards */}
      <div className="clam-grid">
        {shellfish.map(s => (
          <div key={s.name} className="clam-card" style={{ '--accent': s.color }}>
            <div className="clam-card-header">
              <span className="clam-emoji" aria-hidden="true">{s.emoji}</span>
              <div>
                <h2 className="clam-name">{s.name}</h2>
                <p className="clam-where">📍 {s.where}</p>
              </div>
            </div>

            <div className="clam-body">
              <div className="clam-section">
                <h3>🎣 How to find them</h3>
                <p>{s.how}</p>
              </div>

              <div className="clam-section">
                <h3>⭐ Fun facts</h3>
                <ul className="clam-facts">
                  {s.facts.map(f => <li key={f}>🐚 {f}</li>)}
                </ul>
              </div>

              <div className="clam-limit">
                ⚖️ <strong>Daily limit:</strong> {s.limit}
              </div>

              <div className="clam-license">
                🪪 <strong>License:</strong> {s.license}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* License info */}
      <div className="clam-license-note">
        <h2 className="clam-license-note-title">🪪 Do You Need a License?</h2>
        <ul className="clam-license-list">
          <li>✅ <strong>Kids 14 and under:</strong> No license needed — fish and clam for free!</li>
          <li>✅ <strong>Adults:</strong> A shellfish/seaweed license is required — get one at{' '}
            <a href="https://fishhunt.wa.gov" target="_blank" rel="noopener noreferrer">fishhunt.wa.gov</a>
          </li>
          <li>✅ <strong>Combo tip:</strong> The WDFW combo license covers both fishing AND shellfish — great deal if you do both!</li>
          <li>✅ <strong>Catch record card:</strong> Some species require one — check at fishhunt.wa.gov</li>
        </ul>
        <p className="clam-license-note-sub">
          License rules can change. Verify current requirements at{' '}
          <a href="https://wdfw.wa.gov" target="_blank" rel="noopener noreferrer">wdfw.wa.gov</a>{' '}
          before your trip.
        </p>
      </div>

      <div className="clam-wdfw-note">
        <span aria-hidden="true">⚠️</span>
        <p>
          Open/closed status, bag limits, and seasons change frequently.
          Always check{' '}
          <a href="https://wdfw.wa.gov" target="_blank" rel="noopener noreferrer">
            wdfw.wa.gov
          </a>{' '}
          and the{' '}
          <a href="https://fortress.wa.gov/doh/biotoxin/biotoxin.aspx" target="_blank" rel="noopener noreferrer">
            WA DOH Shellfish Safety Map
          </a>{' '}
          before every trip.
        </p>
      </div>
    </div>
  )
}
