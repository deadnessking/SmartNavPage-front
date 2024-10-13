import { defineStore } from 'pinia'
import axios from 'axios'

interface Widget {
  id: number
  title: string
  type: string
  content: string
  visibility: number
  order: number
  settings: any
}

export const useWidgetStore = defineStore('widgets', {
  state: () => ({
    widgets: [] as Widget[],
    editingWidget: null as Widget | null,
  }),
  actions: {
    async fetchWidgets() {
      try {
        const response = await axios.get('/api/v1/widgets')
        this.widgets = response.data
      } catch (error) {
        console.error('Failed to fetch widgets:', error)
        throw error
      }
    },
    setEditingWidget(widget: Widget) {
      this.editingWidget = widget
    },
    async addWidget(widget: Omit<Widget, 'id'>) {
      try {
        const response = await axios.post('/api/v1/widgets', widget)
        this.widgets.push(response.data)
      } catch (error) {
        console.error('Failed to add widget:', error)
        throw error
      }
    },
    async updateWidget(widget: Widget) {
      try {
        await axios.put(`/api/v1/widgets/${widget.id}`, widget)
        const index = this.widgets.findIndex(w => w.id === widget.id)
        if (index !== -1) {
          this.widgets[index] = widget
        }
      } catch (error) {
        console.error('Failed to update widget:', error)
        throw error
      }
    },
    async deleteWidget(widgetId: number) {
      try {
        await axios.delete(`/api/v1/widgets/${widgetId}`)
        this.widgets = this.widgets.filter(w => w.id !== widgetId)
      } catch (error) {
        console.error('Failed to delete widget:', error)
        throw error
      }
    },
    async updateWidgetOrder() {
      try {
        const updatedOrder = this.widgets.map((widget, index) => ({
          id: widget.id,
          order: index
        }))
        await axios.put('/api/v1/widgets/order', updatedOrder)
      } catch (error) {
        console.error('Failed to update widget order:', error)
        throw error
      }
    },
  },
})