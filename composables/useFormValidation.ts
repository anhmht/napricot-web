interface ValidationRule {
  validator: (value: string) => string
  fieldRef: Ref<any>
}

interface ValidationRegistry {
  [fieldName: string]: ValidationRule
}

interface FormRegistry {
  [formName: string]: {
    validationRegistry: ValidationRegistry
    isValidating: boolean
    formErrors: Record<string, string>
  }
}

// Global registry to store all forms
const globalFormRegistry = ref<FormRegistry>({})

export const useFormValidation = (formName: string = 'default') => {
  // Initialize form registry if it doesn't exist
  if (!globalFormRegistry.value[formName]) {
    globalFormRegistry.value[formName] = {
      validationRegistry: {},
      isValidating: false,
      formErrors: reactive({})
    }
  }

  const currentForm = globalFormRegistry.value[formName]

  // Register a field for validation
  const registerField = (
    fieldName: string,
    fieldRef: Ref<any>,
    validator: (value: string) => string
  ) => {
    currentForm.validationRegistry[fieldName] = {
      validator,
      fieldRef
    }
  }

  // Unregister a field (useful for cleanup)
  const unregisterField = (fieldName: string) => {
    delete currentForm.validationRegistry[fieldName]
    delete currentForm.formErrors[fieldName]
  }

  // Unregister all fields from validation registry
  const unregisterAllFields = () => {
    currentForm.validationRegistry = {}
    Object.keys(currentForm.formErrors).forEach((key) => {
      delete currentForm.formErrors[key]
    })
  }

  // Validate a specific field
  const validateField = async (fieldName: string, value: string) => {
    const field = currentForm.validationRegistry[fieldName]
    if (!field) {
      return true
    }

    const error = field.validator(value)
    currentForm.formErrors[fieldName] = error

    // Trigger validation on the component if it has the method (optional)
    try {
      if ('validateField' in field.fieldRef) {
        ;(field.fieldRef as any).validateField()
      }
    } catch (e) {
      // Ignore errors from field component validation
    }

    return !error
  }

  // Validate all registered fields using current form values
  const validateAllFields = async () => {
    currentForm.isValidating = true
    const results: boolean[] = []

    for (const [fieldName, field] of Object.entries(
      currentForm.validationRegistry
    )) {
      const errorMessage = (field.fieldRef as any).validateField()
      // Update form errors with the result
      currentForm.formErrors[fieldName] = errorMessage || ''
      results.push(!errorMessage)
    }

    currentForm.isValidating = false
    return results.every((result) => result)
  }

  // Clear all validation errors
  const clearAllErrors = () => {
    Object.values(currentForm.validationRegistry).forEach((field) => {
      if ('clearError' in field.fieldRef) {
        ;(field.fieldRef as any).clearError()
      }
    })
    Object.keys(currentForm.formErrors).forEach((key) => {
      delete currentForm.formErrors[key]
    })
  }

  // Create reactive references for the current form
  const formErrors = computed(() => currentForm.formErrors)
  const isValidating = computed(() => currentForm.isValidating)

  // Check if form is valid
  const isFormValid = computed(() => {
    const errors = formErrors.value
    const registeredFields = Object.keys(currentForm.validationRegistry)

    // If no fields are registered, form is invalid
    if (registeredFields.length === 0) {
      return false
    }

    // Check if all registered fields have been validated (have error entries)
    const allFieldsValidated = registeredFields.every(
      (fieldName) => fieldName in errors
    )

    // If not all fields have been validated, form is invalid
    if (!allFieldsValidated) {
      return false
    }

    // All fields validated, check if all errors are empty
    return Object.values(errors).every((error) => !error)
  })

  // Get all current errors
  const getAllErrors = computed(() => {
    return Object.entries(formErrors.value)
      .filter(([_, error]) => error)
      .reduce((acc, [field, error]) => {
        acc[field] = error
        return acc
      }, {} as { [key: string]: string })
  })

  // Remove entire form from registry
  const destroyForm = () => {
    delete globalFormRegistry.value[formName]
  }

  return {
    formName,
    registerField,
    unregisterField,
    unregisterAllFields,
    validateField,
    validateAllFields,
    clearAllErrors,
    destroyForm,
    isValidating: readonly(isValidating),
    isFormValid,
    formErrors: readonly(formErrors),
    getAllErrors
  }
}
