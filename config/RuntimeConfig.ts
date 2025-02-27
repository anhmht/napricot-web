export interface RuntimeConfig {
  baseUrl: string
  apiBaseUrl: string
  apiVersion: string
  operationUrl: string
  stripePublicKey: string
  isDevelopment: boolean
  imageUrl: string
  recaptchaSiteKey?: string
}

export const getRunTimeConfig = (env: string): RuntimeConfig => {
  return {
    baseUrl: process.env.BASE_URL as string,
    apiBaseUrl: process.env.API_URL as string,
    operationUrl: process.env.OPERATION_URL as string,
    apiVersion: 'v1',
    stripePublicKey: process.env.STRIPE_PUBLIC_KEY as string,
    isDevelopment: process.env.TARGET_ENV === 'staging',
    imageUrl: process.env.IMAGE_URL as string,
    recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY as string
  }
}
