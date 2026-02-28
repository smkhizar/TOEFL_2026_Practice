// 2026 TOEFL Speaking — 11 tasks
// Listen and Repeat (7): sentence-level, 8-12 seconds, image/scene context, escalating difficulty
// Take an Interview (4): 4 scaffolded questions per topic (Descriptive → Opinion → Analysis → Projection)
//   Each topic counts as one "task" in the mock exam; sub-questions cycle within it.

export const speakingTasks = [
  // ── Listen and Repeat (7) ──────────────────────────────────────
  // Sentences are based on campus scenes and grow longer/harder
  {
    id: 's1',
    type: 'Listen and Repeat',
    scene: 'A campus map showing buildings and walkways',
    promptAudioText: 'The library is open.',
    expectedSeconds: 8,
  },
  {
    id: 's2',
    type: 'Listen and Repeat',
    scene: 'A campus map showing buildings and walkways',
    promptAudioText: 'The cafeteria is next to the main hall.',
    expectedSeconds: 9,
  },
  {
    id: 's3',
    type: 'Listen and Repeat',
    scene: 'Students studying together at a table',
    promptAudioText: 'Students should submit the assignment before Friday at noon.',
    expectedSeconds: 10,
  },
  {
    id: 's4',
    type: 'Listen and Repeat',
    scene: 'A professor addressing a class',
    promptAudioText: 'The student center closes earlier on Fridays during exam week.',
    expectedSeconds: 11,
  },
  {
    id: 's5',
    type: 'Listen and Repeat',
    scene: 'A laboratory setting with scientific equipment',
    promptAudioText: 'All laboratory equipment must be returned to its storage location after each session.',
    expectedSeconds: 11,
  },
  {
    id: 's6',
    type: 'Listen and Repeat',
    scene: 'An international student orientation event',
    promptAudioText: 'International students are required to attend the orientation session before the first day of classes.',
    expectedSeconds: 12,
  },
  {
    id: 's7',
    type: 'Listen and Repeat',
    scene: 'A student meeting with an academic advisor at a desk',
    promptAudioText: 'Academic advisors recommend that students schedule a meeting at least once per semester to review their progress toward graduation requirements.',
    expectedSeconds: 12,
  },

  // ── Take an Interview (4 topics, 4 questions each) ─────────────
  // Each interview topic has 4 escalating sub-questions:
  //   Q1 Descriptive (personal/observable)
  //   Q2 Opinion (your view)
  //   Q3 Analysis (why / what factors)
  //   Q4 Projection (future / hypothetical)
  {
    id: 's8',
    type: 'Take an Interview',
    topic: 'Campus Life & Study Habits',
    questions: [
      {
        questionType: 'Descriptive',
        promptAudioText:
          'Describe a place on campus where students usually study or collaborate. What is that space like?',
        expectedSeconds: 45,
      },
      {
        questionType: 'Opinion',
        promptAudioText:
          'Do you prefer studying alone or with other people? Why?',
        expectedSeconds: 45,
      },
      {
        questionType: 'Analysis',
        promptAudioText:
          'What factors make a study environment at a university effective for academic work?',
        expectedSeconds: 45,
      },
      {
        questionType: 'Projection',
        promptAudioText:
          'How do you think university study spaces and collaboration areas will change over the next ten years?',
        expectedSeconds: 45,
      },
    ],
  },
  {
    id: 's9',
    type: 'Take an Interview',
    topic: 'Academic Challenges',
    questions: [
      {
        questionType: 'Descriptive',
        promptAudioText:
          'Describe one academic challenge you have faced as a student. What made it difficult?',
        expectedSeconds: 45,
      },
      {
        questionType: 'Opinion',
        promptAudioText:
          'How did you handle that challenge? What specific steps did you take?',
        expectedSeconds: 45,
      },
      {
        questionType: 'Analysis',
        promptAudioText:
          'What skills or qualities are most important for overcoming academic difficulties at university?',
        expectedSeconds: 45,
      },
      {
        questionType: 'Projection',
        promptAudioText:
          'What advice would you give to future students who may face similar academic challenges?',
        expectedSeconds: 45,
      },
    ],
  },
  {
    id: 's10',
    type: 'Take an Interview',
    topic: 'International Students & Adaptation',
    questions: [
      {
        questionType: 'Descriptive',
        promptAudioText:
          'Describe one common challenge that international students typically face during their first semester abroad.',
        expectedSeconds: 45,
      },
      {
        questionType: 'Opinion',
        promptAudioText:
          'In your view, what is the most difficult part of adjusting to a new country for study purposes?',
        expectedSeconds: 45,
      },
      {
        questionType: 'Analysis',
        promptAudioText:
          'Why do some international students adapt successfully while others struggle? What factors explain the difference?',
        expectedSeconds: 45,
      },
      {
        questionType: 'Projection',
        promptAudioText:
          'How might the experience of studying abroad change as universities become more globally connected in the future?',
        expectedSeconds: 45,
      },
    ],
  },
  {
    id: 's11',
    type: 'Take an Interview',
    topic: 'Technology & Learning',
    questions: [
      {
        questionType: 'Descriptive',
        promptAudioText:
          'Describe how you currently use technology — such as apps, websites, or devices — for studying or learning.',
        expectedSeconds: 45,
      },
      {
        questionType: 'Opinion',
        promptAudioText:
          'Do you think students today rely too much on technology for learning? Why or why not?',
        expectedSeconds: 45,
      },
      {
        questionType: 'Analysis',
        promptAudioText:
          'What are the main risks of over-reliance on digital tools and AI in education?',
        expectedSeconds: 45,
      },
      {
        questionType: 'Projection',
        promptAudioText:
          'How should educational institutions balance the use of technology with traditional learning methods in the future?',
        expectedSeconds: 45,
      },
    ],
  },

  // ── NEW from PDF materials ────────────────────────────────────────
  // Listen and Repeat — Office Kitchen scenario (s12–s18)
  {
    id: 's12',
    type: 'Listen and Repeat',
    scene: 'A modern office kitchen and break area',
    promptAudioText: 'Welcome to our office kitchen and break area.',
    expectedSeconds: 8,
  },
  {
    id: 's13',
    type: 'Listen and Repeat',
    scene: 'A modern office kitchen and break area',
    promptAudioText: 'You can store your lunch inside the refrigerator.',
    expectedSeconds: 9,
  },
  {
    id: 's14',
    type: 'Listen and Repeat',
    scene: 'A modern office kitchen and break area',
    promptAudioText: 'Please label your food so everyone knows who it belongs to.',
    expectedSeconds: 10,
  },
  {
    id: 's15',
    type: 'Listen and Repeat',
    scene: 'A modern office kitchen and break area',
    promptAudioText: 'The coffee maker and microwave are available for everyone to use.',
    expectedSeconds: 10,
  },
  {
    id: 's16',
    type: 'Listen and Repeat',
    scene: 'A modern office kitchen and break area',
    promptAudioText: 'Remember to clean up after yourself and leave the counters tidy.',
    expectedSeconds: 10,
  },
  {
    id: 's17',
    type: 'Listen and Repeat',
    scene: 'A modern office kitchen and break area',
    promptAudioText: 'We keep extra cups and utensils in the cabinets above the sink.',
    expectedSeconds: 11,
  },
  {
    id: 's18',
    type: 'Listen and Repeat',
    scene: 'A modern office kitchen and break area',
    promptAudioText:
      'At the end of the day, check that all appliances are turned off and the trash has been taken out.',
    expectedSeconds: 12,
  },

  // Listen and Repeat — Science Lab scenario (s19–s25)
  {
    id: 's19',
    type: 'Listen and Repeat',
    scene: 'A school science laboratory with equipment and safety signs',
    promptAudioText: "This is our school's science laboratory.",
    expectedSeconds: 8,
  },
  {
    id: 's20',
    type: 'Listen and Repeat',
    scene: 'A school science laboratory with equipment and safety signs',
    promptAudioText: 'Each workstation is equipped with a sink and supplies.',
    expectedSeconds: 9,
  },
  {
    id: 's21',
    type: 'Listen and Repeat',
    scene: 'A school science laboratory with equipment and safety signs',
    promptAudioText: 'Please keep your bags and books away from the lab tables.',
    expectedSeconds: 10,
  },
  {
    id: 's22',
    type: 'Listen and Repeat',
    scene: 'A school science laboratory with equipment and safety signs',
    promptAudioText: 'Safety goggles and gloves are stored in the cabinet near the door.',
    expectedSeconds: 10,
  },
  {
    id: 's23',
    type: 'Listen and Repeat',
    scene: 'A school science laboratory with equipment and safety signs',
    promptAudioText:
      'Before starting an experiment, make sure all equipment is clean and ready to use.',
    expectedSeconds: 11,
  },
  {
    id: 's24',
    type: 'Listen and Repeat',
    scene: 'A school science laboratory with equipment and safety signs',
    promptAudioText:
      'Never eat or drink inside the lab, even when no experiments are being performed.',
    expectedSeconds: 11,
  },
  {
    id: 's25',
    type: 'Listen and Repeat',
    scene: 'A school science laboratory with equipment and safety signs',
    promptAudioText:
      'When class ends, turn off the gas burners and leave your station tidy for the next group.',
    expectedSeconds: 12,
  },

  // Listen and Repeat — Shared Workspace scenario (s26–s32)
  {
    id: 's26',
    type: 'Listen and Repeat',
    scene: 'An open shared office workspace with desks and a whiteboard area',
    promptAudioText: 'This is our shared office space.',
    expectedSeconds: 8,
  },
  {
    id: 's27',
    type: 'Listen and Repeat',
    scene: 'An open shared office workspace with desks and a whiteboard area',
    promptAudioText: 'You can choose any open desk to work at.',
    expectedSeconds: 9,
  },
  {
    id: 's28',
    type: 'Listen and Repeat',
    scene: 'An open shared office workspace with desks and a whiteboard area',
    promptAudioText: 'The whiteboard area is used for team discussions and planning.',
    expectedSeconds: 10,
  },
  {
    id: 's29',
    type: 'Listen and Repeat',
    scene: 'An open shared office workspace with desks and a whiteboard area',
    promptAudioText: 'Please keep your conversations quiet while others are working nearby.',
    expectedSeconds: 10,
  },
  {
    id: 's30',
    type: 'Listen and Repeat',
    scene: 'An open shared office workspace with desks and a whiteboard area',
    promptAudioText: 'Coffee and snacks are available in the lounge behind the glass doors.',
    expectedSeconds: 10,
  },
  {
    id: 's31',
    type: 'Listen and Repeat',
    scene: 'An open shared office workspace with desks and a whiteboard area',
    promptAudioText:
      'We often hold short brainstorming sessions in the afternoons to share ideas.',
    expectedSeconds: 11,
  },
  {
    id: 's32',
    type: 'Listen and Repeat',
    scene: 'An open shared office workspace with desks and a whiteboard area',
    promptAudioText:
      'Feel free to collaborate with others, but remember to schedule meeting times so everyone can stay focused.',
    expectedSeconds: 12,
  },

  // Listen and Repeat — Campus Cafeteria scenario (s33–s39)
  {
    id: 's33',
    type: 'Listen and Repeat',
    scene: 'A busy university cafeteria with food counters and seating',
    promptAudioText: 'This is the main cafeteria on campus.',
    expectedSeconds: 8,
  },
  {
    id: 's34',
    type: 'Listen and Repeat',
    scene: 'A busy university cafeteria with food counters and seating',
    promptAudioText: 'You can order food at the counter near the back.',
    expectedSeconds: 9,
  },
  {
    id: 's35',
    type: 'Listen and Repeat',
    scene: 'A busy university cafeteria with food counters and seating',
    promptAudioText: 'The salad bar and dessert section are along the side wall.',
    expectedSeconds: 10,
  },
  {
    id: 's36',
    type: 'Listen and Repeat',
    scene: 'A busy university cafeteria with food counters and seating',
    promptAudioText: 'Please return your dishes and trays after finishing your meal.',
    expectedSeconds: 10,
  },
  {
    id: 's37',
    type: 'Listen and Repeat',
    scene: 'A busy university cafeteria with food counters and seating',
    promptAudioText:
      'During busy hours, try to share tables so everyone has a place to sit.',
    expectedSeconds: 10,
  },
  {
    id: 's38',
    type: 'Listen and Repeat',
    scene: 'A busy university cafeteria with food counters and seating',
    promptAudioText:
      'Many students like to study here because the space stays open until midnight.',
    expectedSeconds: 11,
  },
  {
    id: 's39',
    type: 'Listen and Repeat',
    scene: 'A busy university cafeteria with food counters and seating',
    promptAudioText:
      'If you are looking for vegetarian options, check the daily menu posted near the entrance.',
    expectedSeconds: 12,
  },

  // Listen and Repeat — University Library scenario (s40–s46)
  {
    id: 's40',
    type: 'Listen and Repeat',
    scene: 'The main university library with study tables and bookshelves',
    promptAudioText: 'Welcome to the main library on campus.',
    expectedSeconds: 8,
  },
  {
    id: 's41',
    type: 'Listen and Repeat',
    scene: 'The main university library with study tables and bookshelves',
    promptAudioText: 'The front desk is where you can borrow and return books.',
    expectedSeconds: 9,
  },
  {
    id: 's42',
    type: 'Listen and Repeat',
    scene: 'The main university library with study tables and bookshelves',
    promptAudioText: 'Study tables are available on both the first and second floors.',
    expectedSeconds: 10,
  },
  {
    id: 's43',
    type: 'Listen and Repeat',
    scene: 'The main university library with study tables and bookshelves',
    promptAudioText: 'Please keep your voice down so others can concentrate.',
    expectedSeconds: 9,
  },
  {
    id: 's44',
    type: 'Listen and Repeat',
    scene: 'The main university library with study tables and bookshelves',
    promptAudioText:
      'Computers in the basement are connected to the library database for research.',
    expectedSeconds: 11,
  },
  {
    id: 's45',
    type: 'Listen and Repeat',
    scene: 'The main university library with study tables and bookshelves',
    promptAudioText:
      'If you need help finding a book, ask the librarian at the desk for assistance.',
    expectedSeconds: 11,
  },
  {
    id: 's46',
    type: 'Listen and Repeat',
    scene: 'The main university library with study tables and bookshelves',
    promptAudioText:
      'Group study rooms can be reserved online, allowing students to collaborate without disturbing others.',
    expectedSeconds: 12,
  },

  // Take an Interview — Teamwork (s47) — from PDF with full questions
  {
    id: 's47',
    type: 'Take an Interview',
    topic: 'Teamwork & Collaboration',
    questions: [
      {
        questionType: 'Descriptive',
        promptAudioText:
          "Thank you for speaking with me. Let's begin with something simple. Have you worked on any group projects at school? What kind of tasks did your group have to complete?",
        expectedSeconds: 45,
      },
      {
        questionType: 'Opinion',
        promptAudioText:
          'When you work in a group, do you prefer to take the lead or follow directions from others? Why?',
        expectedSeconds: 45,
      },
      {
        questionType: 'Analysis',
        promptAudioText:
          'Many universities encourage teamwork to prepare students for professional life. Do you think group projects will become even more common in education in the future? Why or why not?',
        expectedSeconds: 45,
      },
      {
        questionType: 'Projection',
        promptAudioText:
          'Some people believe teamwork helps people develop communication skills. Do you agree with this idea, or do you feel teamwork slows down individual progress? Explain why you think so.',
        expectedSeconds: 45,
      },
    ],
  },

  // Take an Interview — Time Management (s48) — from PDF with full questions
  {
    id: 's48',
    type: 'Take an Interview',
    topic: 'Time Management & Productivity',
    questions: [
      {
        questionType: 'Descriptive',
        promptAudioText:
          "Glad to have you here. Let's start with your daily routine. When you have a busy day, how do you usually organize your schedule?",
        expectedSeconds: 45,
      },
      {
        questionType: 'Opinion',
        promptAudioText:
          'Do you like to make a lot of appointments and have a busy schedule, or do you prefer to limit scheduled meetings and keep your days open?',
        expectedSeconds: 45,
      },
      {
        questionType: 'Analysis',
        promptAudioText:
          'These days, many people say they struggle to focus because of smartphones and social media. Do you think technology helps us manage time better? Or does it mostly create distractions?',
        expectedSeconds: 45,
      },
      {
        questionType: 'Projection',
        promptAudioText:
          'Some people believe being busy is a sign of productivity. Do you agree with this idea, or do you think people are more productive when they have downtime? Explain why you think so.',
        expectedSeconds: 45,
      },
    ],
  },

  // Take an Interview — Environmental Habits (s49)
  {
    id: 's49',
    type: 'Take an Interview',
    topic: 'Environmental Habits & Sustainability',
    questions: [
      {
        questionType: 'Descriptive',
        promptAudioText:
          "Thanks for joining me today. I'm doing a research study about people's environmental habits. Can you tell me about one specific thing you do in your daily life to help the environment?",
        expectedSeconds: 45,
      },
      {
        questionType: 'Opinion',
        promptAudioText:
          'Do you think individuals or governments have more responsibility for protecting the environment? Please explain your view.',
        expectedSeconds: 45,
      },
      {
        questionType: 'Analysis',
        promptAudioText:
          'Why do you think many people are aware of environmental issues but still do not change their daily habits? What are the main barriers?',
        expectedSeconds: 45,
      },
      {
        questionType: 'Projection',
        promptAudioText:
          'How do you think environmental awareness and habits will change in the next generation? Will people become more or less environmentally responsible?',
        expectedSeconds: 45,
      },
    ],
  },

  // Take an Interview — Study Habits (s50)
  {
    id: 's50',
    type: 'Take an Interview',
    topic: 'Study Habits & Academic Performance',
    questions: [
      {
        questionType: 'Descriptive',
        promptAudioText:
          "Hello, and welcome. I'm conducting research about students' study habits. Can you describe your typical routine when preparing for an important exam?",
        expectedSeconds: 45,
      },
      {
        questionType: 'Opinion',
        promptAudioText:
          'Do you think studying alone or studying in groups is more effective? Which do you prefer, and why?',
        expectedSeconds: 45,
      },
      {
        questionType: 'Analysis',
        promptAudioText:
          'What do you think are the most common reasons students struggle to study effectively, even when they want to do well?',
        expectedSeconds: 45,
      },
      {
        questionType: 'Projection',
        promptAudioText:
          'As AI tools and online resources become more advanced, how do you think the way students study will change in the next decade?',
        expectedSeconds: 45,
      },
    ],
  },

  // Take an Interview — Technology in Daily Life (s51)
  {
    id: 's51',
    type: 'Take an Interview',
    topic: 'Technology in Daily Life',
    questions: [
      {
        questionType: 'Descriptive',
        promptAudioText:
          "Nice to meet you. I'm researching how technology affects daily life. Can you describe how you use technology in a typical day, from the moment you wake up?",
        expectedSeconds: 45,
      },
      {
        questionType: 'Opinion',
        promptAudioText:
          'Do you think people today are too dependent on technology in their personal lives? Why or why not?',
        expectedSeconds: 45,
      },
      {
        questionType: 'Analysis',
        promptAudioText:
          'What do you think are the most significant ways that technology has changed how people communicate with each other compared to twenty years ago?',
        expectedSeconds: 45,
      },
      {
        questionType: 'Projection',
        promptAudioText:
          'Imagine a future where artificial intelligence manages most daily tasks for people. Do you think this would improve or reduce quality of life? Explain your reasoning.',
        expectedSeconds: 45,
      },
    ],
  },
]
