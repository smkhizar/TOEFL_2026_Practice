export const readingAdaptive = {
  stage1: [
    {
      id: 'r1',
      type: 'Complete the Words',
      prompt: 'Researchers inves_____ how peo_____ learn new languages in digital classrooms.',
      options: ['investigate / people', 'invested / poems', 'investor / peony', 'investing / peon'],
      answer: 0,
    },
    {
      id: 'r2',
      type: 'Read in Daily Life',
      passage: 'Text message: "Library printer queue is long. Let\'s submit from the lab in 20 mins."',
      prompt: 'Why are they switching location?',
      options: ['The library is closed', 'Printer wait is too long', 'Class was canceled', 'No internet at library'],
      answer: 1,
    },
    {
      id: 'r3',
      type: 'Academic Passage',
      passage: 'Urban trees reduce peak summer temperatures and improve walkability in dense neighborhoods.',
      prompt: 'Main idea?',
      options: ['Cities should ban traffic', 'Trees improve urban climate comfort', 'Walkability lowers taxes', 'Heat comes only from cars'],
      answer: 1,
    },
  ],
  stage2Easy: [
    {
      id: 're1',
      type: 'Daily Life',
      passage: 'Campus notice: Cafeteria opens at 8 AM during finals week.',
      prompt: 'What changed?',
      options: ['Closing earlier', 'Opening later', 'Opening at 8 AM', 'No weekend service'],
      answer: 2,
    },
    {
      id: 're2',
      type: 'Complete the Words',
      prompt: 'The stu_____ completed the assi_____ before noon.',
      options: ['student / assignment', 'study / assist', 'stunt / assign', 'sturdy / assistant'],
      answer: 0,
    },
  ],
  stage2Hard: [
    {
      id: 'rh1',
      type: 'Academic Inference',
      passage: 'When peer feedback is immediate, revision quality improves even when total writing time is unchanged.',
      prompt: 'What is implied?',
      options: ['Longer writing time is unnecessary for quality gains', 'Peer feedback replaces teachers entirely', 'Students dislike revision', 'Writing speed determines grammar accuracy'],
      answer: 0,
    },
    {
      id: 'rh2',
      type: 'Rhetorical Purpose',
      passage: 'The author contrasts rural and urban transit to highlight policy trade-offs in budget allocation.',
      prompt: 'Why include the contrast?',
      options: ['To entertain readers', 'To show policy trade-offs clearly', 'To avoid data discussion', 'To criticize rural areas'],
      answer: 1,
    },
  ],
}
