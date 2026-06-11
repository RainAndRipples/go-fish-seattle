# Go Fish Seattle! — Project Brief

## What this is
A free, kid-friendly website teaching kids ages 8–10 how to start fishing in the Seattle metro area. Built by a beginner, deployed for free on Vercel.

## Status (keep updated as we go)
- v1 deployed and live on Vercel at https://go-fish-seattle.vercel.app
- Pipeline: GitHub repo (RainAndRipples/go-fish-seattle) → Vercel auto-deploys on every push
- Pages done: Home, Learn to Fish, Fishing Spots, Fish ID, Rules for Kids

## Conventions
- Git identity: name "RainAndRipples", email 219553671+RainAndRipples@users.noreply.github.com — never my real name or personal email in commits, code, or site content
- Commit and push after each completed task
- Kid content at 3rd-grade reading level; mobile-first, big text, big buttons
- Never hardcode regulations, prices, seasons, or open/closed status — state stable facts only and link to official sources (wdfw.wa.gov, fishhunt.wa.gov, WA DOH shellfish map)

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

## Build list (work through in order, commit + push after each)
1. Fish ID: openly licensed photos/illustrations from Wikimedia Commons, stored in repo, attribution in a credits section, each card links to its Wikipedia page
2. Fishing Spots: expand to ~12 real, public, kid-friendly Seattle-metro locations including streams and piers; same card format (what you might catch, why it's good for kids, parking/bathrooms)
3. "Suggest a spot!" mailto link on the Spots page — no forms, no database
4. New page "Where Should I Fish Today?": Seattle weather via free Open-Meteo API (no key), recommend 2–3 spots with simple kid-friendly rules and big weather icons
5. New page "Clams & Shellfish": kid-friendly intro to WA shellfishing (razor clams + Puget Sound clams/oysters). Prominent "check before you go" section linking WDFW razor clam updates and the WA DOH Shellfish Safety Map — never say a beach is open; teach checking the live sources every time. Verify current adult/kid license rules on wdfw.wa.gov while building
6. Licensing: "Get your license" section on the Rules page + footer link — celebrate that kids 14 and under fish free, adults link to fishhunt.wa.gov, mention the combo license covers shellfish, youth license at 15, catch record cards from the same place. No hardcoded prices
7. New page "Parent's Guide": the real-talk side of fishing with kids — fun > fish, keep first trips short, younger-sibling activities (bucket + net, spotter jobs), handling frustration and tangles, snacks/bathrooms/exit plan, making fishless days end well. Written for adults, warm parent-to-parent tone
8. Final polish: every page at phone size, big text, works one-handed

## Parked (do NOT build unless I ask)
- Gear/shopping page, Amazon affiliate links
- Rig guide: 4 core rigs (bobber, PowerBait trout, slip bobber, pier high-low) with diagrams and real part sizes — free simplified web versions + paid printable deck later
- Weather page v2: recommend spot + rig + bait together; tides API for clamming days
- Printables product line (rig cards, trip survival sheet, fish ID deck)
- Marketing: parent groups post, tackle shop QR cards, ParentMap pitch, SEO pass, "DadsOnDocks" video series
- User accounts, databases, comments, community submissions
