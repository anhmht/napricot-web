<template>
  <form :class="$style.form" id="payment-form">
    <div :class="$style.element" id="payment-element">
      <!--Stripe.js injects the Payment Element-->
    </div>
    <button
      :disabled="isLoading || !stripe || !elements"
      :class="$style.button"
      @click="handleSubmit"
    >
      <div v-if="isLoading" :class="$style.spinner"></div>
      <span>Pay now</span>
    </button>
    <div v-if="message" :class="$style.message">
      {{ message }}
    </div>
  </form>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const STRIPE_PUBLIC_KEY = config.app.stripePublicKey

const message = ref<string | undefined>(undefined)
// @ts-ignore
const stripe = ref<Stripe | undefined>(undefined)
// @ts-ignore
const elements = ref<StripeElements | undefined>(undefined)

const isLoading = ref<boolean>(false)

const appearance = {
  theme: 'stripe'
}

const checkStatus = async () => {
  const clientSecret = new URLSearchParams(window.location.search).get(
    'payment_intent_client_secret'
  )

  if (!clientSecret || !stripe.value) {
    return
  }

  const { paymentIntent } = await stripe.value.retrievePaymentIntent(
    clientSecret
  )

  switch (paymentIntent.status) {
    case 'succeeded':
      message.value = 'Payment succeeded!'
      break
    case 'processing':
      message.value = 'Your payment is processing.'
      break
    case 'requires_payment_method':
      message.value = 'Your payment was not successful, please try again.'
      break
    default:
      message.value = 'Something went wrong.'
      break
  }
}

const handleServerResponse = async (response: any) => {
  if (response.status === 'requires_action') {
    // Use Stripe.js to handle the required next action
    const { error, paymentIntent } = await stripe.value.handleNextAction({
      clientSecret: response.clientSecret
    })

    if (error) {
      // Show error from Stripe.js in payment form
    } else {
      // Actions handled, show success message
      console.log(paymentIntent)
      navigateTo('/success')
    }
  } else if (response.status === 'succeeded') {
    navigateTo('/success')
  }
  isLoading.value = false
}

const handleSubmit = async (event: Event) => {
  event.preventDefault()
  isLoading.value = true

  if (!stripe.value) {
    isLoading.value = false
    return
  }

  // Trigger form validation and wallet collection
  const { error: submitError } = await elements.value.submit()
  if (submitError) {
    isLoading.value = false
    return
  }

  // Create the ConfirmationToken using the details collected by the Payment Element
  // and additional shipping information
  const { error, confirmationToken } =
    await stripe.value.createConfirmationToken({
      elements: elements.value,
      params: {
        shipping: {
          name: 'Jenny Rosen',
          address: {
            line1: '1234 Main Street',
            city: 'San Francisco',
            state: 'CA',
            country: 'US',
            postal_code: '94111'
          }
        }
      }
    })
  if (error) {
    // This point is only reached if there's an immediate error when
    // creating the ConfirmationToken. Show the error to your customer (for example, payment details incomplete)
    isLoading.value = false
    return
  }
  try {
    // Create the PaymentIntent
    const paymentIntent = await $checkoutService.getPaymentIntent({
      confirmationTokenId: confirmationToken.id
    })
    console.log(paymentIntent, 'submit')

    await handleServerResponse(paymentIntent)
  } catch (paymentIntentError) {
    // Show error from server on payment form
    isLoading.value = false
    return
  }
}

onMounted(async () => {
  // @ts-ignore
  stripe.value = Stripe(STRIPE_PUBLIC_KEY)

  elements.value = stripe.value.elements({
    appearance,
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    paymentMethodCreation: 'manual'
  })
  const paymentElementOptions = {
    layout: 'tabs'
  }
  const paymentElement = elements.value.create('payment', paymentElementOptions)
  paymentElement.mount('#payment-element')

  // checkStatus()
})

useHead({
  script: [
    {
      src: 'https://js.stripe.com/v3/',
      tagPosition: 'head'
    }
  ]
})
</script>

<style lang="postcss" module>
.form {
  width: 30vw;
  min-width: 500px;
  align-self: center;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  padding: 40px;
}
.message {
  color: rgb(105, 115, 134);
  font-size: 16px;
  line-height: 20px;
  padding-top: 12px;
  text-align: center;
}
.element {
  margin-bottom: 24px;
}
.button {
  background: #5469d4;
  font-family: Arial, sans-serif;
  color: #ffffff;
  border-radius: 4px;
  border: 0;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  width: 100%;
  &:hover {
    filter: contrast(115%);
  }
  &.disabled {
    opacity: 0.5;
    cursor: default;
  }
}
.spinner {
  border-radius: 50%;
  color: #ffffff;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 2px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  &::after {
    border-radius: 50%;
    position: absolute;
    content: '';
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }
  &::before {
    border-radius: 50%;
    position: absolute;
    content: '';
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }
}

@-webkit-keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@media only screen and (max-width: 600px) {
  form {
    width: 80vw;
    min-width: initial;
  }
}
</style>
