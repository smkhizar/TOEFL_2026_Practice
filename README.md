# TOEFL 2026 Practice

A full-featured, self-hosted TOEFL 2026 practice platform built with Vue 3. Covers all four sections — Reading, Listening, Writing, and Speaking — with adaptive difficulty, timed mock exams, band-score estimation, and a detailed post-exam review system.

---

## Features

### Adaptive Practice Engine
- **2-stage adaptive testing** for Reading and Listening: Stage 1 establishes your level, then routes you to Easy or Hard questions based on your score
- Threshold: ≥ 50% correct in Stage 1 → Hard track, otherwise Easy track
- Each stage has its own independent question pool so questions never repeat across tracks

### Reading Section
- **Complete the Words (CTW)** — paragraph-level passages with 10 truncated words; type the complete word to fill each blank
- **Read in Daily Life** — realistic emails, announcements, and text chains with MCQ comprehension questions
- **Read an Academic Passage** — multi-paragraph academic texts with vocabulary-in-context, inference, rhetorical purpose, sentence insertion, and EXCEPT questions
- 83 questions total across three difficulty pools

### Listening Section
- **Choose a Response** — hear a statement, pick the most appropriate reply
- **Conversation** — two-speaker exchanges followed by comprehension questions
- **Announcement** — short public/campus announcements with detail questions
- **Academic Talk** — lecture-style passages testing inference and implied meaning
- **Multi-speaker Inference** — group discussions requiring contextual reasoning
- 57 questions total across three difficulty pools

### Writing Section
- **Build a Sentence** — arrange phrase chunks into the correct order using a click-to-build interface
- **Write an Email** — scenario-based email writing with a specified recipient, register, and three required bullet points; 80-word minimum, 7-minute timer
- **Academic Discussion** — open-ended discussion prompt with peer context; 100-word minimum, 10-minute timer
- 24 tasks total (7 Build a Sentence / 10 Email / 7 Discussion)

### Speaking Section
- **Listen and Repeat** — 7 context sentences per scene across 5 real-world settings (Office Kitchen, Science Lab, Shared Workspace, Campus Cafeteria, University Library); audio text provided for self-evaluation
- **Take an Interview** — 11 interview topic tracks, each with 4 progressive sub-questions following the arc: Descriptive → Opinion → Analysis → Projection; 45 seconds per question
- 51 task objects total

### Mock Exams
- **18 full timed simulations** across three difficulty bands:
  - Foundation: Tests 1–4, 13–14
  - Intermediate: Tests 5–8, 15–16
  - Advanced: Tests 9–12, 17–18
- Each exam runs all four sections end-to-end with real per-section countdown timers
- Section order matches the official 2026 TOEFL: **Reading → Listening → Writing → Speaking**
- Adaptive routing applied live during the exam based on Stage 1 performance

### Timed Exam Mode

| Phase | Timer |
|-------|-------|
| Reading Stage 1 | 18 min |
| Reading Stage 2 | 12 min |
| Listening Stage 1 | 18 min |
| Listening Stage 2 | 11 min |
| Build a Sentence | 2 min |
| Write an Email | 7 min |
| Academic Discussion | 10 min |
| Speaking (per item) | ~45 sec |

- Fullscreen enforcement with focus-loss warnings (3 strikes forfeits the exam)
- Timer auto-advances to the next question when time runs out
- Per-section visual countdown bar

### Post-Exam Review
- Correct / incorrect breakdown per section with score percentage
- **Band score estimation** (1.0–6.0 scale, CEFR-aligned, 0.5-step increments) for Reading and Listening
- Writing review shows submitted response, word count, and task requirements
- Speaking review shows expected response text for self-comparison

### Analytics & Progress Tracking
- Pinia-powered progress store, persisted to `localStorage`
- Practice history tracked per section and question type
- **Import / export** progress as JSON for backup or device transfer
- Analytics view shows score trends over time

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vue 3 (Composition API + `<script setup>`) |
| Build tool | Vite 7 |
| UI library | Vuetify 3 (Material Design 3) |
| Icons | Material Design Icons (`@mdi/font`) |
| State management | Pinia |
| Routing | Vue Router 5 |

No backend required. Runs entirely in the browser — zero server setup.

---

## Project Structure

```
src/
├── data/
│   ├── reading.js        # 83 questions — Stage 1, Stage 2 Easy, Stage 2 Hard
│   ├── listening.js      # 57 questions — Stage 1, Stage 2 Easy, Stage 2 Hard
│   ├── writing.js        # 24 tasks — Build a Sentence, Email, Discussion
│   ├── speaking.js       # 51 tasks — Listen & Repeat scenes + Interview topics
│   └── mocks.js          # 18 mock exam configurations
├── views/
│   ├── DashboardView.vue         # Home screen with progress overview
│   ├── ExamHubView.vue           # Mock exam selection (18 tests)
│   ├── PracticeHubView.vue       # Section-by-section practice hub
│   ├── AnalyticsView.vue         # Score history and trends
│   ├── SettingsView.vue          # Progress import/export and preferences
│   ├── exam/
│   │   ├── ExamStartView.vue     # Full timed exam engine with adaptive routing
│   │   └── ExamReviewView.vue    # Post-exam review, scores, and band estimates
│   └── practice/
│       ├── ReadingPracticeView.vue
│       ├── ListeningPracticeView.vue
│       ├── WritingPracticeView.vue
│       └── SpeakingPracticeView.vue
├── composables/
│   └── useBandEstimate.js        # Maps % correct → 1.0–6.0 band score
└── stores/
    └── progress.js               # Pinia store with localStorage persistence
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install & Run

```bash
# Clone the repository
git clone https://github.com/smkhizar/TOEFL_2026_Practice.git
cd TOEFL_2026_Practice

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 2026 TOEFL Format Overview

This app targets the revised 2026 TOEFL iBT format:

| Section | Format | Approx. Time |
|---------|--------|-------------|
| Reading | Adaptive 2-stage, 3 question types | ~30 min |
| Listening | Adaptive 2-stage, 5 question types | ~29 min |
| Writing | 3 task types: BaS + Email + Discussion | ~19 min |
| Speaking | L&R scenes + Interview topics | ~9 min |
| **Total** | | **~87 min** |

Scoring uses a **1–6 band scale** aligned to CEFR (A1–C2).

---

## Question Bank Summary

| Section | Stage 1 | Stage 2 Easy | Stage 2 Hard | Total |
|---------|---------|-------------|-------------|-------|
| Reading | 27 | 24 | 32 | **83** |
| Listening | 21 | 18 | 18 | **57** |
| Writing | — | — | — | **24 tasks** |
| Speaking | — | — | — | **51 tasks** |

---

## License

MIT
