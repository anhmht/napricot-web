<template>
  <ul :class="$style.account">
    <li>
      <i class="icon-Logo" />
      Account
    </li>
    <li>
      <i class="icon-person" />
      Profile
    </li>
    <li>
      <i class="icon-history" />
      Order
    </li>
    <li>
      <i class="icon-pin_drop" />
      Tracking
    </li>
    <li>
      <i class="icon-favorite" />
      Wishlist
    </li>
    <li>
      <i class="icon-book" />
      Address
    </li>
    <li @click="signOut">
      <i class="icon-logout-circle" />
      Log-out
    </li>
  </ul>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])
const signOut = async () => {
  emit('close')
  const { signOut } = useAuth()
  await signOut()
}
</script>

<style lang="postcss" module>
.account {
  position: relative;
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    display: flex;
    align-items: center;
    gap: 12px;
    line-height: 20px;
    padding: 10px 24px;
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--color-text);
    cursor: pointer;
    i {
      font-size: 1.8rem;
      color: var(--color-text);
    }
    &:hover {
      background-color: var(--color-primary);
      color: #fff;
      i {
        color: #fff;
      }
    }
  }
}
</style>
