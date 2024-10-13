<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3 text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">编辑小部件</h3>
        <form @submit.prevent="saveWidget" class="mt-2 text-left">
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700">标题</label>
            <input type="text" id="title" v-model="editedWidget.title" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
          </div>
          <div class="mb-4">
            <label for="type" class="block text-sm font-medium text-gray-700">类型</label>
            <select id="type" v-model="editedWidget.type" required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
              <option value="link">链接</option>
              <option value="iframe">内嵌框架</option>
              <option value="custom">自定义</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="content" class="block text-sm font-medium text-gray-700">内容</label>
            <textarea id="content" v-model="editedWidget.content" required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"></textarea>
          </div>
          <div class="mb-4">
            <label for="visibility" class="block text-sm font-medium text-gray-700">可见性</label>
            <select id="visibility" v-model="editedWidget.visibility" required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
              <option :value="0">所有人可见</option>
              <option :value="1">仅自己可见</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button type="button" @click="closeModal" class="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">取消</button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">保存</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useWidgetStore } from '@/stores/widgets'

const widgetStore = useWidgetStore()
const editedWidget = ref({ ...widgetStore.editingWidget })

const emit = defineEmits(['close'])

onMounted(() => {
  if (widgetStore.editingWidget) {
    editedWidget.value = { ...widgetStore.editingWidget }
  }
})

const saveWidget = async () => {
  try {
    if (editedWidget.value.id) {
      await widgetStore.updateWidget(editedWidget.value)
    } else {
      await widgetStore.addWidget(editedWidget.value)
    }
    closeModal()
  } catch (error) {
    console.error('Failed to save widget:', error)
    // TODO: Show error message to user
  }
}

const closeModal = () => {
  emit('close')
}
</script>