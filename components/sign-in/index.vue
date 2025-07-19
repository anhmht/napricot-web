<template>
  <div :class="$style.signIn">
    <form>
      <custom-alert v-if="errorMessage" type="error" :title="errorMessage" />
      <CustomInputField
        ref="emailRef"
        :disabled="isLoading"
        v-model="form.email"
        name="email"
        label="Email Address"
        type="email"
        autocomplete="email"
        :validator="validateEmail"
      />
      <CustomInputField
        ref="passwordRef"
        v-model="form.password"
        name="password"
        label="Password"
        type="password"
        autocomplete="current-password"
        :disabled="isLoading"
        :validator="validatePassword"
      />
      <div :class="$style.remember">
        <custom-checkbox
          v-model="form.rememberMe"
          name="rememberMe"
          label="Remember me"
          :disabled="isLoading"
        />
        <NuxtLink to="/forgot-password" disabled>
          <i class="icon-lock" />
          Forgot password?
        </NuxtLink>
      </div>
      <custom-button
        :class="$style.btnSignIn"
        type="primary"
        @click="submitForm"
        :disabled="isLoading"
        :loading="isLoading"
        >Sign in
        <i class="icon-arrow-right" v-if="!isLoading" />
      </custom-button>
    </form>
  </div>
</template>

<script setup lang="ts">
import CustomInputField from '~/components/custom/field/index.vue'
const form = reactive({
  email: '',
  password: '',
  rememberMe: true
})

const emailRef = ref(null)
const passwordRef = ref(null)

const isLoading = ref(false)
const errorMessage = ref('')
const emit = defineEmits(['loading'])

// Validation functions
const validateEmail = (email) => {
  if (!email) {
    return 'Email is required'
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address'
  }
  return ''
}

const validatePassword = (password) => {
  if (!password) {
    return 'Password is required'
  }
  return ''
}
const { success } = useNotification()
const validation = useFormValidation('signIn')
// Register fields first
validation.registerField('email', emailRef, validateEmail)
validation.registerField('password', passwordRef, validatePassword)

const submitForm = async (e: Event) => {
  e.preventDefault()
  const isValid = await validation.validateAllFields()
  if (isValid) {
    isLoading.value = true
    emit('loading', true)
    try {
      const { signIn } = useAuth()
      await signIn(form.email, form.password, form.rememberMe)
      success({
        title: 'Success',
        message: 'You have successfully signed in'
      })
      navigateTo('/')
    } catch (error: any) {
      const errorData = errorHandler(error)
      errorMessage.value = errorData?.message
    } finally {
      isLoading.value = false
      emit('loading', false)
    }
  }
}

onUnmounted(() => {
  validation.destroyForm()
})
</script>

<style lang="postcss" module>
.signIn {
  position: relative;
}
.remember {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem 0;
  a {
    text-decoration: none;
    line-height: 20px;
    display: flex;
    gap: 4px;
    font-size: 1.4rem;
    font-weight: 400;
    color: var(--color-text);
    i {
      font-size: 1.6rem;
      padding-top: 1px;
      color: var(--color-icon);
    }
    &:hover {
      color: var(--color-primary);
      i {
        color: var(--color-primary);
      }
    }
  }
}
.btnSignIn {
  margin-top: 1rem;
}
.loading {
  margin-left: 4px;
}
</style>
