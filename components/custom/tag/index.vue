<template>
  <div>
    <div :class="$style.customTag">
      <el-form-item
        :class="$style.field"
        :label="label"
        :prop="name"
        label-position="top"
        :error="error"
        :validate-status="error ? 'error' : ''"
      >
        <el-input
          :class="$style.input"
          v-model="input"
          size="large"
          placeholder="Please Input"
        />
      </el-form-item>
      <div :class="$style.button">
        <el-button circle @click="addTag">
          <i class="icon-add"></i>
        </el-button>
      </div>
    </div>
    <el-scrollbar :class="$style.tags" max-height="150px">
      <el-tag
        v-for="(tag, index) in modelValue"
        :key="index"
        closable
        type="info"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </el-tag>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Array<string>,
    default: []
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const input = ref<string>('')
const error = ref<string>('')

const addTag = () => {
  if (!input.value) {
    error.value = 'Please input tag name'
    return
  }
  if (props.modelValue.includes(input.value)) {
    error.value = 'Tag already exists'
    return
  }
  emit('update:modelValue', [input.value, ...props.modelValue])
  emit('change', [input.value, ...props.modelValue])
  input.value = ''
  error.value = ''
}

const handleClose = (tag: string) => {
  const array = props.modelValue
  const index = array.indexOf(tag)
  if (index > -1) {
    array.splice(index, 1)
  }
  emit('update:modelValue', array)
  emit('change', array)
}
</script>

<style lang="postcss" module>
.customTag {
  position: relative;
  display: flex;
  gap: 16px;
}
.field {
  flex: 1;
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
  padding-bottom: 18px;
}
.tags {
  :global(.el-scrollbar__view) {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  :global(.el-tag) {
    border-radius: 16px;
    border: none;
    padding: 4px 16px;
    padding-right: 12px;
    font-size: 1.4rem;
    color: #18181b;
    background-color: #e4e4e7;
  }
}
</style>
