import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false,
  }),
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
      this.applyTheme()
    },
    initTheme() {
      const savedTheme = localStorage.getItem('theme')
      this.isDark = savedTheme === 'dark'
      this.applyTheme()
    },
    applyTheme() {
      document.documentElement.classList.toggle('dark', this.isDark)
    },
  },
})