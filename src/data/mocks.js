// 2026 TOEFL Mock Exam Configurations
// Each mock specifies which question IDs to use for each section and stage.
// Reading / Listening: stage1 (10 questions, ~18 min) → adaptive → stage2Easy or stage2Hard (8 questions, ~12 min)
// Writing: 1 Build a Sentence + 1 Write an Email + 1 Academic Discussion
// Speaking: all 11 tasks (7 Listen and Repeat + 4 Interview topics with 4 sub-questions each)
// Total estimated time: ~87 minutes

export const mockTests = [
  // ── FOUNDATION (Tests 1–4) ──────────────────────────────────────
  {
    id: 1,
    title: 'Mock Test 1',
    difficulty: 'Foundation',
    estMinutes: 87,
    reading: {
      stage1: ['r1', 'r2', 'r3', 'r5', 'r6', 'r7', 'r10', 'r11', 'r12', 'r14'],
      stage2Easy: ['re1', 're2', 're3', 're4', 're5', 're6', 're7', 're8'],
      stage2Hard: ['rh1', 'rh2', 'rh3', 'rh4', 'rh5', 'rh6', 'rh7', 'rh8'],
    },
    listening: {
      stage1: ['l1', 'l2', 'l3', 'l5', 'l6', 'l7', 'l10', 'l11', 'l12', 'l14'],
      stage2Easy: ['le1', 'le2', 'le3', 'le4', 'le5', 'le6', 'le7', 'le8'],
      stage2Hard: ['lh1', 'lh2', 'lh3', 'lh4', 'lh5', 'lh6', 'lh7', 'lh8'],
    },
    writing: ['w1', 'w4', 'w9'],
    speaking: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11'],
  },
  {
    id: 2,
    title: 'Mock Test 2',
    difficulty: 'Foundation',
    estMinutes: 87,
    reading: {
      stage1: ['r2', 'r3', 'r4', 'r6', 'r7', 'r8', 'r11', 'r12', 'r13', 'r15'],
      stage2Easy: ['re3', 're4', 're5', 're6', 're7', 're8', 're9', 're10'],
      stage2Hard: ['rh3', 'rh4', 'rh5', 'rh6', 'rh7', 'rh8', 'rh9', 'rh10'],
    },
    listening: {
      stage1: ['l2', 'l3', 'l4', 'l6', 'l7', 'l8', 'l11', 'l12', 'l13', 'l15'],
      stage2Easy: ['le3', 'le4', 'le5', 'le6', 'le7', 'le8', 'le9', 'le10'],
      stage2Hard: ['lh3', 'lh4', 'lh5', 'lh6', 'lh7', 'lh8', 'lh9', 'lh10'],
    },
    writing: ['w2', 'w5', 'w10'],
    speaking: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11'],
  },
  {
    id: 3,
    title: 'Mock Test 3',
    difficulty: 'Foundation',
    estMinutes: 87,
    reading: {
      stage1: ['r1', 'r3', 'r4', 'r5', 'r8', 'r9', 'r10', 'r12', 'r13', 'r14'],
      stage2Easy: ['re5', 're6', 're7', 're8', 're9', 're10', 're11', 're12'],
      stage2Hard: ['rh5', 'rh6', 'rh7', 'rh8', 'rh9', 'rh10', 'rh11', 'rh12'],
    },
    listening: {
      stage1: ['l1', 'l3', 'l4', 'l5', 'l8', 'l9', 'l10', 'l12', 'l13', 'l14'],
      stage2Easy: ['le5', 'le6', 'le7', 'le8', 'le9', 'le10', 'le11', 'le12'],
      stage2Hard: ['lh5', 'lh6', 'lh7', 'lh8', 'lh9', 'lh10', 'lh11', 'lh12'],
    },
    writing: ['w3', 'w6', 'w11'],
    speaking: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11'],
  },
  {
    id: 4,
    title: 'Mock Test 4',
    difficulty: 'Foundation',
    estMinutes: 87,
    reading: {
      stage1: ['r2', 'r4', 'r5', 'r6', 'r9', 'r10', 'r11', 'r13', 'r14', 'r15'],
      stage2Easy: ['re1', 're2', 're3', 're7', 're8', 're9', 're10', 're11'],
      stage2Hard: ['rh1', 'rh2', 'rh3', 'rh7', 'rh8', 'rh9', 'rh10', 'rh11'],
    },
    listening: {
      stage1: ['l2', 'l4', 'l5', 'l6', 'l9', 'l10', 'l11', 'l13', 'l14', 'l15'],
      stage2Easy: ['le1', 'le2', 'le3', 'le7', 'le8', 'le9', 'le10', 'le11'],
      stage2Hard: ['lh1', 'lh2', 'lh3', 'lh7', 'lh8', 'lh9', 'lh10', 'lh11'],
    },
    writing: ['w1', 'w7', 'w12'],
    speaking: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11'],
  },

  // ── INTERMEDIATE (Tests 5–8) ────────────────────────────────────
  {
    id: 5,
    title: 'Mock Test 5',
    difficulty: 'Intermediate',
    estMinutes: 87,
    reading: {
      stage1: ['r1', 'r3', 'r5', 'r7', 'r9', 'r11', 'r13', 'r15', 'r2', 'r4'],
      stage2Easy: ['re2', 're3', 're5', 're7', 're9', 're11', 're1', 're4'],
      stage2Hard: ['rh2', 'rh3', 'rh5', 'rh7', 'rh9', 'rh11', 'rh1', 'rh4'],
    },
    listening: {
      stage1: ['l1', 'l3', 'l5', 'l7', 'l9', 'l11', 'l13', 'l15', 'l2', 'l4'],
      stage2Easy: ['le2', 'le3', 'le5', 'le7', 'le9', 'le11', 'le1', 'le4'],
      stage2Hard: ['lh2', 'lh3', 'lh5', 'lh7', 'lh9', 'lh11', 'lh1', 'lh4'],
    },
    writing: ['w2', 'w8', 'w13'],
    speaking: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11'],
  },
  {
    id: 6,
    title: 'Mock Test 6',
    difficulty: 'Intermediate',
    estMinutes: 87,
    reading: {
      stage1: ['r2', 'r4', 'r6', 'r8', 'r10', 'r12', 'r14', 'r1', 'r3', 'r5'],
      stage2Easy: ['re4', 're5', 're6', 're8', 're10', 're12', 're2', 're7'],
      stage2Hard: ['rh4', 'rh5', 'rh6', 'rh8', 'rh10', 'rh12', 'rh2', 'rh7'],
    },
    listening: {
      stage1: ['l2', 'l4', 'l6', 'l8', 'l10', 'l12', 'l14', 'l1', 'l3', 'l5'],
      stage2Easy: ['le4', 'le5', 'le6', 'le8', 'le10', 'le12', 'le2', 'le7'],
      stage2Hard: ['lh4', 'lh5', 'lh6', 'lh8', 'lh10', 'lh12', 'lh2', 'lh7'],
    },
    writing: ['w3', 'w4', 'w9'],
    speaking: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11'],
  },
  {
    id: 7,
    title: 'Mock Test 7',
    difficulty: 'Intermediate',
    estMinutes: 87,
    reading: {
      stage1: ['r1', 'r2', 'r4', 'r7', 'r8', 'r11', 'r12', 'r15', 'r3', 'r6'],
      stage2Easy: ['re1', 're3', 're6', 're8', 're10', 're12', 're4', 're9'],
      stage2Hard: ['rh1', 'rh3', 'rh6', 'rh8', 'rh10', 'rh12', 'rh4', 'rh9'],
    },
    listening: {
      stage1: ['l1', 'l2', 'l4', 'l7', 'l8', 'l11', 'l12', 'l15', 'l3', 'l6'],
      stage2Easy: ['le1', 'le3', 'le6', 'le8', 'le10', 'le12', 'le4', 'le9'],
      stage2Hard: ['lh1', 'lh3', 'lh6', 'lh8', 'lh10', 'lh12', 'lh4', 'lh9'],
    },
    writing: ['w1', 'w5', 'w10'],
    speaking: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11'],
  },
  {
    id: 8,
    title: 'Mock Test 8',
    difficulty: 'Intermediate',
    estMinutes: 87,
    reading: {
      stage1: ['r3', 'r5', 'r6', 'r9', 'r10', 'r13', 'r14', 'r2', 'r7', 'r11'],
      stage2Easy: ['re2', 're4', 're7', 're9', 're11', 're1', 're5', 're10'],
      stage2Hard: ['rh2', 'rh4', 'rh7', 'rh9', 'rh11', 'rh1', 'rh5', 'rh10'],
    },
    listening: {
      stage1: ['l3', 'l5', 'l6', 'l9', 'l10', 'l13', 'l14', 'l2', 'l7', 'l11'],
      stage2Easy: ['le2', 'le4', 'le7', 'le9', 'le11', 'le1', 'le5', 'le10'],
      stage2Hard: ['lh2', 'lh4', 'lh7', 'lh9', 'lh11', 'lh1', 'lh5', 'lh10'],
    },
    writing: ['w2', 'w6', 'w11'],
    speaking: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11'],
  },

  // ── ADVANCED (Tests 9–12) ───────────────────────────────────────
  {
    id: 9,
    title: 'Mock Test 9',
    difficulty: 'Advanced',
    estMinutes: 87,
    reading: {
      stage1: ['r1', 'r5', 'r6', 'r8', 'r9', 'r12', 'r13', 'r15', 'r4', 'r10'],
      stage2Easy: ['re1', 're3', 're5', 're7', 're9', 're11', 're6', 're12'],
      stage2Hard: ['rh1', 'rh3', 'rh5', 'rh7', 'rh9', 'rh11', 'rh6', 'rh12'],
    },
    listening: {
      stage1: ['l1', 'l5', 'l6', 'l8', 'l9', 'l12', 'l13', 'l15', 'l4', 'l10'],
      stage2Easy: ['le1', 'le3', 'le5', 'le7', 'le9', 'le11', 'le6', 'le12'],
      stage2Hard: ['lh1', 'lh3', 'lh5', 'lh7', 'lh9', 'lh11', 'lh6', 'lh12'],
    },
    writing: ['w3', 'w7', 'w12'],
    speaking: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11'],
  },
  {
    id: 10,
    title: 'Mock Test 10',
    difficulty: 'Advanced',
    estMinutes: 87,
    reading: {
      stage1: ['r2', 'r6', 'r7', 'r9', 'r10', 'r13', 'r14', 'r1', 'r5', 'r11'],
      stage2Easy: ['re2', 're4', 're6', 're8', 're10', 're12', 're3', 're7'],
      stage2Hard: ['rh2', 'rh4', 'rh6', 'rh8', 'rh10', 'rh12', 'rh3', 'rh7'],
    },
    listening: {
      stage1: ['l2', 'l6', 'l7', 'l9', 'l10', 'l13', 'l14', 'l1', 'l5', 'l11'],
      stage2Easy: ['le2', 'le4', 'le6', 'le8', 'le10', 'le12', 'le3', 'le7'],
      stage2Hard: ['lh2', 'lh4', 'lh6', 'lh8', 'lh10', 'lh12', 'lh3', 'lh7'],
    },
    writing: ['w1', 'w8', 'w13'],
    speaking: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11'],
  },
  {
    id: 11,
    title: 'Mock Test 11',
    difficulty: 'Advanced',
    estMinutes: 87,
    reading: {
      stage1: ['r3', 'r7', 'r8', 'r10', 'r11', 'r14', 'r15', 'r2', 'r6', 'r12'],
      stage2Easy: ['re1', 're4', 're6', 're8', 're10', 're11', 're3', 're9'],
      stage2Hard: ['rh1', 'rh4', 'rh6', 'rh8', 'rh10', 'rh11', 'rh3', 'rh9'],
    },
    listening: {
      stage1: ['l3', 'l7', 'l8', 'l10', 'l11', 'l14', 'l15', 'l2', 'l6', 'l12'],
      stage2Easy: ['le1', 'le4', 'le6', 'le8', 'le10', 'le11', 'le3', 'le9'],
      stage2Hard: ['lh1', 'lh4', 'lh6', 'lh8', 'lh10', 'lh11', 'lh3', 'lh9'],
    },
    writing: ['w2', 'w4', 'w9'],
    speaking: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11'],
  },
  {
    id: 12,
    title: 'Mock Test 12',
    difficulty: 'Advanced',
    estMinutes: 87,
    reading: {
      stage1: ['r4', 'r8', 'r9', 'r11', 'r12', 'r15', 'r1', 'r3', 'r7', 'r13'],
      stage2Easy: ['re2', 're5', 're7', 're9', 're11', 're12', 're4', 're8'],
      stage2Hard: ['rh2', 'rh5', 'rh7', 'rh9', 'rh11', 'rh12', 'rh4', 'rh8'],
    },
    listening: {
      stage1: ['l4', 'l8', 'l9', 'l11', 'l12', 'l15', 'l1', 'l3', 'l7', 'l13'],
      stage2Easy: ['le2', 'le5', 'le7', 'le9', 'le11', 'le12', 'le4', 'le8'],
      stage2Hard: ['lh2', 'lh5', 'lh7', 'lh9', 'lh11', 'lh12', 'lh4', 'lh8'],
    },
    writing: ['w3', 'w5', 'w10'],
    speaking: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11'],
  },

  // ── FOUNDATION — EXTENDED (Tests 13–14) ────────────────────────
  {
    id: 13,
    title: 'Mock Test 13',
    difficulty: 'Foundation',
    estMinutes: 87,
    reading: {
      stage1: ['r16', 'r17', 'r18', 'r19', 'r20', 'r21', 'r22', 'r23', 'r24', 'r25'],
      stage2Easy: ['re13', 're14', 're15', 're16', 're17', 're18', 're19', 're20'],
      stage2Hard: ['rh13', 'rh14', 'rh15', 'rh16', 'rh17', 'rh18', 'rh19', 'rh20'],
    },
    listening: {
      stage1: ['l16', 'l17', 'l18', 'l19', 'l20', 'l21', 'l1', 'l2', 'l3', 'l4'],
      stage2Easy: ['le13', 'le14', 'le15', 'le16', 'le17', 'le18', 'le1', 'le2'],
      stage2Hard: ['lh13', 'lh14', 'lh15', 'lh16', 'lh17', 'lh18', 'lh1', 'lh2'],
    },
    writing: ['w14', 'w18', 'w23'],
    speaking: ['s12', 's13', 's14', 's15', 's16', 's17', 's18', 's47', 's48', 's49', 's50'],
  },
  {
    id: 14,
    title: 'Mock Test 14',
    difficulty: 'Foundation',
    estMinutes: 87,
    reading: {
      stage1: ['r16', 'r17', 'r19', 'r20', 'r22', 'r23', 'r25', 'r26', 'r27', 'r18'],
      stage2Easy: ['re13', 're14', 're15', 're16', 're19', 're20', 're21', 're22'],
      stage2Hard: ['rh21', 'rh22', 'rh23', 'rh24', 'rh25', 'rh26', 'rh27', 'rh28'],
    },
    listening: {
      stage1: ['l16', 'l17', 'l18', 'l19', 'l20', 'l21', 'l5', 'l6', 'l7', 'l8'],
      stage2Easy: ['le13', 'le14', 'le15', 'le16', 'le17', 'le18', 'le3', 'le4'],
      stage2Hard: ['lh13', 'lh14', 'lh15', 'lh16', 'lh17', 'lh18', 'lh3', 'lh4'],
    },
    writing: ['w15', 'w19', 'w24'],
    speaking: ['s19', 's20', 's21', 's22', 's23', 's24', 's25', 's47', 's48', 's50', 's51'],
  },

  // ── INTERMEDIATE — EXTENDED (Tests 15–16) ──────────────────────
  {
    id: 15,
    title: 'Mock Test 15',
    difficulty: 'Intermediate',
    estMinutes: 87,
    reading: {
      stage1: ['r16', 'r17', 'r18', 'r21', 'r22', 'r24', 'r25', 'r26', 'r27', 'r3'],
      stage2Easy: ['re13', 're15', 're17', 're19', 're21', 're23', 're24', 're3'],
      stage2Hard: ['rh13', 'rh15', 'rh17', 'rh19', 'rh21', 'rh23', 'rh25', 'rh27'],
    },
    listening: {
      stage1: ['l16', 'l17', 'l18', 'l19', 'l20', 'l21', 'l9', 'l10', 'l11', 'l12'],
      stage2Easy: ['le13', 'le14', 'le15', 'le16', 'le17', 'le18', 'le5', 'le6'],
      stage2Hard: ['lh13', 'lh14', 'lh15', 'lh16', 'lh17', 'lh18', 'lh5', 'lh6'],
    },
    writing: ['w16', 'w20', 'w23'],
    speaking: ['s26', 's27', 's28', 's29', 's30', 's31', 's32', 's47', 's49', 's50', 's51'],
  },
  {
    id: 16,
    title: 'Mock Test 16',
    difficulty: 'Intermediate',
    estMinutes: 87,
    reading: {
      stage1: ['r16', 'r18', 'r20', 'r22', 'r24', 'r26', 'r1', 'r5', 'r9', 'r13'],
      stage2Easy: ['re13', 're15', 're17', 're19', 're21', 're23', 're5', 're9'],
      stage2Hard: ['rh14', 'rh16', 'rh18', 'rh20', 'rh22', 'rh24', 'rh26', 'rh28'],
    },
    listening: {
      stage1: ['l16', 'l17', 'l18', 'l19', 'l20', 'l21', 'l6', 'l7', 'l13', 'l14'],
      stage2Easy: ['le13', 'le14', 'le15', 'le16', 'le17', 'le18', 'le7', 'le8'],
      stage2Hard: ['lh13', 'lh14', 'lh15', 'lh16', 'lh17', 'lh18', 'lh7', 'lh8'],
    },
    writing: ['w17', 'w21', 'w24'],
    speaking: ['s33', 's34', 's35', 's36', 's37', 's38', 's39', 's48', 's49', 's50', 's51'],
  },

  // ── ADVANCED — EXTENDED (Tests 17–18) ──────────────────────────
  {
    id: 17,
    title: 'Mock Test 17',
    difficulty: 'Advanced',
    estMinutes: 87,
    reading: {
      stage1: ['r17', 'r19', 'r21', 'r23', 'r25', 'r27', 'r2', 'r6', 'r10', 'r14'],
      stage2Easy: ['re14', 're16', 're18', 're20', 're22', 're24', 're6', 're10'],
      stage2Hard: ['rh15', 'rh17', 'rh19', 'rh21', 'rh23', 'rh25', 'rh27', 'rh29'],
    },
    listening: {
      stage1: ['l16', 'l17', 'l18', 'l19', 'l20', 'l21', 'l4', 'l7', 'l8', 'l11'],
      stage2Easy: ['le13', 'le14', 'le15', 'le16', 'le17', 'le18', 'le9', 'le10'],
      stage2Hard: ['lh13', 'lh14', 'lh15', 'lh16', 'lh17', 'lh18', 'lh9', 'lh10'],
    },
    writing: ['w15', 'w22', 'w24'],
    speaking: ['s40', 's41', 's42', 's43', 's44', 's45', 's46', 's47', 's48', 's49', 's51'],
  },
  {
    id: 18,
    title: 'Mock Test 18',
    difficulty: 'Advanced',
    estMinutes: 87,
    reading: {
      stage1: ['r16', 'r18', 'r20', 'r22', 'r24', 'r26', 'r4', 'r8', 'r12', 'r15'],
      stage2Easy: ['re13', 're15', 're17', 're19', 're21', 're23', 're8', 're12'],
      stage2Hard: ['rh16', 'rh18', 'rh20', 'rh22', 'rh24', 'rh26', 'rh28', 'rh30'],
    },
    listening: {
      stage1: ['l16', 'l17', 'l18', 'l19', 'l20', 'l21', 'l3', 'l5', 'l9', 'l15'],
      stage2Easy: ['le13', 'le14', 'le15', 'le16', 'le17', 'le18', 'le11', 'le12'],
      stage2Hard: ['lh13', 'lh14', 'lh15', 'lh16', 'lh17', 'lh18', 'lh11', 'lh12'],
    },
    writing: ['w16', 'w22', 'w23'],
    speaking: ['s26', 's27', 's28', 's29', 's30', 's31', 's32', 's8', 's9', 's10', 's51'],
  },
]
