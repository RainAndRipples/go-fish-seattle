# Go Fish Seattle! — Project Brief

## What this is
A free, kid-friendly website teaching kids ages 8–10 how to start fishing in the Seattle metro area. Built by a beginner, deployed for free on Vercel.

## Audience
- Primary: kids ages 8–10 (reading level ~3rd grade)
- Secondary: their parents (practical info like parking, bathrooms, safety)

## Design rules
- Playful, bright, colorful — big buttons, large readable text
- Very little text per screen; prefer pictures, icons, and short sentences
- Mobile-friendly first (parents will pull it up at the lake)
- Friendly illustration style welcome (free SVGs or emoji, no copyrighted characters)

## Tech
- React + Vite, static site (no backend, no database in v1)
- Deploy free on Vercel
- Single-page app with simple client-side routing

## Pages (v1)
1. Home — fun hero section with big buttons to each section
2. Learn to Fish — illustrated basics: parts of a rod, tying a clinch knot, how to cast, picking bait (worms, PowerBait)
3. Fishing Spots — cards for 6 kid-friendly locations, each with: what you might catch, why it's good for kids, and parent info (parking, bathrooms). Spots: Green Lake (Seattle), Lake Sammamish State Park (Issaquah), Gene Coulon Memorial Beach Park (Renton), Lake Meridian Park (Kent), Edmonds Fishing Pier, Seattle waterfront Pier 86
4. Fish ID — flip cards for common local fish: rainbow trout, yellow perch, largemouth bass, coho salmon, cutthroat trout, bluegill. Front: name + picture. Back: fun facts and how big they get.
5. Rules for Kids — simple explanations:
   - Kids 14 and younger do NOT need a fishing license in Washington
   - Free Fishing Weekend: the first weekend after the first Monday in June — anyone fishes free
   - If fishing for salmon or steelhead, even kids need a catch record card — "ask a grown-up to help get one"
   - Catch limits exist — only keep what the rules allow
   - Be kind to fish: wet your hands before touching them, catch-and-release tips
   - Always link to wdfw.wa.gov with a note: "rules can change — check with a grown-up!"

## Important accuracy notes
- Do not invent fishing regulations. Use only the facts above; link to WDFW for everything else.
- Stocking schedules and seasons change — describe them generally and link out, no hardcoded dates.

## Future ideas (NOT in v1)
- Quiz / badge tracker, trip checklist generator, fish of the week, printable fish ID cards

## Deployment
- Free hosting on Vercel, connected to a GitHub repo
- Walk me through git + GitHub setup step by step — I'm a beginner
