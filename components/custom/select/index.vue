<template>
  <div :class="$style.field">
    <el-form-item :label="label" :prop="name" label-position="top">
      <el-select-v2
        :model-value="modelValue"
        :options="options"
        placeholder="Please select"
        :clearable="clearable"
        v-bind="$attrs"
        :class="$style.select"
        @change="
          ($event) => {
            $emit('update:modelValue', $event), $emit('input', $event)
          }
        "
      />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { OptionType } from 'element-plus/lib/components/select-v2/src/select.types.js'

const props = defineProps({
  modelValue: {
    type: [String, Array<string>],
    default: undefined
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  options: {
    type: Array as () => OptionType[],
    default: []
  },
  clearable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'input'])
</script>

<style lang="postcss" module>
.field {
  position: relative;
  :global(.el-form-item) {
    margin-bottom: 16px;
  }
}
.select {
  font-weight: 400;
}
:global(.el-select-dropdown__item) {
  font-weight: 400;
}
:global(.el-select__wrapper) {
  min-height: 44px;
  border-radius: 2px;
}
</style>
