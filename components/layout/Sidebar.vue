<template>
  <div :class="$style.sidebar">
    <div :class="$style.logo">
      <logo />
      <h6>Napricot</h6>
    </div>
    <div :class="$style.menu">
      <span>Menu</span>
      <sidebar-menu />
    </div>
    <admin-profile />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss" module>
.sidebar {
  position: relative;
  display: block;
  background-color: var(--color-background-grayscale-50);
  width: 248px;
  height: 100vh;
  padding: 0 12px;
  border-right: 1px solid var(--color-background-grayscale-100);
}
.logo {
  padding: 16px 0;
  display: flex;
}
h6 {
  margin-left: 8px;
  background: radial-gradient(
    173.81% 173.81% at 50% -4.76%,
    #111723 0%,
    rgba(17, 23, 35, 0.5) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
span {
  color: var(--color-text-grayscale-600);
  font-size: 1.2rem;
}
</style>
