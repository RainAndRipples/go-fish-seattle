import './FishingSpots.css'


const spots = [
  {
    name: 'Green Lake',
    location: 'Seattle',
    emoji: '🌿',
    type: 'lake',
    catch: ['Rainbow Trout', 'Yellow Perch', 'Largemouth Bass'],
    whyKids: 'Paved path all the way around, lots of other families, shallow banks perfect for beginners.',
    parking: 'Free parking lots on W Green Lake Dr N and E Green Lake Dr N.',
    bathrooms: 'Yes — at the Community Center and near the boat launch.',
    tip: 'Try the north end near the small dock — trout hang out there!',
  },
  {
    name: 'Lake Sammamish State Park',
    location: 'Issaquah',
    emoji: '🏕️',
    type: 'lake',
    catch: ['Rainbow Trout', 'Yellow Perch', 'Largemouth Bass'],
    whyKids: 'Wide sandy beach, lifeguards in summer, easy gentle shoreline — great for a whole family day.',
    parking: 'Paid parking — Discover Pass required (or pay at the gate).',
    bathrooms: 'Yes — full restrooms near the beach.',
    tip: 'Fish early morning near the reeds on the south end.',
  },
  {
    name: 'Gene Coulon Memorial Beach Park',
    location: 'Renton',
    emoji: '🏖️',
    type: 'lake',
    catch: ['Rainbow Trout', 'Yellow Perch', 'Largemouth Bass', 'Bluegill'],
    whyKids: 'Beautiful paved waterfront, playgrounds right next to the fishing spots, very calm water.',
    parking: 'Free parking in the main lot off Lake Washington Blvd N.',
    bathrooms: 'Yes — multiple restrooms throughout the park.',
    tip: 'The fishing pier on the north side is perfect — railings and plenty of room.',
  },
  {
    name: 'Lake Meridian Park',
    location: 'Kent',
    emoji: '🛶',
    type: 'lake',
    catch: ['Rainbow Trout', 'Largemouth Bass', 'Yellow Perch', 'Bluegill'],
    whyKids: 'Small, calm lake — not crowded. Easy walk from the parking lot to the water.',
    parking: 'Free parking at the park entrance on SE 272nd St.',
    bathrooms: 'Yes — near the swim beach.',
    tip: 'Stocked with trout regularly — check WDFW for recent stocking dates.',
  },
  {
    name: 'Edmonds Fishing Pier',
    location: 'Edmonds',
    emoji: '⚓',
    type: 'pier',
    catch: ['Coho Salmon', 'Cutthroat Trout', 'Rockfish', 'Perch'],
    whyKids: 'Free to fish off the pier — no boat needed! Railing the whole way around, very safe for kids.',
    parking: 'Free parking next to the ferry terminal on Admiral Way.',
    bathrooms: 'Yes — near the parking area.',
    tip: 'No fishing license needed for kids! Bring a simple pole with a small jig or bait.',
  },
  {
    name: 'Pier 86 — Puget Sound',
    location: 'Seattle (Interbay)',
    emoji: '🌊',
    type: 'pier',
    catch: ['Coho Salmon', 'Cutthroat Trout', 'Perch', 'Rockfish'],
    whyKids: 'Free public fishing pier with a great view of the Olympics and Elliott Bay. Easy parking.',
    parking: 'Free parking at the Interbay athletic complex nearby.',
    bathrooms: 'Limited — restrooms at Myrtle Edwards Park, a short walk north.',
    tip: 'Best during salmon season in late summer/fall. Check WDFW for current openings.',
  },
]

const typeLabel = { lake: '🏞️ Lake', pier: '🌊 Saltwater Pier' }
const typeColor = { lake: 'green', pier: 'blue' }

export default function FishingSpots() {
  return (
    <div className="page spots-page">
      <h1 className="spots-title">📍 Fishing Spots</h1>
      <p className="spots-intro">6 great places to fish near Seattle — all beginner-friendly!</p>

      <div className="spots-grid">
        {spots.map((spot) => (
          <div key={spot.name} className="spot-card">
            <div className={`spot-header spot-header--${typeColor[spot.type]}`}>
              <span className="spot-emoji" aria-hidden="true">{spot.emoji}</span>
              <div>
                <h2 className="spot-name">{spot.name}</h2>
                <span className="spot-location">📌 {spot.location}</span>
              </div>
              <span className={`spot-type-badge badge--${typeColor[spot.type]}`}>
                {typeLabel[spot.type]}
              </span>
            </div>

            <div className="spot-body">
              <div className="spot-section">
                <h3>🎣 What you might catch</h3>
                <ul className="catch-list">
                  {spot.catch.map(f => <li key={f}>{f}</li>)}
                </ul>
              </div>

              <div className="spot-section">
                <h3>⭐ Great for kids because</h3>
                <p>{spot.whyKids}</p>
              </div>

              <div className="spot-tip">
                💡 <strong>Pro tip:</strong> {spot.tip}
              </div>

              <div className="spot-parent-info">
                <h3>👨‍👩‍👧 Parent info</h3>
                <p>🅿️ <strong>Parking:</strong> {spot.parking}</p>
                <p>🚻 <strong>Bathrooms:</strong> {spot.bathrooms}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="spots-wdfw-note">
        <span aria-hidden="true">⚠️</span>
        <p>
          Fishing rules and stocking schedules change. Always check{' '}
          <a href="https://wdfw.wa.gov" target="_blank" rel="noopener noreferrer">
            wdfw.wa.gov
          </a>{' '}
          with a grown-up before your trip!
        </p>
      </div>
    </div>
  )
}
