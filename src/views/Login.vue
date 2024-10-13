<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 class="text-2xl font-bold mb-4">登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">用户名</label>
          <input type="text" id="username" v-model="username" required
                 class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">密码</label>
          <input type="password" id="password" v-model="password" required
                 class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          登录
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')

async function handleLogin() {
  try {
    await userStore.login(username.value, password.value)
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
    // TODO: Show error message to user
  }
}
</script>