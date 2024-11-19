<template>
  <div :class="$style.language">
    <div><i class="icon-global" /> United State</div>
    <div :class="$style.locale">
      <NuxtImg
        provider="myProvider"
        src="/589c67ca-0c9d-4104-7be3-6334f0155800/avatar40"
        loading="lazy"
        alt="United State"
      />
      English (EN-US)
    </div>
    <div>$ (USD)</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss" module>
.language {
  display: flex;
  align-items: center;
  padding: 4px 16px;
  gap: 24px;
  border-radius: 64px;
  background-color: var(--color-background);
  div {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    font-weight: 400;
    gap: 4px;
  }
  i {
    font-size: 2.4rem;
    color: var(--color-icon);
  }
}

.locale {
  position: relative;
  img {
    width: 24px;
    height: 24px;
  }
  &::before {
    content: '';
    position: absolute;
    left: -12px;
    height: 16px;
    border-left: 1px solid #dcdcdc;
  }
  &::after {
    content: '';
    position: absolute;
    right: -12px;
    height: 16px;
    border-right: 1px solid #dcdcdc;
  }
}
@media (max-width: 768px) {
  .language {
    gap: 14px;
    padding: 8px 12px;
    i {
      font-size: 2rem;
    }
    div {
      font-size: 1.2rem;
    }
    .locale {
      img {
        width: 20px;
        height: 20px;
      }
      &::before {
        left: -8px;
      }
    }
    &::after {
      right: -8px;
    }
  }
}
</style>
