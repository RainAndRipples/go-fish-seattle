import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './WeatherFish.css'

const LAT = 47.6062
const LON = -122.3321

// ── Rig definitions ───────────────────────────────────────────────
const RIGS = {
  carolinaRig: {
    name: 'Carolina Rig',
    detail: '1/4 oz egg sinker · barrel swivel · 18" fluoro leader · #8 hook · PowerBait',
    level: 'beginner',
  },
  slipBobber: {
    name: 'Slip Bobber Rig',
    detail: '18" leader · #8 hook · nightcrawler · set depth 3–5 ft',
    level: 'beginner',
  },
  dropShot: {
    name: 'Drop Shot Rig',
    detail: '12" leader · size 6 hook · small finesse worm or live minnow',
    level: 'beginner',
  },
  texasRig: {
    name: 'Texas Rig',
    detail: '1/4 oz bullet sinker · 3/0 EWG hook · 4" plastic worm (green pumpkin)',
    level: 'intermediate',
  },
  carolinaDeep: {
    name: 'Carolina Rig (Deep)',
    detail: '1/2 oz sinker · 24" leader · drop shot worm — fish go deep when it\'s warm',
    level: 'intermediate',
  },
  inlineSpinner: {
    name: 'Inline Spinner',
    detail: 'Rooster Tail or Panther Martin · 1/8 oz · gold or yellow — trout love these in rain!',
    level: 'intermediate',
  },
  highLow: {
    name: 'High-Low Rig',
    detail: '1 oz sinker on bottom · two dropper loops 6" and 18" up · size 4 hooks · shrimp or squid',
    level: 'beginner',
  },
  sabiki: {
    name: 'Sabiki Rig',
    detail: '6-hook bait rig · drop to bottom · lift and drop for fast perch action',
    level: 'beginner',
  },
  fishFinder: {
    name: 'Fish Finder Rig',
    detail: 'Sliding 1 oz sinker · 18" fluoro leader · #4 hook · shrimp on the bottom',
    level: 'intermediate',
  },
}

