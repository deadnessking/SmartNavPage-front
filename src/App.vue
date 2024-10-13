<template>
  <router-view></router-view>
  <Toast />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import Toast from '@/components/Toast.vue'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>