<template>
  <div :class="$style.search">
    <el-popover
      :visible="visible"
      placement="bottom"
      :teleported="false"
      :show-arrow="false"
      :popper-class="$style.popover"
    >
      <div>abc</div>
      <template #reference>
        <el-input
          :class="$style.input"
          v-model="query"
          placeholder="Search for products"
        >
          <template #suffix>
            <i class="icon-search" @click="visible = !visible"></i>
          </template>
        </el-input>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
const visible = ref(false)
const query = ref('')
</script>

<style lang="postcss" module>
.search {
  position: relative;
  width: 100%;
  height: 100%;
}
.popover {
  width: 100% !important;
}
.input {
  height: inherit;
  :global(.el-input__wrapper) {
    padding: 1px 16px;
    background-color: var(--color-background);
    border-radius: 62px;
    transition: all 0.3s ease;
    &:focus-within {
      background-color: #fff;
    }
  }
  :global(.el-input__inner) {
    font-size: 1.6rem;
    &::placeholder {
      color: var(--color-icon);
    }
  }
  :global(.el-input__suffix) {
    span {
      font-size: 2rem;
      color: var(--color-icon);
    }
  }
}
</style>
