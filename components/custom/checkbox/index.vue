<template>
  <div :class="[$style.checkbox, !showRequired && $style.hideRequired]">
    <el-form-item :prop="name">
      <el-checkbox
        :model-value="modelValue"
        :label="label"
        size="large"
        @change="(value) => $emit('update:modelValue', value)"
        v-bind="$attrs"
      />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  showRequired: {
    type: Boolean,
    default: false
  }
})
defineEmits(['update:modelValue'])
</script>

<style lang="postcss" module>
.checkbox {
  position: relative;
  :global(.el-form-item) {
    margin-bottom: 16px;
  }
  :global(.el-checkbox.el-checkbox--large) {
    height: 20px;
  }
  :global(.el-checkbox__inner) {
    height: 20px !important;
    width: 20px !important;
    border-radius: 4px;
    &::after {
      border: 2px solid transparent;
      border-left: 0 !important;
      border-top: 0 !important;
      height: 9px !important;
      width: 4px !important;
      left: 6px !important;
      top: 2px !important;
    }
  }
  :global(.el-checkbox__label) {
    font-size: 1.4rem;
    font-weight: 400;
    color: var(--color-text);
  }
  :global(.el-checkbox__input.is-checked + .el-checkbox__label) {
    color: var(--color-text);
  }
}
.hideRequired {
  label {
    &::before {
      content: '' !important;
    }
  }
}
</style>
