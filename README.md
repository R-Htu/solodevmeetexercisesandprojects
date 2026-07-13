# solodevmeetexercisesandprojects

A backend starter for [SoloDevMeet](https://www.solodevmeet.com/) exercises and projects. It's pre-wired to a shared **practice** MongoDB database and Firebase Firestore project, so you can run your Node.js/Firebase step checklists against a real backend on your own laptop instead of only checking code shape.

This is a **shared practice sandbox**, not your own private database:

- Both the MongoDB database and the Firebase project are **public on purpose** — they exist so anyone learning on SoloDevMeet can see real output with no signup or setup. You're not "leaking" anything by using the credentials already in this repo; that's the intended use.
- Both run on free tiers with **no billing attached, and none will ever be added** — so there's no risk of a surprise bill, no matter what happens to them.
- It's for testing and learning only — don't build anything real on it, and don't expect data to stick around forever.
- Everyone using this starter reads and writes the same MongoDB collection and Firestore project, so every document you create should include an `owner` field (your name, or any string unique to you) and every read should filter by it. The example routes already do this — copy the pattern.
- If it ever gets abused or exhausts its free-tier quota, it may need to be reset — that only affects practice data, never your real projects.

## Setup

1. `npm install`
2. `cp .env.example .env`
3. Fill in `MONGODB_URI` in `.env` — get the connection string from SoloDevMeet's "How to check your work" guide (shown on any Node.js/Firebase exercise step), or ask in the SoloDevMeet chat if you don't have it.
4. `npm start` (or `npm run dev` to auto-restart on changes)
5. Server runs at `http://localhost:3001`

The Firebase config in `config/firebase.js` needs no setup — Firebase's web config is safe to ship as-is; access is controlled by the project's Firestore rules, not by keeping the config secret.

## Trying it out

```bash
# MongoDB
curl -X POST http://localhost:3001/api/practice/mongo -H "Content-Type: application/json" -d '{"owner":"yourName","text":"hello from mongo"}'
curl "http://localhost:3001/api/practice/mongo?owner=yourName"

# Firestore
curl -X POST http://localhost:3001/api/practice/firestore -H "Content-Type: application/json" -d '{"owner":"yourName","text":"hello from firestore"}'
curl "http://localhost:3001/api/practice/firestore?owner=yourName"
```

## Building your own exercise route

`routes/example.js` shows both patterns (MongoDB and Firestore) for a single "text" field. When you're working on a SoloDevMeet step:

1. Copy `routes/example.js` to a new file, e.g. `routes/people.js`.
2. Rename the route path and fields to match the step's checklist (e.g. `name`/`age` instead of `text`).
3. Mount it in `server.js`: `app.use('/api/people', peopleRoutes)`.
4. Follow the numbered Node.js/Firebase checklist shown on the SoloDevMeet step — it tells you exactly which route, fields, and database calls that step expects.
5. Test with curl, Postman, or Thunder Client, and check the response against what the step describes.
