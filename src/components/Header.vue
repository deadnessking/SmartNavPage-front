<template>
  <header class="bg-blue-500 dark:bg-blue-800 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold">导航页面</h1>
      <nav class="flex items-center">
        <router-link to="/" class="mr-4">首页</router-link>
        <router-link to="/login" class="mr-4">登录</router-link>
        <button @click="toggleTheme" class="p-2 bg-blue-600 dark:bg-blue-700 rounded">
          {{ themeStore.isDark ? '🌞' : '🌙' }}
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>