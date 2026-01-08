# Phase 5 Additions

## 1) Real test mode hardening
- Fullscreen entry button in exam session
- Focus-loss monitoring (`visibilitychange` + `blur`)
- Forfeit after 3 focus violations

## 2) Progress import/export
- Export all local progress to JSON
- Import progress JSON (overwrite)
- Reset all progress button

## 3) Listening audio pipeline
- Added per-question `audioUrl` references
- App uses native `<audio controls>` when files exist
- Fallback to speech synthesis if file missing

## 4) MP3 batch generator script
Run:

```bash
npm run gen:audio
```

Requirements:
- `espeak`
- `ffmpeg`

On Ubuntu:

```bash
sudo apt install espeak ffmpeg
```

Output:
- `public/audio/listening/*.mp3`
