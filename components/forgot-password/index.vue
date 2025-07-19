<template>
  <div :class="$style.form">
    <div :class="$style.header">
      <h5>Forgot Password</h5>
      <p>Enter the email address associated with your account.</p>
    </div>
    <form :class="$style.formContent">
      <custom-alert v-if="errorMessage" type="error" :title="errorMessage" />
      <CustomInputField
        ref="emailRef"
        v-model="form.email"
        name="email"
        label="Email address"
        :disabled="isLoading"
        :validator="validateEmail"
      >
      </CustomInputField>
      <custom-button type="primary" @click="submitForm" :disabled="isLoading"
        >Send reset link
        <i class="icon-arrow-right" />
      </custom-button>
      <div :class="$style.footer">
        <div>
          Already have account? <NuxtLink to="/sign-in">Sign In</NuxtLink>
        </div>
        <div>
          Don’t have account?
          <NuxtLink to="/sign-in?active=sign-up">Sign Up</NuxtLink>
        </div>
      </div>
      <div :class="$style.contact">
        You may contact
        <NuxtLink to="/help/contact">Customer Service</NuxtLink> for help
        restoring access to your account.
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import CustomInputField from '~/components/custom/field/index.vue'

const { success } = useNotification()
const errorMessage = ref('')
const isLoading = ref(false)
const emailRef = ref(null)
const form = reactive({
  email: ''
})

const validateEmail = (email: string) => {
  if (!email) {
    return 'Email is required'
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address'
  }
  return ''
}

const validation = useFormValidation('forgotPassword')
validation.registerField('email', emailRef, validateEmail)

const submitForm = async () => {
  const isValid = await validation.validateAllFields()
  if (!isValid) {
    return
  }

  isLoading.value = true
  try {
    await $userService.forgotPassword(form.email)

    success({
      title: 'An email has been sent',
      message: `Check the email that's associated with your account for the reset password link`
    })
  } catch (error: any) {
    errorMessage.value = error.message
  }

  isLoading.value = false
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
  padding: 1.6rem 0;
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
  font-size: 1.6rem;
  font-weight: 400;
  a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 700;
  }
}
</style>
