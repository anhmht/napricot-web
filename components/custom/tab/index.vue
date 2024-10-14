<template>
  <div :class="[$style.tab, $device.isMobileOrTablet && $style.mobile]">
    <div :class="$style.wrapper">
      <div
        v-for="(item, index) in tabs"
        :ref="(el) => (tab[index] = el)"
        :key="index"
        :class="[$style.header, active === index ? $style.active : '']"
        @click="handleClick(index)"
      >
        {{ item }}
      </div>
    </div>

    <div
      :style="{ width: style.width || 0, left: style.left || 0 }"
      :class="$style.hr"
    ></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  tabs: {
    type: Array as () => string[],
    required: true
  },
  activeTab: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['change'])

const tab = ref<any>({})
const tabWidths = ref<number[]>([])
const style = ref<{ width?: string; left?: string }>({})
const active = ref(0)

const setActiveTab = (index: number) => {
  const position = calculatePosition(index)
  const padding = index === 0 || index === tabWidths.value.length - 1 ? 12 : 24
  style.value = {
    width: `${tabWidths.value[index] - padding}px`,
    left: `${position}px`
  }
  active.value = index
}

const getWidth = () => {
  props.tabs.forEach((element, index) => {
    const width = (tab.value[index] as HTMLElement).offsetWidth
    tabWidths.value.push(width)
  })
}

const calculatePosition = (index: number) => {
  let left = 0
  tabWidths.value.some((element, i) => {
    if (index === 0) {
      return true
    }
    if (i < index) {
      left += element
    } else {
      return true
    }
  })
  return index === 0 ? 0 : left + 12
}

const handleClick = (index: number) => {
  setActiveTab(index)
  emit('change', index)
}

onMounted(() => {
  getWidth()
  setActiveTab(props.activeTab)
})
</script>

<style lang="postcss" module>
.tab {
  position: relative;
  padding-bottom: 4px;
}
.wrapper {
  display: flex;
}
.hr {
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  background-color: var(--color-primary);
  transition: all 0.3s ease-in-out;
}
.header {
  padding: 0 12px;
  font-size: 1.6rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &.active {
    font-weight: 700;
    &:hover {
      color: var(--color-text);
    }
  }
  &:first-child {
    padding-left: 0 !important;
  }
  &:last-child {
    padding-right: 0 !important;
  }
  &:hover {
    color: var(--color-primary);
  }
}

.mobile {
  .header {
    padding: 0 8px;
    font-size: 1.2rem;
  }
}
</style>
