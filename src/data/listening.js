export const listeningAdaptive = {
  stage1: [
    {
      id: 'l1',
      type: 'Listen and Choose a Response',
      transcript: 'A: Did you submit the lab form? B: Not yet, the portal was down this morning.',
      prompt: 'Why was it not submitted?',
      options: ['Forgot password', 'Portal outage', 'No lab partner', 'Deadline passed'],
      answer: 1,
    },
    {
      id: 'l2',
      type: 'Conversation',
      transcript: 'Student 1: We still need sources. Student 2: Let\'s meet in the library at 5 and finish outline first.',
      prompt: 'What is their immediate plan?',
      options: ['Call professor', 'Finish outline at library', 'Cancel project', 'Submit final draft'],
      answer: 1,
    },
    {
      id: 'l3',
      type: 'Academic Talk',
      transcript: 'Professor: Coral bleaching increases when water temperatures remain elevated for multiple weeks.',
      prompt: 'What condition increases bleaching?',
      options: ['Low salinity', 'Prolonged high temperature', 'High wind speed', 'Low sunlight'],
      answer: 1,
    },
  ],
  stage2Easy: [
    {
      id: 'le1',
      type: 'Announcement',
      transcript: 'Announcement: The bus stop near Hall B is closed today due to maintenance.',
      prompt: 'What should students expect?',
      options: ['Extra buses', 'Temporary closure', 'New route map app', 'Free rides'],
      answer: 1,
    },
    {
      id: 'le2',
      type: 'Response',
      transcript: 'A: Are you free at 2? B: I can do 3 after my seminar ends.',
      prompt: 'When can B meet?',
      options: ['2 PM', '3 PM', 'Before seminar', 'Tomorrow only'],
      answer: 1,
    },
  ],
  stage2Hard: [
    {
      id: 'lh1',
      type: 'Multi-speaker Inference',
      transcript: 'A: We can present Monday. B: That conflicts with chemistry lab. C: Tuesday morning is open for everyone.',
      prompt: 'Most likely final decision?',
      options: ['Monday presentation', 'Cancel presentation', 'Tuesday morning', 'After chemistry finals'],
      answer: 2,
    },
    {
      id: 'lh2',
      type: 'Implied Meaning',
      transcript: 'Professor: You can submit by midnight, but sooner is better if you want detailed feedback.',
      prompt: 'What is implied?',
      options: ['Late work gets higher grades', 'Early submission may get better feedback', 'Deadline is noon', 'Feedback is automatic'],
      answer: 1,
    },
  ],
}
