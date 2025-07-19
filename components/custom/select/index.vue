<template>
  <div class="form-group" :class="{ 'has-validator': !!validator }">
    <label :for="label" v-if="label">{{ label }}</label>
    <div class="select-wrapper">
      <div
        ref="selectRef"
        class="select-input"
        :class="{
          error: hasError,
          disabled: disabled,
          open: isOpen,
          'has-value': hasValue
        }"
        :tabindex="disabled ? -1 : 0"
        @click="toggleDropdown"
        @keydown="handleKeydown"
        @blur="handleBlur"
      >
        <span v-if="selectedLabel" class="selected-value">
          {{ selectedLabel }}
        </span>
        <span v-else class="placeholder">
          {{ placeholder }}
        </span>

        <div class="select-actions">
          <i
            v-if="clearable && hasValue"
            class="icon-close clear-button"
            @click.stop="clearSelection"
          ></i>
          <i
            class="dropdown-arrow icon-arrow-down"
            :class="{ open: isOpen }"
          ></i>
        </div>
      </div>

      <Teleport to="body">
        <Transition name="dropdown">
          <div
            v-if="isOpen"
            ref="dropdownRef"
            class="select-dropdown"
            :style="dropdownStyle"
          >
            <div
              v-for="(option, index) in options"
              :key="option.value"
              class="option-item"
              :class="{
                selected: isSelected(option.value),
                highlighted: highlightedIndex === index
              }"
              @click="selectOption(option)"
              @mouseenter="highlightedIndex = index"
            >
              {{ option.label }}
            </div>
            <div v-if="options.length === 0" class="no-options">
              No options available
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>

    <Transition name="error-slide">
      <div v-if="internalErrorMessage" class="field-error">
        {{ internalErrorMessage }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

interface Props {
  modelValue: string | number | string[] | number[] | undefined
  label?: string
  placeholder?: string
  options: SelectOption[]
  clearable?: boolean
  disabled?: boolean
  errorMessage?: string
  validator?: (value: any) => string
  multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Please select',
  clearable: false,
  disabled: false,
  errorMessage: '',
  validator: undefined,
  multiple: false
})

const emit = defineEmits<{
  'update:modelValue': [
    value: string | number | string[] | number[] | undefined
  ]
  input: [value: string | number | string[] | number[] | undefined]
  blur: [event: FocusEvent]
  change: [value: string | number | string[] | number[] | undefined]
}>()

// Refs
const selectRef = ref<HTMLElement>()
const dropdownRef = ref<HTMLElement>()

// State
const isOpen = ref(false)
const highlightedIndex = ref(-1)
const internalErrorMessage = ref('')
const dropdownStyle = ref({})

// Computed properties
const hasError = computed(() => {
  return !!internalErrorMessage.value || !!props.errorMessage
})

const hasValue = computed(() => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.length > 0
  }
  return (
    props.modelValue !== undefined &&
    props.modelValue !== null &&
    props.modelValue !== ''
  )
})

const selectedLabel = computed(() => {
  if (!hasValue.value) return ''

  if (props.multiple && Array.isArray(props.modelValue)) {
    const selectedOptions = props.options.filter((option) =>
      (props.modelValue as (string | number)[]).includes(option.value)
    )
    return selectedOptions.map((option) => option.label).join(', ')
  }

  const selectedOption = props.options.find(
    (option) => option.value === props.modelValue
  )
  return selectedOption?.label || ''
})

// Methods
const toggleDropdown = () => {
  if (props.disabled) return

  if (isOpen.value) {
    closeDropdown()
  } else {
    openDropdown()
  }
}

const openDropdown = () => {
  if (props.disabled) return

  isOpen.value = true
  highlightedIndex.value = -1

  nextTick(() => {
    calculateDropdownPosition()
    // Focus on current selected option
    const currentIndex = props.options.findIndex(
      (option) => option.value === props.modelValue
    )
    if (currentIndex >= 0) {
      highlightedIndex.value = currentIndex
    }
  })
}

const closeDropdown = () => {
  isOpen.value = false
  highlightedIndex.value = -1
}

const selectOption = (option: SelectOption) => {
  if (option.disabled) return

  let newValue: any

  if (props.multiple) {
    const currentValue = Array.isArray(props.modelValue)
      ? [...props.modelValue]
      : []
    const index = currentValue.indexOf(option.value)

    if (index > -1) {
      currentValue.splice(index, 1)
    } else {
      currentValue.push(option.value)
    }

    newValue = currentValue
  } else {
    newValue = option.value
    closeDropdown()
  }

  emit('update:modelValue', newValue)
  emit('input', newValue)
  emit('change', newValue)

  // Validation
  if (props.validator) {
    nextTick(() => {
      validateField()
    })
  }
}

const isSelected = (value: string | number) => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    return (props.modelValue as (string | number)[]).includes(value)
  }
  return props.modelValue === value
}

const clearSelection = () => {
  const newValue = props.multiple ? [] : undefined
  emit('update:modelValue', newValue)
  emit('input', newValue)
  emit('change', newValue)

  if (props.validator) {
    nextTick(() => {
      validateField()
    })
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled) return

  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (!isOpen.value) {
        openDropdown()
      } else if (highlightedIndex.value >= 0) {
        selectOption(props.options[highlightedIndex.value])
      }
      break

    case 'Escape':
      closeDropdown()
      selectRef.value?.focus()
      break

    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) {
        openDropdown()
      } else {
        highlightedIndex.value = Math.min(
          highlightedIndex.value + 1,
          props.options.length - 1
        )
      }
      break

    case 'ArrowUp':
      event.preventDefault()
      if (isOpen.value) {
        highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
      }
      break

    case 'Tab':
      closeDropdown()
      break
  }
}

