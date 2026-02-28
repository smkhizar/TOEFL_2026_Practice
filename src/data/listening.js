// 2026 TOEFL Listening — Adaptive Question Bank
// Stage 1: 15 questions (Listen and Choose a Response, Conversation, Announcement, Academic Talk)
// Stage 2 Easy: 12 questions (everyday scenarios, shorter dialogues)
// Stage 2 Hard: 12 questions (multi-speaker inference, implied meaning, academic inference)

export const listeningAdaptive = {
  stage1: [
    // ── Listen and Choose a Response (5) ──────────────────
    {
      id: 'l1',
      type: 'Listen and Choose a Response',
      audioUrl: '/audio/listening/l1.mp3',
      transcript: 'Did you submit the lab report online?',
      prompt: 'Choose the most appropriate response.',
      options: [
        'Yes, I uploaded it before midnight.',
        'No, the cafeteria was closed.',
        'I prefer morning classes.',
        'The library has good Wi-Fi.',
      ],
      answer: 0,
    },
    {
      id: 'l2',
      type: 'Listen and Choose a Response',
      audioUrl: '/audio/listening/l2.mp3',
      transcript: 'Are you going to the study session this afternoon?',
      prompt: 'Choose the most appropriate response.',
      options: [
        'The vending machine is broken.',
        'Yes, I already reviewed my notes.',
        'I think the session might be helpful.',
        'No, I have a conflict at that time.',
      ],
      answer: 3,
    },
    {
      id: 'l3',
      type: 'Listen and Choose a Response',
      audioUrl: '/audio/listening/l3.mp3',
      transcript: 'Can you help me find a book about climate policy in the catalog?',
      prompt: 'Choose the most appropriate response.',
      options: [
        'Sure, the catalog terminal is on the third floor.',
        'No, I do not drink coffee.',
        'The gym closes at nine tonight.',
        'That sounds like a long assignment.',
      ],
      answer: 0,
    },
    {
      id: 'l4',
      type: 'Listen and Choose a Response',
      audioUrl: '/audio/listening/l4.mp3',
      transcript: 'The professor just said the midterm is moved to next Friday.',
      prompt: 'Choose the most appropriate response.',
      options: [
        'I need to start reviewing my notes right away.',
        'I enjoy outdoor activities on weekends.',
        'The bus stop moved last week.',
        'The cafeteria serves lunch until 2 PM.',
      ],
      answer: 0,
    },
    {
      id: 'l5',
      type: 'Listen and Choose a Response',
      audioUrl: '/audio/listening/l5.mp3',
      transcript: 'I cannot log into the student portal to check my grades.',
      prompt: 'Choose the most appropriate response.',
      options: [
        'The weather looks nice today.',
        'Try resetting your password through the help desk.',
        'The library opens at 8 AM on Mondays.',
        'I love the new campus café.',
      ],
      answer: 1,
    },

    // ── Conversations (5) ──────────────────────────────────
    {
      id: 'l6',
      type: 'Conversation',
      audioUrl: '/audio/listening/l6.mp3',
      transcript:
        'Student 1: We still need more sources for the research paper. Student 2: Let\'s meet at the library at 5 and work on the outline together.',
      prompt: 'What is their immediate plan?',
      options: [
        'Call the professor for more guidance',
        'Meet at the library to work on the outline',
        'Cancel the project and start a new one',
        'Submit the draft without additional sources',
      ],
      answer: 1,
    },
    {
      id: 'l7',
      type: 'Conversation',
      audioUrl: '/audio/listening/l7.mp3',
      transcript:
        'A: The professor moved office hours to Thursday afternoon. B: Great, that works better — my Tuesday lab runs until 5.',
      prompt: 'Why does student B prefer Thursday?',
      options: [
        'Thursday office hours are held online',
        'Tuesday has a scheduling conflict with lab',
        'The lab session is canceled on Thursday',
        'Office hours are longer on Thursdays',
      ],
      answer: 1,
    },
    {
      id: 'l8',
      type: 'Conversation',
      audioUrl: '/audio/listening/l8.mp3',
      transcript: 'A: Are you free at 2 today to review the slides? B: I can do 3 PM after my seminar finishes.',
      prompt: 'When can student B meet?',
      options: ['2 PM', '3 PM', 'Before the seminar', 'Tomorrow only'],
      answer: 1,
    },
    {
      id: 'l9',
      type: 'Conversation',
      audioUrl: '/audio/listening/l9.mp3',
      transcript:
        'A: Can we finish the bibliography today? B: Yes, if we each take half the sources and compile them separately.',
      prompt: 'How do they plan to finish the bibliography?',
      options: [
        'Ask a classmate to do it for them',
        'Divide the sources between them',
        'Submit the paper without a bibliography',
        'Skip formatting this time',
      ],
      answer: 1,
    },
    {
      id: 'l10',
      type: 'Conversation',
      audioUrl: '/audio/listening/l10.mp3',
      transcript:
        'A: I think our group presentation needs stronger visuals. B: Agreed. Let\'s add an infographic right after the data slide.',
      prompt: 'What do they decide to add to the presentation?',
      options: [
        'More text-heavy slides',
        'An infographic after the data slide',
        'A video clip at the end',
        'A second data section',
      ],
      answer: 1,
    },

    // ── Announcements and Academic Talks (5) ──────────────
    {
      id: 'l11',
      type: 'Announcement',
      audioUrl: '/audio/listening/l11.mp3',
      transcript:
        'Attention students: The exam room has been changed to Hall D on the second floor. Please bring a valid photo ID and arrive at least ten minutes early.',
      prompt: 'What must students bring to the exam?',
      options: ['A laptop charger', 'A valid photo ID', 'Their course syllabus', 'A printed transcript'],
      answer: 1,
    },
    {
      id: 'l12',
      type: 'Announcement',
      audioUrl: '/audio/listening/l12.mp3',
      transcript:
        'The bus stop near Hall B is temporarily closed today for maintenance work. Please use the alternative stop on University Avenue.',
      prompt: 'What should students do about the bus today?',
      options: [
        'Use the University Avenue stop instead',
        'Walk the entire distance to campus',
        'Take a taxi to the main entrance',
        'Wait at Hall B until it reopens',
      ],
      answer: 0,
    },
    {
      id: 'l13',
      type: 'Academic Talk',
      audioUrl: '/audio/listening/l13.mp3',
      transcript:
        'Professor: Coral bleaching intensifies when water temperatures remain elevated for several consecutive weeks, causing corals to expel their symbiotic algae and lose their color and food source.',
      prompt: 'What environmental condition causes coral bleaching to worsen?',
      options: [
        'Consistently low salinity levels',
        'Prolonged elevated water temperature',
        'Increased ocean current speed',
        'Reduced sunlight reaching the seabed',
      ],
      answer: 1,
    },
    {
      id: 'l14',
      type: 'Academic Talk',
      audioUrl: '/audio/listening/l14.mp3',
      transcript:
        'Instructor: Spaced repetition is a study technique that schedules review sessions at gradually increasing intervals. Research shows it significantly improves long-term retention compared to massed practice or cramming.',
      prompt: 'What does the spaced repetition technique involve?',
      options: [
        'Studying for many consecutive hours without breaks',
        'Reviewing material at gradually increasing time intervals',
        'Reading notes aloud to a study partner every day',
        'Taking practice tests daily without reviewing mistakes',
      ],
      answer: 1,
    },
    {
      id: 'l15',
      type: 'Announcement',
      audioUrl: '/audio/listening/l15.mp3',
      transcript:
        'Reminder: The annual career fair is this Thursday from 10 AM to 4 PM in the main gymnasium. Over fifty employers will be present. Business casual dress is strongly recommended.',
      prompt: 'What is recommended for students attending the career fair?',
      options: [
        'Formal business attire only',
        'Business casual dress',
        'Campus sports clothing',
        'No specific dress code was mentioned',
      ],
      answer: 1,
    },

    // ── NEW stage1 items (l16–l21) ────────────────────────────────
    {
      id: 'l16',
      type: 'Listen and Choose a Response',
      audioUrl: '/audio/listening/l16.mp3',
      transcript: 'Do you know if the writing center is open on Saturdays?',
      prompt: 'Choose the most appropriate response.',
      options: [
        'Yes, it opens at 10 AM and closes at 3 PM on Saturdays.',
        'I prefer to eat lunch in the main hall.',
        'The science lab has new equipment this semester.',
        'My professor canceled class on Wednesday.',
      ],
      answer: 0,
    },
    {
      id: 'l17',
      type: 'Listen and Choose a Response',
      audioUrl: '/audio/listening/l17.mp3',
      transcript: 'I missed the announcement about the field trip next week.',
      prompt: 'Choose the most appropriate response.',
      options: [
        'The gym membership fee has increased this year.',
        'You should check the course page for the details that were posted.',
        'I think the cafeteria has a new lunch menu.',
        'My semester schedule looks very full this term.',
      ],
      answer: 1,
    },
    {
      id: 'l18',
      type: 'Conversation',
      audioUrl: '/audio/listening/l18.mp3',
      transcript:
        "Student: I've been struggling with the statistics homework. It's much harder than I expected. Advisor: You should visit the tutoring center on the third floor — they have sessions every weekday afternoon.",
      prompt: 'What does the advisor recommend?',
      options: [
        'Dropping the statistics course immediately',
        'Visiting the tutoring center for weekday sessions',
        'Asking other students to share their completed homework',
        'Emailing the professor to request simpler assignments',
      ],
      answer: 1,
    },
    {
      id: 'l19',
      type: 'Conversation',
      audioUrl: '/audio/listening/l19.mp3',
      transcript:
        "A: The group presentation is in two days and we still haven't agreed on the format. B: Let's just go with a simple slide deck — it's faster to prepare and easier for the audience to follow.",
      prompt: 'What format does speaker B suggest for the presentation?',
      options: [
        'A written report submitted online',
        'A live demonstration with no slides',
        'A simple slide deck presentation',
        'A recorded video submitted to the professor',
      ],
      answer: 2,
    },
    {
      id: 'l20',
      type: 'Announcement',
      audioUrl: '/audio/listening/l20.mp3',
      transcript:
        'Attention students: the campus health center will offer free flu vaccinations this Friday between 9 AM and 1 PM. No appointment is needed. Please bring your student ID.',
      prompt: 'What do students need to bring to receive the flu vaccination?',
      options: [
        'A completed health form and insurance card',
        'Their student ID',
        'A note from their doctor',
        'Their course registration confirmation',
      ],
      answer: 1,
    },
    {
      id: 'l21',
      type: 'Academic Talk',
      audioUrl: '/audio/listening/l21.mp3',
      transcript:
        'Professor: The term "cognitive load" refers to the total amount of mental effort being used in working memory. When a task demands too much cognitive load, performance decreases. This is why breaking complex information into smaller chunks improves learning.',
      prompt: 'According to the professor, what happens when a task demands too much cognitive load?',
      options: [
        'Students become more motivated to study',
        'Performance decreases',
        'Working memory capacity permanently increases',
        'The information is stored more effectively',
      ],
      answer: 1,
    },
  ],

  // ────────────────────────────────────────────────────────────────
  // STAGE 2 EASY — everyday life, short dialogues, accessible vocabulary
  // ────────────────────────────────────────────────────────────────
  stage2Easy: [
    {
      id: 'le1',
      type: 'Announcement',
      audioUrl: '/audio/listening/le1.mp3',
      transcript:
        'The campus gym will be closed this Saturday for scheduled deep cleaning. Regular operating hours will resume Sunday morning at 7 AM.',
      prompt: 'When will the gym reopen?',
      options: ['Friday evening', 'Saturday afternoon', 'Sunday morning', 'Monday only'],
      answer: 2,
    },
    {
      id: 'le2',
      type: 'Conversation',
      audioUrl: '/audio/listening/le2.mp3',
      transcript:
        'A: Did you pick up the group project supplies from the campus store? B: Yes, I got the poster boards and colored markers we needed.',
      prompt: 'What did student B buy at the campus store?',
      options: [
        'A laptop and printer paper',
        'Poster boards and colored markers',
        'Notebooks and ballpoint pens',
        'Folders and a stapler',
      ],
      answer: 1,
    },
    {
      id: 'le3',
      type: 'Listen and Choose a Response',
      audioUrl: '/audio/listening/le3.mp3',
      transcript: 'Have you registered for next semester\'s courses yet?',
      prompt: 'Choose the most appropriate response.',
      options: [
        'Not yet — my advisor meeting is scheduled for tomorrow.',
        'I enjoy hiking on weekends.',
        'The campus pool is very clean.',
        'Yes, the midterm was pretty challenging.',
      ],
      answer: 0,
    },
    {
      id: 'le4',
      type: 'Announcement',
      audioUrl: '/audio/listening/le4.mp3',
      transcript:
        'Students living in Residence Hall C: please submit any room maintenance requests through the online portal by this Friday. Repairs will be completed during the following weekend.',
      prompt: 'What do residence hall students need to do by Friday?',
      options: [
        'Pay their housing fees online',
        'Submit room maintenance requests through the portal',
        'Move to a temporary room during repairs',
        'Attend a mandatory hall meeting',
      ],
      answer: 1,
    },
    {
      id: 'le5',
      type: 'Conversation',
      audioUrl: '/audio/listening/le5.mp3',
      transcript:
        'A: The food truck near the library has really long lines now. B: Yeah, it got popular after the student newspaper reviewed it last week.',
      prompt: 'Why are there suddenly long lines at the food truck?',
      options: [
        'The prices were recently reduced',
        'The campus newspaper wrote a positive review',
        'The main cafeteria is closed for renovation',
        'A well-known chef began working there',
      ],
      answer: 1,
    },
    {
      id: 'le6',
      type: 'Listen and Choose a Response',
      audioUrl: '/audio/listening/le6.mp3',
      transcript: 'The resume writing workshop next week is free for all currently enrolled students.',
      prompt: 'Choose the most appropriate response.',
      options: [
        'That is great — I should register before it fills up.',
        'I already bought a new jacket for the semester.',
        'The cafeteria is closed on Sunday evenings.',
        'My laptop battery died during the lecture.',
      ],
      answer: 0,
    },
    {
      id: 'le7',
      type: 'Academic Talk',
      audioUrl: '/audio/listening/le7.mp3',
      transcript:
        'Teacher: When writing a summary, focus on the main idea and the two or three most important supporting details. Avoid copying sentences directly from the original text.',
      prompt: 'What does the teacher tell students to avoid in their summaries?',
      options: [
        'Including the main idea of the passage',
        'Using any supporting details',
        'Copying sentences directly from the text',
        'Writing more than one paragraph',
      ],
      answer: 2,
    },
    {
      id: 'le8',
      type: 'Conversation',
      audioUrl: '/audio/listening/le8.mp3',
      transcript:
        'A: I cannot find the assigned reading for tomorrow\'s class anywhere. B: I think it is in the course files section on the student portal.',
      prompt: 'Where can the reading assignment be found?',
      options: [
        'At the campus bookstore',
        'In the course files section of the student portal',
        'In the professor\'s office',
        'In the library\'s print reserve collection',
      ],
      answer: 1,
    },
    {
      id: 'le9',
      type: 'Announcement',
      audioUrl: '/audio/listening/le9.mp3',
      transcript:
        'This is a reminder that all library books due this week can be renewed online for an additional two weeks at no charge. Please log in to your library account to do so.',
      prompt: 'What option is available for library books due this week?',
      options: [
        'Pay a reduced late fee online',
        'Return them immediately to avoid charges',
        'Renew them online for free for two more weeks',
        'Contact the librarian in person for an extension',
      ],
      answer: 2,
    },
    {
      id: 'le10',
      type: 'Listen and Choose a Response',
      audioUrl: '/audio/listening/le10.mp3',
      transcript: 'I heard the professor is offering bonus points for attending the guest lecture series this semester.',
      prompt: 'Choose the most appropriate response.',
      options: [
        'That is useful — I should check the schedule and attend.',
        'I prefer to do my studying at the gym.',
        'The bookstore is having a sale on textbooks.',
        'My roommate enjoys the cafeteria pasta.',
      ],
      answer: 0,
    },
    {
      id: 'le11',
      type: 'Conversation',
      audioUrl: '/audio/listening/le11.mp3',
      transcript:
        'A: Our team still needs to decide on a name for the group project. B: What about naming it after our topic — something related to sustainable energy?',
      prompt: 'What is student B suggesting as the basis for the team name?',
      options: [
        'Their university name',
        'The subject of their project',
        'Their favorite sport',
        'The professor\'s name',
      ],
      answer: 1,
    },
    {
      id: 'le12',
      type: 'Announcement',
      audioUrl: '/audio/listening/le12.mp3',
      transcript:
        'The international student welcome dinner will be held next Wednesday at 6 PM in the main dining hall. Please RSVP by this Monday so that we can arrange seating.',
      prompt: 'By when must students RSVP for the welcome dinner?',
      options: ['Wednesday at noon', 'Tuesday evening', 'Monday', 'Sunday afternoon'],
      answer: 2,
    },

    // ── NEW stage2Easy items (le13–le18) ─────────────────────────
    {
      id: 'le13',
      type: 'Listen and Choose a Response',
      audioUrl: '/audio/listening/le13.mp3',
      transcript: 'The professor extended the essay deadline by three days.',
      prompt: 'Choose the most appropriate response.',
      options: [
        'That gives me enough time to revise and strengthen my argument.',
        'I enjoy playing basketball on weekends.',
        'The printer on the second floor is broken again.',
        'My roommate prefers cold weather.',
      ],
      answer: 0,
    },
    {
      id: 'le14',
      type: 'Conversation',
      audioUrl: '/audio/listening/le14.mp3',
      transcript:
        "A: Are you going to the orientation session for new lab assistants tomorrow? B: I wasn't planning to — is it mandatory? A: Yes, the department requires all first-time assistants to attend.",
      prompt: 'Why must student B attend the orientation session?',
      options: [
        'It is optional but strongly recommended',
        'It is required by the department for all first-time assistants',
        'The professor personally requested their attendance',
        'It will count as extra credit toward the final grade',
      ],
      answer: 1,
    },
    {
      id: 'le15',
      type: 'Announcement',
      audioUrl: '/audio/listening/le15.mp3',
      transcript:
        "This week's campus film screening has been moved from Thursday to Friday evening due to a scheduling conflict with the auditorium. Doors will open at 7 PM. Admission is free for all students with a valid ID.",
      prompt: 'On which day will the campus film screening now take place?',
      options: ['Wednesday', 'Thursday', 'Friday', 'Saturday'],
      answer: 2,
    },
    {
      id: 'le16',
      type: 'Listen and Choose a Response',
      audioUrl: '/audio/listening/le16.mp3',
      transcript: "I can't decide whether to take the economics elective or the sociology course next semester.",
      prompt: 'Choose the most appropriate response.',
      options: [
        'Have you looked at the course descriptions and which fits your degree requirements better?',
        'The football team had a great season this year.',
        'I usually have breakfast in the dormitory.',
        'The vending machine in the lobby accepts card payments now.',
      ],
      answer: 0,
    },
    {
      id: 'le17',
      type: 'Academic Talk',
      audioUrl: '/audio/listening/le17.mp3',
      transcript:
        'Instructor: When giving a presentation, maintain eye contact with your audience rather than reading directly from your notes. This helps build trust and keeps the audience more engaged throughout your talk.',
      prompt: 'What does the instructor suggest presenters do to keep audiences engaged?',
      options: [
        'Read directly from detailed notes',
        'Use as many slides as possible',
        'Maintain eye contact with the audience',
        'Speak as quickly as possible to cover all points',
      ],
      answer: 2,
    },
    {
      id: 'le18',
      type: 'Conversation',
      audioUrl: '/audio/listening/le18.mp3',
      transcript:
        "A: I think the data we collected for the research project might have some errors. B: We should go back and double-check the measurements before we write the analysis section.",
      prompt: 'What do the students decide to do before writing the analysis?',
      options: [
        'Submit the report with a note about possible errors',
        'Ask the professor to check the data for them',
        'Double-check the measurements they collected',
        'Start the analysis section and fix any issues later',
      ],
      answer: 2,
    },
  ],

  // ────────────────────────────────────────────────────────────────
  // STAGE 2 HARD — multi-speaker inference, implied meaning, academic inference
  // ────────────────────────────────────────────────────────────────
  stage2Hard: [
    {
      id: 'lh1',
      type: 'Multi-speaker Inference',
      audioUrl: '/audio/listening/lh1.mp3',
      transcript:
        'A: We could present our findings on Monday. B: That conflicts with my chemistry lab — I cannot move it. C: Tuesday morning is open for all three of us and the seminar room is available.',
      prompt: 'What is the most likely outcome of this conversation?',
      options: [
        'They will present on Monday as originally planned',
        'They will cancel the presentation entirely',
        'They will present on Tuesday morning',
        'They will reschedule to after the final exam period',
      ],
      answer: 2,
    },
    {
      id: 'lh2',
      type: 'Implied Meaning',
      audioUrl: '/audio/listening/lh2.mp3',
      transcript:
        'Professor: You can submit your draft by midnight, but submitting earlier gives me more time to provide detailed feedback before the revision deadline.',
      prompt: 'What is the professor implying?',
      options: [
        'Submitting late will result in a higher grade',
        'Submitting early may lead to more useful feedback',
        'The midnight deadline has been extended',
        'Feedback is generated automatically by the system',
      ],
      answer: 1,
    },
    {
      id: 'lh3',
      type: 'Academic Inference',
      audioUrl: '/audio/listening/lh3.mp3',
      transcript:
        'Lecturer: While total annual rainfall in the region has increased this decade, crop yields have actually declined due to irregular distribution of that rainfall and a significantly delayed onset of the growing season.',
      prompt: 'What best explains the declining crop yields despite more rainfall?',
      options: [
        'The total annual rainfall is still insufficient',
        'Poor timing and uneven distribution of rainfall',
        'Rising fertilizer costs in the region',
        'A reduction in the number of available farm workers',
      ],
      answer: 1,
    },
    {
      id: 'lh4',
      type: 'Academic Inference',
      audioUrl: '/audio/listening/lh4.mp3',
      transcript:
        'Lecturer: Many of the most widely cited papers in this field were published before researchers had access to modern neuroimaging tools. This means some foundational theoretical frameworks may not fully account for what we can now observe directly in the brain.',
      prompt: 'What concern does the lecturer raise about foundational papers in the field?',
      options: [
        'The papers were published using incorrect citation formats',
        'The theories may be incomplete given what modern tools now reveal',
        'The original researchers are no longer active in the field',
        'Modern neuroimaging is too expensive to use in most studies',
      ],
      answer: 1,
    },
    {
      id: 'lh5',
      type: 'Implied Meaning',
      audioUrl: '/audio/listening/lh5.mp3',
      transcript:
        'Department chair: I am proud of the graduation rate improvements this year, though I would caution us against attributing those gains entirely to the new curriculum revision.',
      prompt: 'What is the department chair implying?',
      options: [
        'The graduation rate improvement data is inaccurate',
        'Other factors beyond the curriculum may have contributed to the improvement',
        'The new curriculum was not effective at all',
        'The students themselves should be credited for all the improvement',
      ],
      answer: 1,
    },
    {
      id: 'lh6',
      type: 'Multi-speaker Inference',
      audioUrl: '/audio/listening/lh6.mp3',
      transcript:
        'A: I think our marketing approach is too risky for a startup with limited capital. B: But without some differentiation, we will be completely invisible in this market. C: What if we start with a more conservative message and scale it up once we gain initial traction?',
      prompt: 'What compromise is speaker C proposing?',
      options: [
        'Abandon the marketing strategy entirely',
        'Start conservatively and expand the approach after gaining momentum',
        'Launch an aggressive campaign immediately with all available resources',
        'Hire an external marketing agency to handle the strategy',
      ],
      answer: 1,
    },
    {
      id: 'lh7',
      type: 'Academic Inference',
      audioUrl: '/audio/listening/lh7.mp3',
      transcript:
        'Professor: The placebo effect is not merely a psychological illusion. Recent meta-analyses document real physiological changes in pain receptors and even immune markers when subjects believe they are receiving active treatment.',
      prompt: 'What does the professor suggest about the placebo effect?',
      options: [
        'It is effective only in studies involving pain management',
        'It produces measurable physiological changes, not just subjective perception',
        'It has been disproven by the meta-analyses she cites',
        'It only affects patients who have been diagnosed with chronic conditions',
      ],
      answer: 1,
    },
    {
      id: 'lh8',
      type: 'Implied Meaning',
      audioUrl: '/audio/listening/lh8.mp3',
      transcript:
        'Advisor: Most students seriously underestimate how long the research phase of a thesis actually takes. By the time many of them start writing, the semester is nearly over.',
      prompt: 'What is the advisor implying students should do differently?',
      options: [
        'Focus more on writing quality than on research depth',
        'Begin the research phase much earlier in the semester',
        'Skip the research phase if writing skills are strong enough',
        'Plan for the research phase to take only a few days',
      ],
      answer: 1,
    },
    {
      id: 'lh9',
      type: 'Academic Inference',
      audioUrl: '/audio/listening/lh9.mp3',
      transcript:
        'Researcher: The data show a strong correlation between students\' socioeconomic background and their standardized test scores. However, we must be very careful not to confuse correlation with causation when designing educational interventions.',
      prompt: 'What is the researcher warning against?',
      options: [
        'Using standardized tests as an assessment tool in schools',
        'Assuming that the correlation proves a direct causal relationship',
        'Collecting socioeconomic background data from students',
        'Designing any educational interventions based on research',
      ],
      answer: 1,
    },
    {
      id: 'lh10',
      type: 'Multi-speaker Inference',
      audioUrl: '/audio/listening/lh10.mp3',
      transcript:
        'A: The server software upgrade will require approximately two hours of downtime. B: That means all morning client appointments will need to be rescheduled. C: Could we schedule the upgrade for Saturday evening to minimize the disruption to operations?',
      prompt: 'What solution does speaker C propose?',
      options: [
        'Cancel the upgrade and keep the current software',
        'Perform the upgrade on Saturday evening',
        'Schedule it during regular business hours on a weekday',
        'Notify only the afternoon appointment holders about the delay',
      ],
      answer: 1,
    },
    {
      id: 'lh11',
      type: 'Academic Inference',
      audioUrl: '/audio/listening/lh11.mp3',
      transcript:
        'Historian: When analyzing primary sources from this period, it is essential to read each document against the social and political context of its production. The author\'s identity, intended audience, and purpose all shape what the document reveals — and what it deliberately conceals.',
      prompt: 'What is the historian\'s main point about analyzing primary source documents?',
      options: [
        'Primary sources are always more reliable than secondary sources',
        'The production context shapes both what a document reveals and conceals',
        'Documents from this period should generally not be used in academic research',
        'Only documents with clearly identified authors qualify as primary sources',
      ],
      answer: 1,
    },
    {
      id: 'lh12',
      type: 'Implied Meaning',
      audioUrl: '/audio/listening/lh12.mp3',
      transcript:
        'Professor: I notice that your introduction establishes three competing theoretical frameworks, but your conclusion only engages in depth with one of them.',
      prompt: 'What is the professor implying about the student\'s paper?',
      options: [
        'The introduction is too complex and should be simplified',
        'The conclusion should address all the frameworks introduced at the start',
        'Only one theoretical framework is relevant to the research topic',
        'The introduction should be reduced to one framework',
      ],
      answer: 1,
    },

    // ── NEW stage2Hard items (lh13–lh18) ─────────────────────────
    {
      id: 'lh13',
      type: 'Academic Inference',
      audioUrl: '/audio/listening/lh13.mp3',
      transcript:
        "Economist: Minimum wage increases tend to reduce poverty in the short term, but their long-term effects on employment remain contested. Some studies show modest job losses in low-wage sectors, while others find negligible impacts—largely depending on how quickly businesses can automate tasks or shift production.",
      prompt: 'What does the economist suggest about the long-term effects of minimum wage increases?',
      options: [
        'They consistently and significantly reduce employment in all sectors',
        'They have no measurable effect on the economy',
        'Their impact on employment varies based on multiple contextual factors',
        'They always benefit workers more than any other labor policy',
      ],
      answer: 2,
    },
    {
      id: 'lh14',
      type: 'Implied Meaning',
      audioUrl: '/audio/listening/lh14.mp3',
      transcript:
        "Professor: Your experimental design is rigorous, but I would caution you against drawing broad conclusions from a sample of forty participants. Your findings may be valid for this specific group, but generalization requires significantly more evidence.",
      prompt: 'What concern does the professor express about the study?',
      options: [
        "The experiment's design has critical methodological flaws",
        'The sample size is too small to support wide generalizations',
        'The conclusions are inconsistent with the data collected',
        'The research topic is not suitable for academic study',
      ],
      answer: 1,
    },
    {
      id: 'lh15',
      type: 'Multi-speaker Inference',
      audioUrl: '/audio/listening/lh15.mp3',
      transcript:
        "A: We should use the data visualization software for the final report — it will make the findings much clearer. B: The department doesn't have a license for that software. C: We could use the free open-source alternative — it has most of the same features.",
      prompt: "What solution does speaker C propose for the group's problem?",
      options: [
        'Purchase a license for the commercial software',
        'Avoid using any data visualization in the report',
        'Use a free alternative with similar features',
        'Request that the department buy the required software',
      ],
      answer: 2,
    },
    {
      id: 'lh16',
      type: 'Academic Inference',
      audioUrl: '/audio/listening/lh16.mp3',
      transcript:
        "Sociologist: Urban communities with high levels of social trust — where neighbors know each other, share resources, and look out for one another — consistently show lower crime rates and better health outcomes, regardless of income level. This suggests that the quality of social bonds may matter as much as economic factors in shaping community wellbeing.",
      prompt: 'What does the sociologist imply about the relationship between social trust and wellbeing?',
      options: [
        'Income level is the primary driver of community health outcomes',
        'Crime rates are determined mainly by the size of the police force',
        'Strong social bonds may influence wellbeing independently of economic conditions',
        'Urban communities are inherently less healthy than rural ones',
      ],
      answer: 2,
    },
    {
      id: 'lh17',
      type: 'Implied Meaning',
      audioUrl: '/audio/listening/lh17.mp3',
      transcript:
        "Department head: I appreciate the enthusiasm for the new curriculum proposal, but rolling it out across all programs simultaneously carries significant risk. A phased pilot in one or two departments would let us identify problems before they affect the entire institution.",
      prompt: 'What does the department head imply about the curriculum proposal?',
      options: [
        'The proposal should be abandoned entirely',
        'A full immediate rollout is the safest approach',
        'Testing it gradually would reduce the risk of widespread problems',
        'The proposal lacks any educational merit',
      ],
      answer: 2,
    },
    {
      id: 'lh18',
      type: 'Multi-speaker Inference',
      audioUrl: '/audio/listening/lh18.mp3',
      transcript:
        "A: The patient outcome data shows a 20% improvement in recovery times with the new protocol. B: But the control group was much smaller than in standard trials — I'm not sure the comparison is reliable. C: We could address that concern by running the trial again with a larger, randomized control group.",
      prompt: "What concern does speaker B raise, and how does speaker C propose to resolve it?",
      options: [
        'B questions the cost; C suggests applying for additional funding',
        'B questions the small control group; C suggests a larger randomized trial',
        'B questions the patient selection; C suggests recruiting different demographics',
        'B questions the protocol design; C suggests modifying the treatment steps',
      ],
      answer: 1,
    },
  ],
}
