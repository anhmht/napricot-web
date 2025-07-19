<template>
  <Teleport to="body">
    <div :class="['notification-container', $attrs.class]">
      <TransitionGroup name="notification" tag="div">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="['notification', `notification--${notification.type}`]"
        >
          <div class="notification__icon">
            <img
              v-if="notification.type === 'success'"
              src="/icons/alert-success.svg"
              alt="Success"
              width="20"
              height="20"
            />
            <img
              v-else-if="notification.type === 'error'"
              src="/icons/alert-error.svg"
              alt="Error"
              width="20"
              height="20"
            />
            <img
              v-else-if="notification.type === 'warning'"
              src="/icons/alert-warning.svg"
              alt="Warning"
              width="20"
              height="20"
            />
            <img
              v-else
              src="/icons/alert-info.svg"
              alt="Info"
              width="20"
              height="20"
            />
          </div>

          <div class="notification__content">
            <h4 class="notification__title">{{ notification.title }}</h4>
            <p class="notification__message">{{ notification.message }}</p>
          </div>

          <button
            class="notification__close"
            @click="removeNotification(notification.id)"
          >
            <i class="icon-close-fill"></i>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
// Disable automatic attribute inheritance since we use teleport
defineOptions({
  inheritAttrs: false
})

import { useNotification } from '~/composables/useNotification'

const { notifications, removeNotification } = useNotification()
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  pointer-events: none;
}

.notification {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 320px;
  max-width: 400px;
  padding: 16px;
  margin-bottom: 12px;
  background: white;
  border-radius: 2px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-left: 4px solid;
  pointer-events: auto;
  transition: all 0.3s ease;
}

.notification--success {
  border-left-color: #10b981;
}

.notification--error {
  border-left-color: #ef4444;
}

.notification--warning {
  border-left-color: #f59e0b;
}

.notification--info {
  border-left-color: #3b82f6;
}

.notification__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-top: 2px;
}

.notification--success .notification__icon {
  color: #10b981;
}

.notification--error .notification__icon {
  color: #ef4444;
}

.notification--warning .notification__icon {
  color: #f59e0b;
}

.notification--info .notification__icon {
  color: #3b82f6;
}

.notification__content {
  flex: 1;
  min-width: 0;
}

.notification__title {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

.notification__message {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.4;
}

.notification__close {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.notification__close:hover {
  background-color: #f3f4f6;
  color: #374151;
}

/* Animations */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.notification-move {
  transition: transform 0.3s ease;
}
</style>
