import { Helmet } from 'react-helmet-async'
import './ParentsGuide.css'

const sections = [
  {
    id: 'expectations',
    emoji: '🎯',
    color: 'blue',
    title: 'Set the Right Expectations (For Yourself)',
    body: [
      "Here's the secret no fishing app will tell you: a great first fishing trip doesn't require catching a single fish. The goal is that your kid asks to go again.",
      "Fish don't care about your schedule. They might not bite at all. That's completely normal, and your kid will take their cue entirely from you. If you're relaxed and having fun, they will be too. If you're tense and disappointed, the whole thing falls apart.",
      "Frame the day around the experience, not the outcome: we're going to sit at the water, throw some bait in, and see what happens. Anything we catch is a bonus.",
    ],
  },
  {
    id: 'short',
    emoji: '⏱️',
    color: 'green',
    title: 'Keep It Short',
    body: [
      "For a first trip, plan for 1–2 hours max. Maybe less. Seriously.",
      "Kids under 10 have a hard time sitting still for more than an hour, and a fishing trip that ends while everyone's still happy is infinitely better than one that drags on until someone's crying.",
      "Leave while it's still fun. You can always go back.",
    ],
  },
  {
    id: 'siblings',
    emoji: '👧',
    color: 'orange',
    title: 'Younger Siblings and Extra Kids',
    body: [
      "If you're bringing little ones who aren't old enough to fish or who lose interest fast, come prepared. A small bucket and a net for catching tadpoles or small creatures near the shore keeps younger kids busy for a surprisingly long time.",
      "Give them an official job: 'You're the spotter — let me know if you see any ripples in the water.' Kids take jobs seriously.",
      "Rock collecting, skipping stones, and looking for bugs in the grass are all legitimate activities at the water's edge. Pack snacks accordingly.",
    ],
  },
  {
    id: 'tangles',
    emoji: '😤',
    color: 'yellow',
    title: 'Handling Tangles and Frustration',
    body: [
      "Tangled lines happen. Bait falls off. The hook gets stuck. Someone catches a branch instead of a fish. These are not failures — they're just part of fishing.",
      "Your reaction when things go sideways is the whole ballgame. A cheerful 'oh well, let's untangle this and try again' teaches kids resilience in a way that has nothing to do with fishing.",
      "Keep extra hooks and pre-tied leaders in your tackle box so you can swap out quickly instead of spending 10 minutes fiddling with a tiny knot while someone gets increasingly frustrated.",
      "If your kid is melting down, take a snack break. Hunger and frustration look identical at this age.",
    ],
  },
  {
    id: 'logistics',
    emoji: '🎒',
    color: 'teal',
    title: 'Logistics: The Stuff That Actually Matters',
    body: [
      "Know where the bathroom is before you need it urgently. Seriously. Check this first.",
      "Bring more snacks than you think you need — double it. Fishing is more waiting than activity, and snacks make waiting tolerable.",
      "Have an exit plan. Know what you're going to say when it's time to leave: 'We're going to do five more casts, then we're going to get ice cream.' Kids respond much better to a clear transition than to 'okay we're done now.'",
      "Sunscreen, water, and bug spray. You'll be outside longer than you expect, standing next to water.",
    ],
  },
  {
    id: 'fishless',
    emoji: '🌅',
    color: 'green',
    title: 'When You Don\'t Catch Anything',
    body: [
      "This will happen. Maybe a lot. Here's how to make it land well:",
      "Name the things that were good: 'We saw that great blue heron. We got outside. The water looked beautiful.' Help them find the wins.",
      "Frame the fish as the sneaky ones: 'Those fish are tricky. We're going to have to come back and outsmart them.' This makes the next trip feel like a mission rather than a repeat failure.",
      "End with something fun — ice cream, a playground stop, a drive-through. The last thing they do will be what they remember. Make the exit happy and they'll be asking to go back before you get home.",
    ],
  },
]

const colorMap = {
  blue:   { bg: '#e3f2fd', border: '#1e90ff', head: '#1266cc' },
  green:  { bg: '#e8f5e9', border: '#4caf50', head: '#1b5e20' },
  orange: { bg: '#fff3e0', border: '#ff6f00', head: '#bf360c' },
  yellow: { bg: '#fffde7', border: '#ffd600', head: '#4a3800' },
  teal:   { bg: '#e0f7fa', border: '#00bcd4', head: '#00695c' },
}

export default function ParentsGuide() {
  return (
    <div className="page parents-page">
      <Helmet>
        <title>Parent's Guide to Fishing with Kids — Go Fish Seattle!</title>
        <meta name="description" content="Real-talk advice for parents taking kids fishing for the first time. Set the right expectations, keep trips short, handle tangles without drama, and make sure they want to come back — even if you don't catch anything." />
        <meta property="og:title" content="Parent's Guide to Fishing with Kids" />
        <meta property="og:description" content="Honest advice for parents: fun over fish, keep it short, handle the inevitable tangle, and end every trip well." />
        <meta property="og:image" content="https://go-fish-seattle.vercel.app/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <h1 className="parents-title">👨‍👩‍👧 Parent's Guide</h1>
      <p className="parents-subtitle">The real-talk version — for the adult in the car</p>

      <p className="parents-intro">
        This page isn't for kids. It's for you — the parent or grandparent or uncle who agreed
        to take someone fishing and is now quietly wondering how this is actually going to go.
        Here's what nobody tells you.
      </p>

      <nav className="parents-toc" aria-label="Jump to section">
        {sections.map(s => (
          <a key={s.id} href={`#${s.id}`} className="parents-toc-link">
            {s.emoji} {s.title}
          </a>
        ))}
      </nav>

      <div className="parents-sections">
        {sections.map(s => {
          const c = colorMap[s.color]
          return (
            <section
              key={s.id}
              id={s.id}
              className="parents-section"
              style={{ '--sec-bg': c.bg, '--sec-border': c.border, '--sec-head': c.head }}
            >
              <h2 className="parents-section-title">
                <span aria-hidden="true">{s.emoji}</span> {s.title}
              </h2>
              {s.body.map((para, i) => (
                <p key={i} className="parents-section-body">{para}</p>
              ))}
            </section>
          )
        })}
      </div>

      <div className="parents-closing">
        <p>
          The kid who catches their first fish and gets excited will remember it for decades.
          But so will the kid who had a quiet morning at the water with a parent who wasn't
          on their phone and wasn't stressed. Don't overthink it.
        </p>
        <p>
          Good luck out there. 🎣
        </p>
      </div>
    </div>
  )
}
