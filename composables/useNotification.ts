export interface NotificationItem {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  createdAt: number
}

export interface NotificationOptions {
  title: string
  message: string
  duration?: number
}

const notifications = ref<NotificationItem[]>([])

let notificationId = 0

export const useNotification = () => {
  const addNotification = (
    type: NotificationItem['type'],
    options: NotificationOptions
  ) => {
    const id = `notification-${++notificationId}`
    const notification: NotificationItem = {
      id,
      type,
      title: options.title,
      message: options.message,
      duration: options.duration ?? 5000,
      createdAt: Date.now()
    }

    notifications.value.push(notification)

    // Auto remove after duration
    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration)
    }

    return id
  }

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex((n) => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearAll = () => {
    notifications.value = []
  }

  const success = (options: NotificationOptions) => {
    return addNotification('success', options)
  }

  const error = (options: NotificationOptions) => {
    return addNotification('error', options)
  }

  const warning = (options: NotificationOptions) => {
    return addNotification('warning', options)
  }

  const info = (options: NotificationOptions) => {
    return addNotification('info', options)
  }

  return {
    notifications: readonly(notifications),
    success,
    error,
    warning,
    info,
    removeNotification,
    clearAll
  }
}
