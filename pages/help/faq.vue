<template>
  <div :class="$style.root">
    <div :class="$style.breadcrumb">
      <div class="container">
        <breadcrumb
          :links="[{ name: 'Frequently Asked Questions', path: '/help/faq' }]"
        />
      </div>
    </div>
    <div class="container">
      <div :class="$style.faq">
        <h1>Frequently Asked Questions (FAQ)</h1>
        <div :class="$style.container">
          <div :class="$style.question">
            <div
              :class="$style.item"
              v-for="(item, index) in data"
              :key="item.question"
            >
              <div
                :class="[$style.title, checkActive(index) && $style.active]"
                @click="handleClick(index)"
              >
                {{ index + 1 }}. {{ item.question }}
                <i class="icon-arrow-down" />
              </div>
              <div
                :class="[$style.content, checkActive(index) && $style.active]"
              >
                <div :class="$style.answer">
                  {{ item.answer }}
                </div>
              </div>
            </div>
          </div>
          <div :class="$style.contact">
            <div :class="$style.contactForm">
              <h2>Don’t find your answer, Ask for support.</h2>
              <p>
                Whether you have a question, need help with an order, or want to
                share your story, our friendly customer service team is ready to
                assist
              </p>
              <custom-button type="primary" @click="moveToContact"
                >Create a ticket
                <i class="icon-arrow-right" />
              </custom-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const data = ref([
  {
    question: 'What kind of gifts can be found at Napricot?',
    answer:
      'Napricot offers a wide range of unique and sophisticated gifts, including presents for friends, lovers, family members, pets, and many other occasions.'
  },
  {
    question: 'How do I purchase items on Napricot?',
    answer:
      'You can easily shop on Napricot by logging in or creating a new account, then selecting the products you wish to buy and making a payment through secure payment methods.'
  },
  {
    question: 'Is there customer support?',
    answer:
      'We are always ready to assist customers. You can contact our customer service at any time, 24/7.'
  },
  {
    question: `Can I exchange or return gifts?`,
    answer: `We have an exchange and return policy. If you are not completely satisfied with your purchase, you can exchange or return items within 21 days from the date of receipt. To be eligible for a return, items must be unused, in the same condition that you received them, and in the original packaging. Please note that any incurred shipping costs will be the customer's responsibility.`
  },
  {
    question: `Is my personal information secure?`,
    answer: `Yes, we are committed to protecting your personal information. All transaction information and personal data are kept secure and are not shared with third parties.`
  },
  {
    question: `Are there any promotional programs?`,
    answer: `Napricot frequently has promotional programs and special offers for customers. You can subscribe to our newsletter to stay updated on the latest promotions.`
  },
  {
    question: `Return Policy`,
    answer: `We always strive to ensure customer satisfaction with Napricot's products. If you are not completely satisfied with your purchase, you can exchange or return items within 21 days from the date of receipt. To be eligible for a return, items must be unused, in the same condition that you received them, and in the original packaging. Please note that any incurred shipping costs will be the customer's responsibility.`
  },
  {
    question: `Personalized Products`,
    answer: `We also offer personalized products upon customer request. Please note that personalized products cannot be exchanged or returned, except in cases of defects caused by us. For more details on ordering personalized products, please contact our customer service.`
  }
])

const show = ref<number[]>([])

const handleClick = (index: number) => {
  if (show.value.includes(index)) {
    show.value.splice(show.value.indexOf(index), 1)
  } else {
    show.value.push(index)
  }
}

const checkActive = (index: number) => {
  return show.value.includes(index)
}

const moveToContact = () => {
  navigateTo('/help/contact')
}

defineOgImageComponent('DefaultOg')

useServerSeoMeta({
  title: () => `FAQs`,
  description: () => `FAQs for Napricot`,
  ogTitle: () => `FAQs`,
  ogSiteName: () => 'Napricot Eyelash Beauty',
  ogDescription: () => `FAQs for Napricot`
})

useSchemaOrg([
  defineWebPage({
    '@type': 'FAQPage',
    name: 'Napricot Eyelash Beauty',
    description: `FAQs for Napricot`,
    inLanguage: 'en',
    headline: 'Frequently Asked Questions',
    mainEntity: data.value.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  })
])
</script>

<style lang="postcss" module>
.root {
  position: relative;
  h1 {
    margin-bottom: 32px;
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 24px;
  }
  p {
    margin-bottom: 24px;
  }
}
.breadcrumb {
  background-color: var(--color-background);
  color: var(--color-icon);
  padding: 8px 0;
}
.faq {
  padding: 24px 0;
  @media (max-width: 1120px) {
    padding: 16px;
  }
}
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: space-between;
}
.contact {
  width: 424px;
}
.contactForm {
  display: flex;
  flex-direction: column;
  padding: 32px;
  background-color: #fff0e8;
}
.question {
  width: 760px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.item {
  .title {
    border-radius: 4px;
    padding: 12px 24px;
    border: 1px solid #dcdcdc;
    align-content: center;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    i {
      margin-left: auto;
      transform: rotate(-90deg);
      transition: all 0.3s ease;
    }
    &.active {
      background: var(--color-primary);
      color: #fff;
      i {
        transform: rotate(0);
      }
    }
  }
  .content {
    box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.12);
    font-weight: 400;
    max-height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
    &.active {
      max-height: 400px;
      border: 1px solid #dcdcdc;
      border-top: none;
    }
    .answer {
      padding: 24px;
    }
  }
}
</style>
