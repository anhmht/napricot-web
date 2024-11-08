export interface RuntimeConfig {
  baseUrl: string
  apiBaseUrl: string
  apiVersion: string
  stripePublicKey: string
  isDevelopment: boolean
}

export const getRunTimeConfig = (env: string): RuntimeConfig => {
  return {
    baseUrl: process.env.BASE_URL as string,
    apiBaseUrl: process.env.API_URL as string,
    apiVersion: 'v1',
    stripePublicKey: process.env.STRIPE_PUBLIC_KEY as string,
    isDevelopment: process.env.TARGET_ENV === 'staging',
  }
}
