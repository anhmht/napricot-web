<template>
  <div :class="$style.button">
    <el-button :type="type" @click="$emit('click')">
      <slot />
    </el-button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String as () =>
      | ''
      | 'default'
      | 'primary'
      | 'text'
      | 'success'
      | 'warning'
      | 'info'
      | 'danger',
    default: 'primary'
  }
})
</script>

<style lang="postcss" module>
.button {
  position: relative;
  button {
    width: 100%;
    padding: 0 24px;
    height: 48px;
    border-radius: 2px;
    span {
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 48px;
    }
    i {
      margin-left: 8px;
    }
  }
}
</style>
