<template>
  <div class="min-h-screen bg-gray-100">
    <Header />
    <main class="container mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold mb-6">我的导航</h2>
      <button @click="openAddWidgetModal" class="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300">
        添加小部件
      </button>
      <draggable 
        v-model="widgetStore.widgets" 
        item-key="id"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        @end="onDragEnd"
      >
        <template #item="{ element }">
          <WidgetCard :widget="element" class="widget-card" />
        </template>
      </draggable>
    </main>
    <WidgetEditForm v-if="isEditModalOpen" @close="closeEditModal" />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import WidgetCard from '@/components/Widget/WidgetCard.vue'
import WidgetEditForm from '@/components/Widget/WidgetEditForm.vue'
import { useWidgetStore } from '@/stores/widgets'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'

const widgetStore = useWidgetStore()
const { widgets } = storeToRefs(widgetStore)
const isEditModalOpen = ref(false)

onMounted(async () => {
  await widgetStore.fetchWidgets()
})

const onDragEnd = () => {
  widgetStore.updateWidgetOrder()
}

const openAddWidgetModal = () => {
  widgetStore.setEditingWidget({
    id: 0,
    title: '',
    type: 'link',
    content: '',
    visibility: 0,
    order: widgets.value.length,
    settings: {}
  })
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
  widgetStore.setEditingWidget(null)
}
</script>

<style scoped>
.widget-card {
  @apply transition-all duration-300 ease-in-out hover:shadow-lg;
}
</style>