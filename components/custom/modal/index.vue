<template>
  <el-dialog
    :class="$style.modal"
    :model-value="open"
    :width="width"
    :show-close="false"
    destroy-on-close
    @close="handleClose"
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
defineProps({
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
  }
})

const emit = defineEmits(['update:open'])

const handleClose = () => {
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
