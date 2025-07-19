<template>
  <div :class="$style.form">
    <div :class="$style.header">
      <h5>Reset Password</h5>
      <p>You will receive instructions for resetting your password.</p>
    </div>
    <form :class="$style.formContent">
      <custom-alert v-if="errorMessage" type="error" :title="errorMessage" />
      <CustomInputField
        ref="passwordRef"
        v-model="form.password"
        name="password"
        label="New Password"
        type="password"
        :disabled="isLoading"
        placeholder="8+ characters"
        :validator="validatePassword"
      >
      </CustomInputField>
      <CustomInputField
        ref="confirmPasswordRef"
        v-model="form.confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        :disabled="isLoading"
        :validator="validateConfirmPassword"
      >
      </CustomInputField>
      <custom-button type="primary" @click="submitForm" :disabled="isLoading"
        >Reset Password
        <i class="icon-arrow-right" />
      </custom-button>
    </form>
  </div>
</template>

<script setup lang="ts">
import CustomInputField from '~/components/custom/field/index.vue'

const { success, error } = useNotification()
const errorMessage = ref('')
const isLoading = ref(false)
const form = reactive({
  password: '',
  confirmPassword: ''
})
const passwordRef = ref(null)
const confirmPasswordRef = ref(null)

const route = useRoute()
const token = route.query.token as string

const validatePassword = (password: string) => {
  if (!password) {
    return 'Password is required'
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters'
  }
  return ''
}

const validateConfirmPassword = (confirmPassword: string) => {
  if (!confirmPassword) {
    return 'Confirm password is required'
  }
  if (confirmPassword !== form.password) {
    return 'Passwords do not match'
  }
  return ''
}

const validation = useFormValidation('resetPassword')
validation.registerField('password', passwordRef, validatePassword)
validation.registerField(
  'confirmPassword',
  confirmPasswordRef,
  validateConfirmPassword
)

const submitForm = async () => {
  if (!token) {
    error({
      title: 'Something went wrong',
      message: 'Please request a new reset password link'
    })
    errorMessage.value = 'Invalid token'
  }

  const isValid = await validation.validateAllFields()
  if (isValid) {
    isLoading.value = true
    try {
      await $userService.resetPassword(form.password, token)
      success({
        title: 'Password has been reset',
        message: `You can now login with your new password`
      })
      navigateTo('/sign-in')
    } catch (error: any) {
      errorMessage.value = error.message
    } finally {
      isLoading.value = false
    }
  }
}

onUnmounted(() => {
  validation.destroyForm()
})
</script>

<style lang="postcss" module>
.form {
  width: 424px;
  border: 1px solid #dcdcdc;
  box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 32px;
}
.formContent {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}
.header {
  margin-bottom: 24px;
  h5 {
    font-weight: 700;
    text-align: center;
    line-height: 28px;
    margin-bottom: 12px;
  }
  p {
    font-weight: 400;
    text-align: center;
    line-height: 20px;
    color: var(--color-icon);
    padding: 0 12px;
  }
}
.button {
  margin-top: 24px;
}
.footer {
  padding: 24px 0;
  border-bottom: 1px solid var(--color-bg-disabled);
  color: var(--color-icon);
  font-weight: 400;
  a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 700;
  }
  div + div {
    margin-top: 8px;
  }
}
.contact {
  margin-top: 24px;
  font-size: 1.6rem;
  font-weight: 400;
  a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 700;
  }
}
</style>
