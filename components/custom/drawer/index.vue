<template>
  <teleport to="body">
    <transition :name="`drawer-${direction}`" appear>
      <div
        v-if="modelValue"
        :class="['overlay', overlayClass]"
        @click="handleOverlayClick"
      >
        <div
          :class="['drawer', direction, drawerClass, $attrs.class]"
          :style="drawerStyles"
          @click.stop
        >
          <!-- Header -->
          <div v-if="$slots.header || title" class="header">
            <slot name="header">
              <h3 class="title">{{ title }}</h3>
            </slot>
            <button
              v-if="showClose"
              class="closeBtn"
              @click="handleClose"
              type="button"
            >
              <i class="icon-close-fill"></i>
            </button>
          </div>

          <!-- Body -->
          <div class="body">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
// Disable automatic attribute inheritance since we use teleport
defineOptions({
  inheritAttrs: false
})

interface Props {
  modelValue: boolean
  direction?: 'left' | 'right' | 'top' | 'bottom'
  size?: string | number
  title?: string
  showClose?: boolean
  closeOnClickModal?: boolean
  destroyOnClose?: boolean
  overlayClass?: string
  drawerClass?: string
  zIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'right',
  size: '30%',
  showClose: true,
  closeOnClickModal: true,
  destroyOnClose: false,
  zIndex: 2000
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
  open: []
}>()

// Watch for modelValue changes to emit events
watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if (newVal && !oldVal) {
      emit('open')
    } else if (!newVal && oldVal) {
      emit('close')
    }
  }
)

// Handle close actions
const handleClose = () => {
  emit('update:modelValue', false)
}

const handleOverlayClick = () => {
  if (props.closeOnClickModal) {
    handleClose()
  }
}

// Handle escape key
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.modelValue) {
    handleClose()
  }
}

// Add/remove escape key listener
onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

// Dynamic styles
const drawerStyles = computed(() => {
  const styles: Record<string, string> = {
    zIndex: props.zIndex.toString()
  }

  if (props.direction === 'left' || props.direction === 'right') {
    styles.width =
      typeof props.size === 'number' ? `${props.size}px` : props.size
    styles.maxWidth = '100vw'
  } else {
    styles.height =
      typeof props.size === 'number' ? `${props.size}px` : props.size
    styles.maxHeight = '100vh'
  }

  return styles
})

// Prevent body scroll when drawer is open
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped lang="postcss">
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
}

.drawer {
  background: white;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.drawer.right {
  margin-left: auto;
  height: 100vh;
}

.drawer.left {
  margin-right: auto;
  height: 100vh;
}

.drawer.top {
  margin-bottom: auto;
  width: 100vw;
}

.drawer.bottom {
  margin-top: auto;
  width: 100vw;
}

.header {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.closeBtn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: #6b7280;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.closeBtn:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.body {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.footer {
  padding: 20px;
  border-top: 1px solid #e5e7eb;
  flex-shrink: 0;
}

/* Transitions - Global styles for teleported elements */
</style>

<style lang="postcss">
/* Global transition styles for teleported drawer */

/* Right drawer animations */
.drawer-right-enter-active,
.drawer-right-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-right-enter-from,
.drawer-right-leave-to {
  opacity: 0;
}

.drawer-right-enter-active .drawer {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.drawer-right-leave-active .drawer {
  transition: transform 0.25s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}

.drawer-right-enter-from .drawer,
.drawer-right-leave-to .drawer {
  transform: translateX(100%);
}

/* Left drawer animations */
.drawer-left-enter-active,
.drawer-left-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-left-enter-from,
.drawer-left-leave-to {
  opacity: 0;
}

.drawer-left-enter-active .drawer {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.drawer-left-leave-active .drawer {
  transition: transform 0.25s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}

.drawer-left-enter-from .drawer,
.drawer-left-leave-to .drawer {
  transform: translateX(-100%);
}

/* Top drawer animations */
.drawer-top-enter-active,
.drawer-top-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-top-enter-from,
.drawer-top-leave-to {
  opacity: 0;
}

.drawer-top-enter-active .drawer {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.drawer-top-leave-active .drawer {
  transition: transform 0.25s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}

.drawer-top-enter-from .drawer,
.drawer-top-leave-to .drawer {
  transform: translateY(-100%);
}

/* Bottom drawer animations */
.drawer-bottom-enter-active,
.drawer-bottom-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-bottom-enter-from,
.drawer-bottom-leave-to {
  opacity: 0;
}

.drawer-bottom-enter-active .drawer {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.drawer-bottom-leave-active .drawer {
  transition: transform 0.25s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}

.drawer-bottom-enter-from .drawer,
.drawer-bottom-leave-to .drawer {
  transform: translateY(100%);
}
</style>
