// Vercel serverless function — POST /api/generate-question
// Body: { section, type, stage }
// Returns: { question: <object matching data file schema> }

export const config = { runtime: 'edge' }

const SYSTEM = `You are a TOEFL 2026 iBT question writer. Generate authentic, exam-quality questions.
Return ONLY valid JSON — no markdown, no explanation, no code fences.`

const PROMPTS = {
  reading: {
    'Complete the Words': `Generate a TOEFL 2026 "Complete the Words" reading question.
Schema: { "id": "cgen_<random6>", "type": "Complete the Words", "passageText": "<sentence with 2 truncated words shown as prefix___>", "blanks": [{ "incomplete": "<prefix___>", "answer": "<full word>" }, { "incomplete": "<prefix___>", "answer": "<full word>" }] }
Rules:
- passageText must be an academic or daily-life sentence
- Each truncated word shows 3-5 letters then ___ (e.g. "inves___", "uni___")
- answer is the full word (e.g. "investigate", "university")
- The ___ represents ONLY the missing ending letters
- Use 2 blanks per passage
Return JSON only.`,

    'Read in Daily Life': `Generate a TOEFL 2026 "Read in Daily Life" reading question.
Schema: { "id": "rgen_<random6>", "type": "Read in Daily Life", "passage": "<short real-world text: notice, email, sign, message>", "prompt": "<comprehension question>", "options": ["<A>","<B>","<C>","<D>"], "answer": <0-3 index of correct option> }
Rules:
- Passage: 1-3 sentences, campus/daily-life context (library, cafeteria, email, notice)
- 4 plausible options, exactly one correct
- Question tests literal comprehension
Return JSON only.`,

    'Read an Academic Passage': `Generate a TOEFL 2026 "Read an Academic Passage" reading question.
Schema: { "id": "agen_<random6>", "type": "Read an Academic Passage", "passage": "<2-4 sentence academic paragraph>", "prompt": "<inference or main-idea question>", "options": ["<A>","<B>","<C>","<D>"], "answer": <0-3 index> }
Rules:
- Passage: academic topic (science, history, economics, environment, technology)
- Question tests inference, implied meaning, or rhetorical purpose
- Distractors must be plausible but clearly wrong on close reading
Return JSON only.`,
  },

  listening: {
    'Listen and Choose a Response': `Generate a TOEFL 2026 "Listen and Choose a Response" listening question.
Schema: { "id": "lgen_<random6>", "type": "Listen and Choose a Response", "transcript": "<1-2 sentence spoken prompt someone might say>", "prompt": "<question about what reply is best>", "options": ["<A>","<B>","<C>","<D>"], "answer": <0-3>, "audioUrl": null }
Rules:
- transcript: a statement or question someone says in a campus/daily-life situation
- Question: "What is the best response?" or "What would the listener most likely say?"
- One option is a natural, appropriate reply; others are off-topic or awkward
Return JSON only.`,

    'Conversation': `Generate a TOEFL 2026 "Conversation" listening question.
Schema: { "id": "lgen_<random6>", "type": "Conversation", "transcript": "<3-5 line dialogue between two people, prefixed with Speaker A: / Speaker B:>", "prompt": "<comprehension question about the conversation>", "options": ["<A>","<B>","<C>","<D>"], "answer": <0-3>, "audioUrl": null }
Rules:
- transcript: natural campus conversation (student/professor, student/advisor, roommates)
- Question tests who said what, main topic, or implied attitude
Return JSON only.`,

    'Announcement': `Generate a TOEFL 2026 "Announcement" listening question.
Schema: { "id": "lgen_<random6>", "type": "Announcement", "transcript": "<2-4 sentence campus announcement>", "prompt": "<question about the announcement>", "options": ["<A>","<B>","<C>","<D>"], "answer": <0-3>, "audioUrl": null }
Rules:
- transcript: campus PA announcement, recorded message, or event notice
- Question tests main purpose, key detail, or required action
Return JSON only.`,

    'Academic Talk': `Generate a TOEFL 2026 "Academic Talk" listening question.
Schema: { "id": "lgen_<random6>", "type": "Academic Talk", "transcript": "<3-5 sentence professor lecture excerpt>", "prompt": "<inference or detail question>", "options": ["<A>","<B>","<C>","<D>"], "answer": <0-3>, "audioUrl": null }
Rules:
- transcript: professor explaining a concept in science, history, economics, or social science
- Question tests main point, example purpose, or implied conclusion
Return JSON only.`,
  },

  writing: {
    'Build a Sentence': `Generate a TOEFL 2026 "Build a Sentence" writing task.
Schema: { "id": "wgen_<random6>", "type": "Build a Sentence", "chunks": ["<chunk1>","<chunk2>","<chunk3>","<chunk4>"], "correct": "<chunks joined with spaces in correct order>", "time": 120, "minWords": 0, "sample": null }
Rules:
- chunks: 4 meaningful phrase fragments that form one grammatically correct sentence when ordered correctly
- The correct field is exactly chunks[0] + " " + chunks[1] + ... in correct order
- Academic or campus topic
Return JSON only.`,

    'Write an Email': `Generate a TOEFL 2026 "Write an Email" writing task.
Schema: { "id": "wgen_<random6>", "type": "Write an Email", "scenario": "<2-sentence situation description>", "recipient": "<name/role>", "register": "<Formal|Semi-formal>", "bulletPoints": ["<point1>","<point2>","<point3>"], "prompt": "<email writing instruction>", "minWords": 80, "time": 420, "sample": "<example email 80-120 words>" }
Rules:
- scenario: realistic campus/professional situation requiring an email
- 3 bullet points the email MUST address
- sample: a complete, well-written example email
Return JSON only.`,

    'Academic Discussion': `Generate a TOEFL 2026 "Academic Discussion" writing task.
Schema: { "id": "wgen_<random6>", "type": "Academic Discussion", "prompt": "<professor's discussion question, 2-3 sentences>", "context": "<background or student post to respond to>", "minWords": 100, "time": 600, "sample": "<example response 100-150 words>" }
Rules:
- prompt: professor poses a thought-provoking academic question
- context: one student's existing post to engage with
- sample: a complete, well-argued response
Return JSON only.`,
  },

  speaking: {
    'Listen and Repeat': `Generate a TOEFL 2026 "Listen and Repeat" speaking task.
Schema: { "id": "sgen_<random6>", "type": "Listen and Repeat", "scene": "<brief visual scene description>", "promptAudioText": "<1-2 sentence statement to repeat>", "expectedSeconds": <8-12> }
Rules:
- promptAudioText: a natural, clear sentence about campus life or academic topics
- Difficulty appropriate for TOEFL (not too simple, not complex)
- expectedSeconds matches approximate speech time at normal pace
Return JSON only.`,

    'Take an Interview': `Generate a TOEFL 2026 "Take an Interview" speaking task.
Schema: { "id": "sgen_<random6>", "type": "Take an Interview", "topic": "<interview topic>", "questions": [
  { "questionType": "Descriptive", "promptAudioText": "<describe X question>", "expectedSeconds": 45 },
  { "questionType": "Opinion", "promptAudioText": "<opinion question about topic>", "expectedSeconds": 45 },
  { "questionType": "Analysis", "promptAudioText": "<why/how analytical question>", "expectedSeconds": 45 },
  { "questionType": "Projection", "promptAudioText": "<future/hypothetical question>", "expectedSeconds": 45 }
]}
Rules:
- All 4 questions must relate to the same topic and escalate in complexity
- Descriptive: simple factual/personal description
- Opinion: preference or viewpoint
- Analysis: reasons, causes, effects
- Projection: future trends, hypotheticals, recommendations
Return JSON only.`,
  },
}

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 })
  }

  const { section, type } = body
  if (!section || !type) {
    return new Response(JSON.stringify({ error: 'section and type are required' }), { status: 400 })
  }

  const promptText = PROMPTS[section]?.[type]
  if (!promptText) {
    return new Response(JSON.stringify({ error: `Unknown section/type: ${section}/${type}` }), { status: 400 })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'OPENAI_API_KEY not configured' }), { status: 500 })
  }

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.85,
        max_tokens: 800,
        messages: [
          { role: 'system', content: SYSTEM },
          { role: 'user', content: promptText },
        ],
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      return new Response(JSON.stringify({ error: `OpenAI error: ${err}` }), { status: 502 })
    }

    const data = await res.json()
    const raw = data.choices?.[0]?.message?.content?.trim()
    if (!raw) {
      return new Response(JSON.stringify({ error: 'Empty response from OpenAI' }), { status: 502 })
    }

    // Strip any accidental markdown code fences
    const cleaned = raw.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim()
    const question = JSON.parse(cleaned)

    return new Response(JSON.stringify({ question }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
