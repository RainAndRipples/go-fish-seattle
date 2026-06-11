import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './WeatherFish.css'

const LAT = 47.6062
const LON = -122.3321

function wmoInfo(code) {
  if (code === 0)         return { emoji: '☀️', label: 'Clear Sky' }
  if (code <= 2)          return { emoji: '🌤️', label: 'Partly Cloudy' }
  if (code === 3)         return { emoji: '☁️', label: 'Overcast' }
  if (code <= 48)         return { emoji: '🌫️', label: 'Foggy' }
  if (code <= 55)         return { emoji: '🌦️', label: 'Light Drizzle' }
  if (code <= 67)         return { emoji: '🌧️', label: 'Rainy' }
  if (code <= 77)         return { emoji: '🌨️', label: 'Snowy' }
  if (code <= 82)         return { emoji: '🌦️', label: 'Rain Showers' }
  return                  { emoji: '⛈️', label: 'Thunderstorm' }
}

function fishingScore(code, windMph) {
  if (windMph > 22) return 0
  if (code >= 65)   return 0
  if (code === 0 || code <= 3) return 2
  if (code <= 55)   return 2
  if (code <= 63)   return 1
  return 0
}

const VERDICT = {
  2: {
    heading: 'Great day to go fishing! 🎣',
    tip: code =>
      code === 3
        ? 'Cloudy days are secretly great — fish come out more when it\'s not so bright!'
        : 'Sunny and calm — fish are active and the water looks amazing.',
    color: 'green',
  },
  1: {
    heading: 'Not bad — grab a rain jacket! 🌦️',
    tip: () => 'Fish often bite more in light rain. They get excited when raindrops hit the water!',
    color: 'yellow',
  },
  0: {
    heading: 'Too rough today. 😬',
    tip: windMph =>
      windMph > 22
        ? `It's too windy right now (${Math.round(windMph)} mph). Check back when it calms down!`
        : 'Heavy rain or storms make fishing tough. Check back tomorrow!',
    color: 'red',
  },
}

const PICKS = [
  {
    score: [2, 1],
    name: 'Green Lake',
    emoji: '🌿',
    location: 'Seattle',
    why: 'Easy to reach, trout are stocked often, and the path is smooth all the way around.',
  },
  {
    score: [2],
    name: 'Edmonds Fishing Pier',
    emoji: '⚓',
    location: 'Edmonds',
    why: 'Best saltwater pier for kids — free, safe railings, and great views.',
  },
  {
    score: [2],
    name: 'Lake Wilderness Park',
    emoji: '🌳',
    location: 'Maple Valley',
    why: 'Bring the whole family — playground and splash pad right next to the fishing spot.',
  },
  {
    score: [1],
    name: 'Gene Coulon Beach Park',
    emoji: '🏖️',
    location: 'Renton',
    why: 'Sheltered lakeshore with a covered pier — decent even on grey or drizzly days.',
  },
  {
    score: [1],
    name: 'Lake Fenwick Park',
    emoji: '🌲',
    location: 'Kent',
    why: 'Small, calm, and tree-lined — a good choice when the weather is iffy.',
  },
]

const weatherHelmet = (
  <Helmet>
    <title>Where Should I Fish Today? — Go Fish Seattle!</title>
    <meta name="description" content="Live Seattle weather and top fishing spot recommendations for today. We check the conditions and tell you exactly where to take the kids fishing — updated every time you load the page." />
    <meta property="og:title" content="Where Should I Fish Today? — Go Fish Seattle!" />
    <meta property="og:description" content="Live Seattle weather + top fishing spot picks for today. Should you go? We'll tell you!" />
    <meta property="og:image" content="https://go-fish-seattle.vercel.app/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
  </Helmet>
)

export default function WeatherFish() {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(false)

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
          <p className="weather-error-sub">In the meantime, check out our <Link to="/spots">Fishing Spots</Link> page.</p>
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
  const score = fishingScore(code, wind)
  const verdict = VERDICT[score]
  const tipArg = score === 0 ? wind : code
  const picks = PICKS.filter(p => p.score.includes(score))

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

      {/* Spot picks */}
      {picks.length > 0 && (
        <section className="weather-picks">
          <h2 className="weather-picks-title">Today's Top Picks</h2>
          <div className="weather-picks-grid">
            {picks.map(p => (
              <div key={p.name} className="weather-pick-card">
                <span className="weather-pick-emoji" aria-hidden="true">{p.emoji}</span>
                <div className="weather-pick-info">
                  <p className="weather-pick-name">{p.name}</p>
                  <p className="weather-pick-location">📌 {p.location}</p>
                  <p className="weather-pick-why">{p.why}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="weather-picks-more">
            <Link to="/spots">See all 12 spots →</Link>
          </p>
        </section>
      )}

      {score === 0 && (
        <div className="weather-tryagain">
          <p>🏠 Today's a great day to practice your clinch knot indoors!</p>
          <Link to="/learn" className="btn btn-blue">Learn to Fish →</Link>
        </div>
      )}

      <div className="weather-wdfw-note">
        <span aria-hidden="true">⚠️</span>
        <p>
          Always check{' '}
          <a href="https://wdfw.wa.gov" target="_blank" rel="noopener noreferrer">
            wdfw.wa.gov
          </a>{' '}
          for current rules and stocking reports before heading out!
        </p>
      </div>
    </div>
  )
}
