import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import './FreshwaterSpots.css'

const SITE = 'https://go-fish-seattle.vercel.app'
const SUGGEST_EMAIL = '219553671+RainAndRipples@users.noreply.github.com'
const SUGGEST_SUBJECT = encodeURIComponent('Suggest a Fishing Spot — Go Fish Seattle!')
const SUGGEST_BODY = encodeURIComponent(
  "Hi! I'd like to suggest this spot:\n\nSpot name:\nCity / neighborhood:\nWhat you can catch:\nWhy it's good for kids:\nParking info:\nBathrooms? (yes/no):\nAny tips:\n"
)

const FACILITY_ICONS = {
  restrooms:   { icon: '🚻', label: 'Restrooms' },
  parking:     { icon: '🅿️', label: 'Parking' },
  playground:  { icon: '🛝', label: 'Playground' },
  pier:        { icon: '🎣', label: 'Fishing pier' },
  picnic:      { icon: '🧺', label: 'Picnic area' },
  'splash-pad':{ icon: '💦', label: 'Splash pad' },
}

const spots = [
  // ── EASTSIDE ────────────────────────────────────────────────────
  {
    id: 'phantom-lake',
    name: 'Phantom Lake',
    city: 'Bellevue',
    region: 'eastside',
    emoji: '🌲',
    species: ['Yellow Perch', 'Largemouth Bass', 'Rainbow Trout'],
    facilities: ['parking', 'restrooms', 'pier'],
    shade: 'partial',
    bestFor: 'Quiet neighborhood lake — peaceful and easy for a first trip',
    parentInfo: { parking: 'Free parking off SE 24th St.', bathrooms: 'Basic facilities at the park.' },
    tip: 'Yellow perch are easy to catch year-round — great confidence-builder for beginners!',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Phantom+Lake+Bellevue+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/locations/lowland-lakes/phantom-lake',
  },
  {
    id: 'larsen-lake',
    name: 'Larsen Lake',
    city: 'Bellevue',
    region: 'eastside',
    emoji: '🫐',
    species: ['Black Crappie', 'Largemouth Bass', 'Brown Bullhead'],
    facilities: ['parking', 'pier'],
    shade: 'partial',
    bestFor: 'Catch something different — crappie and bass in a unique peat bog lake',
    parentInfo: { parking: 'Park at the Lake Hills Blueberry Farm — short walk to the lake.', bathrooms: 'No restrooms on site — plan ahead.' },
    tip: 'Use small jigs near the pier for crappie. Not stocked with trout — come for bass!',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Larsen+Lake+Blueberry+Farm+Bellevue+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/locations/lowland-lakes/larsen-lake',
  },
  {
    id: 'meydenbauer-beach',
    name: 'Meydenbauer Beach Park',
    city: 'Bellevue',
    region: 'eastside',
    emoji: '🏙️',
    species: ['Cutthroat Trout', 'Yellow Perch', 'Largemouth Bass'],
    facilities: ['parking', 'restrooms', 'playground', 'picnic'],
    shade: 'partial',
    bestFor: 'Beautiful waterfront park on Lake Washington with Cascade mountain views',
    parentInfo: { parking: 'Paid parking at the park.', bathrooms: 'Yes — at the park.' },
    tip: 'Cast from the swim beach area in the morning for perch. Bring a small net!',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Meydenbauer+Beach+Park+Bellevue+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/locations/lowland-lakes/lake-washington',
  },
  {
    id: 'timberlake-park',
    name: 'Timberlake Park',
    city: 'Bellevue',
    region: 'eastside',
    emoji: '🌊',
    species: ['Cutthroat Trout', 'Smallmouth Bass', 'Yellow Perch'],
    facilities: ['parking', 'restrooms'],
    shade: 'partial',
    bestFor: "Bellevue's only access to Lake Sammamish — less crowded than the state park",
    parentInfo: { parking: 'Free parking at the park.', bathrooms: 'Yes — at the park.' },
    tip: 'Yellow perch are easy to catch from shore — great for kids learning to fish!',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Timberlake+Park+Bellevue+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/locations/lowland-lakes/lake-sammamish',
  },
  {
    id: 'idylwood-park',
    name: 'Idylwood Park',
    city: 'Redmond',
    region: 'eastside',
    emoji: '🌅',
    species: ['Cutthroat Trout', 'Smallmouth Bass', 'Yellow Perch'],
    facilities: ['parking', 'restrooms', 'playground', 'picnic'],
    shade: 'partial',
    bestFor: 'Sandy beach on Lake Sammamish — swim in summer, fish any time',
    parentInfo: { parking: 'Free parking off NE 65th St.', bathrooms: 'Yes — at the park.' },
    tip: 'Perch hang near the swim area buoys. Fish from the edge of the swimming zone!',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Idylwood+Park+Redmond+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/locations/lowland-lakes/lake-sammamish',
  },
  {
    id: 'juanita-beach',
    name: 'Juanita Beach Park',
    city: 'Kirkland',
    region: 'eastside',
    emoji: '🏖️',
    species: ['Cutthroat Trout', 'Yellow Perch', 'Largemouth Bass'],
    facilities: ['parking', 'restrooms', 'playground', 'picnic'],
    shade: 'partial',
    bestFor: 'Big sandy Lake Washington beach with playgrounds and lifeguards in summer',
    parentInfo: { parking: 'Paid parking in the main lot.', bathrooms: 'Yes — at the park.' },
    tip: 'The fishing pier on the north end is the sweet spot for perch and trout.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Juanita+Beach+Park+Kirkland+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/locations/lowland-lakes/lake-washington',
  },
  {
    id: 'houghton-beach',
    name: 'Houghton Beach Park',
    city: 'Kirkland',
    region: 'eastside',
    emoji: '⛵',
    species: ['Cutthroat Trout', 'Yellow Perch', 'Largemouth Bass'],
    facilities: ['parking', 'restrooms', 'picnic'],
    shade: 'partial',
    bestFor: 'Quieter stretch of Lake Washington — less crowded than Juanita',
    parentInfo: { parking: 'Street parking on Lake Washington Blvd.', bathrooms: 'Yes — at the park.' },
    tip: 'Try fishing near the dock at dawn for cutthroat trout.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Houghton+Beach+Park+Kirkland+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/locations/lowland-lakes/lake-washington',
  },
  {
    id: 'marsh-park',
    name: 'Marsh Park',
    city: 'Kirkland',
    region: 'eastside',
    emoji: '🌾',
    species: ['Yellow Perch', 'Largemouth Bass', 'Cutthroat Trout'],
    facilities: ['parking', 'restrooms'],
    shade: 'partial',
    bestFor: 'Small neighborhood access to Lake Washington — calm and easy with young kids',
    parentInfo: { parking: 'Street parking nearby.', bathrooms: 'Basic facilities.' },
    tip: 'Short walk to the water — bring a simple bobber and worm setup.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Marsh+Park+Kirkland+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/locations/lowland-lakes/lake-washington',
  },
  {
    id: 'marina-park',
    name: 'Marina Park',
    city: 'Kirkland',
    region: 'eastside',
    emoji: '⚓',
    species: ['Cutthroat Trout', 'Yellow Perch', 'Largemouth Bass'],
    facilities: ['parking', 'restrooms', 'picnic', 'pier'],
    shade: 'open',
    bestFor: 'Downtown Kirkland waterfront — fun atmosphere, great views, easy fishing pier',
    parentInfo: { parking: 'Paid downtown parking. Some free spots nearby.', bathrooms: 'Yes — restrooms at the park.' },
    tip: 'The pier next to the marina is great for perch — easy casting for beginners!',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Marina+Park+Kirkland+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/locations/lowland-lakes/lake-washington',
  },
  {
    id: 'cottage-lake',
    name: 'Cottage Lake Park',
    city: 'Woodinville',
    region: 'eastside',
    emoji: '🏡',
    species: ['Rainbow Trout', 'Largemouth Bass', 'Black Crappie', 'Yellow Perch'],
    facilities: ['parking', 'restrooms', 'pier', 'picnic'],
    shade: 'partial',
    bestFor: 'One of the most-stocked lakes near Seattle — thousands of trout added every spring',
    parentInfo: { parking: 'Free parking at Cottage Lake Park.', bathrooms: 'Yes — at the park.' },
    tip: 'Opening day is a big deal here — freshly stocked trout everywhere and lots of excited families!',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Cottage+Lake+Park+Woodinville+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/locations/lowland-lakes/cottage-lake',
  },
  {
    id: 'lake-sammamish-sp',
    name: 'Lake Sammamish State Park',
    city: 'Issaquah',
    region: 'eastside',
    emoji: '🏕️',
    species: ['Cutthroat Trout', 'Smallmouth Bass', 'Yellow Perch'],
    facilities: ['parking', 'restrooms', 'playground', 'picnic', 'pier'],
    shade: 'partial',
    bestFor: 'Huge sandy beach, lifeguards in summer — a true full-day family destination',
    parentInfo: { parking: 'Discover Pass required. Pay at the gate or buy at discoverpass.wa.gov.', bathrooms: 'Yes — full restrooms near the beach.' },
    tip: 'Fish early morning near the reeds on the south end — perch love hanging out there.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lake+Sammamish+State+Park+Issaquah+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/locations/lowland-lakes/lake-sammamish',
  },
  {
    id: 'sammamish-landing',
    name: 'Sammamish Landing',
    city: 'Sammamish',
    region: 'eastside',
    emoji: '🚤',
    species: ['Cutthroat Trout', 'Smallmouth Bass', 'Yellow Perch'],
    facilities: ['parking', 'restrooms', 'picnic'],
    shade: 'partial',
    bestFor: "City of Sammamish's own Lake Sammamish access — relaxed and rarely crowded",
    parentInfo: { parking: 'Free parking at the park.', bathrooms: 'Yes — at the park.' },
    tip: 'Less crowded than the state park but same great lake. Good for a quick after-school trip!',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sammamish+Landing+Park+Sammamish+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/locations/lowland-lakes/lake-sammamish',
  },
  {
    id: 'pine-lake',
    name: 'Pine Lake Park',
    city: 'Sammamish',
    region: 'eastside',
    emoji: '🌲',
    species: ['Rainbow Trout', 'Largemouth Bass', 'Yellow Perch'],
    facilities: ['parking', 'restrooms', 'playground', 'picnic'],
    shade: 'full',
    bestFor: 'Stocked with thousands of trout for fishing season — great odds for a first catch!',
    parentInfo: { parking: 'Free parking at the park.', bathrooms: 'Yes — at the park.' },
    tip: 'A simple worm under a bobber works great here. The fish are hungry right after stocking!',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pine+Lake+Park+Sammamish+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/reports/stocking/trout-plants',
  },
  {
    id: 'beaver-lake',
    name: 'Beaver Lake Park',
    city: 'Sammamish',
    region: 'eastside',
    emoji: '🦫',
    species: ['Rainbow Trout', 'Yellow Perch', 'Largemouth Bass'],
    facilities: ['parking', 'restrooms', 'pier'],
    shade: 'partial',
    bestFor: 'WDFW-stocked trout plus big perch — good odds even on slow days',
    parentInfo: { parking: 'Free parking at the WDFW access near the southeast corner.', bathrooms: 'Toilets at the access site.' },
    tip: 'Perch here can grow quite big! Try small jigs near the bottom.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Beaver+Lake+Sammamish+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/locations/lowland-lakes/beaver-lake-sammamish',
  },

  // ── SEATTLE & SOUTH KING ──────────────────────────────────────────
  {
    id: 'green-lake',
    name: 'Green Lake',
    city: 'Seattle',
    region: 'seattle-south',
    emoji: '🌿',
    species: ['Rainbow Trout', 'Yellow Perch', 'Largemouth Bass'],
    facilities: ['parking', 'restrooms', 'playground', 'picnic'],
    shade: 'partial',
    bestFor: 'Paved path all the way around — easiest first fishing trip in the city',
    parentInfo: { parking: 'Free parking lots on W Green Lake Dr N and E Green Lake Dr N.', bathrooms: 'Yes — at the Community Center and near the boat launch.' },
    tip: 'Try the north end near the small dock — trout tend to hang out there!',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Green+Lake+Park+Seattle+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/reports/stocking/trout-plants',
  },
  {
    id: 'gene-coulon',
    name: 'Gene Coulon Beach Park',
    city: 'Renton',
    region: 'seattle-south',
    emoji: '🏖️',
    species: ['Rainbow Trout', 'Yellow Perch', 'Largemouth Bass', 'Bluegill'],
    facilities: ['parking', 'restrooms', 'playground', 'picnic', 'pier'],
    shade: 'partial',
    bestFor: 'Covered fishing pier plus playgrounds — one of the best all-ages parks in King County',
    parentInfo: { parking: 'Free parking in the main lot off Lake Washington Blvd N.', bathrooms: 'Yes — multiple restrooms throughout the park.' },
    tip: 'The fishing pier on the north side has railings and plenty of room — perfect for kids!',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gene+Coulon+Memorial+Beach+Park+Renton+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/locations/lowland-lakes/lake-washington',
  },
  {
    id: 'lake-meridian',
    name: 'Lake Meridian Park',
    city: 'Kent',
    region: 'seattle-south',
    emoji: '🛶',
    species: ['Rainbow Trout', 'Largemouth Bass', 'Yellow Perch', 'Bluegill'],
    facilities: ['parking', 'restrooms', 'playground', 'picnic'],
    shade: 'partial',
    bestFor: 'Calm, small lake — easy walk from the car and not too crowded',
    parentInfo: { parking: 'Free parking at the park entrance on SE 272nd St.', bathrooms: 'Yes — near the swim beach.' },
    tip: 'Stocked with trout regularly — check WDFW stocking reports before you go!',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lake+Meridian+Park+Kent+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/reports/stocking/trout-plants',
  },
  {
    id: 'lake-wilderness',
    name: 'Lake Wilderness Park',
    city: 'Maple Valley',
    region: 'seattle-south',
    emoji: '🌳',
    species: ['Rainbow Trout', 'Largemouth Bass', 'Yellow Perch'],
    facilities: ['parking', 'restrooms', 'playground', 'picnic', 'splash-pad'],
    shade: 'full',
    bestFor: 'Splash pad and playground right next to the lake — non-fishing siblings stay happy!',
    parentInfo: { parking: 'Free parking off Lake Wilderness Dr SE.', bathrooms: 'Yes — near the playground.' },
    tip: 'Rent a paddleboat and fish from the water — a huge hit with kids!',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lake+Wilderness+Park+Maple+Valley+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/reports/stocking/trout-plants',
  },
  {
    id: 'lake-fenwick',
    name: 'Lake Fenwick Park',
    city: 'Kent',
    region: 'seattle-south',
    emoji: '🌲',
    species: ['Rainbow Trout', 'Largemouth Bass', 'Yellow Perch'],
    facilities: ['parking', 'restrooms', 'pier'],
    shade: 'full',
    bestFor: 'Small shady lake with a dock — drop a worm and wait. Very beginner-friendly!',
    parentInfo: { parking: 'Free parking off Lake Fenwick Rd.', bathrooms: 'Yes — at the park.' },
    tip: 'Stocked trout hang around the dock. A simple bobber rig is all you need!',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lake+Fenwick+Park+Kent+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/reports/stocking/trout-plants',
  },
  {
    id: 'angle-lake',
    name: 'Angle Lake Park',
    city: 'SeaTac',
    region: 'seattle-south',
    emoji: '✈️',
    species: ['Rainbow Trout', 'Largemouth Bass', 'Yellow Perch'],
    facilities: ['parking', 'restrooms', 'playground', 'picnic'],
    shade: 'partial',
    bestFor: 'Fish and watch planes land at SEA-TAC next door — double fun for aviation fans!',
    parentInfo: { parking: 'Free parking at the park.', bathrooms: 'Yes — at the park.' },
    tip: 'Stocked trout and a playground — great for a short trip close to home.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Angle+Lake+Park+SeaTac+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/reports/stocking/trout-plants',
  },
  {
    id: 'steel-lake',
    name: 'Steel Lake Park',
    city: 'Federal Way',
    region: 'seattle-south',
    emoji: '⚙️',
    species: ['Rainbow Trout', 'Largemouth Bass', 'Yellow Perch'],
    facilities: ['parking', 'restrooms', 'playground', 'picnic'],
    shade: 'partial',
    bestFor: 'Playground right by the water — kids can mix fishing and playing all day long',
    parentInfo: { parking: 'Free parking at the park.', bathrooms: 'Yes — at the park.' },
    tip: 'Stocked trout plus easy shore access = perfect for beginners.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Steel+Lake+Park+Federal+Way+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/reports/stocking/trout-plants',
  },
  {
    id: 'five-mile-lake',
    name: 'Five Mile Lake Park',
    city: 'Federal Way',
    region: 'seattle-south',
    emoji: '🐟',
    species: ['Rainbow Trout', 'Largemouth Bass', 'Yellow Perch'],
    facilities: ['parking', 'restrooms', 'picnic'],
    shade: 'partial',
    bestFor: 'Quiet and shaded — a calm alternative to the busier Federal Way parks',
    parentInfo: { parking: 'Free parking at the park.', bathrooms: 'Yes — at the park.' },
    tip: 'Less crowded than Steel Lake — good pick if you want a quieter morning out.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Five+Mile+Lake+Park+Federal+Way+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/reports/stocking/trout-plants',
  },
]

