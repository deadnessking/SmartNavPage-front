import axios from 'axios'
import { useToastStore } from '@/stores/toast'

const api = axios.create({
  baseURL: '/api/v1',
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    const toastStore = useToastStore()
    toastStore.showToast({
      message: error.response?.data?.message || '发生错误，请稍后再试',
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default api