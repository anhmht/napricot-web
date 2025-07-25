<template>
  <div class="form-group" :class="{ 'has-validator': !!validator }">
    <label v-if="label">{{ label }}</label>
    <div class="input-wrapper">
      <div v-if="$slots.prefix" class="input-prefix">
        <slot name="prefix"></slot>
      </div>
      <input
        :value="modelValue"
        :type="typeRef"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :class="{
          error: hasError,
          'has-prefix': $slots.prefix,
          'has-suffix': $slots.suffix || type === 'password'
        }"
        :autocomplete="autocompleteValue"
        @input="handleInput"
        @blur="handleBlur"
        @keyup.enter="$emit('keyup')"
      />
      <div v-if="$slots.suffix || type === 'password'" class="input-suffix">
        <slot name="suffix"></slot>
        <i
          v-if="type === 'password'"
          :class="visible ? 'icon-visibility-off' : 'icon-eye'"
          class="password-toggle"
          @click="handlePasswordVisibility"
        ></i>
      </div>
    </div>
    <Transition name="error-slide">
      <div v-if="internalErrorMessage" class="field-error">
        {{ internalErrorMessage }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errorMessage?: string
  id?: string
  validator?: (value: string) => string
  autocomplete?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  required: false,
  disabled: false,
  errorMessage: '',
  validator: undefined,
  autocomplete: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  input: [event: Event]
  keyup: []
}>()

// Internal validation error state
const internalErrorMessage = ref('')

const hasError = computed(() => {
  return !!internalErrorMessage.value || !!props.errorMessage
})

// Password visibility toggle
const visible = ref(false)
const typeRef = ref(props.type)

const handlePasswordVisibility = () => {
  visible.value = !visible.value
  typeRef.value = visible.value ? 'text' : 'password'
}

// Validation function
const validateField = () => {
  if (props.validator) {
    internalErrorMessage.value = props.validator(props.modelValue)

    return internalErrorMessage.value
  }
  return ''
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', event)

  // Real-time validation on input
  if (props.validator) {
    nextTick(() => {
      validateField()
    })
  }
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)

  // Real-time validation on blur
  if (props.validator) {
    validateField()
  }
}

// Update typeRef when props.type changes
watch(
  () => props.type,
  (newType) => {
    typeRef.value = newType
    visible.value = false
  }
)

// Watch for changes in props.errorMessage
watch(
  () => props.errorMessage,
  (newMessage) => {
    internalErrorMessage.value = newMessage
  }
)

// Compute autocomplete value based on type if not explicitly provided
const autocompleteValue = computed(() => {
  if (props.autocomplete !== undefined) {
    return props.autocomplete
  }

  // Default autocomplete values based on input type
  switch (props.type) {
    case 'password':
      return 'current-password'
    case 'email':
      return 'email'
    case 'text':
      return 'off'
    default:
      return 'off'
  }
})

// Expose functions to parent component
defineExpose({
  validateField,
  clearError: () => {
    internalErrorMessage.value = ''
  }
})
</script>

<style scoped>
.form-group {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 0;
}

.form-group.has-validator {
  margin-bottom: 2rem;
}

.form-group label {
  color: var(--color-text);
  font-weight: 450;
  font-size: 1.6rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-prefix,
.input-suffix {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  color: var(--color-grayscale-60);
  font-size: 1.6rem;
}

.input-prefix {
  left: 1.6rem;
}

.input-suffix {
  right: 1.6rem;
  gap: 0.8rem;
}

.form-group input {
  width: 100%;
  padding: 1.2rem 1.6rem;
  border: 1px solid var(--color-grayscale-40);
  border-radius: 2px;
  font-size: 1.6rem;
  transition: all 0.2s ease;
  background: white;
  color: var(--color-text);
  box-sizing: border-box;
}

.form-group input.has-prefix {
  padding-left: 4.8rem;
}

.form-group input.has-suffix {
  padding-right: 4.8rem;
}

.form-group input[type='password'] {
  padding-right: 4.8rem;
}

.form-group input[type='password'].has-suffix {
  padding-right: 7.2rem;
}

.password-toggle {
  cursor: pointer;
  font-size: 1.8rem;
  color: var(--color-grayscale-60);
  transition: color 0.2s ease;
}

.password-toggle:hover {
  color: var(--color-primary);
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.form-group input:disabled {
  background: var(--color-bg-disabled);
  cursor: not-allowed;
  opacity: 0.7;
}

.form-group input.error {
  border-color: var(--color-error);
  border-width: 1px;
}

.field-error {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  color: var(--color-error);
  font-size: 1.3rem;
  font-weight: 400;
  margin-top: 0.2rem;
  z-index: 1;
}

/* Transition styles for slide-down effect */
.error-slide-enter-active,
.error-slide-leave-active {
  transition: all 0.3s ease;
}

.error-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.error-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 768px) {
  .form-group input {
    padding: 1rem 1.4rem;
  }

  .form-group input.has-prefix {
    padding-left: 4.4rem;
  }

  .form-group input.has-suffix {
    padding-right: 4.4rem;
  }

  .form-group input[type='password'].has-suffix {
    padding-right: 6.8rem;
  }

  .input-prefix {
    left: 1.4rem;
  }

  .input-suffix {
    right: 1.4rem;
  }
}
</style>
