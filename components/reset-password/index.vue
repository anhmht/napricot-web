<template>
  <div :class="$style.form">
    <div :class="$style.header">
      <h5>Reset Password</h5>
      <p>You will receive instructions for resetting your password.</p>
    </div>
    <el-form ref="formRef" :model="form" :rules="rules" hide-required-asterisk>
      <custom-alert v-if="errorMessage" type="error" :title="errorMessage" />
      <custom-field
        v-model="form.password"
        name="password"
        label="New Password"
        type="password"
        :disabled="isLoading"
        placeholder="8+ characters"
      >
      </custom-field>
      <custom-field
        v-model="form.confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        :disabled="isLoading"
      >
      </custom-field>
      <custom-button type="primary" @click="submitForm" :disabled="isLoading"
        >Reset Password
        <i class="icon-arrow-right" />
      </custom-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const errorMessage = ref('')
const isLoading = ref(false)
const formRef = ref<FormInstance>()
const form = reactive({
  password: '',
  confirmPassword: ''
})
const rules = reactive<FormRules>({
  password: [
    {
      required: true,
      message: 'Please input email address',
      trigger: ['blur', 'change']
    },
    {
      min: 8,
      message: 'Password must be at least 8 characters',
      trigger: ['blur', 'change']
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: 'Please input confirm password',
      trigger: ['blur', 'change']
    },
    {
      validator: (rule, value, callback) => {
        if (value === form.password) {
          callback()
        } else {
          callback(new Error('The password does not match'))
        }
      },
      trigger: ['blur', 'change']
    }
  ]
})

const route = useRoute()
const token = route.query.token as string

const submitForm = () => {
  if (!token) {
    ElNotification.error({
      title: 'Something went wrong',
      message: 'Please request a new reset password link'
    })
    errorMessage.value = 'Invalid token'
  }
  return new Promise<void>((resolve) => {
    formRef.value?.validate(async (valid: boolean) => {
      if (valid) {
        isLoading.value = true
        try {
          await $userService.resetPassword(form.password, token)
          ElNotification.success({
            title: 'Password has been reset',
            message: `You can now login with your new password`
          })
          navigateTo('/sign-in')
        } catch (error: any) {
          errorMessage.value = error.message
        }
        isLoading.value = false
        resolve()
      } else {
        console.log('Form is invalid')
        resolve()
      }
    })
  })
}
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
    font-weight: 500;
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
    font-weight: 500;
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
    font-weight: 500;
  }
}
</style>
