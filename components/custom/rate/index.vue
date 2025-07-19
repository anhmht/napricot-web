<template>
  <div class="rate">
    <div class="stars">
      <div
        v-for="(star, index) in stars"
        :key="index"
        :class="['star', { filled: star.filled, partial: star.partial }]"
        @click="!disabled && handleStarClick(index + 1)"
        @mouseenter="!disabled && handleStarHover(index + 1)"
        @mouseleave="!disabled && handleStarLeave()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          class="star-icon"
        >
          <path
            d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
          />
          <path
            v-if="star.partial"
            class="partial-fill"
            :style="{ clipPath: `inset(0 ${100 - star.percentage}% 0 0)` }"
            d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
          />
        </svg>
      </div>
    </div>
    <span v-if="showScore" class="score">
      {{ formattedScore }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Star {
  filled: boolean
  partial: boolean
  percentage: number
}

interface Props {
  modelValue?: number
  max?: number
  disabled?: boolean
  showScore?: boolean
  scoreTemplate?: string
  allowHalf?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  max: 5,
  disabled: false,
  showScore: false,
  scoreTemplate: '{value}',
  allowHalf: false
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const currentValue = ref(props.modelValue)
const hoverValue = ref(0)

// Watch for changes in modelValue prop
watch(
  () => props.modelValue,
  (newValue) => {
    currentValue.value = newValue
  }
)

// Watch for changes in currentValue and emit updates
watch(currentValue, (newValue) => {
  emit('update:modelValue', newValue)
})

const displayValue = computed(() => {
  return hoverValue.value || currentValue.value
})

const stars = computed(() => {
  const result: Star[] = []
  const value = displayValue.value

  for (let i = 1; i <= props.max; i++) {
    if (value >= i) {
      // Full star
      result.push({ filled: true, partial: false, percentage: 100 })
    } else if (props.allowHalf && value >= i - 0.5) {
      // Half star
      const percentage = (value - (i - 1)) * 100
      result.push({ filled: false, partial: true, percentage })
    } else {
      // Empty star
      result.push({ filled: false, partial: false, percentage: 0 })
    }
  }

  return result
})

const formattedScore = computed(() => {
  if (props.scoreTemplate) {
    return props.scoreTemplate.replace(
      /\{value\}/g,
      currentValue.value.toString()
    )
  }
  return currentValue.value.toString()
})

const handleStarClick = (value: number) => {
  if (props.disabled) return
  currentValue.value = value
}

const handleStarHover = (value: number) => {
  if (props.disabled) return
  hoverValue.value = value
}

const handleStarLeave = () => {
  if (props.disabled) return
  hoverValue.value = 0
}
</script>

<style lang="postcss" scoped>
.rate {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 22px;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;
  display: flex;

  &:hover:not(.disabled) {
    transform: scale(1.1);
  }
}

.star-icon {
  width: 18px;
  height: 18px;
  fill: #dcdfe6;
  transition: fill 0.2s ease;
}

.filled .star-icon {
  fill: #f7ba2a;
}

.partial {
  .star-icon {
    fill: #dcdfe6;
  }

  .partial-fill {
    fill: #f7ba2a;
  }
}

.score {
  font-size: 13px;
  color: #909399;
  margin-left: 4px;
}

.rate.disabled {
  .star {
    cursor: default;

    &:hover {
      transform: none;
    }
  }
}
</style>
