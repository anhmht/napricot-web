<template>
  <div :class="$style.newsletter">
    <h6>Subscribe on our newsletter</h6>
    <p>
      Get daily news on upcoming offers from many suppliers all over the world
    </p>
    <div :class="$style.form">
      <el-input
        v-model="input"
        :class="$style.input"
        placeholder="Enter your email address"
      >
        <template #prefix>
          <i class="icon-mail" />
        </template>
      </el-input>
      <el-button :class="$style.button" type="primary">Subscribe</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const input = ref('')
</script>

<style lang="postcss" module>
.newsletter {
  position: relative;
  background-color: var(--color-grayscale-20);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 36px 0;
  h6 {
    font-weight: 700;
    font-size: 1.8rem;
  }
  p {
    font-size: 1.6rem;
    font-weight: 400;
    text-align: center;
    margin-bottom: 16px;
    line-height: 24px;
  }
}
.form {
  display: flex;
  gap: 16px;
}
.input {
  width: 350px;
  input {
    padding: 12px;
    height: 48px;
  }
  :global(.el-input__wrapper) {
    border-radius: 62px;
    padding: 0 18px;
    box-shadow: none;
  }
  :global(.el-input__prefix) {
    display: flex;
    font-size: 2.2rem;
    width: 22px;
  }
}
.button {
  width: 170px;
  height: 48px;
  border-radius: 62px;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
}
</style>
