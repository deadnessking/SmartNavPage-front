<template>
  <div class="bg-white rounded-lg shadow-md p-4 flex flex-col h-full">
    <h2 class="text-xl font-semibold mb-2">{{ widget.title }}</h2>
    <div class="flex-grow">
      <component :is="widgetComponent" :data="widget.data" />
    </div>
    <button @click="editWidget" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
      编辑
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWidgetStore } from '@/stores/widgets'

const props = defineProps<{
  widget: {
    id: number
    title: string
    type: string
    data: any
  }
}>()

const widgetStore = useWidgetStore()

const widgetComponent = computed(() => {
  switch (props.widget.type) {
    case 'link':
      return 'a'
    case 'iframe':
      return 'iframe'
    default:
      return 'div'
  }
})

function editWidget() {
  widgetStore.setEditingWidget(props.widget)
}
</script>