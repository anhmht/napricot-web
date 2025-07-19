<template>
  <div :class="$style.signUp">
    <form>
      <custom-alert v-if="errorMessage" type="error" :title="errorMessage" />
      <InputField
        ref="fullNameRef"
        v-model="form.fullName"
        label="Full Name"
        :disabled="isLoading"
        autocomplete="name"
        :validator="validateFullName"
      />
      <InputField
        ref="emailRef"
        v-model="form.email"
        label="Email Address"
        type="email"
        :disabled="isLoading"
        autocomplete="email"
        :validator="validateEmail"
      />
      <InputField
        ref="passwordRef"
        v-model="form.password"
        label="Password"
        type="password"
        :disabled="isLoading"
        placeholder="8+ characters"
        autocomplete="new-password"
        :validator="validatePassword"
      />
      <InputField
        ref="confirmPasswordRef"
        v-model="form.confirmPassword"
        label="Confirm Password"
        type="password"
        :disabled="isLoading"
        autocomplete="new-password"
        :validator="validateConfirmPassword"
      />
      <div :class="$style.agreement">
        <custom-checkbox
          :class="$style.checkbox"
          v-model="form.agree"
          name="agree"
          label=""
          :disabled="isLoading"
        />
        <span>
          I agree to Napricot
          <NuxtLink to="/policy/terms">Terms of Service</NuxtLink> and
          <NuxtLink to="/policy/privacy"> Privacy Policy </NuxtLink></span
        >
      </div>
      <custom-button
        type="primary"
        @click="submitForm"
        :disabled="!form.agree || isLoading"
        >Sign up
        <i class="icon-arrow-right" />
      </custom-button>
    </form>
  </div>
</template>

<script setup lang="ts">
import InputField from '~/components/custom/field/index.vue'

const { success } = useNotification()
const fullNameRef = ref()
const emailRef = ref()
const passwordRef = ref()
const confirmPasswordRef = ref()
const isLoading = ref(false)
const errorMessage = ref('')
const emit = defineEmits(['loading'])
const store = useMainStore()
const form = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: true
})
// Validation functions
const validateFullName = (value: string) => {
  if (!value || value.trim() === '') {
    return 'Please input full name'
  }
  return ''
}

const validateEmail = (value: string) => {
  if (!value || value.trim() === '') {
    return 'Please input email address'
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) {
    return 'Please input correct email address'
  }
  return ''
}

const validatePassword = (value: string) => {
  if (!value || value.trim() === '') {
    return 'Please input password'
  }
  if (value.length < 8) {
    return 'Password must be at least 8 characters'
  }
  return ''
}

const validateConfirmPassword = (value: string) => {
  if (!value || value.trim() === '') {
    return 'Please input confirm password'
  }
  if (value !== form.password) {
    return 'The password does not match'
  }
  return ''
}

const validation = useFormValidation('signUp')
validation.registerField('fullName', fullNameRef, validateFullName)
validation.registerField('email', emailRef, validateEmail)
validation.registerField('password', passwordRef, validatePassword)
validation.registerField(
  'confirmPassword',
  confirmPasswordRef,
  validateConfirmPassword
)

const { setUser } = useAuth()

const submitForm = async () => {
  // Check agreement
  if (!form.agree) {
    errorMessage.value =
      'Please agree to the terms of service and privacy policy'
    return
  }

  const isValid = await validation.validateAllFields()
  if (!isValid) {
    return
  }

  isLoading.value = true
  emit('loading', true)
  errorMessage.value = ''

  try {
    const user = await $userService.register({
      name: form.fullName,
      email: form.email,
      password: form.password
    })

    setUser(user)
    success({
      title: 'Sign up successfully',
      message: `An email has been sent to you`
    })

    navigateTo('/email-verification')
  } catch (error: any) {
    errorMessage.value = error.message
  }

  isLoading.value = false
  emit('loading', false)
}

onUnmounted(() => {
  validation.destroyForm()
})
</script>

<style lang="postcss" module>
.signUp {
  position: relative;
}
.agreement {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 16px;
  span {
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--color-icon);
  }
  a {
    color: #2da5f3;
    font-weight: 400;
    text-decoration: none;
  }
}
.checkbox {
  padding-top: 4px;
}
</style>
