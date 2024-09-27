<template>
  <div :class="$style.field">
    <el-form-item :label="label" :prop="name" label-position="top">
      <el-input
        ref="inputRef"
        :class="$style.input"
        :model-value="modelValue"
        :type="typeRef"
        @input="(value: string) => {
          $emit('update:modelValue', value)
          $emit('input', value)
        }"
        @keyup.enter="$emit('keyup')"
        v-bind="$attrs"
      >
        <template v-if="type === 'password'" #suffix>
          <i
            :class="visible ? 'icon-visibility-off' : 'icon-eye'"
            @click="handlePasswordVisibility"
          ></i>
        </template>
      </el-input>
    </el-form-item>
    <slot name="button" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  }
})
defineEmits(['update:modelValue', 'keyup', 'input'])
const inputRef = ref()

const visible = ref(false)
const typeRef = ref(props.type)
const handlePasswordVisibility = () => {
  visible.value = !visible.value
  typeRef.value = visible.value ? 'text' : 'password'
}
</script>

<style lang="postcss" module>
.field {
  position: relative;
  :global(.el-form-item) {
    margin-bottom: 16px;
  }
}
.input {
  i {
    cursor: pointer;
  }
  :global(.el-input__wrapper) {
    border-radius: 2px;
  }
  :global(.el-input__inner) {
    height: 44px;
    font-size: 1.6rem;
    font-weight: 400;
  }
  :global(.el-icon) {
    display: none;
  }
  :global(.el-textarea__inner) {
    border-radius: 12px;
  }
}
</style>
