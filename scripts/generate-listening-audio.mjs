import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { listeningAdaptive } from '../src/data/listening.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public/audio/listening')

const allItems = [
  ...listeningAdaptive.stage1,
  ...listeningAdaptive.stage2Easy,
  ...listeningAdaptive.stage2Hard,
]

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

const hasEspeak = spawnSync('bash', ['-lc', 'command -v espeak >/dev/null 2>&1']).status === 0
const hasFfmpeg = spawnSync('bash', ['-lc', 'command -v ffmpeg >/dev/null 2>&1']).status === 0

if (!hasEspeak || !hasFfmpeg) {
  console.error('Missing dependency: need both espeak and ffmpeg installed.')
  console.error('Ubuntu: sudo apt install espeak ffmpeg')
  process.exit(1)
}

for (const item of allItems) {
  const base = item.audioUrl?.split('/').pop()?.replace('.mp3', '') || item.id
  const wavPath = path.join(outDir, `${base}.wav`)
  const mp3Path = path.join(outDir, `${base}.mp3`)
  const text = item.transcript.replace(/"/g, '')

  const speak = spawnSync('bash', ['-lc', `espeak -s 150 -v en-us \"${text}\" -w \"${wavPath}\"`], { stdio: 'inherit' })
  if (speak.status !== 0) {
    console.error(`Failed on ${item.id}`)
    process.exit(1)
  }

  const conv = spawnSync('bash', ['-lc', `ffmpeg -y -i \"${wavPath}\" -codec:a libmp3lame -q:a 4 \"${mp3Path}\"`], { stdio: 'ignore' })
  if (conv.status !== 0) {
    console.error(`ffmpeg conversion failed on ${item.id}`)
    process.exit(1)
  }

  fs.unlinkSync(wavPath)
  console.log(`Generated ${path.basename(mp3Path)}`)
}

console.log('Done. Listening MP3 files generated in public/audio/listening')
