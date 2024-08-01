import { FetchResponse } from 'ohmyfetch'

const getPaymentIntent = async (params: { confirmationTokenId: string }): Promise<any> => {
  try {
    const data = await $api('/checkout/create-payment-intent', {
      method: 'POST',
      body: {
        items: [

        ],
        confirmationTokenId: params.confirmationTokenId
      },
    })
    return data as FetchResponse<Response>
  } catch (error: any) {
    errorHandler(error)
  }
  return undefined
}

interface CheckoutService {
  getPaymentIntent: (params: {
    confirmationTokenId: string
  }) => Promise<any>
}

export const $checkoutService: CheckoutService = {
  getPaymentIntent: (params) => getPaymentIntent(params)
}