const handleBlur = (event: FocusEvent) => {
  // Don't close if focus is moving to dropdown
  const relatedTarget = event.relatedTarget as HTMLElement
  if (relatedTarget && dropdownRef.value?.contains(relatedTarget)) {
    return
  }

  setTimeout(() => {
    closeDropdown()
  }, 150)

  emit('blur', event)

  // Validation on blur
  if (props.validator) {
    validateField()
  }
}

const calculateDropdownPosition = () => {
  if (!selectRef.value) return

  const selectRect = selectRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const windowWidth = window.innerWidth

  // Default positioning below the select
  let top = selectRect.bottom + window.scrollY + 4
  let left = selectRect.left + window.scrollX

  // Adjust width to match select
  const width = selectRect.width

  // Check if dropdown should open upward
  if (dropdownRef.value) {
    const dropdownHeight = dropdownRef.value.offsetHeight
    const spaceBelow = windowHeight - selectRect.bottom
    const spaceAbove = selectRect.top

    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      top = selectRect.top + window.scrollY - dropdownHeight - 4
    }
  }

  // Ensure dropdown doesn't go off-screen horizontally
  if (left + width > windowWidth) {
    left = windowWidth - width - 10
  }
  if (left < 10) {
    left = 10
  }

  dropdownStyle.value = {
    position: 'absolute',
    top: `${top}px`,
    left: `${left}px`,
    width: `${width}px`,
    zIndex: 9999
  }
}

const validateField = () => {
  if (props.validator) {
    internalErrorMessage.value = props.validator(props.modelValue)
    return internalErrorMessage.value
  }
  return ''
}

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (selectRef.value && !selectRef.value.contains(target)) {
    closeDropdown()
  }
}

// Watch for changes in props.errorMessage
watch(
  () => props.errorMessage,
  (newMessage) => {
    internalErrorMessage.value = newMessage
  }
)

// Handle scroll events to reposition dropdown
const handleScroll = () => {
  if (isOpen.value) {
    calculateDropdownPosition()
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', calculateDropdownPosition)
  window.addEventListener('scroll', handleScroll, true) // true for capture phase to catch all scroll events
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', calculateDropdownPosition)
  window.removeEventListener('scroll', handleScroll, true)
})

// Expose functions to parent component
defineExpose({
  validateField,
  clearError: () => {
    internalErrorMessage.value = ''
  },
  focus: () => {
    selectRef.value?.focus()
  },
  blur: () => {
    selectRef.value?.blur()
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

.select-wrapper {
  position: relative;
}

.select-input {
  width: 100%;
  min-height: 44px;
  padding: 1.2rem 4.8rem 1.2rem 1.6rem;
  border: 1px solid var(--color-grayscale-40);
  border-radius: 2px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  transition: all 0.2s ease;
  color: var(--color-text);
  box-sizing: border-box;
  outline: none;
}

.select-input:focus {
  border-color: var(--color-primary);
}

.select-input.open {
  border-color: var(--color-primary);
}

.select-input.disabled {
  background: var(--color-bg-disabled);
  cursor: not-allowed;
  opacity: 0.7;
}

.select-input.error {
  border-color: var(--color-error);
  border-width: 1px;
}

.selected-value {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-text);
  font-weight: 400;
}

.placeholder {
  flex: 1;
  color: #757575;
  font-weight: 400;
}

.select-actions {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  position: absolute;
  right: 1.6rem;
  top: 50%;
  transform: translateY(-50%);
}

.clear-button {
  font-size: 1.4rem;
  color: var(--color-grayscale-60);
  cursor: pointer;
  transition: color 0.2s ease;
}

.clear-button:hover {
  color: var(--color-error);
}

.dropdown-arrow {
  font-size: 1.8rem;
  color: var(--color-grayscale-60);
  transition: transform 0.2s ease, color 0.2s ease;
  &.open {
    transform: rotate(180deg);
  }
}

.select-input:focus .dropdown-arrow,
.select-input.open .dropdown-arrow {
  color: var(--color-primary);
}

.select-dropdown {
  position: absolute;
  background: white;
  border: 1px solid var(--color-grayscale-40);
  border-radius: 2px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  max-height: 200px;
  overflow-y: auto;
  box-sizing: border-box;
}

.option-item {
  padding: 1.2rem 1.6rem;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 400;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid var(--color-grayscale-20);
}

.option-item:last-child {
  border-bottom: none;
}

.option-item:hover,
.option-item.highlighted {
  background-color: var(--color-grayscale-10);
}

.option-item.selected {
  background-color: var(--color-primary-light);
  color: white;
  font-weight: 400;
}

.option-item.selected:hover,
.option-item.selected.highlighted {
  background-color: var(--color-primary-light);
}

.no-options {
  padding: 1.2rem 1.6rem;
  color: var(--color-grayscale-60);
  font-size: 1.4rem;
  text-align: center;
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

/* Dropdown transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Error transitions */
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
  .select-input {
    padding: 1rem 4.4rem 1rem 1.4rem;
  }

  .option-item {
    padding: 1rem 1.4rem;
  }
}
</style>
