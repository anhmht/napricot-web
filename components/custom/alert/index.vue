<template>
  <div :class="['main', type, { center: center }]">
    <div v-if="showIcon" class="icon">
      <i class="icon-close-circle" />
    </div>
    <div class="content">
      <div v-if="title" class="title">{{ title }}</div>
      <div v-if="description || $slots.default" class="description">
        <slot>{{ description }}</slot>
      </div>
    </div>
    <div v-if="closable" class="close" @click="handleClose">
      <i class="icon-close-fill" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type?: 'error'
  title?: string
  description?: string
  showIcon?: boolean
  closable?: boolean
  center?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'error',
  showIcon: true,
  closable: false,
  center: false
})

const emit = defineEmits<{
  close: []
}>()

const handleClose = () => {
  emit('close')
}
</script>

<style lang="postcss" scoped>
.main {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  margin-bottom: 12px;
  border-radius: 2px;
  border: 1px solid;
  font-size: 14px;
  line-height: 1.5;
  position: relative;
  overflow: hidden;
}

.main.center {
  align-items: center;
  text-align: center;
}

.icon {
  display: flex;
  align-items: center;
  margin-right: 8px;
  flex-shrink: 0;
}

.content {
  flex: 1;
}

.title {
  font-weight: 600;
}

.description {
  margin: 0;
}

.close {
  position: absolute;
  top: 8px;
  right: 16px;
  cursor: pointer;
  opacity: 0.75;
  transition: opacity 0.2s;
}

.close:hover {
  opacity: 1;
}

/* Error variant */
.error {
  color: var(--color-error, #dc2626);
  background-color: #ffe4e4;
  border-color: #fecaca;
}
</style>
