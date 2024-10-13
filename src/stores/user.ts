import { defineStore } from 'pinia'
import axios from 'axios'

interface User {
  id: number
  username: string
  email: string
  is_admin: boolean
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await axios.post('/api/v1/auth/login', { username, password })
        const { token } = response.data
        localStorage.setItem('token', token)
        await this.fetchUser()
        this.isAuthenticated = true
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },
    async fetchUser() {
      try {
        const response = await axios.get('/api/v1/me')
        this.user = response.data
      } catch (error) {
        console.error('Failed to fetch user:', error)
        throw error
      }
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    },
  },
})