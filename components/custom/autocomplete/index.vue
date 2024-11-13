<template>
  <div :class="$style.field">
    <el-form-item :label="label" :prop="name" label-position="top">
      <el-select
        :model-value="modelValue"
        filterable
        remote
        remote-show-suffix
        :remote-method="remoteMethod"
        :loading="loading"
        placeholder="Search posts, products here"
        :clearable="clearable"
        v-bind="$attrs"
        :class="$style.select"
        @change="
          ($event) => {
            $emit('update:modelValue', $event), $emit('input', $event)
          }
        "
      >
        <template #loading>
          <svg class="circular" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" />
          </svg>
        </template>
        <slot v-if="customOptions" />
        <template v-else>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </template>
      </el-select>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce'
import { OptionType } from 'element-plus/lib/components/select-v2/src/select.types.js'
import { OptionGroup } from 'element-plus/es/components/select-v2/src/select.types.mjs'

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
    type: Array as () => OptionType[] | OptionGroup[],
    default: []
  },
  clearable: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  customOptions: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'input', 'search'])

const remoteMethod = debounce((query: string) => {
  emit('search', query.trim())
}, 500)
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
</style>
<style>
.el-select-dropdown__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 20px;
}

.circular {
  display: inline;
  height: 30px;
  width: 30px;
  animation: loading-rotate 2s linear infinite;
}
.path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--el-color-primary);
  stroke-linecap: round;
}
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>
