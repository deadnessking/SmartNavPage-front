<template>
  <transition name="fade">
    <div v-if="isVisible" :class="['fixed bottom-4 right-4 px-4 py-2 rounded', bgColor]">
      {{ message }}
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()

const isVisible = ref(false)
const message = ref('')
const bgColor = ref('')

watch(() => toastStore.toast, (newToast) => {
  if (newToast) {
    message.value = newToast.message
    bgColor.value = newToast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
    isVisible.value = true
    setTimeout(() => {
      isVisible.value = false
      toastStore.clearToast()
    }, 3000)
  }
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>