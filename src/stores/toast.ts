import { defineStore } from 'pinia'

interface Toast {
  message: string
  type: 'success' | 'error'
}

export const useToastStore = defineStore('toast', {
  state: () => ({
    toast: null as Toast | null,
  }),
  actions: {
    showToast(toast: Toast) {
      this.toast = toast
    },
    clearToast() {
      this.toast = null
    },
  },
})