<template>
  <div :class="$style.form">
    <div :class="$style.header">
      <h5>An email has been sent to you</h5>
      <p>
        Check the email that's associated with your account for the verification
        code.
      </p>
    </div>
    <form :class="$style.formContent">
      <custom-alert v-if="errorMessage" type="error" :title="errorMessage" />
      <CustomInputField
        ref="codeRef"
        v-model="form.code"
        name="code"
        label="Verification Code"
        :disabled="isLoading"
        :validator="validateCode"
      >
        <template #button>
          <a :class="$style.resend" @click="resendCode">Resend code</a>
        </template>
      </CustomInputField>
      <custom-button type="primary" @click="submitForm" :disabled="isLoading"
        >Verify code
        <i class="icon-arrow-right" />
      </custom-button>
    </form>
    <custom-loading :loading="isLoading" />
  </div>
</template>

<script setup lang="ts">
import CustomInputField from '~/components/custom/field/index.vue'
const { success } = useNotification()
const { isLoggedIn, user } = useAuth()
const errorMessage = ref('')
const isLoading = ref(false)
const codeRef = ref(null)
const form = reactive({
  code: ''
})

const resendCode = async () => {
  if (!isLoggedIn.value || !user.value?.email) {
    errorMessage.value = `Please sign in first`
    return
  }

  isLoading.value = true

  try {
    await $userService.resendCode(user.value?.email)

    success({
      title: 'Resend code successfully',
      message: `please check your email ${user.value?.email}`
    })
  } catch (error: any) {
    errorMessage.value = error.message
  }
  isLoading.value = false
}

const validateCode = (value: string) => {
  if (!value || value.trim() === '') {
    return 'Please input verification code'
  }
  return ''
}

const validation = useFormValidation('emailVerification')
validation.registerField('code', codeRef, validateCode)

const submitForm = async () => {
  if (!isLoggedIn.value || !user.value) {
    errorMessage.value = `Please sign in first`
    return
  }

  const isValid = await validation.validateAllFields()
  if (!isValid) {
    return
  }
  isLoading.value = true
  try {
    await $userService.verifyCode(form.code, user.value?.email!)
    success({
      title: 'Email verified',
      message: `Welcome ${user.value?.name}`
    })
  } catch (error: any) {
    errorMessage.value = error.message
  }
  isLoading.value = false
  navigateTo('/')
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
  }
}
.formContent {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}
.resend {
  position: absolute;
  top: 0;
  right: 0;
  text-decoration: none;
  font-weight: 400;
  font-size: 1.6rem;
  color: var(--color-primary);
  cursor: pointer;
  &:hover {
    color: var(--color-primary-light);
  }
}
</style>
