<template>
  <div class="newsletter">
    <h6>Subscribe on our newsletter</h6>
    <p>
      Get daily news on upcoming offers from many suppliers all over the world
    </p>
    <div class="form">
      <div class="inputContainer">
        <i class="icon-mail mailIcon" />
        <InputField
          v-model="input"
          class="input"
          placeholder="Enter your email address"
        />
      </div>
      <CustomButton class="button" level="primary">Subscribe</CustomButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputField from '../custom/field/index.vue'
import CustomButton from '../custom/button/index.vue'

const input = ref('')
</script>

<style lang="postcss" scoped>
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
  flex-wrap: wrap;
  justify-content: center;
}
.inputContainer {
  position: relative;
  width: 350px;
  display: flex;
  align-items: center;
}

.mailIcon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2.2rem;
  color: var(--color-icon);
  z-index: 10;
}

.input {
  width: 100%;
  margin-bottom: 0;

  :deep(.form-group) {
    margin: 0;
  }

  :deep(.input-wrapper) {
    position: relative;
  }

  :deep(input) {
    height: 48px;
    padding: 12px 18px 12px 58px; /* Left padding for mail icon */
    border-radius: 62px;
    border: 1px solid var(--color-grayscale-30);
    background-color: white;
    font-size: 1.6rem;
    outline: none;

    &:focus {
      border-color: var(--color-primary);
    }

    &::placeholder {
      color: var(--color-icon);
    }
  }
}
.button {
  width: 170px;
  height: 48px;
  border-radius: 62px;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  background-image: linear-gradient(
    90deg,
    var(--color-primary) 20%,
    rgba(241, 184, 91, 1) 100%
  );
  border: none;
  color: white;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
}
</style>
