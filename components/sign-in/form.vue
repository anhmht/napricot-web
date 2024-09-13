<template>
  <div v-loading="loading" :class="$style.form">
    <div :class="$style.header">
      <div
        :class="[$style.item, active === 'sign-in' && $style.active]"
        @click="headerClick('sign-in')"
      >
        <h5>Sign In</h5>
      </div>
      <div
        :class="[$style.item, active === 'sign-up' && $style.active]"
        @click="headerClick('sign-up')"
      >
        <h5>Sign Up</h5>
      </div>
      <div :class="[$style.hr, active === 'sign-up' && $style.signUp]"></div>
    </div>
    <div :class="$style.content">
      <sign-in
        v-if="active === 'sign-in'"
        @loading="(e: boolean) => (loading = e)"
      />
      <sign-up
        v-else-if="active === 'sign-up'"
        @loading="(e: boolean) => (loading = e)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const active = ref('sign-in')
const route = useRoute()
const router = useRouter()
active.value =
  (route.query.active as string | 'sign-in' | 'sign-up') || 'sign-in'
const loading = ref(false)

const headerClick = (type: 'sign-in' | 'sign-up') => {
  active.value = type
  router.push({ query: { active: type } })
}
</script>

<style lang="postcss" module>
.form {
  width: 424px;
  border: 1px solid #dcdcdc;
  box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}
.header {
  position: relative;
  display: flex;
  border-bottom: 1px solid #dcdcdc;
  color: var(--color-icon);
  font-weight: 500;
}
.hr {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: 50%;
  background-color: var(--color-primary);
  transition: all 0.3s ease-in-out;
  &.signUp {
    left: 50%;
  }
}
.item {
  flex-basis: 50%;
  display: flex;
  justify-content: center;
  padding: 16px 0;
  cursor: pointer;
  &:hover {
    color: var(--color-primary);
  }
  &.active {
    color: var(--color-text);
  }
}
.content {
  padding: 24px 32px;
  padding-top: 12px;
}
</style>
