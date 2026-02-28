// 2026 TOEFL Reading — Adaptive Question Bank
// Stage 1: 15 foundation questions (Complete the Words, Read in Daily Life, Read an Academic Passage)
// Stage 2 Easy: 12 questions (daily-life focused, accessible)
// Stage 2 Hard: 12 questions (academic inference, rhetorical purpose, implied meaning)

export const readingAdaptive = {
  stage1: [
    // ── Complete the Words (4) — text-fill format ───────────────
    // passageText: passage with truncated words shown as "inves___"
    // blanks: array of { incomplete, answer } — user types the FULL word
    {
      id: 'r1',
      type: 'Complete the Words',
      passageText:
        'Researchers inves___ how peo___ acquire language skills more effectively through immersive programs.',
      blanks: [
        { incomplete: 'inves___', answer: 'investigate' },
        { incomplete: 'peo___', answer: 'people' },
      ],
    },
    {
      id: 'r2',
      type: 'Complete the Words',
      passageText:
        'The uni___ announced that all lib___ resources would be available digitally by next semester.',
      blanks: [
        { incomplete: 'uni___', answer: 'university' },
        { incomplete: 'lib___', answer: 'library' },
      ],
    },
    {
      id: 'r3',
      type: 'Complete the Words',
      passageText:
        'Sci___ have disc___ a new coral species that thrives in warmer ocean waters.',
      blanks: [
        { incomplete: 'Sci___', answer: 'Scientists' },
        { incomplete: 'disc___', answer: 'discovered' },
      ],
    },
    {
      id: 'r4',
      type: 'Complete the Words',
      passageText:
        'The gov___ introduced a new pol___ to reduce carbon emissions from public transport.',
      blanks: [
        { incomplete: 'gov___', answer: 'government' },
        { incomplete: 'pol___', answer: 'policy' },
      ],
    },

    // ── Read in Daily Life (5) ─────────────────────────────
    {
      id: 'r5',
      type: 'Read in Daily Life',
      passage:
        'Text message: "Library printer queue is long. Let\'s submit from the computer lab in 20 mins."',
      prompt: 'Why are they switching location?',
      options: [
        'The library is closed',
        'The printer wait is too long',
        'Class was canceled',
        'There is no internet at the library',
      ],
      answer: 1,
    },
    {
      id: 'r6',
      type: 'Read in Daily Life',
      passage:
        'Email: "Please bring your student ID to the advising office before 4 PM for document verification."',
      prompt: 'What must students bring to the advising office?',
      options: ['Course transcript', 'Student ID card', 'Enrollment form', 'Payment receipt'],
      answer: 1,
    },
    {
      id: 'r7',
      type: 'Read in Daily Life',
      passage:
        'Campus poster: "Lost: Black backpack near cafeteria. Contains laptop and charger. Contact: mlee@campus.edu"',
      prompt: 'What is inside the lost bag?',
      options: [
        'Wallet and keys',
        'Laptop and charger',
        'Textbooks and notes',
        'Calculator and pens',
      ],
      answer: 1,
    },
    {
      id: 'r8',
      type: 'Read in Daily Life',
      passage:
        'Notice: "The gym will be closed for maintenance this Saturday and Sunday. Normal hours resume Monday."',
      prompt: 'When will the gym reopen?',
      options: ['Friday evening', 'Saturday morning', 'Sunday evening', 'Monday'],
      answer: 3,
    },
    {
      id: 'r9',
      type: 'Read in Daily Life',
      passage: 'Text: "Can\'t make it to study group tonight. Can we reschedule to Thursday at 7?"',
      prompt: 'What does the sender want to do?',
      options: [
        'Cancel the study group permanently',
        'Move the meeting to a different time',
        'Study alone instead',
        'Join another group',
      ],
      answer: 1,
    },

    // ── Read an Academic Passage (6) ──────────────────────
    {
      id: 'r10',
      type: 'Read an Academic Passage',
      passage:
        'Urban trees reduce peak summer temperatures by providing shade and releasing water vapor, improving walkability in dense neighborhoods.',
      prompt: 'What is the main idea of this passage?',
      options: [
        'Cities should restrict all private vehicles',
        'Trees improve urban climate and walkability',
        'Walkability increases tax revenue significantly',
        'Heat in cities comes entirely from vehicles',
      ],
      answer: 1,
    },
    {
      id: 'r11',
      type: 'Read an Academic Passage',
      passage:
        'Frequent low-stakes quizzes improve long-term recall by forcing repeated retrieval from memory, a process known as the testing effect.',
      prompt: 'Why do low-stakes quizzes help students remember more?',
      options: [
        'They are weighted heavily in final grades',
        'They allow more free time for other subjects',
        'They trigger repeated memory retrieval',
        'They replace traditional lecture formats',
      ],
      answer: 2,
    },
    {
      id: 'r12',
      type: 'Read an Academic Passage',
      passage:
        'Sleep deprivation in college students correlates with lower GPAs, shorter attention spans, and higher anxiety rates compared to students who sleep 7–9 hours nightly.',
      prompt: 'According to the passage, which students tend to perform better academically?',
      options: [
        'Those who study late at night',
        'Those who sleep 7–9 hours per night',
        'Those who take more courses per semester',
        'Those who exercise every morning',
      ],
      answer: 1,
    },
    {
      id: 'r13',
      type: 'Read an Academic Passage',
      passage:
        'Community gardens in urban areas have been shown to increase social cohesion, provide fresh produce, and reduce stress among residents.',
      prompt: 'Which benefit of community gardens does the passage NOT mention?',
      options: ['Social cohesion', 'Lower property taxes', 'Fresh produce access', 'Stress reduction'],
      answer: 1,
    },
    {
      id: 'r14',
      type: 'Read an Academic Passage',
      passage:
        'Digital literacy programs that teach information evaluation skills have shown success in reducing susceptibility to misinformation among young adults.',
      prompt: 'What is the primary goal of the digital literacy programs described?',
      options: [
        'To teach social media marketing strategies',
        'To improve students\' typing speed',
        'To reduce susceptibility to misinformation',
        'To develop advanced coding skills',
      ],
      answer: 2,
    },
    {
      id: 'r15',
      type: 'Read an Academic Passage',
      passage:
        'The Mediterranean diet, rich in vegetables, legumes, and olive oil, has been consistently linked to lower rates of cardiovascular disease in long-term population studies.',
      prompt: 'What does long-term research suggest about the Mediterranean diet?',
      options: [
        'It primarily improves athletic performance',
        'It is linked to lower cardiovascular disease rates',
        'It reduces the need for regular exercise',
        'It leads to gradual weight gain over time',
      ],
      answer: 1,
    },

    // ── NEW from PDF materials (r16–r27) ──────────────────────────
    {
      id: 'r16',
      type: 'Complete the Words',
      passageText:
        'Every living thing is made of tiny units called cells. Ea___ cell ha___ a thi___ outer lay___ that kee___ its con___ together an___ lets cer___ materials pas___ through. Ins___, a soft fluid supports smaller parts that handle jobs like making energy and repairing damage.',
      blanks: [
        { incomplete: 'Ea___', answer: 'Each' },
        { incomplete: 'ha___', answer: 'has' },
        { incomplete: 'thi___', answer: 'thin' },
        { incomplete: 'lay___', answer: 'layer' },
        { incomplete: 'kee___', answer: 'keeps' },
        { incomplete: 'con___', answer: 'contents' },
        { incomplete: 'an___', answer: 'and' },
        { incomplete: 'cer___', answer: 'certain' },
        { incomplete: 'pas___', answer: 'pass' },
        { incomplete: 'Ins___', answer: 'Inside' },
      ],
    },
    {
      id: 'r17',
      type: 'Complete the Words',
      passageText:
        'Bridges allow people and vehicles to cross rivers, valleys, or busy roads safely. To sta___ strong, the___ must spr___ the wei___ they car___ across thei___ supports. Bui___ often cho___ materials suc___ as ste___ or concrete because these can stretch slightly under pressure instead of breaking.',
      blanks: [
        { incomplete: 'sta___', answer: 'stay' },
        { incomplete: 'the___', answer: 'they' },
        { incomplete: 'spr___', answer: 'spread' },
        { incomplete: 'wei___', answer: 'weight' },
        { incomplete: 'car___', answer: 'carry' },
        { incomplete: 'thei___', answer: 'their' },
        { incomplete: 'Bui___', answer: 'Builders' },
        { incomplete: 'cho___', answer: 'choose' },
        { incomplete: 'suc___', answer: 'such' },
        { incomplete: 'ste___', answer: 'steel' },
      ],
    },
    {
      id: 'r18',
      type: 'Complete the Words',
      passageText:
        "The water cycle describes how water constantly moves through Earth's air, land, and oceans. Whe___ the su___ warms the sur___, some wat___ changes int___ vapor and ris___. That vap___ cools in___ the sk___ and for___ clouds that eventually release rain or snow.",
      blanks: [
        { incomplete: 'Whe___', answer: 'When' },
        { incomplete: 'su___', answer: 'sun' },
        { incomplete: 'sur___', answer: 'surface' },
        { incomplete: 'wat___', answer: 'water' },
        { incomplete: 'int___', answer: 'into' },
        { incomplete: 'ris___', answer: 'rises' },
        { incomplete: 'vap___', answer: 'vapor' },
        { incomplete: 'in___', answer: 'in' },
        { incomplete: 'sk___', answer: 'sky' },
        { incomplete: 'for___', answer: 'forms' },
      ],
    },
    {
      id: 'r19',
      type: 'Complete the Words',
      passageText:
        'War___ air a___ heavy rai___ create th___ ideal envi___ for pla___ to gro___ all ye___. As lea___ fall an___ decay, nutrients return to the soil, supporting the richest variety of life on Earth.',
      blanks: [
        { incomplete: 'War___', answer: 'Warm' },
        { incomplete: 'a___', answer: 'and' },
        { incomplete: 'rai___', answer: 'rain' },
        { incomplete: 'th___', answer: 'the' },
        { incomplete: 'envi___', answer: 'environment' },
        { incomplete: 'pla___', answer: 'plants' },
        { incomplete: 'gro___', answer: 'grow' },
        { incomplete: 'ye___', answer: 'year' },
        { incomplete: 'lea___', answer: 'leaves' },
        { incomplete: 'an___', answer: 'and' },
      ],
    },
    {
      id: 'r20',
      type: 'Read in Daily Life',
      passage:
        'Email — Subject: Tour Confirmation\nDear Mr. Lee,\nYour group tour of the City History Museum is confirmed for March 5 at 10:30 a.m. Please arrive by 10:15 for check-in. Note that photography is not allowed during guided tours. We appreciate your cooperation.\nBest regards,\nPriya Singh',
      prompt: 'What should Mr. Lee do before the tour begins?',
      options: [
        'Join a different group tour',
        'Take photos of the exhibits',
        'Buy tickets at the entrance',
        'Arrive 15 minutes early',
      ],
      answer: 3,
    },
    {
      id: 'r21',
      type: 'Read in Daily Life',
      passage:
        'Email — Subject: Tour Confirmation\nDear Mr. Lee,\nYour group tour of the City History Museum is confirmed for March 5 at 10:30 a.m. Please arrive by 10:15 for check-in. Note that photography is not allowed during guided tours. We appreciate your cooperation.\nBest regards,\nPriya Singh',
      prompt: 'What can be inferred about the museum?',
      options: [
        'It requires all visitors to wear name tags.',
        "It limits visitors' use of cameras.",
        'It allows private tours at any time.',
        'It accepts payments in cash or credit.',
      ],
      answer: 1,
    },
    {
      id: 'r22',
      type: 'Read in Daily Life',
      passage:
        "Text chain:\nOlga Antonov (9:00 A.M.): Morning team. The shipment of EcoBlend mugs was delayed due to the storm. We need to update our customers right away.\nLuis Fernandez (9:03 A.M.): I'll email all wholesale clients explaining the new delivery date. Do we know when the shipment will arrive?\nOlga Antonov (9:05 A.M.): The supplier expects delivery on Thursday instead of Tuesday.\nYasmin Hasan (9:08 A.M.): Should I also post an announcement on our website and social media pages?\nOlga Antonov (9:10 A.M.): Yes, please do. Keep the message positive—mention the weather issue but emphasize that orders will ship later this week.\nAhmed Khan (9:12 A.M.): Got it. I'll adjust the inventory page so customers can't place new mug orders until Thursday.\nOlga Antonov (9:14 A.M.): Thanks, everyone. Let's avoid the kind of confusion we had during last month's delay.",
      prompt: "What is Olga's main concern in these messages?",
      options: [
        'Losing contact with the supplier',
        'Preventing customer confusion about late orders',
        'Designing a new product that suppliers can deliver on time',
        'Finding ways to email clients about social media pages',
      ],
      answer: 1,
    },
    {
      id: 'r23',
      type: 'Read in Daily Life',
      passage:
        "Text chain:\nOlga Antonov (9:00 A.M.): Morning team. The shipment of EcoBlend mugs was delayed due to the storm. We need to update our customers right away.\nLuis Fernandez (9:03 A.M.): I'll email all wholesale clients explaining the new delivery date. Do we know when the shipment will arrive?\nOlga Antonov (9:05 A.M.): The supplier expects delivery on Thursday instead of Tuesday.\nYasmin Hasan (9:08 A.M.): Should I also post an announcement on our website and social media pages?\nOlga Antonov (9:10 A.M.): Yes, please do. Keep the message positive—mention the weather issue but emphasize that orders will ship later this week.\nAhmed Khan (9:12 A.M.): Got it. I'll adjust the inventory page so customers can't place new mug orders until Thursday.\nOlga Antonov (9:14 A.M.): Thanks, everyone. Let's avoid the kind of confusion we had during last month's delay.",
      prompt: 'According to the messages, when will the shipment now arrive?',
      options: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      answer: 2,
    },
    {
      id: 'r24',
      type: 'Read in Daily Life',
      passage:
        "Text chain:\nOlga Antonov (9:00 A.M.): Morning team. The shipment of EcoBlend mugs was delayed due to the storm. We need to update our customers right away.\nLuis Fernandez (9:03 A.M.): I'll email all wholesale clients explaining the new delivery date. Do we know when the shipment will arrive?\nOlga Antonov (9:05 A.M.): The supplier expects delivery on Thursday instead of Tuesday.\nYasmin Hasan (9:08 A.M.): Should I also post an announcement on our website and social media pages?\nOlga Antonov (9:10 A.M.): Yes, please do. Keep the message positive—mention the weather issue but emphasize that orders will ship later this week.\nAhmed Khan (9:12 A.M.): Got it. I'll adjust the inventory page so customers can't place new mug orders until Thursday.\nOlga Antonov (9:14 A.M.): Thanks, everyone. Let's avoid the kind of confusion we had during last month's delay.",
      prompt: 'Which of the following actions is NOT mentioned in the messages?',
      options: [
        'Contacting wholesale clients by email',
        'Posting an update on social media',
        'Adjusting the inventory page',
        'Calling the supplier by phone',
      ],
      answer: 3,
    },
    {
      id: 'r25',
      type: 'Read in Daily Life',
      passage:
        "Email — Subject: Community Garden Plot Registration\nDear Valued Member,\nI hope you're doing well. Registration for the Riverside Community Garden opens next Monday. As a returning participant, you'll have early access to reserve your same plot before general registration begins on Wednesday.\nThis year, the garden committee is introducing a shared tool shed and composting area to make upkeep easier for everyone. There will also be a short orientation for new gardeners on Saturday morning, followed by a seed-exchange table where members can trade vegetables or flower seeds.\nIf you'd like to renew your plot, please confirm by replying to this email by Friday evening. Space is limited, and unconfirmed plots will be offered to people on the waiting list.\nBest regards,\nYuki Odani\nRiverside Garden Coordinator",
      prompt: 'According to the email, what new feature will be available in the community garden this year?',
      options: [
        'A shared tool shed for members',
        'A new registration area',
        'Orientation meetings and weekly markets',
        'A larger parking area for visitors',
      ],
      answer: 0,
    },
    {
      id: 'r26',
      type: 'Read in Daily Life',
      passage:
        "Email — Subject: Community Garden Plot Registration\nDear Valued Member,\nI hope you're doing well. Registration for the Riverside Community Garden opens next Monday. As a returning participant, you'll have early access to reserve your same plot before general registration begins on Wednesday.\nThis year, the garden committee is introducing a shared tool shed and composting area to make upkeep easier for everyone. There will also be a short orientation for new gardeners on Saturday morning, followed by a seed-exchange table where members can trade vegetables or flower seeds.\nIf you'd like to renew your plot, please confirm by replying to this email by Friday evening. Space is limited, and unconfirmed plots will be offered to people on the waiting list.\nBest regards,\nYuki Odani\nRiverside Garden Coordinator",
      prompt: 'The new garden features do NOT include',
      options: [
        'A composting area',
        'A shared tool shed',
        'A weekly seed-exchange event',
        'Orientation for new members',
      ],
      answer: 2,
    },
    {
      id: 'r27',
      type: 'Read in Daily Life',
      passage:
        "Email — Subject: Community Garden Plot Registration\nDear Valued Member,\nI hope you're doing well. Registration for the Riverside Community Garden opens next Monday. As a returning participant, you'll have early access to reserve your same plot before general registration begins on Wednesday.\nThis year, the garden committee is introducing a shared tool shed and composting area to make upkeep easier for everyone. There will also be a short orientation for new gardeners on Saturday morning, followed by a seed-exchange table where members can trade vegetables or flower seeds.\nIf you'd like to renew your plot, please confirm by replying to this email by Friday evening. Space is limited, and unconfirmed plots will be offered to people on the waiting list.\nBest regards,\nYuki Odani\nRiverside Garden Coordinator",
      prompt: 'What can be inferred about the members who received this email?',
      options: [
        'They participated in the garden last year.',
        'They have already paid the registration fee.',
        'They are responsible for organizing the orientation.',
        'They are members of the garden committee.',
      ],
      answer: 0,
    },
  ],

  // ────────────────────────────────────────────────────────────────
  // STAGE 2 EASY — everyday life focus, accessible content
  // ────────────────────────────────────────────────────────────────
  stage2Easy: [
    {
      id: 're1',
      type: 'Read in Daily Life',
      passage:
        'Campus notice: "Cafeteria will open at 7:30 AM and close at 10 PM during finals week for extended student support."',
      prompt: 'What changed at the cafeteria during finals week?',
      options: [
        'The cafeteria moved to a new building',
        'Both opening and closing times were extended',
        'The cafeteria closed for the entire week',
        'Only the dinner menu was affected',
      ],
      answer: 1,
    },
    {
      id: 're2',
      type: 'Complete the Words',
      passageText:
        'The pro___ asked all stu___ to submit their final papers by midnight on Friday.',
      blanks: [
        { incomplete: 'pro___', answer: 'professor' },
        { incomplete: 'stu___', answer: 'students' },
      ],
    },
    {
      id: 're3',
      type: 'Read in Daily Life',
      passage: 'App alert: "Quiz room changed from B12 to C04 due to flooding on the B floor."',
      prompt: 'Where should students go for the quiz?',
      options: [
        'Skip the quiz until further notice',
        'Room C04',
        'Stay in Room B12',
        'Email the professor before going',
      ],
      answer: 1,
    },
    {
      id: 're4',
      type: 'Read in Daily Life',
      passage:
        'Email: "Free tutoring is available in the Writing Center on weekdays from 9 AM to 5 PM. No appointment is needed."',
      prompt: 'What is true about the Writing Center tutoring?',
      options: [
        'It costs a small fee per session',
        'Students must book appointments in advance',
        'Walk-in visitors are welcome on weekdays',
        'It is available on weekends only',
      ],
      answer: 2,
    },
    {
      id: 're5',
      type: 'Read in Daily Life',
      passage:
        'Text: "Parking lot D is full. Please use lot F near the sports center. Shuttles run every 15 minutes."',
      prompt: 'How can students travel from lot F to campus?',
      options: [
        'Walk 15 minutes across campus',
        'Take a shuttle every 15 minutes',
        'Rent a bicycle from the sports center',
        'No transport is currently available',
      ],
      answer: 1,
    },
    {
      id: 're6',
      type: 'Read in Daily Life',
      passage:
        'Notice: "The international student office will be closed next Monday for a public holiday. Inquiries should be submitted online."',
      prompt: 'What should students do if they need help next Monday?',
      options: [
        'Visit the office in person after noon',
        'Call the main campus line',
        'Submit inquiries online',
        'Visit a different administrative office',
      ],
      answer: 2,
    },
    {
      id: 're7',
      type: 'Read an Academic Passage',
      passage:
        'Regular physical activity of at least 30 minutes a day improves mood, reduces fatigue, and helps students maintain focus during long study sessions.',
      prompt: 'What does daily exercise help students do, according to the passage?',
      options: [
        'Gain weight more effectively',
        'Maintain focus and improve mood',
        'Study fewer hours each day',
        'Sleep for shorter periods at night',
      ],
      answer: 1,
    },
    {
      id: 're8',
      type: 'Read an Academic Passage',
      passage:
        'Students who participate in extracurricular activities report higher satisfaction with their university experience and develop stronger leadership and teamwork skills.',
      prompt: 'What benefit do extracurricular activities provide to students?',
      options: [
        'Guaranteed higher test scores',
        'Greater satisfaction and stronger interpersonal skills',
        'More scholarship opportunities automatically',
        'A reduced academic course load',
      ],
      answer: 1,
    },
    {
      id: 're9',
      type: 'Complete the Words',
      passageText:
        'The lab equip___ must be ret___ to the storage room after each practical session.',
      blanks: [
        { incomplete: 'equip___', answer: 'equipment' },
        { incomplete: 'ret___', answer: 'returned' },
      ],
    },
    {
      id: 're10',
      type: 'Read in Daily Life',
      passage:
        'Memo: "All club meetings this week are moved to the online platform due to building renovation. Check your email for the meeting links."',
      prompt: 'Why are club meetings moved online this week?',
      options: [
        'Poor recent attendance at in-person meetings',
        'Building renovation',
        'Technical issues with the audio system',
        'A new campus-wide policy',
      ],
      answer: 1,
    },
    {
      id: 're11',
      type: 'Read in Daily Life',
      passage:
        'Sign: "The elevator is under repair until further notice. Please use stairways A or B located at either end of the hall."',
      prompt: 'What should people use instead of the elevator?',
      options: [
        'Stairways A or B',
        'The ramp near the main entrance',
        'The service elevator in the back',
        'The parking garage stairwell',
      ],
      answer: 0,
    },
    {
      id: 're12',
      type: 'Read an Academic Passage',
      passage:
        'Peer mentoring programs connect first-year students with experienced upperclassmen who provide academic guidance and emotional support during the challenging transition to university life.',
      prompt: 'What is the main purpose of peer mentoring programs?',
      options: [
        'To replace professional academic counselors',
        'To support first-year students during their university transition',
        'To reduce the overall cost of tutoring services',
        'To organize campus social events and activities',
      ],
      answer: 1,
    },

    // ── NEW from PDF materials (re13–re24) ────────────────────────
    {
      id: 're13',
      type: 'Complete the Words',
      passageText:
        'The invention of the printing press changed how information spread across Europe. Bef___ this mac___, books wer___ copied by han___, which too___ months. Wit___ movable met___ letters, pri___ could mak___ many cop___ quickly and at lower cost.',
      blanks: [
        { incomplete: 'Bef___', answer: 'Before' },
        { incomplete: 'mac___', answer: 'machine' },
        { incomplete: 'wer___', answer: 'were' },
        { incomplete: 'han___', answer: 'hand' },
        { incomplete: 'too___', answer: 'took' },
        { incomplete: 'Wit___', answer: 'With' },
        { incomplete: 'met___', answer: 'metal' },
        { incomplete: 'pri___', answer: 'printers' },
        { incomplete: 'mak___', answer: 'make' },
        { incomplete: 'cop___', answer: 'copies' },
      ],
    },
    {
      id: 're14',
      type: 'Complete the Words',
      passageText:
        'Long before modern transportation, people traveled great distances to exchange goods. Tra___ carried use___ items lik___ cloth or sal___ along pat___ that lin___ villages an___ cities. The___ journeys wer___ slow but hel___ spread new ideas and customs between cultures.',
      blanks: [
        { incomplete: 'Tra___', answer: 'Traders' },
        { incomplete: 'use___', answer: 'useful' },
        { incomplete: 'lik___', answer: 'like' },
        { incomplete: 'sal___', answer: 'salt' },
        { incomplete: 'pat___', answer: 'paths' },
        { incomplete: 'lin___', answer: 'linked' },
        { incomplete: 'an___', answer: 'and' },
        { incomplete: 'The___', answer: 'These' },
        { incomplete: 'wer___', answer: 'were' },
        { incomplete: 'hel___', answer: 'helped' },
      ],
    },
    {
      id: 're15',
      type: 'Read in Daily Life',
      passage:
        'Email — Subject: Writing Workshop Information\nDear Ms. Hernandez,\nThank you for enrolling in our writing workshop. Your participation is confirmed once payment is received by October 2. Please note that late payments will cancel your registration automatically. We look forward to having you in class.\nBest Regards,\nLuis Fernandez',
      prompt: "What must happen before Ms. Hernandez's registration is finalized?",
      options: [
        'The instructor must confirm the workshop topic.',
        'The payment must be received by October 2.',
        'She must submit a writing sample.',
        'The workshop schedule must be published.',
      ],
      answer: 1,
    },
    {
      id: 're16',
      type: 'Read in Daily Life',
      passage:
        'Email — Subject: Writing Workshop Information\nDear Ms. Hernandez,\nThank you for enrolling in our writing workshop. Your participation is confirmed once payment is received by October 2. Please note that late payments will cancel your registration automatically. We look forward to having you in class.\nBest Regards,\nLuis Fernandez',
      prompt: 'Which of the following is NOT true according to the message?',
      options: [
        'Payment is required to confirm registration.',
        'Late payments will lead to cancellation.',
        'The workshop starts on October 2.',
        'The sender expects Ms. Hernandez to attend.',
      ],
      answer: 2,
    },
    {
      id: 're17',
      type: 'Read in Daily Life',
      passage:
        "Announcement:\nThe university's Student Center will undergo renovations beginning Monday, March 10. During the first phase, the main lobby and cafeteria will be closed for approximately four weeks. Food services will operate temporarily in Building B, Room 205, where students can purchase snacks, drinks, and light meals.\nAll club meetings and student organization events scheduled in the Student Center should be moved to alternate spaces. Reservations can be made through the Facilities Office.\nThe renovations will include upgraded lighting, energy-efficient air systems, and improved accessibility for all visitors.",
      prompt: 'What is the main purpose of the announcement?',
      options: [
        'To invite students to attend an opening ceremony',
        'To request volunteers for the renovation project',
        'To provide details about the reservation process for alternate spaces',
        'To inform students about temporary changes caused by construction',
      ],
      answer: 3,
    },
    {
      id: 're18',
      type: 'Read in Daily Life',
      passage:
        "Announcement:\nThe university's Student Center will undergo renovations beginning Monday, March 10. During the first phase, the main lobby and cafeteria will be closed for approximately four weeks. Food services will operate temporarily in Building B, Room 205, where students can purchase snacks, drinks, and light meals.\nAll club meetings and student organization events scheduled in the Student Center should be moved to alternate spaces. Reservations can be made through the Facilities Office.\nThe renovations will include upgraded lighting, energy-efficient air systems, and improved accessibility for all visitors.",
      prompt: 'Where can students buy food while the cafeteria is closed?',
      options: [
        'In the Student Center lobby',
        'In Building B, Room 205',
        'In the main lobby',
        'In the dormitory lounge',
      ],
      answer: 1,
    },
    {
      id: 're19',
      type: 'Read in Daily Life',
      passage:
        "Announcement:\nThe university's Student Center will undergo renovations beginning Monday, March 10. During the first phase, the main lobby and cafeteria will be closed for approximately four weeks. Food services will operate temporarily in Building B, Room 205, where students can purchase snacks, drinks, and light meals.\nAll club meetings and student organization events scheduled in the Student Center should be moved to alternate spaces. Reservations can be made through the Facilities Office.\nThe renovations will include upgraded lighting, energy-efficient air systems, and improved accessibility for all visitors.",
      prompt: 'What can be inferred about the renovated Student Center?',
      options: [
        'It will be more environmentally friendly than before.',
        'It will no longer allow public events.',
        'It will reduce the number of available study spaces.',
        'It will no longer be available for club meetings and events.',
      ],
      answer: 0,
    },
    {
      id: 're20',
      type: 'Read in Daily Life',
      passage:
        'Email — Subject: Textbook Collection Reminder\nDear Students,\nThis is a reminder that borrowed textbooks must be returned to the library by Friday, May 3. Books not returned by the deadline will result in a hold on your student account, which may prevent registration for the next semester. Please check your borrowing records online and return all outstanding items as soon as possible.\nBest regards,\nMimi Chen\nLibrary Services',
      prompt: 'What will happen if students do not return their textbooks by the deadline?',
      options: [
        'They will receive an automatic fine notice by email.',
        'Their borrowing privileges will be reduced.',
        'They will be charged a daily late fee.',
        'A hold will be placed on their student account.',
      ],
      answer: 3,
    },
    {
      id: 're21',
      type: 'Read in Daily Life',
      passage:
        'Email — Subject: Office Parking Update\nDear Staff,\nStarting next Monday, Parking Lot A will be reserved for visitors only. All staff members should use Lot C, located behind the main building. Monthly parking permits for Lot C can be obtained from the facilities desk on the ground floor. We apologize for any inconvenience this change may cause.\nBest regards,\nTom Hardwick\nFacilities Manager',
      prompt: 'Where should staff members park starting next Monday?',
      options: [
        'In Lot A, as before',
        'In Lot C, behind the main building',
        'In the visitor parking area',
        'In any available space on campus',
      ],
      answer: 1,
    },
    {
      id: 're22',
      type: 'Read in Daily Life',
      passage:
        'Announcement:\nPlease be advised that the elevator in Building D will be out of service on June 12 for scheduled maintenance. Residents and staff who require elevator access should plan accordingly. The stairways on both sides of the building will remain open throughout the day. We expect maintenance to be completed by 5:00 PM. We apologize for any inconvenience.',
      prompt: 'Which access will remain available during the elevator maintenance?',
      options: [
        'Stairways on both sides of the building',
        'A temporary lift at the back entrance',
        'The elevator in Building C',
        'The service corridor on the ground floor',
      ],
      answer: 0,
    },
    {
      id: 're23',
      type: 'Read in Daily Life',
      passage:
        'Email — Subject: Invitation to Academic Mentorship Program\nDear Student,\nI am pleased to invite you to apply for the Academic Mentorship Program, which connects undergraduate students with faculty mentors in their field of study. This semester, participating students will meet with their mentor twice a month to discuss academic goals and career planning. Applications are due by September 15. Space is limited to 20 participants.\nPlease contact me directly if you have any questions.\nWarm regards,\nAisha Hinds\nStudent Affairs Office',
      prompt: 'How often will students meet with their mentor in this program?',
      options: [
        'Once a week throughout the semester',
        'Once a month for six months',
        'Three times per month during term',
        'Twice a month during the semester',
      ],
      answer: 3,
    },
    {
      id: 're24',
      type: 'Read in Daily Life',
      passage:
        'Announcement:\nThe Oakridge Community Pool will be closed from August 5 to August 7 for annual maintenance and safety inspections. During this period, all swimming classes and lane reservations will be suspended. Members with bookings during this period will be contacted to reschedule. Regular operations will resume on August 8.\nWe thank you for your patience.\nMimi Chen\nAquatic Center Director',
      prompt: 'When will the community pool reopen after maintenance?',
      options: ['August 4', 'August 5', 'August 7', 'August 8'],
      answer: 3,
    },
  ],

  // ────────────────────────────────────────────────────────────────
  // STAGE 2 HARD — academic inference, implied meaning, rhetorical purpose
  // ────────────────────────────────────────────────────────────────
  stage2Hard: [
    {
      id: 'rh1',
      type: 'Read an Academic Passage',
      passage:
        'When peer feedback is provided immediately after a writing task, revision quality improves significantly even when total time on the task remains unchanged.',
      prompt: 'What does the passage imply about improving writing quality?',
      options: [
        'Immediate peer feedback is more valuable than additional writing time',
        'Longer writing sessions alone improve quality sufficiently',
        'Students fundamentally dislike the peer review process',
        'Grammar accuracy is determined primarily by writing speed',
      ],
      answer: 0,
    },
    {
      id: 'rh2',
      type: 'Read an Academic Passage',
      passage:
        'The author contrasts rural and urban transit infrastructure to highlight fundamental policy trade-offs in public budget allocation and regional equity.',
      prompt: 'Why does the author present the rural-urban contrast?',
      options: [
        'To entertain urban readers with familiar scenarios',
        'To illustrate budget and equity trade-offs in policy decisions',
        'To avoid discussing complex statistical data',
        'To criticize the priorities of rural communities',
      ],
      answer: 1,
    },
    {
      id: 'rh3',
      type: 'Read an Academic Passage',
      passage:
        'Researchers observed that bilingual students switched problem-solving strategies faster than monolingual peers when working under timed conditions.',
      prompt: 'What is the best inference from this observation?',
      options: [
        'Bilingualism may enhance cognitive flexibility under pressure',
        'Time pressure reduces all students\' performance equally',
        'Problem-solving ability is unrelated to language background',
        'Monolingual students have no effective problem-solving strategies',
      ],
      answer: 0,
    },
    {
      id: 'rh4',
      type: 'Read an Academic Passage',
      passage:
        'Despite expanding global smartphone access, the digital divide persists not in device ownership but in the quality of internet connections and the digital skills required to use them productively.',
      prompt: 'According to the passage, where does the current digital divide lie?',
      options: [
        'Primarily in smartphone ownership rates across regions',
        'In connection quality and users\' digital skill levels',
        'In the types of applications available in different countries',
        'In government spending on technology infrastructure',
      ],
      answer: 1,
    },
    {
      id: 'rh5',
      type: 'Read an Academic Passage',
      passage:
        'Performance-based funding in higher education ties institutional budgets to graduation rates, creating an unintended incentive for universities to lower academic standards in order to graduate more students.',
      prompt: 'What unintended consequence does the author identify?',
      options: [
        'Students become less interested in obtaining degrees',
        'Universities may reduce academic standards to increase graduation numbers',
        'Government funding for education declines further',
        'Performance measurement data becomes unreliable',
      ],
      answer: 1,
    },
    {
      id: 'rh6',
      type: 'Read an Academic Passage',
      passage:
        'Intermittent fasting shows metabolic benefits in controlled laboratory settings; however, long-term adherence is poor in real-world conditions, limiting the applicability of these findings to general dietary recommendations.',
      prompt: 'Why does the author urge caution about applying intermittent fasting research broadly?',
      options: [
        'The metabolic improvements observed are not statistically significant',
        'Most studies in this area were conducted only on athletes',
        'Long-term adherence outside controlled settings is low',
        'General dietary recommendations are revised too frequently',
      ],
      answer: 2,
    },
    {
      id: 'rh7',
      type: 'Read an Academic Passage',
      passage:
        'Brief exposure to natural environments reduces cortisol levels, lowers blood pressure, and activates the parasympathetic nervous system, suggesting specific mechanisms by which urban green spaces benefit public health.',
      prompt: 'What does this research suggest about urban green spaces?',
      options: [
        'They are too expensive for cities to maintain effectively',
        'They primarily reduce urban noise rather than health risks',
        'They improve public health through measurable physiological pathways',
        'They benefit only elderly and child populations significantly',
      ],
      answer: 2,
    },
    {
      id: 'rh8',
      type: 'Read an Academic Passage',
      passage:
        'The reproducibility crisis in social psychology stems partly from publication bias, in which journals preferentially publish positive results, leaving null findings unpublished and distorting the cumulative evidence base.',
      prompt: 'What is the author\'s explanation for the reproducibility crisis in social psychology?',
      options: [
        'Researchers routinely apply incorrect statistical methods',
        'Journals favor positive results, hiding null findings from the field',
        'Social psychology receives insufficient research funding',
        'University ethics boards block replication study approvals',
      ],
      answer: 1,
    },
    {
      id: 'rh9',
      type: 'Read an Academic Passage',
      passage:
        'Remote work with full schedule autonomy increases productivity for creative tasks but reduces output in roles requiring real-time coordination and synchronous communication with teammates.',
      prompt: 'What does the passage suggest about fully autonomous remote work?',
      options: [
        'It universally improves productivity across all job types',
        'It benefits creative work while hindering coordination-dependent roles',
        'It increases job satisfaction without affecting performance',
        'It is equally effective across all professional sectors',
      ],
      answer: 1,
    },
    {
      id: 'rh10',
      type: 'Read an Academic Passage',
      passage:
        'Gentrification typically raises property values and improves physical infrastructure in urban neighborhoods while simultaneously displacing lower-income residents, creating a fundamental tension between economic revitalization and social equity.',
      prompt: 'How does the author characterize the process of gentrification?',
      options: [
        'As a uniformly positive force for economic development',
        'As an urban planning failure that produces no benefits',
        'As a process with economic benefits and significant social costs',
        'As a phenomenon driven primarily by government policy choices',
      ],
      answer: 2,
    },
    {
      id: 'rh11',
      type: 'Read an Academic Passage',
      passage:
        'Students in active learning classrooms, where traditional lectures are replaced with collaborative problem-solving and peer discussion, demonstrate deeper conceptual understanding but frequently rate the experience as more difficult and less satisfying than passive lecture formats.',
      prompt: 'What paradox does the passage describe regarding active learning classrooms?',
      options: [
        'Students learn more deeply but report lower satisfaction with the experience',
        'Student satisfaction improves while exam performance declines',
        'Active learning is effective only in science and mathematics subjects',
        'Students prefer technology-enabled active learning over discussion-based formats',
      ],
      answer: 0,
    },
    {
      id: 'rh12',
      type: 'Read an Academic Passage',
      passage:
        'Language models trained on internet text encode the demographic biases present in that data. Although post-hoc debiasing techniques can reduce surface-level disparities, they frequently fail to address deeper structural inequities embedded in the model\'s internal representations.',
      prompt: 'What does the author suggest about current AI debiasing methods?',
      options: [
        'They successfully eliminate all demographic bias from language models',
        'They reduce visible bias but often miss deeper structural inequities',
        'They are too costly for most AI organizations to implement',
        'They improve model performance across all demographic groups equally',
      ],
      answer: 1,
    },

    // ── NEW from PDF complete tests (rh13–rh32) ───────────────────
    // The Chemistry of Volcanoes (Complete Test 1, Q29–33)
    {
      id: 'rh13',
      type: 'Read an Academic Passage',
      passage:
        "Volcanoes are often viewed simply as sources of lava and ash, but they are also powerful chemical systems that shape Earth's atmosphere. When magma rises toward the surface, dissolved gases like water vapor, carbon dioxide, and sulfur dioxide escape, driving explosive eruptions. The balance among these gases largely determines how violent an eruption becomes.\n\nSulfur dioxide is of particular interest to scientists because it reacts with water vapor to form aerosols—tiny droplets that can reflect sunlight. After a major eruption, these aerosols may linger in the stratosphere for months or even years, slightly cooling Earth's surface. For example, the 1991 eruption of Mount Pinatubo in the Philippines lowered global temperatures by about half a degree Celsius for more than a year.\n\nNot all eruptions have the same impact. Small but frequent events release gases gradually, whereas massive eruptions can inject enormous quantities into the upper atmosphere almost instantly. The height at which gases are released determines whether their influence remains local or becomes global.\n\nVolcanic gases also interact with life at ground level. While sulfur dioxide can harm lungs and vegetation, volcanic soils enriched with minerals eventually foster fertile landscapes. This dual effect—destructive and regenerative—illustrates how volcanoes contribute both hazards and long-term ecological benefits.",
      prompt: 'The word "linger" in the passage is closest in meaning to',
      options: ['remain', 'disappear', 'expand', 'scatter'],
      answer: 0,
    },
    {
      id: 'rh14',
      type: 'Read an Academic Passage',
      passage:
        "Volcanoes are often viewed simply as sources of lava and ash, but they are also powerful chemical systems that shape Earth's atmosphere. When magma rises toward the surface, dissolved gases like water vapor, carbon dioxide, and sulfur dioxide escape, driving explosive eruptions. The balance among these gases largely determines how violent an eruption becomes.\n\nSulfur dioxide is of particular interest to scientists because it reacts with water vapor to form aerosols—tiny droplets that can reflect sunlight. After a major eruption, these aerosols may linger in the stratosphere for months or even years, slightly cooling Earth's surface. For example, the 1991 eruption of Mount Pinatubo in the Philippines lowered global temperatures by about half a degree Celsius for more than a year.\n\nNot all eruptions have the same impact. Small but frequent events release gases gradually, whereas massive eruptions can inject enormous quantities into the upper atmosphere almost instantly. The height at which gases are released determines whether their influence remains local or becomes global.\n\nVolcanic gases also interact with life at ground level. While sulfur dioxide can harm lungs and vegetation, volcanic soils enriched with minerals eventually foster fertile landscapes. This dual effect—destructive and regenerative—illustrates how volcanoes contribute both hazards and long-term ecological benefits.",
      prompt: 'According to the passage, what determines the strength of a volcanic eruption?',
      options: [
        'The temperature of the surrounding air',
        'The balance of gases within the magma',
        'The mineral content of volcanic soil',
        'The age of the volcano',
      ],
      answer: 1,
    },
    {
      id: 'rh15',
      type: 'Read an Academic Passage',
      passage:
        "Volcanoes are often viewed simply as sources of lava and ash, but they are also powerful chemical systems that shape Earth's atmosphere. When magma rises toward the surface, dissolved gases like water vapor, carbon dioxide, and sulfur dioxide escape, driving explosive eruptions. The balance among these gases largely determines how violent an eruption becomes.\n\nSulfur dioxide is of particular interest to scientists because it reacts with water vapor to form aerosols—tiny droplets that can reflect sunlight. After a major eruption, these aerosols may linger in the stratosphere for months or even years, slightly cooling Earth's surface. For example, the 1991 eruption of Mount Pinatubo in the Philippines lowered global temperatures by about half a degree Celsius for more than a year.\n\nNot all eruptions have the same impact. Small but frequent events release gases gradually, whereas massive eruptions can inject enormous quantities into the upper atmosphere almost instantly. The height at which gases are released determines whether their influence remains local or becomes global.\n\nVolcanic gases also interact with life at ground level. While sulfur dioxide can harm lungs and vegetation, volcanic soils enriched with minerals eventually foster fertile landscapes. This dual effect—destructive and regenerative—illustrates how volcanoes contribute both hazards and long-term ecological benefits.",
      prompt: 'Why does the author mention the 1991 eruption of Mount Pinatubo?',
      options: [
        'To describe how aerosols form in the lower atmosphere',
        'To show that eruptions produce identical cooling effects',
        'To argue that volcanic eruptions are becoming more frequent',
        'To provide an example of an eruption that affected global climate',
      ],
      answer: 3,
    },
    {
      id: 'rh16',
      type: 'Read an Academic Passage',
      passage:
        "Volcanoes are often viewed simply as sources of lava and ash, but they are also powerful chemical systems that shape Earth's atmosphere. When magma rises toward the surface, dissolved gases like water vapor, carbon dioxide, and sulfur dioxide escape, driving explosive eruptions. The balance among these gases largely determines how violent an eruption becomes.\n\nSulfur dioxide is of particular interest to scientists because it reacts with water vapor to form aerosols—tiny droplets that can reflect sunlight. After a major eruption, these aerosols may linger in the stratosphere for months or even years, slightly cooling Earth's surface. For example, the 1991 eruption of Mount Pinatubo in the Philippines lowered global temperatures by about half a degree Celsius for more than a year.\n\nNot all eruptions have the same impact. Small but frequent events release gases gradually, whereas massive eruptions can inject enormous quantities into the upper atmosphere almost instantly. The height at which gases are released determines whether their influence remains local or becomes global.\n\nVolcanic gases also interact with life at ground level. While sulfur dioxide can harm lungs and vegetation, volcanic soils enriched with minerals eventually foster fertile landscapes. This dual effect—destructive and regenerative—illustrates how volcanoes contribute both hazards and long-term ecological benefits.",
      prompt: 'What can be inferred about volcanic gases released at higher altitudes?',
      options: [
        "They remain near the volcano's crater.",
        'They can influence climate over a wider area.',
        'They lose their cooling effect more quickly.',
        'They cause more damage to vegetation.',
      ],
      answer: 1,
    },
    {
      id: 'rh17',
      type: 'Read an Academic Passage',
      passage:
        "Volcanoes are often viewed simply as sources of lava and ash, but they are also powerful chemical systems that shape Earth's atmosphere. When magma rises toward the surface, dissolved gases like water vapor, carbon dioxide, and sulfur dioxide escape, driving explosive eruptions. The balance among these gases largely determines how violent an eruption becomes.\n\nSulfur dioxide is of particular interest to scientists because it reacts with water vapor to form aerosols—tiny droplets that can reflect sunlight. After a major eruption, these aerosols may linger in the stratosphere for months or even years, slightly cooling Earth's surface. For example, the 1991 eruption of Mount Pinatubo in the Philippines lowered global temperatures by about half a degree Celsius for more than a year.\n\nNot all eruptions have the same impact. Small but frequent events release gases gradually, whereas massive eruptions can inject enormous quantities into the upper atmosphere almost instantly. The height at which gases are released determines whether their influence remains local or becomes global.\n\nVolcanic gases also interact with life at ground level. While sulfur dioxide can harm lungs and vegetation, volcanic soils enriched with minerals eventually foster fertile landscapes. This dual effect—destructive and regenerative—illustrates how volcanoes contribute both hazards and long-term ecological benefits.",
      prompt:
        'Where would the following sentence best fit in the passage?\n"The reaction these mixtures release into the atmosphere could have far-reaching effects."',
      options: [
        'After "...sulfur dioxide escape, driving explosive eruptions."',
        'After "...aerosols—tiny droplets that can reflect sunlight."',
        'After "...lowered global temperatures by about half a degree Celsius for more than a year."',
        'After "...volcanic soils enriched with minerals eventually foster fertile landscapes."',
      ],
      answer: 1,
    },

    // The Origins of Cooking (Complete Test 1, Q44–48)
    {
      id: 'rh18',
      type: 'Read an Academic Passage',
      passage:
        'Archaeological discoveries suggest that early humans began using fire for cooking hundreds of thousands of years ago. Charred bones and plant remains found near ancient hearths reveal that cooking was not just accidental but deliberate. Transforming raw food with heat altered its texture and flavor, making it easier to chew and digest. These changes had far-reaching effects, both biological and social.\n\nCooking made more calories available from the same ingredients, which may have helped fuel the growth of the human brain. Meals prepared around a shared fire also encouraged cooperation and communication. Anthropologists argue that these gatherings became centers for storytelling and teaching, giving rise to more complex social relationships. In this sense, cooking may have been as much about community as nutrition.\n\nToday, the practice still connects people. Whether in family kitchens or public festivals, cooking expresses culture and identity. The origins of this activity remind us that a basic human need evolved into a defining social ritual, one that continues to shape how societies organize daily life and celebrate shared experiences.',
      prompt: 'What can be inferred about the social importance of cooking?',
      options: [
        'It led to the decline of group interaction around fires',
        'It replaced hunting as the main form of cooperation',
        'It discouraged the sharing of resources',
        'It encouraged the development of spoken language',
      ],
      answer: 3,
    },
    {
      id: 'rh19',
      type: 'Read an Academic Passage',
      passage:
        'Archaeological discoveries suggest that early humans began using fire for cooking hundreds of thousands of years ago. Charred bones and plant remains found near ancient hearths reveal that cooking was not just accidental but deliberate. Transforming raw food with heat altered its texture and flavor, making it easier to chew and digest. These changes had far-reaching effects, both biological and social.\n\nCooking made more calories available from the same ingredients, which may have helped fuel the growth of the human brain. Meals prepared around a shared fire also encouraged cooperation and communication. Anthropologists argue that these gatherings became centers for storytelling and teaching, giving rise to more complex social relationships. In this sense, cooking may have been as much about community as nutrition.\n\nToday, the practice still connects people. Whether in family kitchens or public festivals, cooking expresses culture and identity. The origins of this activity remind us that a basic human need evolved into a defining social ritual, one that continues to shape how societies organize daily life and celebrate shared experiences.',
      prompt: 'The word "deliberate" in the passage is closest in meaning to',
      options: ['surprising', 'rare', 'intentional', 'cautious'],
      answer: 2,
    },
    {
      id: 'rh20',
      type: 'Read an Academic Passage',
      passage:
        'Archaeological discoveries suggest that early humans began using fire for cooking hundreds of thousands of years ago. Charred bones and plant remains found near ancient hearths reveal that cooking was not just accidental but deliberate. Transforming raw food with heat altered its texture and flavor, making it easier to chew and digest. These changes had far-reaching effects, both biological and social.\n\nCooking made more calories available from the same ingredients, which may have helped fuel the growth of the human brain. Meals prepared around a shared fire also encouraged cooperation and communication. Anthropologists argue that these gatherings became centers for storytelling and teaching, giving rise to more complex social relationships. In this sense, cooking may have been as much about community as nutrition.\n\nToday, the practice still connects people. Whether in family kitchens or public festivals, cooking expresses culture and identity. The origins of this activity remind us that a basic human need evolved into a defining social ritual, one that continues to shape how societies organize daily life and celebrate shared experiences.',
      prompt: 'According to the passage, what benefit did cooking provide for early humans?',
      options: [
        'It reduced the need for hunting large animals',
        'It increased the amount of energy gained from food',
        'It allowed humans to be more biologically efficient',
        'It protected food from contamination through ash and smoke',
      ],
      answer: 1,
    },
    {
      id: 'rh21',
      type: 'Read an Academic Passage',
      passage:
        'Archaeological discoveries suggest that early humans began using fire for cooking hundreds of thousands of years ago. Charred bones and plant remains found near ancient hearths reveal that cooking was not just accidental but deliberate. Transforming raw food with heat altered its texture and flavor, making it easier to chew and digest. These changes had far-reaching effects, both biological and social.\n\nCooking made more calories available from the same ingredients, which may have helped fuel the growth of the human brain. Meals prepared around a shared fire also encouraged cooperation and communication. Anthropologists argue that these gatherings became centers for storytelling and teaching, giving rise to more complex social relationships. In this sense, cooking may have been as much about community as nutrition.\n\nToday, the practice still connects people. Whether in family kitchens or public festivals, cooking expresses culture and identity. The origins of this activity remind us that a basic human need evolved into a defining social ritual, one that continues to shape how societies organize daily life and celebrate shared experiences.',
      prompt: 'What is the relationship between paragraphs 2 and 3?',
      options: [
        'Paragraph 3 connects the historical role of cooking to its modern cultural meaning',
        'Paragraph 3 introduces new archaeological evidence supporting earlier claims',
        'Paragraph 3 challenges the scientific explanation of brain growth',
        'Paragraph 3 provides a counterexample to the social theory in paragraph 2',
      ],
      answer: 0,
    },
    {
      id: 'rh22',
      type: 'Read an Academic Passage',
      passage:
        'Archaeological discoveries suggest that early humans began using fire for cooking hundreds of thousands of years ago. Charred bones and plant remains found near ancient hearths reveal that cooking was not just accidental but deliberate. Transforming raw food with heat altered its texture and flavor, making it easier to chew and digest. These changes had far-reaching effects, both biological and social.\n\nCooking made more calories available from the same ingredients, which may have helped fuel the growth of the human brain. Meals prepared around a shared fire also encouraged cooperation and communication. Anthropologists argue that these gatherings became centers for storytelling and teaching, giving rise to more complex social relationships. In this sense, cooking may have been as much about community as nutrition.\n\nToday, the practice still connects people. Whether in family kitchens or public festivals, cooking expresses culture and identity. The origins of this activity remind us that a basic human need evolved into a defining social ritual, one that continues to shape how societies organize daily life and celebrate shared experiences.',
      prompt: 'All of the following are mentioned in the passage as results of cooking EXCEPT',
      options: [
        'The strengthening of community bonds',
        'The emergence of teaching and storytelling',
        'The decline of cooperation among groups',
        'The expansion of human caloric intake',
      ],
      answer: 2,
    },

    // Arctic Sea Ice and Global Climate (Complete Test 2, Q16–20)
    {
      id: 'rh23',
      type: 'Read an Academic Passage',
      passage:
        'Arctic sea ice forms when ocean water freezes during winter and partially melts each summer. Over the past few decades, satellite observations have revealed a consistent decline in both the area and thickness of this ice. Scientists consider these measurements an important indicator of global climate change.\n\nWhen sea ice melts, the darker ocean surface beneath it absorbs more sunlight, leading to additional warming—a process known as the ice-albedo feedback. This effect not only accelerates melting but also influences weather patterns far beyond the Arctic. Researchers have linked declining ice cover to shifts in jet streams and more extreme weather in temperate regions.\n\nMelting sea ice also affects marine life. Species such as polar bears and seals depend on stable ice platforms for hunting and breeding. As these platforms disappear, animals must travel farther to find food, and survival rates drop. Indigenous communities that rely on sea ice for travel and hunting face similar challenges as their traditional routes become unsafe.\n\nScientists are monitoring seasonal cycles to understand how long-term warming might alter global ocean currents. Small changes in these currents can disrupt ecosystems and even affect rainfall patterns worldwide.',
      prompt: 'The word "indicator" in the passage is closest in meaning to',
      options: ['reaction', 'barrier', 'replacement', 'sign'],
      answer: 3,
    },
    {
      id: 'rh24',
      type: 'Read an Academic Passage',
      passage:
        'Arctic sea ice forms when ocean water freezes during winter and partially melts each summer. Over the past few decades, satellite observations have revealed a consistent decline in both the area and thickness of this ice. Scientists consider these measurements an important indicator of global climate change.\n\nWhen sea ice melts, the darker ocean surface beneath it absorbs more sunlight, leading to additional warming—a process known as the ice-albedo feedback. This effect not only accelerates melting but also influences weather patterns far beyond the Arctic. Researchers have linked declining ice cover to shifts in jet streams and more extreme weather in temperate regions.\n\nMelting sea ice also affects marine life. Species such as polar bears and seals depend on stable ice platforms for hunting and breeding. As these platforms disappear, animals must travel farther to find food, and survival rates drop. Indigenous communities that rely on sea ice for travel and hunting face similar challenges as their traditional routes become unsafe.\n\nScientists are monitoring seasonal cycles to understand how long-term warming might alter global ocean currents. Small changes in these currents can disrupt ecosystems and even affect rainfall patterns worldwide.',
      prompt: 'According to the passage, what happens when the ocean surface is exposed after sea ice melts?',
      options: [
        'It reflects more sunlight back into space.',
        'It absorbs more heat, leading to further warming.',
        'It freezes again more rapidly the next season.',
        'It reduces the amount of global precipitation.',
      ],
      answer: 1,
    },
    {
      id: 'rh25',
      type: 'Read an Academic Passage',
      passage:
        'Arctic sea ice forms when ocean water freezes during winter and partially melts each summer. Over the past few decades, satellite observations have revealed a consistent decline in both the area and thickness of this ice. Scientists consider these measurements an important indicator of global climate change.\n\nWhen sea ice melts, the darker ocean surface beneath it absorbs more sunlight, leading to additional warming—a process known as the ice-albedo feedback. This effect not only accelerates melting but also influences weather patterns far beyond the Arctic. Researchers have linked declining ice cover to shifts in jet streams and more extreme weather in temperate regions.\n\nMelting sea ice also affects marine life. Species such as polar bears and seals depend on stable ice platforms for hunting and breeding. As these platforms disappear, animals must travel farther to find food, and survival rates drop. Indigenous communities that rely on sea ice for travel and hunting face similar challenges as their traditional routes become unsafe.\n\nScientists are monitoring seasonal cycles to understand how long-term warming might alter global ocean currents. Small changes in these currents can disrupt ecosystems and even affect rainfall patterns worldwide.',
      prompt: 'Why does the author mention polar bears and seals?',
      options: [
        'To demonstrate how melting sea ice threatens Arctic wildlife',
        'To suggest that marine mammals adapt easily to warmer water',
        'To explain how scientists measure sea-ice decline',
        'To compare different breeding habits among Arctic species',
      ],
      answer: 0,
    },
    {
      id: 'rh26',
      type: 'Read an Academic Passage',
      passage:
        'Arctic sea ice forms when ocean water freezes during winter and partially melts each summer. Over the past few decades, satellite observations have revealed a consistent decline in both the area and thickness of this ice. Scientists consider these measurements an important indicator of global climate change.\n\nWhen sea ice melts, the darker ocean surface beneath it absorbs more sunlight, leading to additional warming—a process known as the ice-albedo feedback. This effect not only accelerates melting but also influences weather patterns far beyond the Arctic. Researchers have linked declining ice cover to shifts in jet streams and more extreme weather in temperate regions.\n\nMelting sea ice also affects marine life. Species such as polar bears and seals depend on stable ice platforms for hunting and breeding. As these platforms disappear, animals must travel farther to find food, and survival rates drop. Indigenous communities that rely on sea ice for travel and hunting face similar challenges as their traditional routes become unsafe.\n\nScientists are monitoring seasonal cycles to understand how long-term warming might alter global ocean currents. Small changes in these currents can disrupt ecosystems and even affect rainfall patterns worldwide.',
      prompt: 'Which sentence from the passage best explains how changes in ocean currents could have global consequences?',
      options: [
        'As these platforms disappear, animals must travel farther to find food, and survival rates drop.',
        'Indigenous communities that rely on sea ice for travel and hunting face similar challenges as their traditional routes become unsafe.',
        'Scientists are monitoring seasonal cycles to understand how long-term warming might alter global ocean currents.',
        'Small changes in these currents can disrupt ecosystems and even affect rainfall patterns worldwide.',
      ],
      answer: 3,
    },
    {
      id: 'rh27',
      type: 'Read an Academic Passage',
      passage:
        'Arctic sea ice forms when ocean water freezes during winter and partially melts each summer. Over the past few decades, satellite observations have revealed a consistent decline in both the area and thickness of this ice. Scientists consider these measurements an important indicator of global climate change.\n\nWhen sea ice melts, the darker ocean surface beneath it absorbs more sunlight, leading to additional warming—a process known as the ice-albedo feedback. This effect not only accelerates melting but also influences weather patterns far beyond the Arctic. Researchers have linked declining ice cover to shifts in jet streams and more extreme weather in temperate regions.\n\nMelting sea ice also affects marine life. Species such as polar bears and seals depend on stable ice platforms for hunting and breeding. As these platforms disappear, animals must travel farther to find food, and survival rates drop. Indigenous communities that rely on sea ice for travel and hunting face similar challenges as their traditional routes become unsafe.\n\nScientists are monitoring seasonal cycles to understand how long-term warming might alter global ocean currents. Small changes in these currents can disrupt ecosystems and even affect rainfall patterns worldwide.',
      prompt: 'What can be inferred about the ice-albedo feedback?',
      options: [
        'It helps regulate rainfall patterns.',
        'It slows down the process of climate change.',
        'It can intensify global warming once melting begins.',
        'It occurs only in tropical regions.',
      ],
      answer: 2,
    },

    // The Expansion of the Printing Press (Complete Test 2, Q31–35)
    {
      id: 'rh28',
      type: 'Read an Academic Passage',
      passage:
        'When Johannes Gutenberg introduced movable-type printing in the mid-1400s, few realized how dramatically it would reshape Europe. His invention made it possible to reproduce texts faster and at a fraction of the cost of hand-copied manuscripts. Within decades, presses appeared in dozens of cities, turning what had once been rare into something nearly commonplace.\n\nEarly printers produced religious works such as Bibles and prayer books, but soon moved on to scientific and literary texts. The spread of printed material accelerated the exchange of ideas, allowing scholars to challenge accepted beliefs. This new accessibility to knowledge fueled movements like the Renaissance and the Reformation.\n\nNot everyone welcomed the change. Religious and political authorities worried that printing could spread dissenting views. As a result, governments introduced censorship laws, sometimes banning specific books or requiring printers to obtain official licenses. Despite these restrictions, presses continued to multiply, and literacy rates rose steadily. By the seventeenth century, printing had become central to education and public debate. The technology not only preserved information but also democratized it, laying the foundation for modern journalism and mass communication.',
      prompt: 'What is the main idea of the passage?',
      options: [
        "Gutenberg's invention transformed how information spread in Europe.",
        'Printing presses replaced handwritten manuscripts overnight.',
        'Governments supported the expansion of printing.',
        'Religious works were the only materials produced by early printers.',
      ],
      answer: 0,
    },
    {
      id: 'rh29',
      type: 'Read an Academic Passage',
      passage:
        'When Johannes Gutenberg introduced movable-type printing in the mid-1400s, few realized how dramatically it would reshape Europe. His invention made it possible to reproduce texts faster and at a fraction of the cost of hand-copied manuscripts. Within decades, presses appeared in dozens of cities, turning what had once been rare into something nearly commonplace.\n\nEarly printers produced religious works such as Bibles and prayer books, but soon moved on to scientific and literary texts. The spread of printed material accelerated the exchange of ideas, allowing scholars to challenge accepted beliefs. This new accessibility to knowledge fueled movements like the Renaissance and the Reformation.\n\nNot everyone welcomed the change. Religious and political authorities worried that printing could spread dissenting views. As a result, governments introduced censorship laws, sometimes banning specific books or requiring printers to obtain official licenses. Despite these restrictions, presses continued to multiply, and literacy rates rose steadily. By the seventeenth century, printing had become central to education and public debate. The technology not only preserved information but also democratized it, laying the foundation for modern journalism and mass communication.',
      prompt: 'The word "accelerated" in the passage is closest in meaning to',
      options: ['delayed', 'limited', 'increased', 'supported'],
      answer: 2,
    },
    {
      id: 'rh30',
      type: 'Read an Academic Passage',
      passage:
        'When Johannes Gutenberg introduced movable-type printing in the mid-1400s, few realized how dramatically it would reshape Europe. His invention made it possible to reproduce texts faster and at a fraction of the cost of hand-copied manuscripts. Within decades, presses appeared in dozens of cities, turning what had once been rare into something nearly commonplace.\n\nEarly printers produced religious works such as Bibles and prayer books, but soon moved on to scientific and literary texts. The spread of printed material accelerated the exchange of ideas, allowing scholars to challenge accepted beliefs. This new accessibility to knowledge fueled movements like the Renaissance and the Reformation.\n\nNot everyone welcomed the change. Religious and political authorities worried that printing could spread dissenting views. As a result, governments introduced censorship laws, sometimes banning specific books or requiring printers to obtain official licenses. Despite these restrictions, presses continued to multiply, and literacy rates rose steadily. By the seventeenth century, printing had become central to education and public debate. The technology not only preserved information but also democratized it, laying the foundation for modern journalism and mass communication.',
      prompt: 'What can be inferred about literacy during the period described?',
      options: [
        'It improved partly because printed texts became more available.',
        'It declined due to widespread censorship from authority figures.',
        'It was limited to government officials and people in powerful positions.',
        'It was used mostly for religious education.',
      ],
      answer: 0,
    },
    {
      id: 'rh31',
      type: 'Read an Academic Passage',
      passage:
        'When Johannes Gutenberg introduced movable-type printing in the mid-1400s, few realized how dramatically it would reshape Europe. His invention made it possible to reproduce texts faster and at a fraction of the cost of hand-copied manuscripts. Within decades, presses appeared in dozens of cities, turning what had once been rare into something nearly commonplace.\n\nEarly printers produced religious works such as Bibles and prayer books, but soon moved on to scientific and literary texts. The spread of printed material accelerated the exchange of ideas, allowing scholars to challenge accepted beliefs. This new accessibility to knowledge fueled movements like the Renaissance and the Reformation.\n\nNot everyone welcomed the change. Religious and political authorities worried that printing could spread dissenting views. As a result, governments introduced censorship laws, sometimes banning specific books or requiring printers to obtain official licenses. Despite these restrictions, presses continued to multiply, and literacy rates rose steadily. By the seventeenth century, printing had become central to education and public debate. The technology not only preserved information but also democratized it, laying the foundation for modern journalism and mass communication.',
      prompt:
        'Where would the following sentence best fit in the passage?\n"This rapid spread created a network of printers who started producing what was most in demand at the time: religious texts."',
      options: [
        'After "...reproduce texts faster and at a fraction of the cost of hand-copied manuscripts."',
        'After "...turning what had once been rare into something nearly commonplace."',
        'After "...but soon moved on to scientific and literary texts."',
        'After "...allowing scholars to challenge accepted beliefs."',
      ],
      answer: 1,
    },
    {
      id: 'rh32',
      type: 'Read an Academic Passage',
      passage:
        'When Johannes Gutenberg introduced movable-type printing in the mid-1400s, few realized how dramatically it would reshape Europe. His invention made it possible to reproduce texts faster and at a fraction of the cost of hand-copied manuscripts. Within decades, presses appeared in dozens of cities, turning what had once been rare into something nearly commonplace.\n\nEarly printers produced religious works such as Bibles and prayer books, but soon moved on to scientific and literary texts. The spread of printed material accelerated the exchange of ideas, allowing scholars to challenge accepted beliefs. This new accessibility to knowledge fueled movements like the Renaissance and the Reformation.\n\nNot everyone welcomed the change. Religious and political authorities worried that printing could spread dissenting views. As a result, governments introduced censorship laws, sometimes banning specific books or requiring printers to obtain official licenses. Despite these restrictions, presses continued to multiply, and literacy rates rose steadily. By the seventeenth century, printing had become central to education and public debate. The technology not only preserved information but also democratized it, laying the foundation for modern journalism and mass communication.',
      prompt: 'All of the following are true about the impact of printing EXCEPT',
      options: [
        'It encouraged the exchange of knowledge among scholars.',
        'It contributed to major cultural movements like the Renaissance.',
        'It ended government control of information.',
        'It made books more widely accessible.',
      ],
      answer: 2,
    },
  ],
}
