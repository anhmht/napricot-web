<template>
  <div :class="$style.root">
    <el-form-item
      :class="$style.field"
      label="Focus Keyword"
      prop="keyword"
      label-position="top"
      :error="error"
      :validate-status="error ? 'error' : ''"
    >
      <el-input
        :class="$style.input"
        v-model="input"
        size="large"
        placeholder="Please Input Focus Keyword"
      />
    </el-form-item>
    <div :class="$style.button">
      <el-button circle @click="add">
        <i class="icon-add"></i>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Array<string>,
    default: []
  }
})
const emit = defineEmits(['update:modelValue', 'change'])

const input = ref<string>('')
const error = ref<string>('')

const add = () => {
  if (!input.value) {
    error.value = 'Please input focus keyword'
    return
  }
  if (props.modelValue.includes(input.value)) {
    error.value = 'Keyword already exists'
    return
  }
  emit('update:modelValue', [input.value, ...props.modelValue])
  emit('change', [input.value, ...props.modelValue])
  input.value = ''
  error.value = ''
}
</script>

<style module lang="postcss">
.root {
  display: flex;
  gap: 16px;
}
.field {
  flex: 1;
  margin-bottom: 0 !important;
}
.input {
  :global(.el-input__inner) {
    height: 44px;
    font-size: 1.6rem;
    font-weight: 400;
  }
}
.button {
  display: flex;
  align-items: flex-end;
  button {
    width: 46px !important;
    height: 46px;
  }
}
</style>
