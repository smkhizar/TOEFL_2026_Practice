// 2026 TOEFL Writing — 13 tasks
// Build a Sentence (3): arrange phrase CHUNKS into the correct sentence, 2 minutes each
// Write an Email (5): include 3 mandatory bullet points, 7 minutes (420 sec), 80+ words
// Academic Discussion (5): class discussion board posts, 10 minutes (600 sec), 100+ words

export const writingTasks = [
  // ── Build a Sentence (3) ──────────────────────────────────────
  // chunks = correct order of phrase chunks; user arranges them by clicking
  {
    id: 'w1',
    type: 'Build a Sentence',
    chunks: ['Students should', 'review their notes', 'on a daily basis'],
    correct: 'Students should review their notes on a daily basis.',
    sample: 'Students should review their notes on a daily basis.',
    minWords: 8,
    time: 120,
  },
  {
    id: 'w2',
    type: 'Build a Sentence',
    chunks: ['The professor', 'canceled the morning lecture', 'due to a family emergency'],
    correct: 'The professor canceled the morning lecture due to a family emergency.',
    sample: 'The professor canceled the morning lecture due to a family emergency.',
    minWords: 10,
    time: 120,
  },
  {
    id: 'w3',
    type: 'Build a Sentence',
    chunks: ['International students', 'must register for orientation', 'by the end of Friday'],
    correct: 'International students must register for orientation by the end of Friday.',
    sample: 'International students must register for orientation by the end of Friday.',
    minWords: 11,
    time: 120,
  },

  // ── Write an Email (5) ────────────────────────────────────────
  // Each email has a scenario, recipient, register (formal/semi-formal), and 3 required bullet points
  {
    id: 'w4',
    type: 'Write an Email',
    scenario:
      'You have a mandatory lab session that conflicts with your scheduled class presentation.',
    recipient: 'Your professor',
    register: 'formal',
    bulletPoints: [
      'State the scheduling conflict clearly (lab session vs. presentation)',
      'Propose a specific alternative date and time for your presentation',
      'Apologize for any inconvenience caused',
    ],
    prompt:
      'Write an email to your professor requesting a reschedule for your class presentation. You must address all three points above.',
    sample:
      'Dear Professor,\n\nI am writing to request a change to my presentation time scheduled for this Thursday at 2 PM. Unfortunately, I have a mandatory laboratory session that I cannot miss, as it accounts for part of my lab grade.\n\nWould it be possible to present on Friday afternoon instead? I am available from 1 PM to 4 PM. I sincerely apologize for any inconvenience this may cause and I am happy to adjust to any alternative time that works for you.\n\nThank you very much for your understanding.\n\nBest regards,\n[Your Name]',
    minWords: 80,
    time: 420,
  },
  {
    id: 'w5',
    type: 'Write an Email',
    scenario:
      'You reserved Study Room 14 in the campus library, but when you arrived another group was already using it. The reservation system had double-booked the room.',
    recipient: 'The library office',
    register: 'formal',
    bulletPoints: [
      'Describe the double-booking problem and when it occurred',
      'Explain the impact it had on your plans',
      'Request a solution or compensation (e.g., priority booking or alternative room)',
    ],
    prompt:
      'Write an email to the library office reporting the double-booking issue. You must address all three points above.',
    sample:
      'Dear Library Team,\n\nI am writing to report a booking issue I experienced today. I had reserved Study Room 14 from 3 PM to 5 PM via the online reservation system, but when I arrived the room was already occupied by another group who also had a valid booking for the same time slot.\n\nThis appears to be a system error that double-booked the room. As a result, my group was unable to complete our project work as planned. I would appreciate it if you could investigate this issue and either provide an alternative room or credit my account for a future booking.\n\nThank you for your assistance.\n\nBest regards,\n[Your Name]',
    minWords: 80,
    time: 420,
  },
  {
    id: 'w6',
    type: 'Write an Email',
    scenario: 'You want to meet with your academic advisor to plan your courses for next semester.',
    recipient: 'Your academic advisor',
    register: 'formal',
    bulletPoints: [
      'State the reason for requesting a meeting',
      'Mention two specific topics you want to discuss',
      'Suggest two or more times you are available',
    ],
    prompt:
      'Write an email to your academic advisor requesting a meeting. You must address all three points above.',
    sample:
      'Dear Advisor,\n\nI hope this message finds you well. I am writing to request a meeting to discuss my course plan for next semester. There are two main topics I would like your guidance on.\n\nFirst, I am unsure whether to take the advanced research methods course or wait until my final year. Second, I would like advice on fulfilling my remaining general education requirements while also progressing in my major.\n\nWould it be possible to meet sometime next week? I am available Monday through Thursday after 1 PM.\n\nThank you.\n\nBest regards,\n[Your Name]',
    minWords: 80,
    time: 420,
  },
  {
    id: 'w7',
    type: 'Write an Email',
    scenario: 'You are interested in joining the campus Environmental Action Club.',
    recipient: 'The club president',
    register: 'semi-formal',
    bulletPoints: [
      'Introduce yourself and explain your interest in the club',
      'Describe one specific skill or experience you can contribute',
      'Ask how to officially apply for membership',
    ],
    prompt:
      'Write an email to the Environmental Action Club president applying to join. You must address all three points above.',
    sample:
      'Dear Club President,\n\nMy name is [Name] and I am a second-year Environmental Science student. I am writing to express my interest in joining the Environmental Action Club.\n\nI became interested after attending your recent campus clean-up event, which I found both inspiring and well-organized. I have experience organizing community events through my high school\'s sustainability committee, and I would be happy to contribute to any upcoming projects.\n\nPlease let me know how I can officially apply for membership. Thank you for your time.\n\nBest regards,\n[Your Name]',
    minWords: 80,
    time: 420,
  },
  {
    id: 'w8',
    type: 'Write an Email',
    scenario:
      'You are having a serious conflict with your roommate that is affecting your ability to study.',
    recipient: 'The dormitory housing office',
    register: 'formal',
    bulletPoints: [
      'Briefly describe the conflict and how it affects your studies',
      'Explain that you have already attempted to resolve it directly',
      'Request a specific type of room transfer solution',
    ],
    prompt:
      'Write an email to the housing office requesting a room transfer. You must address all three points above.',
    sample:
      'Dear Housing Office,\n\nI am writing to formally request a room transfer from my current room in Residence Hall B, Room 214. Over the past several weeks, I have been experiencing a significant conflict with my roommate regarding noise levels during study hours, which has seriously impacted my academic performance.\n\nI have already tried to resolve the situation directly, but we have not been able to reach a workable agreement.\n\nI am open to any available single room or a placement with a roommate who has similar study habits. I would greatly appreciate your assistance in finding a solution as soon as possible.\n\nThank you for your consideration.\n\nBest regards,\n[Your Name]',
    minWords: 80,
    time: 420,
  },

  // ── Academic Discussion (5) ───────────────────────────────────
  {
    id: 'w9',
    type: 'Academic Discussion',
    prompt:
      'Your professor asks: "How can universities increase student participation in sustainability initiatives on campus? Share your perspective."',
    context:
      'Class: Environmental Studies 201. Two classmates have already posted. Alex argues for mandatory sustainability modules in all degree programs. Maria prefers a voluntary incentive system with rewards for participation.',
    sample:
      'I believe a combination of incentives and awareness is more effective than mandatory requirements. While mandatory participation ensures coverage, it can generate resentment rather than genuine engagement. A points-based incentive system — where students earn benefits such as priority course registration or dining credits for participating in sustainability activities — is more likely to create lasting behavioral change. Universities should also make these initiatives highly visible and socially rewarding through events and recognition programs. The goal should be to make sustainable behavior feel like a natural part of campus culture, not an obligation.',
    minWords: 100,
    time: 600,
  },
  {
    id: 'w10',
    type: 'Academic Discussion',
    prompt:
      'Your professor asks: "Should attendance in large lecture courses be factored into students\' final grades? Why or why not?"',
    context:
      'Class: Education Policy 301. The discussion thread reflects a split: Jordan argues attendance accountability motivates students and fosters community; Sam argues grading attendance punishes students with legitimate barriers such as work or family obligations.',
    sample:
      'I think attendance should be considered in grading, but with important flexibility built in. Regular class attendance encourages students to engage with material in real time and develop professional habits. However, penalizing students without recognizing legitimate barriers is inequitable. A fair approach might allow a limited number of excused absences while requiring students who miss class to complete alternative engagement tasks, such as watching recorded lectures and submitting reflection responses. This balances accountability with compassion.',
    minWords: 100,
    time: 600,
  },
  {
    id: 'w11',
    type: 'Academic Discussion',
    prompt:
      'Your professor asks: "Is it better for students to work part-time during their studies, or should they focus entirely on academics?"',
    context:
      'Class: Career Development 202. Lisa says part-time work builds real-world skills and financial independence. Kai argues it consistently reduces GPA and increases dropout risk based on research studies.',
    sample:
      'I think the answer depends on the number of hours and the type of work. Research does show that working more than 15 hours per week is associated with lower academic performance, but a moderate part-time job — particularly one related to a student\'s field of study — can provide valuable practical experience and professional connections. Students who take work-study positions in their field often graduate with both a degree and relevant experience. Universities should help students find these strategic opportunities rather than discouraging work altogether.',
    minWords: 100,
    time: 600,
  },
  {
    id: 'w12',
    type: 'Academic Discussion',
    prompt:
      'Your professor asks: "What is one significant way that artificial intelligence will change higher education in the next decade? Explain your reasoning."',
    context:
      'Class: Technology and Society 101. Previous posts show a split: one student emphasizes AI-powered personalized learning tools; another raises concerns about academic integrity and over-reliance on AI tools.',
    sample:
      'I believe the most significant change will be in how academic work is assessed, not just how it is completed. As AI tools become capable of producing high-quality written content, universities will need to shift assessment methods dramatically — moving away from take-home essays and toward oral defenses, in-class writing, and project-based demonstrations of understanding. This will actually improve the quality of education by requiring students to demonstrate genuine comprehension. Institutions that invest in this transition early will produce graduates who are authentically capable and competitive.',
    minWords: 100,
    time: 600,
  },
  {
    id: 'w13',
    type: 'Academic Discussion',
    prompt:
      'Your professor asks: "Should universities require all students to take at least one course outside their major field of study? Why or why not?"',
    context:
      'Class: Curriculum Design 401. Maya argues cross-disciplinary courses build critical thinking and make graduates more adaptable. David argues they waste time for students in highly specialized technical fields.',
    sample:
      'I strongly believe that cross-disciplinary requirements benefit students across all fields, including technical disciplines. Exposure to different ways of thinking — whether through a humanities course for an engineering student or a science course for a literature major — builds cognitive flexibility that is increasingly valued by employers. Many of today\'s most important problems require perspectives from multiple fields to solve effectively. A single well-chosen course outside one\'s major can open doors to unexpected intellectual connections and career pathways.',
    minWords: 100,
    time: 600,
  },

  // ── NEW from PDF materials ────────────────────────────────────────
  // Build a Sentence (4 new: w14–w17)
  {
    id: 'w14',
    type: 'Build a Sentence',
    chunks: ['I promised him', 'to send a replacement', 'by the end of the day'],
    correct: 'I promised him to send a replacement by the end of the day.',
    sample: 'I promised him to send a replacement by the end of the day.',
    minWords: 12,
    time: 120,
  },
  {
    id: 'w15',
    type: 'Build a Sentence',
    chunks: ['She wanted', 'to give students another chance', 'to practice formal writing'],
    correct: 'She wanted to give students another chance to practice formal writing.',
    sample: 'She wanted to give students another chance to practice formal writing.',
    minWords: 11,
    time: 120,
  },
  {
    id: 'w16',
    type: 'Build a Sentence',
    chunks: ['Do you remember', 'what topic', 'the lecture will cover'],
    correct: 'Do you remember what topic the lecture will cover?',
    sample: 'Do you remember what topic the lecture will cover?',
    minWords: 9,
    time: 120,
  },
  {
    id: 'w17',
    type: 'Build a Sentence',
    chunks: ['It will start', 'after everyone completes', 'the registration process'],
    correct: 'It will start after everyone completes the registration process.',
    sample: 'It will start after everyone completes the registration process.',
    minWords: 10,
    time: 120,
  },

  // Write an Email (5 new: w18–w22)
  {
    id: 'w18',
    type: 'Write an Email',
    scenario:
      'You are renting an apartment and have noticed several maintenance problems that need to be fixed urgently.',
    recipient: 'Mr. Hill, your landlord',
    register: 'formal',
    bulletPoints: [
      'Describe the maintenance issues you have noticed',
      'Explain how these issues are affecting your daily life',
      'Request that repairs be completed as soon as possible',
    ],
    prompt:
      'Write an email to your landlord requesting maintenance repairs. You must address all three points above.',
    sample:
      "Dear Mr. Hill,\n\nI am writing to bring several maintenance issues in my apartment to your attention. Over the past week, I have noticed that the kitchen faucet is leaking constantly, the bedroom window no longer closes properly, and there is a problem with the heating system.\n\nThese issues are significantly affecting my daily life. The leaking faucet is wasting water and creating noise at night, while the broken window is letting in cold air, making it difficult to keep the apartment warm. The heating issue is particularly concerning as temperatures drop.\n\nI kindly request that repairs be arranged as soon as possible. I am available on weekday mornings for a technician to visit. Thank you for your prompt attention to this matter.\n\nBest regards,\n[Your Name]",
    minWords: 80,
    time: 420,
  },
  {
    id: 'w19',
    type: 'Write an Email',
    scenario:
      'You are organizing a charity event to raise funds for a local shelter and would like a local business owner to support it.',
    recipient: 'Drew Houghton, a local business owner',
    register: 'formal',
    bulletPoints: [
      'Introduce yourself and explain the purpose of the charity event',
      'Describe how a donation would benefit the cause',
      'Invite the recipient to participate and provide your contact details',
    ],
    prompt:
      'Write an email to a local business owner requesting support for your charity event. You must address all three points above.',
    sample:
      'Dear Mr. Houghton,\n\nMy name is [Your Name], and I am a volunteer coordinator for the Riverside Community Support Network. I am writing to invite you to support our upcoming charity fundraiser on November 15, which aims to raise funds for the Riverside Family Shelter.\n\nYour donation, whether financial or in the form of goods or services, would directly help provide meals and emergency supplies for over 100 families in need this winter. Donors will be recognized in our event program and on our social media channels, which reach more than 3,000 local followers.\n\nI would be delighted to discuss this opportunity further. Please feel free to contact me at [email] or [phone number]. I hope we can count on your generous support.\n\nSincerely,\n[Your Name]',
    minWords: 80,
    time: 420,
  },
  {
    id: 'w20',
    type: 'Write an Email',
    scenario:
      'You are enrolled in an online course and are experiencing technical problems that are preventing you from accessing the course materials.',
    recipient: 'Dr. Lin, your online course instructor',
    register: 'formal',
    bulletPoints: [
      'Describe the technical problems you are experiencing',
      'Explain how these problems have affected your learning',
      'Ask what you should do to complete the affected part of the course',
    ],
    prompt:
      'Write an email to your instructor about technical issues with your online course. You must address all three points above.',
    sample:
      'Dear Dr. Lin,\n\nI am writing to inform you of a technical issue I have been experiencing with the online course portal. Since last Tuesday, I have been unable to access the video lectures in Module 3, and the discussion board also fails to load when I try to participate in the weekly forum.\n\nAs a result, I have fallen behind on the required viewing and have not been able to contribute to the class discussions, which I understand count toward the participation grade. I am concerned this may affect my overall standing in the course.\n\nCould you please advise me on how I should proceed? I am happy to complete any alternative tasks or submit written summaries of the topics covered. I have already contacted technical support but have not yet received a response.\n\nThank you for your understanding.\n\nBest regards,\n[Your Name]',
    minWords: 80,
    time: 420,
  },
  {
    id: 'w21',
    type: 'Write an Email',
    scenario:
      'You are a volunteer coordinator and have realized that the scheduled neighborhood cleanup event conflicts with another important commitment.',
    recipient: 'Sarah, the event organizer',
    register: 'semi-formal',
    bulletPoints: [
      'Explain the scheduling conflict you have encountered',
      'Suggest a new date or time for the event',
      'Offer to help with the event in another way if needed',
    ],
    prompt:
      'Write an email to the event organizer suggesting a reschedule for the cleanup event. You must address all three points above.',
    sample:
      "Dear Sarah,\n\nI hope this message finds you well. I am writing because I have just realized that the neighborhood cleanup event on Saturday conflicts with a family commitment I cannot reschedule. I sincerely apologize for the late notice.\n\nWould it be possible to move the event to the following Saturday, October 19? Based on the weather forecast, conditions should be ideal, and I believe most volunteers would be available. Alternatively, Sunday morning could also work well.\n\nI remain fully committed to supporting this initiative. In the meantime, I would be happy to contact other volunteers to confirm their availability for the new date, or to help with any advance preparation this week.\n\nThank you for your understanding, and I look forward to hearing from you.\n\nBest wishes,\n[Your Name]",
    minWords: 80,
    time: 420,
  },
  {
    id: 'w22',
    type: 'Write an Email',
    scenario:
      'You recently stayed at a friend\'s home while visiting their city and would like to thank them for their hospitality.',
    recipient: 'Oliver, your friend',
    register: 'semi-formal',
    bulletPoints: [
      'Thank your friend for letting you stay at their home',
      'Mention what you enjoyed most about the visit',
      'Invite your friend to visit your city in the future',
    ],
    prompt:
      'Write a thank-you email to your friend after staying at their home. You must address all three points above.',
    sample:
      "Dear Oliver,\n\nI just wanted to write and say a huge thank you for your wonderful hospitality during my visit last weekend. Having a comfortable place to stay made the whole trip so much more relaxing and enjoyable.\n\nI particularly loved the evening we spent at the riverside market—the food was incredible and it was great to catch up properly without feeling rushed. The city is even more beautiful than I remembered, and that was largely thanks to you showing me around.\n\nI hope you'll consider coming to visit me here in [your city] sometime soon. I would love to return the favor and show you some of my favorite spots. Just let me know when you're free, and we can make it happen.\n\nThanks again for everything!\n\nWarm regards,\n[Your Name]",
    minWords: 80,
    time: 420,
  },

  // Academic Discussion (2 new: w23–w24)
  {
    id: 'w23',
    type: 'Academic Discussion',
    prompt:
      'Your professor asks: "Do you think online learning will eventually replace in-person education? Why or why not?"',
    context:
      'Class: Education and Technology 201 (Dr. Carter). Alice argues that online learning offers unmatched flexibility and access, making it superior for many students. Ben argues that in-person education provides social interaction and hands-on experiences that cannot be replicated online.',
    sample:
      "I believe online learning will supplement but not fully replace in-person education. While digital platforms offer tremendous flexibility—allowing students in remote areas or with demanding schedules to access quality instruction—they cannot fully replicate the social and practical dimensions of classroom learning. For many disciplines, especially those requiring hands-on training like medicine, engineering, or the arts, physical presence is essential. Furthermore, research consistently shows that collaborative learning, mentorship, and the informal exchanges that happen in physical spaces drive deep academic engagement. The most effective educational systems will likely be hybrid ones that blend the accessibility of online learning with the irreplaceable human elements of the classroom.",
    minWords: 100,
    time: 600,
  },
  {
    id: 'w24',
    type: 'Academic Discussion',
    prompt:
      'Your professor asks: "Do you believe automation will ultimately benefit or harm workers? Explain your reasoning."',
    context:
      'Class: Business and Society 301 (Dr. James). Juan argues that automation increases efficiency and creates new industries, ultimately benefiting workers by raising productivity and wages. Allison argues that automation eliminates jobs faster than new ones are created, causing widespread unemployment and economic harm for lower-skilled workers.',
    sample:
      "The impact of automation on workers is likely to be uneven rather than uniformly beneficial or harmful. For highly skilled workers in technology, management, and creative fields, automation tends to amplify productivity and create new opportunities. However, for workers in routine manual or administrative roles, the risk of displacement is real and significant. Historical precedent, such as the industrial revolution, shows that technological transitions eventually create net employment growth—but the transition period can cause serious hardship for those without the resources or support to retrain. Governments and companies must invest proactively in education and retraining programs to ensure the benefits of automation are broadly shared rather than concentrated among those already well-positioned.",
    minWords: 100,
    time: 600,
  },
]
