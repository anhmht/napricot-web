<template>
  <div :class="$style.root" v-loading="loading">
    <div :class="$style.content">
      <div
        v-show="item.text"
        v-for="(item, index) in seoResults"
        :key="index"
        :class="[$style.item, $style[item.rating]]"
      >
        <span :class="$style.badge">&nbsp;</span>
        <span :class="$style.text" v-html="item.text"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce'
import { Paper, SeoAssessor, interpreters } from 'yoastseo'
import Researcher from 'yoastseo/build/languageProcessing/languages/en/Researcher.js'

const props = defineProps({
  description: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  slug: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  keyword: {
    type: String,
    default: ''
  },
  titleWidth: {
    type: Number,
    default: 0
  }
})

const ratings = ['feedback', 'bad', 'ok', 'good']
const scoreToRating = interpreters.scoreToRating

const overallScore = ref<number>(0)
const overallRating = ref<string>('')
const assessorResultsByRating = ref<Object>({})
const loading = ref<boolean>(false)

const seoResults = computed<any>(() => {
  const res = [] as any
  ratings.forEach((rating) => {
    const items = assessorResultsByRating.value[rating]
    if (typeof items === 'undefined') return
    items.forEach((item: any) => {
      res.push(item)
    })
  })
  return res
})

const getData = debounce((paper) => {
  const researcher = new Researcher(paper, {
    marker: null
  })

  const contentAssessor = new SeoAssessor(researcher)

  contentAssessor.assess(paper)

  overallScore.value = contentAssessor.calculateOverallScore()
  overallRating.value = scoreToRating(
    contentAssessor.calculateOverallScore() / 10
  )

  assessorResultsByRating.value = {}
  contentAssessor.results.forEach((result) => {
    const item = {
      rating: scoreToRating(result.score),
      score: result.score,
      text: result.text
    }
    if (assessorResultsByRating.value.hasOwnProperty(item.rating)) {
      assessorResultsByRating.value[item.rating].push(item)
    } else {
      assessorResultsByRating.value[item.rating] = [item]
    }
  })
}, 1000)

watchEffect(() => {
  const paper = new Paper(props.content, {
    keyword: props.keyword,
    description: props.description,
    title: props.title,
    locale: 'en_US',
    permalink: `https://napricot.com/post/${props.slug}`,
    titleWidth: props.titleWidth
  })
  getData(paper)
})
</script>

<style module lang="postcss">
.root {
  display: block;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
}
.badge {
  vertical-align: middle;
  width: 15px;
  height: 15px;
  display: inline-block;
  border-radius: 50%;
}
.item {
  font-weight: 400;
  a {
    font-weight: 450;
    text-decoration: none;
    color: #007bff;
  }
  &.feedback {
    .badge {
      background-color: gray;
    }
  }
  &.bad {
    .badge {
      background-color: var(--color-error);
    }
  }
  &.ok {
    .badge {
      background-color: var(--color-warning);
    }
  }
  &.good {
    .badge {
      background-color: var(--color-success);
    }
  }
}
.text {
  padding: 0 10px;
}
</style>
