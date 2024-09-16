<template>
  <div :class="$style.signUp">
    <el-form ref="formRef" :model="form" :rules="rules" hide-required-asterisk>
      <custom-alert v-if="errorMessage" type="error" :title="errorMessage" />
      <custom-field
        v-model="form.fullName"
        name="fullName"
        label="Full Name"
        :disabled="isLoading"
      />
      <custom-field
        v-model="form.email"
        name="email"
        label="Email Address"
        :disabled="isLoading"
      />
      <custom-field
        v-model="form.password"
        name="password"
        label="Password"
        type="password"
        :disabled="isLoading"
        placeholder="8+ characters"
      />
      <custom-field
        v-model="form.confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        :disabled="isLoading"
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
          <NuxtLink to="/terms">Terms of Service</NuxtLink> and
          <NuxtLink to="/privacy"> Privacy Policy </NuxtLink></span
        >
      </div>
      <custom-button
        type="primary"
        @click="submitForm"
        :disabled="!form.agree || isLoading"
        >Sign up
        <i class="icon-arrow-right" />
      </custom-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
const formRef = ref<FormInstance>()
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
const rules = reactive<FormRules>({
  fullName: [
    {
      required: true,
      message: 'Please input full name',
      trigger: ['blur', 'change']
    }
  ],
  email: [
    {
      required: true,
      message: 'Please input email address',
      trigger: ['blur', 'change']
    },
    {
      type: 'email',
      message: 'Please input correct email address',
      trigger: ['blur', 'change']
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input password',
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
  ],
  agree: [
    {
      required: true,
      message: 'Please agree to the terms of service and privacy policy'
    }
  ]
})

const submitForm = () => {
  return new Promise<void>((resolve) => {
    formRef.value?.validate(async (valid: boolean) => {
      if (valid) {
        isLoading.value = true
        emit('loading', true)
        try {
          const user = await $userService.register({
            name: form.fullName,
            email: form.email,
            password: form.password
          })

          ElNotification.success({
            title: 'Sign up successfully',
            message: `An email has been sent to you`
          })

          store.setCurrentUser(user as User)
          const cookie = useCookie('token')
          cookie.value = user?.token?.replaceAll('.', '-')
          navigateTo('/email-verification')
        } catch (error: any) {
          errorMessage.value = error.message
        }

        isLoading.value = false
        emit('loading', false)
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
