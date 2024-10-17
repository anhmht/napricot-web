<template>
  <el-dialog
    :class="$style.modal"
    :model-value="open"
    :width="width"
    :show-close="false"
    destroy-on-close
    @close="handleClose"
    :close-on-click-modal="!loading"
    :close-on-press-escape="!loading"
  >
    <template #header>
      <div :class="$style.header">
        <h2>{{ title }}</h2>
        <i class="icon-close-fill" @click="handleClose" />
      </div>
    </template>
    <slot />
  </el-dialog>
</template>

<script lang="ts" setup>
const props = defineProps({
  open: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Base Modal'
  },
  width: {
    type: String,
    default: '500'
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:open'])

const handleClose = () => {
  if (props.loading) return
  emit('update:open', false)
}
</script>

<style lang="postcss" module>
.modal {
  padding: 24px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      font-size: 2.4rem;
      font-weight: 500;
    }
    i {
      font-size: 1.4rem;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
  }
}
</style>