const REGIONS = [
  { key: 'all',          label: '🗺️ All spots' },
  { key: 'eastside',     label: '🏔️ Eastside' },
  { key: 'seattle-south',label: '🌆 Seattle & South' },
]

export default function FreshwaterSpots() {
  const [region, setRegion] = useState('all')

  const visible = region === 'all' ? spots : spots.filter(s => s.region === region)

  return (
    <div className="page lakes-page">
      <Helmet>
        <title>22 Kid-Friendly Lakes & Rivers Near Seattle — Go Fish Seattle!</title>
        <meta name="description" content="22 real, public freshwater fishing spots across King County — Bellevue, Kirkland, Redmond, Sammamish, Issaquah, Seattle, and more. What to catch, parent info, and links to WDFW stocking reports." />
        <meta property="og:title" content="22 Kid-Friendly Lakes Near Seattle — Go Fish Seattle!" />
        <meta property="og:description" content="Eastside lakes, Seattle parks, and South King County spots — all beginner-friendly with parking and bathroom info." />
        <meta property="og:image" content={`${SITE}/og-image.png`} />
        <meta property="og:url" content={`${SITE}/lakes`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Page header */}
      <div className="lakes-hero">
        <h1 className="lakes-title">🏞️ Lakes &amp; Rivers</h1>
        <p className="lakes-intro">
          {spots.length} kid-friendly freshwater spots across King County — all beginner-friendly!
        </p>
      </div>

      {/* Region filter */}
      <div className="lakes-filter" role="group" aria-label="Filter by region">
        {REGIONS.map(r => (
          <button
            key={r.key}
            className={`filter-btn${region === r.key ? ' filter-btn--active' : ''}`}
            onClick={() => setRegion(r.key)}
          >
            {r.label}
            <span className="filter-count">
              {r.key === 'all' ? spots.length : spots.filter(s => s.region === r.key).length}
            </span>
          </button>
        ))}
      </div>

      {/* Spot cards */}
      <div className="spots-grid">
        {visible.map(spot => (
          <div key={spot.id} className={`spot-card spot-card--${spot.region}`}>
            {/* Card header */}
            <div className="spot-header">
              <span className="spot-emoji" aria-hidden="true">{spot.emoji}</span>
              <div className="spot-header-text">
                <h2 className="spot-name">{spot.name}</h2>
                <span className="spot-location">📌 {spot.city}</span>
              </div>
            </div>

            <div className="spot-body">
              {/* Species pills */}
              <div className="spot-section">
                <p className="spot-section-label">🎣 What you might catch</p>
                <ul className="catch-list" aria-label="Fish species">
                  {spot.species.map(f => <li key={f}>{f}</li>)}
                </ul>
              </div>

              {/* Kid-friendly reason */}
              <div className="spot-best-for">
                <span aria-hidden="true">⭐</span> {spot.bestFor}
              </div>

              {/* Tip */}
              <div className="spot-tip">
                💡 <strong>Tip:</strong> {spot.tip}
              </div>

              {/* Facilities */}
              <div className="spot-facilities" aria-label="Facilities">
                {spot.facilities.map(f => (
                  <span key={f} className="facility-badge" title={FACILITY_ICONS[f].label}>
                    {FACILITY_ICONS[f].icon}
                    <span className="facility-label">{FACILITY_ICONS[f].label}</span>
                  </span>
                ))}
              </div>

              {/* Parent info */}
              <div className="spot-parent-info">
                <p>🅿️ {spot.parentInfo.parking}</p>
                <p>🚻 {spot.parentInfo.bathrooms}</p>
              </div>

              {/* Action buttons */}
              <div className="spot-actions">
                <a
                  href={spot.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spot-btn spot-btn--maps"
                >
                  📍 Google Maps
                </a>
                <a
                  href={spot.wdfwUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spot-btn spot-btn--wdfw"
                >
                  📋 WDFW Rules
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Suggest a spot */}
      <div className="spots-suggest">
        <div className="spots-suggest-inner">
          <p className="spots-suggest-label">Know a great spot?</p>
          <h2 className="spots-suggest-heading">Help other families find it!</h2>
          <a
            className="btn-suggest"
            href={`mailto:${SUGGEST_EMAIL}?subject=${SUGGEST_SUBJECT}&body=${SUGGEST_BODY}`}
          >
            📧 Suggest a Spot
          </a>
        </div>
      </div>

      {/* WDFW disclaimer */}
      <div className="spots-wdfw-note">
        <span aria-hidden="true">⚠️</span>
        <p>
          Fishing rules and stocking schedules change. Always check{' '}
          <a href="https://wdfw.wa.gov" target="_blank" rel="noopener noreferrer">wdfw.wa.gov</a>{' '}
          with a grown-up before your trip!
        </p>
      </div>
    </div>
  )
}
