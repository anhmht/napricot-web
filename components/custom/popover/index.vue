<template>
  <div class="popover-wrapper">
    <div
      ref="triggerRef"
      class="popover-trigger"
      @click="handleTriggerClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <slot name="reference" />
    </div>

    <Teleport to="body">
      <Transition
        name="popover"
        @before-enter="onBeforeEnter"
        @after-enter="onAfterEnter"
        @before-leave="onBeforeLeave"
        @after-leave="onAfterLeave"
      >
        <div
          v-if="visible"
          ref="popoverRef"
          class="popover"
          :class="[
            `popover--${placement}`,
            {
              'popover--arrow': showArrow,
              'popover--dark': theme === 'dark',
              'popover--initial': !isPositioned
            },
            popperClass
          ]"
          :style="popoverStyle"
          @click.stop
          @mouseenter="handlePopoverMouseEnter"
          @mouseleave="handlePopoverMouseLeave"
        >
          <div v-if="showArrow" class="popover__arrow"></div>
          <div class="popover__content">
            <div v-if="title" class="popover__title">{{ title }}</div>
            <div class="popover__body">
              <slot v-if="$slots.default" />
              <div v-else-if="content" v-html="content"></div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

type Trigger = 'click' | 'hover' | 'focus' | 'manual'
type Theme = 'light' | 'dark'

interface Props {
  visible?: boolean
  placement?: Placement
  trigger?: Trigger
  content?: string
  title?: string
  width?: string | number
  offset?: number
  showArrow?: boolean
  disabled?: boolean
  theme?: Theme
  appendToBody?: boolean
  popperClass?: string
  hideAfter?: number
  openDelay?: number
  closeDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  placement: 'bottom',
  trigger: 'click',
  content: '',
  title: '',
  width: 'auto',
  offset: 8,
  showArrow: true,
  disabled: false,
  theme: 'light',
  appendToBody: true,
  popperClass: '',
  hideAfter: 0,
  openDelay: 0,
  closeDelay: 200
})

const emit = defineEmits<{
  'update:visible': [visible: boolean]
  show: []
  hide: []
  'before-enter': []
  'after-enter': []
  'before-leave': []
  'after-leave': []
}>()

const triggerRef = ref<HTMLElement>()
const popoverRef = ref<HTMLElement>()
const localVisible = ref(false)
const hoverTimer = ref<NodeJS.Timeout>()
const hideTimer = ref<NodeJS.Timeout>()
const isPositioned = ref(false)

const visible = computed({
  get: () => props.visible || localVisible.value,
  set: (value) => {
    localVisible.value = value
    emit('update:visible', value)
  }
})

const popoverStyle = computed(() => {
  const styles: Record<string, string> = {}

  if (props.width !== 'auto') {
    styles.width =
      typeof props.width === 'number' ? `${props.width}px` : props.width
  } else if (triggerRef.value && isPositioned.value) {
    // Auto-calculate width based on trigger element
    const triggerRect = triggerRef.value.getBoundingClientRect()
    const triggerWidth = `${triggerRect.width}px`
    styles.width = triggerWidth
    styles.maxWidth = triggerWidth // Override default max-width
  }

  return styles
})

