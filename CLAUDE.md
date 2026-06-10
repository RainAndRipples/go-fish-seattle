# Go Fish Seattle! — Project Brief

## What this is
A free, kid-friendly website teaching kids ages 8–10 how to start fishing in the Seattle metro area. Built by a beginner, deployed for free on Vercel.

## Status (update this as we go)
- v1 deployed and live at https://go-fish-seattle.vercel.app
- Deployment pipeline: GitHub repo (RainAndRipples/go-fish-seattle) → Vercel auto-deploys on every push to main
- Pages completed:
  1. Home — hero, section cards, fun-fact banner
  2. Learn to Fish — tabbed: rod diagram, cast steps, clinch knot, bait guide
  3. Fishing Spots — 6 location cards (4 lakes, 2 saltwater piers)
  4. Fish ID — 6 interactive flip cards
  5. Rules for Kids — plain-language rules with WDFW link

## Conventions
- Git identity: commits use the name "RainAndRipples" and email 219553671+RainAndRipples@users.noreply.github.com — never use a real name or personal email in commits, code, or site content
- Commit and push after each completed task so the live site updates progressively
- All content at a 3rd-grade reading level; mobile-first, big text, big buttons
- No invented fishing regulations — use only verified facts and link to wdfw.wa.gov for everything else
- Stocking schedules and seasons change — describe them generally and link out, no hardcoded dates

## Audience
- Primary: kids ages 8–10 (reading level ~3rd grade)
- Secondary: their parents (practical info like parking, bathrooms, safety)

## Design rules
- Playful, bright, colorful — big buttons, large readable text
- Very little text per screen; prefer pictures, icons, and short sentences
- Mobile-friendly first (parents will pull it up at the lake)
- Friendly illustration style welcome (free SVGs or emoji, no copyrighted characters)

## Tech
- React + Vite, static site (no backend, no database)
- Deployed on Vercel, source on GitHub
- Single-page app with React Router (client-side routing)
- Fonts: Fredoka One (headings) + Nunito (body) via Google Fonts
- CSS custom properties for the color palette (see src/index.css)

## Pages (v1 — all complete)
1. Home — fun hero section with big buttons to each section
2. Learn to Fish — illustrated basics: parts of a rod, tying a clinch knot, how to cast, picking bait (worms, PowerBait)
3. Fishing Spots — cards for 6 kid-friendly locations, each with: what you might catch, why it's good for kids, and parent info (parking, bathrooms). Spots: Green Lake (Seattle), Lake Sammamish State Park (Issaquah), Gene Coulon Memorial Beach Park (Renton), Lake Meridian Park (Kent), Edmonds Fishing Pier, Seattle waterfront Pier 86
4. Fish ID — flip cards for common local fish: rainbow trout, yellow perch, largemouth bass, coho salmon, cutthroat trout, bluegill. Front: name + tagline. Back: fun facts and keep size.
5. Rules for Kids — no license under 15, Free Fishing Weekend, catch record card for salmon/steelhead, catch limits, catch-and-release tips, WDFW link

## Next up (planned for next session)
1. Fish ID: real openly licensed images from Wikimedia Commons (stored in repo, with attribution + Wikipedia links)
2. Expand Fishing Spots to ~12 real, public, kid-friendly locations including streams and piers
3. "Suggest a spot" mailto link
4. "Where Should I Fish Today?" page using the free Open-Meteo API
5. Phone-size polish pass

## Parked (do NOT build unless asked)
- Gear/shopping page and Amazon affiliate links (planned much later)
- User accounts, databases, comment features, community submissions
- Quiz / badge tracker, trip checklist generator, fish of the week, printable fish ID cards

## Important accuracy notes
- Do not invent fishing regulations. Use only verified facts; link to wdfw.wa.gov for everything else.
- Stocking schedules and seasons change — describe them generally and link out, no hardcoded dates.
