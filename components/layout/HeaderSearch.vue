<template>
  <div class="search">
    <CustomPopover
      v-model:visible="visible"
      placement="bottom-start"
      :append-to-body="false"
      :show-arrow="false"
      popperClass="custom-search-popover"
      trigger="manual"
    >
      <div>abc</div>
      <template #reference>
        <div class="input-container">
          <InputField
            v-model="query"
            placeholder="Search for products"
            class="input"
          />
          <i class="icon-search search-icon" @click="visible = !visible"></i>
        </div>
      </template>
    </CustomPopover>
  </div>
</template>

<script setup lang="ts">
import CustomPopover from '../custom/popover/index.vue'
import InputField from '../custom/field/index.vue'

const visible = ref(false)
const query = ref('')
</script>

<style lang="postcss" scoped>
.search {
  position: relative;
  width: 100%;
  height: 100%;
  :deep(.popover-wrapper),
  :deep(.popover-trigger) {
    width: 100%;
    height: 100%;
  }
}

.input-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.input {
  width: 100%;
  height: inherit;
  margin-bottom: 0;

  :deep(.form-group) {
    margin: 0;
    height: 100%;
  }

  :deep(.input-wrapper) {
    height: 100%;
    position: relative;
  }

  :deep(input) {
    height: 100%;
    padding: 1px 48px 1px 16px; /* Add right padding for search icon */
    background-color: var(--color-background);
    border-radius: 62px;
    font-size: 1.6rem;
    transition: all 0.3s ease;
    outline: none;

    &:focus {
      background-color: #fff;
    }

    &::placeholder {
      color: var(--color-icon);
    }
  }
}

.search-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  color: var(--color-icon);
  cursor: pointer;
  z-index: 10;
}
</style>
