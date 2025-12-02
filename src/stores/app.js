import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    phase: 1,
    version: '0.1.0',
  }),
})
