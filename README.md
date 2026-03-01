# TOEFL 2026 Practice

A full-featured TOEFL 2026 practice platform. Covers all four sections — Reading, Listening, Writing, and Speaking — with adaptive difficulty, timed mock exams, band-score estimation, user accounts, and cloud-synced progress across devices.

**Live:** [toefl-2026-practice.vercel.app](https://toefl-2026-practice-jx17w8g2k-smkhizars-projects.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 (hooks, lazy loading) |
| UI library | MUI v6 (Material UI, dark theme) |
| State management | Zustand |
| Routing | React Router v6 |
| Build tool | Vite 7 |
| Auth | Supabase Auth (email/password + Google OAuth) |
| Database | Supabase PostgreSQL (cloud progress sync) |
| Hosting | Vercel (auto-deploy on push) |

---

## Features

### Authentication
- Email + password sign up / sign in
- Google OAuth (one-click)
- All routes protected — login required
- Progress syncs instantly to cloud and persists across devices

### Adaptive Practice Engine
- **2-stage adaptive testing** for Reading and Listening
- Stage 1 establishes your level → routes to Easy or Hard track based on score
- Threshold: ≥ 50% correct in Stage 1 → Hard track, otherwise Easy
- Each track has its own question pool so questions never repeat

### Reading Section
- **Complete the Words (CTW)** — paragraph with blanks; type the complete word
- **Read in Daily Life** — emails, announcements, text chains with MCQ
- **Read an Academic Passage** — multi-paragraph academic texts; vocabulary-in-context, inference, rhetorical purpose, sentence insertion, EXCEPT questions
- 83 questions across three difficulty pools

### Listening Section
- **Choose a Response** — hear a statement, pick the most appropriate reply
- **Conversation** — two-speaker exchanges with comprehension questions
- **Announcement** — short campus/public announcements
- **Academic Talk** — lecture-style passages testing inference and implied meaning
- 57 questions across three difficulty pools
- Audio via Web Speech API with transcript toggle

### Writing Section
- **Build a Sentence** — click phrase chunks to arrange into the correct sentence
- **Write an Email** — scenario with recipient, register, and 3 required bullet points; 80-word minimum, 7-minute timer
- **Academic Discussion** — open-ended discussion prompt with peer context; 100-word minimum, 10-minute timer
- 24 tasks total

### Speaking Section
- **Listen and Repeat** — 7 sentences across real-world scenes; repeat for pronunciation practice
- **Take an Interview** — 4 interview topics, each with 4 progressive sub-questions (Descriptive → Opinion → Analysis → Projection); 45 seconds per question
- Live speech recognition transcript + WPM + rubric estimate (Fluency / Completeness / Relevance)
- 11 task objects total

### Mock Exams
- **18 full timed simulations** across three difficulty bands:
  - Foundation: Tests 1–6
  - Intermediate: Tests 7–12
  - Advanced: Tests 13–18
- Runs all four sections end-to-end in official 2026 order: **Reading → Listening → Writing → Speaking**
- Adaptive routing applied live during exam
- Fullscreen enforcement with focus-loss warnings

### Timed Exam Mode

| Phase | Timer |
|---|---|
| Reading Stage 1 | 18 min |
| Reading Stage 2 | 12 min |
| Listening Stage 1 | 18 min |
| Listening Stage 2 | 11 min |
| Build a Sentence | 2 min |
| Write an Email | 7 min |
| Academic Discussion | 10 min |
| Speaking (per item) | ~45 sec |

### Post-Exam Review
- Correct / incorrect breakdown per section with score percentage
- Band score estimate (1.0–6.0, CEFR-aligned, 0.5-step increments)
- Writing: word count and task requirements
- Speaking: expected response for self-comparison

### Analytics & Progress
- Practice history tracked per section
- Score trends over time
- Import / export progress as JSON

---

## Project Structure

```
toefl-2026-practice/
├── src/
│   ├── main.jsx                    Entry point
│   ├── App.jsx                     Root layout, routing, auth guard
│   │
│   ├── lib/
│   │   └── supabase.js             Supabase client
│   │
│   ├── store/
│   │   ├── useAuthStore.js         Auth state (user, session, loading)
│   │   └── useProgressStore.js     Progress state + Supabase sync
│   │
│   ├── hooks/
│   │   ├── useTimer.js             Countdown timer with callback
│   │   └── useBandEstimate.js      % correct → 1.0–6.0 band score
│   │
│   ├── components/
│   │   └── SectionTimer.jsx        Visual countdown bar
│   │
│   ├── data/                       Question bank (static JS)
│   │   ├── reading.js              83 questions
│   │   ├── listening.js            57 questions
│   │   ├── writing.js              24 tasks
│   │   ├── speaking.js             11 task objects
│   │   └── mocks.js                18 mock exam configurations
│   │
│   └── views/
│       ├── AuthView.jsx            Sign in / Create account
│       ├── DashboardView.jsx       Progress overview
│       ├── PracticeHubView.jsx     Section selection
│       ├── ExamHubView.jsx         Mock exam list
│       ├── AnalyticsView.jsx       Score history
│       ├── SettingsView.jsx        Import / export / reset
│       ├── practice/
│       │   ├── ReadingPracticeView.jsx
│       │   ├── ListeningPracticeView.jsx
│       │   ├── WritingPracticeView.jsx
│       │   └── SpeakingPracticeView.jsx
│       └── exam/
│           ├── ExamStartView.jsx   Full adaptive mock engine
│           └── ExamReviewView.jsx  Results and band estimates
│
├── supabase/
│   └── schema.sql                  Run once in Supabase SQL Editor
│
├── vercel.json                     SPA rewrite rule
├── .env.example                    Environment variable template
└── vite.config.js
```

---

## Question Bank

| Section | Stage 1 | Stage 2 Easy | Stage 2 Hard | Total |
|---|---|---|---|---|
| Reading | 27 | 24 | 32 | **83** |
| Listening | 21 | 18 | 18 | **57** |
| Writing | — | — | — | **24 tasks** |
| Speaking | — | — | — | **11 tasks** |

---

## 2026 TOEFL Format

| Section | Format | Time |
|---|---|---|
| Reading | Adaptive 2-stage, 3 question types | ~30 min |
| Listening | Adaptive 2-stage, 5 question types | ~29 min |
| Writing | Build a Sentence + Email + Discussion | ~19 min |
| Speaking | Listen & Repeat + Interview | ~9 min |
| **Total** | | **~87 min** |

Scoring: **1–6 band scale**, CEFR-aligned (A1 → C2).

---

## Local Development

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) project (free tier)

### Setup

```bash
git clone https://github.com/smkhizar/TOEFL_2026_Practice.git
cd TOEFL_2026_Practice
npm install
```

Create a `.env` file:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Run the SQL in `supabase/schema.sql` once in your Supabase SQL Editor, then:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Deployment (Vercel)

1. Push repo to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Add environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
4. Build command: `npm run build` — Output: `dist`
5. Add your Vercel domain to **Supabase → Auth → URL Configuration** (Site URL + Redirect URLs)

Vercel auto-deploys on every `git push` to `main`.

---

## License

MIT