const calculatePosition = () => {
  if (!triggerRef.value || !popoverRef.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const popoverRect = popoverRef.value.getBoundingClientRect()
  const { innerWidth, innerHeight } = window

  let top = 0
  let left = 0

  // Calculate base position based on placement
  switch (props.placement) {
    case 'top':
    case 'top-start':
    case 'top-end':
      top = triggerRect.top - popoverRect.height - props.offset
      break
    case 'bottom':
    case 'bottom-start':
    case 'bottom-end':
      top = triggerRect.bottom + props.offset
      break
    case 'left':
    case 'left-start':
    case 'left-end':
      left = triggerRect.left - popoverRect.width - props.offset
      break
    case 'right':
    case 'right-start':
    case 'right-end':
      left = triggerRect.right + props.offset
      break
  }

  // Calculate horizontal alignment
  if (
    props.placement.startsWith('top') ||
    props.placement.startsWith('bottom')
  ) {
    if (props.placement.endsWith('-start')) {
      left = triggerRect.left
    } else if (props.placement.endsWith('-end')) {
      left = triggerRect.right - popoverRect.width
    } else {
      left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2
    }
  }

  // Calculate vertical alignment
  if (
    props.placement.startsWith('left') ||
    props.placement.startsWith('right')
  ) {
    if (props.placement.endsWith('-start')) {
      top = triggerRect.top
    } else if (props.placement.endsWith('-end')) {
      top = triggerRect.bottom - popoverRect.height
    } else {
      top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2
    }
  }

  // Ensure popover stays within viewport
  if (left + popoverRect.width > innerWidth) {
    left = innerWidth - popoverRect.width - 10
  }
  if (left < 10) {
    left = 10
  }
  if (top + popoverRect.height > innerHeight) {
    top = innerHeight - popoverRect.height - 10
  }
  if (top < 10) {
    top = 10
  }

  // Apply width if auto
  if (props.width === 'auto') {
    const triggerWidth = triggerRect.width
    popoverRef.value.style.width = `${triggerWidth}px`
    popoverRef.value.style.maxWidth = `${triggerWidth}px`
    console.log('Auto width applied:', triggerWidth, 'px')
  }

  // Apply position
  popoverRef.value.style.position = 'fixed'
  popoverRef.value.style.top = `${top}px`
  popoverRef.value.style.left = `${left}px`
  popoverRef.value.style.zIndex = '2000'

  // Mark as positioned (this will trigger width calculation in popoverStyle)
  isPositioned.value = true
}

const show = () => {
  if (props.disabled) return

  clearTimeout(hideTimer.value)

  if (props.openDelay > 0 && props.trigger === 'hover') {
    hoverTimer.value = setTimeout(() => {
      visible.value = true
      emit('show')
    }, props.openDelay)
  } else {
    visible.value = true
    emit('show')
  }
}

const hide = () => {
  clearTimeout(hoverTimer.value)

  if (props.closeDelay > 0 && props.trigger === 'hover') {
    hideTimer.value = setTimeout(() => {
      visible.value = false
      emit('hide')
    }, props.closeDelay)
  } else {
    visible.value = false
    emit('hide')
  }
}

const handleTriggerClick = () => {
  if (props.trigger !== 'click') return

  if (visible.value) {
    hide()
  } else {
    show()
  }
}

const handleMouseEnter = () => {
  if (props.trigger !== 'hover') return
  clearTimeout(hideTimer.value)
  show()
}

const handleMouseLeave = () => {
  if (props.trigger !== 'hover') return
  // Delay hiding to allow mouse to move to popover
  hideTimer.value = setTimeout(() => {
    hide()
  }, props.closeDelay)
}

const handlePopoverMouseEnter = () => {
  if (props.trigger !== 'hover') return
  // Cancel hiding when mouse enters popover
  clearTimeout(hideTimer.value)
}

const handlePopoverMouseLeave = () => {
  if (props.trigger !== 'hover') return
  // Hide immediately when mouse leaves popover
  clearTimeout(hoverTimer.value)
  visible.value = false
  emit('hide')
}

const handleFocus = () => {
  if (props.trigger !== 'focus') return
  show()
}

const handleBlur = () => {
  if (props.trigger !== 'focus') return
  hide()
}

const handleClickOutside = (event: Event) => {
  if (
    !triggerRef.value?.contains(event.target as Node) &&
    !popoverRef.value?.contains(event.target as Node)
  ) {
    hide()
  }
}

const onBeforeEnter = () => {
  emit('before-enter')
}

const onAfterEnter = () => {
  // Ensure position is correct after animation
  if (!isPositioned.value) {
    calculatePosition()
  }
  emit('after-enter')
}

const onBeforeLeave = () => {
  emit('before-leave')
}

const onAfterLeave = () => {
  emit('after-leave')
}

watch(visible, (newVisible) => {
  if (newVisible) {
    isPositioned.value = false
    // Calculate position after a short delay to ensure DOM is ready
    setTimeout(() => {
      calculatePosition()
    }, 50)

    if (props.hideAfter > 0) {
      setTimeout(() => {
        hide()
      }, props.hideAfter)
    }
  } else {
    isPositioned.value = false
  }
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', calculatePosition)
  window.addEventListener('resize', calculatePosition)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', calculatePosition)
  window.removeEventListener('resize', calculatePosition)

  clearTimeout(hoverTimer.value)
  clearTimeout(hideTimer.value)
})

// Expose methods for manual control
defineExpose({
  show,
  hide,
  visible
})
</script>

<style lang="postcss">
.popover-wrapper {
  display: inline-block;
}

.popover-trigger {
  display: inline-block;
}

.popover {
  position: fixed;
  background: white;
  border: 1px solid var(--color-grayscale-30);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 0;
  font-size: 14px;
  line-height: 1.4;
  color: var(--color-text);
  word-wrap: break-word;
  max-width: 276px;
  min-width: 150px;
  z-index: 2000;
}

.popover--initial {
  opacity: 0 !important;
  pointer-events: none !important;
}

.popover--dark {
  background: var(--color-background-secondary);
  border-color: var(--color-grayscale-70);
  color: white;
}

.popover--dark .popover__title {
  border-bottom-color: var(--color-grayscale-70);
}

.popover__content {
  padding: 12px;
}

.popover__title {
  font-weight: 600;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-grayscale-30);
  color: var(--color-text);
}

.popover--dark .popover__title {
  color: white;
}

.popover__body {
  margin: 0;
  padding: 0;
}

/* Arrow styles */
.popover--arrow::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 6px solid transparent;
}

.popover--top::before {
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  border-top-color: white;
}

.popover--bottom::before {
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  border-bottom-color: white;
}

.popover--left::before {
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  border-left-color: white;
}

.popover--right::before {
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
  border-right-color: white;
}

/* Dark theme arrows */
.popover--dark.popover--top::before {
  border-top-color: var(--color-background-secondary);
}

.popover--dark.popover--bottom::before {
  border-bottom-color: var(--color-background-secondary);
}

.popover--dark.popover--left::before {
  border-left-color: var(--color-background-secondary);
}

.popover--dark.popover--right::before {
  border-right-color: var(--color-background-secondary);
}

/* Transitions */
.popover-enter-active {
  transition: opacity 0.15s ease-out, transform 0.15s ease-out;
}

.popover-leave-active {
  transition: opacity 0.1s ease-in, transform 0.1s ease-in;
}

.popover-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.popover-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.popover-enter-to,
.popover-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .popover {
    max-width: calc(100vw - 32px);
    margin: 0 16px;
  }
}
</style>
