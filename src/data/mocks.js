export const mockTests = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: `Mock Test ${i + 1}`,
  difficulty: i < 4 ? 'Foundation' : i < 8 ? 'Intermediate' : 'Advanced',
  estMinutes: 95,
}))
