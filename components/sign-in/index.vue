<template>
  <div :class="$style.signIn">
    <el-form ref="formRef" :model="form" :rules="rules" hide-required-asterisk>
      <custom-alert v-if="errorMessage" type="error" :title="errorMessage" />
      <custom-field
        :disabled="isLoading"
        v-model="form.email"
        name="email"
        label="Email Address"
        @keyup="submitForm"
      />
      <custom-field
        v-model="form.password"
        name="password"
        label="Password"
        type="password"
        :disabled="isLoading"
        @keyup="submitForm"
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
      <custom-button type="primary" @click="submitForm" :disabled="isLoading"
        >Sign in
        <i class="icon-arrow-right" v-if="!isLoading" />
        <custom-loading :class="$style.loading" v-if="isLoading" />
      </custom-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
const store = useMainStore()
const formRef = ref<FormInstance>()
const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})
const isLoading = ref(false)
const errorMessage = ref('')
const emit = defineEmits(['loading'])
const rules = reactive<FormRules>({
  email: [
    {
      required: true,
      message: 'Please input email address',
      trigger: 'blur'
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
    }
  ]
})

function submitForm() {
  return new Promise<void>((resolve) => {
    formRef.value?.validate(async (valid: boolean) => {
      if (valid) {
        isLoading.value = true
        emit('loading', true)
        try {
          const user = await $userService.signIn(form.email, form.password)
          store.setCurrentUser(user as User)
          ElNotification.success({
            title: 'Sign in successfully',
            message: `Welcome back ${user?.name}`
          })
          if (form.rememberMe) {
            const cookie = useCookie('token')
            if (user?.token) {
              cookie.value = user.token.replaceAll('.', '*napricot*')
            }
          }
          navigateTo('/')
        } catch (error: any) {
          errorMessage.value = error.message
        }
        isLoading.value = false
        emit('loading', false)
        resolve()
      } else {
        resolve()
      }
    })
  })
}
</script>

<style lang="postcss" module>
.signIn {
  position: relative;
}
.remember {
  display: flex;
  justify-content: space-between;
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
.hr {
  :global(.el-divider__text) {
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--color-icon);
  }
}
.loading {
  margin-left: 4px;
}
</style>
