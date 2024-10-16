<template>
  <div :class="[$style.searchIcon, open && $style.open]">
    <input
      :class="$style.input"
      placeholder="Search on Transforming"
      ref="input"
    />
    <div :class="$style.wrapper" @click="handleOpen">
      <div :class="$style.glass"></div>
      <div :class="$style.handle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['search'])
const open = ref(false)
const input = ref<HTMLInputElement | null>(null)

const handleOpen = () => {
  open.value = !open.value
  emit('search', open.value)
  if (open.value) {
    input.value?.focus()
  } else {
    input.value?.blur()
  }
}
</script>

<style lang="postcss" module>
:root {
  --line-thickness: 0.25rem;
  --glass-size: 50%;
  --icon-height: 3rem;
  --transition-speed: 0.2s;
  --timing-function: cubic-bezier(0.77, 1.55, 0.77, 1.13);
  --icon-color: var(--color-icon);
  --font-size: 1.4rem;
}
.searchIcon {
  position: relative;
  box-sizing: border-box;
  max-width: 30em;
  transition: all var(--transition-speed) linear,
    border-color 0s linear var(--transition-speed);
  border: solid var(--line-thickness);
  border-color: rgba(255, 255, 255, 0);
  padding: 0.25em;
  &,
  .wrapper {
    width: var(--icon-height);
    height: var(--icon-height);
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 100px;
  }
  .input {
    background: none;
    text-align: left;
    outline: none;
    display: block;
    border: none;
    background: rgba(255, 255, 255, 0);
    width: calc(100% - (var(--icon-height) / 2 + 2rem));
    margin-right: 5rem;
    height: 100%;
    border-radius: 100px;
    transition: all var(--transition-speed) linear;
    font-size: var(--font-size);
    padding: 0 0.5em 0 1em;
    color: #000;
    &::placeholder {
      color: rgba(255, 255, 255, 0.45);
    }
  }
  .wrapper {
    position: absolute;
    margin: auto 0;
    transform: rotate(-45deg);
    transition: all 0s linear;
    &:hover {
      cursor: pointer;
    }
    .glass {
      width: var(--glass-size);
      height: var(--glass-size);
      border: solid var(--line-thickness);
      border-color: var(--icon-color);
      border-radius: 100px;
      margin: 0 auto;
      position: relative;
      transition: all var(--transition-speed) var(--timing-function)
          var(--transition-speed),
        border-color 0s linear var(--transition-speed);
    }
    .handle {
      height: calc(100% - var(--glass-size) - 5px);
      width: var(--line-thickness);
      margin: 0 auto;
      background: var(--icon-color);
      position: absolute;
      border-radius: 0 0 100px 100px;
      left: 0;
      right: 0;
      bottom: 0;
      transition: all var(--transition-speed) var(--timing-function);
      transition-delay: var(--transition-speed);
      &::after {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background: var(--icon-color);
        transition: rotate(0deg);
        transition: all var(--transition-speed) var(--timing-function);
        transition-delay: 0s;
      }
    }
  }
  &.open {
    width: calc(100vw - 170px);
    border-color: var(--icon-color);
    transition-delay: var(--transition-speed);
    .input {
      transition-delay: var(--transition-speed);
    }
    .wrapper {
      .glass {
        width: 100%;
        height: 100%;
        transition: all var(--transition-speed) var(--timing-function) 0s,
          border-color 0s linear var(--transition-speed);
        border-color: rgba(0, 0, 0, 0);
      }
      .handle {
        bottom: calc(50% - (100% - var(--glass-size) - 5px) / 2);
        border-radius: 100px;
        transition-delay: 0s;
        &::after {
          transition-delay: var(--transition-speed);
          transform: rotate(90deg);
        }
      }
    }
  }
}
</style>