// ── Spot data for recommendations ────────────────────────────────
const FW = {
  cottageLake:   { name: 'Cottage Lake Park',        city: 'Woodinville',  emoji: '🏡', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Cottage+Lake+Park+Woodinville+WA',          wdfwUrl: 'https://wdfw.wa.gov/fishing/locations/lowland-lakes/cottage-lake' },
  pineLake:      { name: 'Pine Lake Park',            city: 'Sammamish',    emoji: '🌲', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pine+Lake+Park+Sammamish+WA',               wdfwUrl: 'https://wdfw.wa.gov/fishing/reports/stocking/trout-plants' },
  greenLake:     { name: 'Green Lake',                city: 'Seattle',      emoji: '🌿', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Green+Lake+Park+Seattle+WA',                wdfwUrl: 'https://wdfw.wa.gov/fishing/reports/stocking/trout-plants' },
  geneCoulon:    { name: 'Gene Coulon Beach Park',    city: 'Renton',       emoji: '🏖️', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gene+Coulon+Memorial+Beach+Park+Renton+WA', wdfwUrl: 'https://wdfw.wa.gov/fishing/locations/lowland-lakes/lake-washington' },
  lakeFenwick:   { name: 'Lake Fenwick Park',         city: 'Kent',         emoji: '🌲', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lake+Fenwick+Park+Kent+WA',                  wdfwUrl: 'https://wdfw.wa.gov/fishing/reports/stocking/trout-plants' },
  lakeWilderness:{ name: 'Lake Wilderness Park',      city: 'Maple Valley', emoji: '🌳', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lake+Wilderness+Park+Maple+Valley+WA',       wdfwUrl: 'https://wdfw.wa.gov/fishing/reports/stocking/trout-plants' },
  lakeSammamish: { name: 'Lake Sammamish State Park', city: 'Issaquah',     emoji: '🏕️', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lake+Sammamish+State+Park+Issaquah+WA',    wdfwUrl: 'https://wdfw.wa.gov/fishing/locations/lowland-lakes/lake-sammamish' },
  beaverLake:    { name: 'Beaver Lake Park',          city: 'Sammamish',    emoji: '🦫', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Beaver+Lake+Sammamish+WA',                   wdfwUrl: 'https://wdfw.wa.gov/fishing/locations/lowland-lakes/beaver-lake-sammamish' },
}

const SW = {
  edmonds:   { name: 'Edmonds Fishing Pier',        city: 'Edmonds',      emoji: '⚓', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Edmonds+Fishing+Pier+Edmonds+WA',             wdfwUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  seacrest:  { name: 'Seacrest Fishing Pier',       city: 'West Seattle', emoji: '🌁', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Seacrest+Park+Fishing+Pier+West+Seattle+WA', wdfwUrl: 'https://wdfw.wa.gov/fishing/regulations' },
  desMoines: { name: 'Des Moines Marina Pier',      city: 'Des Moines',   emoji: '🚢', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Des+Moines+Marina+Fishing+Pier+WA',           wdfwUrl: 'https://wdfw.wa.gov/fishing/regulations' },
}

// ── Weather helpers ───────────────────────────────────────────────
function wmoInfo(code) {
  if (code === 0)        return { emoji: '☀️',  label: 'Clear Sky' }
  if (code <= 2)         return { emoji: '🌤️', label: 'Partly Cloudy' }
  if (code === 3)        return { emoji: '☁️',  label: 'Overcast' }
  if (code <= 48)        return { emoji: '🌫️', label: 'Foggy' }
  if (code <= 55)        return { emoji: '🌦️', label: 'Light Drizzle' }
  if (code <= 67)        return { emoji: '🌧️', label: 'Rainy' }
  if (code <= 77)        return { emoji: '🌨️', label: 'Snowy' }
  if (code <= 82)        return { emoji: '🌦️', label: 'Rain Showers' }
  return                        { emoji: '⛈️', label: 'Thunderstorm' }
}

function fishingScore(code, windMph) {
  if (windMph > 22) return 0
  if (code >= 65)   return 0
  if (code <= 55)   return 2
  if (code <= 63)   return 1
  return 0
}

// ── Recommendation logic ──────────────────────────────────────────
function getFreshwaterPicks({ score, tempF, hour }) {
  if (score === 0) return []

  const isCool      = tempF < 60
  const isWarm      = tempF > 70
  const isDawn      = hour >= 5  && hour < 10
  const isAfternoon = hour >= 15 && hour < 20

  if (score === 1) {
    return [
      { spot: FW.cottageLake,    target: 'Rainbow Trout',   rig: RIGS.inlineSpinner },
      { spot: FW.geneCoulon,     target: 'Rainbow Trout',   rig: RIGS.slipBobber },
      { spot: FW.lakeFenwick,    target: 'Rainbow Trout',   rig: RIGS.carolinaRig },
    ]
  }

  if (isCool) {
    return [
      { spot: FW.cottageLake,   target: 'Rainbow Trout', rig: RIGS.carolinaRig },
      { spot: FW.pineLake,      target: 'Rainbow Trout', rig: RIGS.carolinaRig },
      { spot: FW.greenLake,     target: 'Rainbow Trout', rig: RIGS.slipBobber },
    ]
  }

  if (isWarm && !isDawn) {
    return [
      { spot: FW.lakeFenwick,     target: 'Yellow Perch',    rig: RIGS.carolinaDeep },
      { spot: FW.lakeWilderness,  target: 'Largemouth Bass', rig: RIGS.texasRig },
      { spot: FW.beaverLake,      target: 'Yellow Perch',    rig: RIGS.carolinaDeep },
    ]
  }

  if (isAfternoon) {
    return [
      { spot: FW.greenLake,     target: 'Yellow Perch',    rig: RIGS.dropShot },
      { spot: FW.geneCoulon,    target: 'Largemouth Bass', rig: RIGS.texasRig },
      { spot: FW.lakeFenwick,   target: 'Yellow Perch',    rig: RIGS.dropShot },
    ]
  }

  return [
    { spot: FW.cottageLake,    target: 'Rainbow Trout', rig: RIGS.slipBobber },
    { spot: FW.lakeSammamish,  target: 'Rainbow Trout', rig: RIGS.slipBobber },
    { spot: FW.greenLake,      target: 'Rainbow Trout', rig: RIGS.carolinaRig },
  ]
}

function getSaltwaterPicks({ score, windMph }) {
  if (score === 0) return []
  if (score === 1 || windMph > 15) {
    return [
      { spot: SW.desMoines, target: 'Yellow Perch / Flounder', rig: RIGS.fishFinder },
    ]
  }
  return [
    { spot: SW.edmonds,   target: 'Rockfish / Perch', rig: RIGS.sabiki },
    { spot: SW.seacrest,  target: 'Rockfish / Perch', rig: RIGS.highLow },
  ]
}

function bestTimeText(hour, tempF) {
  if (hour >= 5  && hour < 10)               return { icon: '🌅', text: 'Go now — best bite of the day!' }
  if (hour >= 10 && hour < 15 && tempF > 70) return { icon: '🌞', text: 'Midday slump — dawn or after 4pm is better' }
  if (hour >= 15 && hour < 20)               return { icon: '🌆', text: 'Evening bite starting — great time to go!' }
  if (hour < 5)                              return { icon: '🌙', text: 'Wait for dawn — fish bite at first light' }
  return                                            { icon: '🎣', text: 'Good time to head out!' }
}

function crowdEstimate(score) {
  const day = new Date().getDay()
  const isWeekend = day === 0 || day === 6
  if (score === 1)   return { icon: '🌧️', text: 'Light crowd — rain keeps people away!' }
  if (isWeekend)     return { icon: '👥', text: 'Weekend crowd — arrive early for a good spot!' }
  return                    { icon: '😊', text: 'Usually quiet on weekdays' }
}

// ── Verdict config ────────────────────────────────────────────────
const VERDICT = {
  2: {
    heading: 'Great day to go fishing! 🎣',
    tip: code => code === 3
      ? 'Cloudy days are secretly great — fish come out more when it\'s not so bright!'
      : 'Sunny and calm — fish are active. A perfect day to head out!',
    color: 'green',
  },
  1: {
    heading: 'Not bad — grab a rain jacket! 🌦️',
    tip: () => 'Fish often bite more in light rain — raindrops hitting the water wake them up!',
    color: 'yellow',
  },
  0: {
    heading: 'Too rough today. 😬',
    tip: windMph => windMph > 22
      ? `Too windy right now (${Math.round(windMph)} mph). Check back when it calms down!`
      : 'Heavy rain or storms make fishing tough. Check back tomorrow!',
    color: 'red',
  },
}

// ── SSR-safe helmet (outside component) ──────────────────────────
const weatherHelmet = (
  <Helmet>
    <title>Where Should I Fish Today? — Go Fish Seattle!</title>
    <meta name="description" content="Live Seattle weather with freshwater and saltwater fishing recommendations — spot, target species, exact rig, best time of day, and crowd estimate. Updated every time you load." />
    <meta property="og:title" content="Where Should I Fish Today? — Go Fish Seattle!" />
    <meta property="og:description" content="Live Seattle weather + today's top fishing picks — freshwater lakes and saltwater piers." />
    <meta property="og:image" content="https://go-fish-seattle.vercel.app/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
  </Helmet>
)

// ── Pick card ─────────────────────────────────────────────────────
function PickCard({ pick, timeText, crowd }) {
  const { spot, target, rig } = pick
  const isIntermediate = rig.level === 'intermediate'

  return (
    <div className="pick-card">
      <div className="pick-header">
        <span className="pick-emoji" aria-hidden="true">{spot.emoji}</span>
        <div className="pick-header-text">
          <p className="pick-name">{spot.name}</p>
          <p className="pick-city">📌 {spot.city}</p>
        </div>
      </div>

      <div className="pick-body">
        <div className="pick-target-row">
          <span className="pick-target">🐟 {target}</span>
          <span className={`pick-level pick-level--${rig.level}`}>
            {isIntermediate ? '🟡' : '🟢'} {isIntermediate ? 'Intermediate' : 'Beginner'}
          </span>
        </div>

        <div className="pick-rig">
          <p className="pick-rig-name">🪝 {rig.name}</p>
          <p className="pick-rig-detail">{rig.detail}</p>
        </div>

        <div className="pick-meta">
          <span>{timeText.icon} {timeText.text}</span>
          <span>{crowd.icon} {crowd.text}</span>
        </div>

        <div className="pick-actions">
          <a href={spot.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="pick-btn pick-btn--maps">
            📍 Maps
          </a>
          <a href={spot.wdfwUrl} target="_blank" rel="noopener noreferrer" className="pick-btn pick-btn--wdfw">
            📋 Rules
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────
export default function WeatherFish() {
  const [weather, setWeather] = useState(null)
  const [error, setError]     = useState(false)

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
      `&current=temperature_2m,precipitation,wind_speed_10m,weather_code` +
      `&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`
    )
      .then(r => r.json())
      .then(data => setWeather(data.current))
      .catch(() => setError(true))
  }, [])

  if (error) {
    return (
      <div className="page weather-page">
        {weatherHelmet}
        <h1 className="weather-title">🌤️ Where Should I Fish Today?</h1>
        <div className="weather-error">
          <p>😬 Couldn't load the weather right now. Try refreshing!</p>
          <p className="weather-error-sub">In the meantime, check out <Link to="/lakes">Lakes &amp; Rivers</Link> or <Link to="/sound">Puget Sound</Link>.</p>
        </div>
      </div>
    )
  }

  if (!weather) {
    return (
      <div className="page weather-page">
        {weatherHelmet}
        <h1 className="weather-title">🌤️ Where Should I Fish Today?</h1>
        <div className="weather-loading">
          <div className="weather-loading-spinner" aria-hidden="true">🎣</div>
          <p>Checking the weather in Seattle…</p>
        </div>
      </div>
    )
  }

  const { temperature_2m: temp, wind_speed_10m: wind, weather_code: code } = weather
  const { emoji, label } = wmoInfo(code)
  const score   = fishingScore(code, wind)
  const verdict = VERDICT[score]
  const tipArg  = score === 0 ? wind : code
  const hour    = new Date().getHours()

  const fwPicks  = getFreshwaterPicks({ score, tempF: temp, hour })
  const swPicks  = getSaltwaterPicks({ score, windMph: wind })
  const timeText = bestTimeText(hour, temp)
  const crowd    = crowdEstimate(score)

  return (
    <div className="page weather-page">
      {weatherHelmet}
      <h1 className="weather-title">🌤️ Where Should I Fish Today?</h1>
      <p className="weather-subtitle">Live Seattle weather — updated every time you load the page</p>

      {/* Weather card */}
      <div className="weather-card">
        <div className="weather-icon" aria-hidden="true">{emoji}</div>
        <div className="weather-info">
          <p className="weather-temp">{Math.round(temp)}°F</p>
          <p className="weather-label">{label}</p>
          <p className="weather-wind">💨 Wind: {Math.round(wind)} mph</p>
        </div>
      </div>

      {/* Verdict banner */}
      <div className={`verdict-banner verdict--${verdict.color}`}>
        <h2 className="verdict-heading">{verdict.heading}</h2>
        <p className="verdict-tip">{verdict.tip(tipArg)}</p>
      </div>

      {score > 0 ? (
        <>
          {/* Freshwater picks */}
          <section className="picks-section">
            <h2 className="picks-section-title">🏞️ Lakes &amp; Rivers</h2>
            <p className="picks-section-sub">Best freshwater spots for today's conditions</p>
            <div className="picks-grid">
              {fwPicks.map(p => (
                <PickCard key={p.spot.name} pick={p} timeText={timeText} crowd={crowd} />
              ))}
            </div>
            <p className="picks-see-all"><Link to="/lakes">See all 22 lakes →</Link></p>
          </section>

          {/* Saltwater picks */}
          <section className="picks-section">
            <h2 className="picks-section-title">🌊 Puget Sound</h2>
            <p className="picks-section-sub">Best saltwater piers for today's conditions</p>
            <div className="picks-grid">
              {swPicks.map(p => (
                <PickCard key={p.spot.name} pick={p} timeText={timeText} crowd={crowd} />
              ))}
            </div>
            <p className="picks-see-all"><Link to="/sound">Explore the Sound →</Link></p>
          </section>
        </>
      ) : (
        <div className="weather-tryagain">
          <p>🏠 Today's a great day to practice your clinch knot indoors!</p>
          <Link to="/learn" className="btn btn-blue">Learn to Fish →</Link>
        </div>
      )}

      <div className="weather-wdfw-note">
        <span aria-hidden="true">⚠️</span>
        <p>
          Always check{' '}
          <a href="https://wdfw.wa.gov" target="_blank" rel="noopener noreferrer">wdfw.wa.gov</a>{' '}
          for current rules and stocking reports before heading out!
        </p>
      </div>
    </div>
  )
}
