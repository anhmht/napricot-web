export interface RuntimeConfig {
  apiBaseUrl: string
  apiVersion: string
  stripePublicKey: string
}

export const getRunTimeConfig = (env: string): RuntimeConfig => {
  return {
    apiBaseUrl: process.env.API_URL as string,
    apiVersion: 'v1',
    stripePublicKey: process.env.STRIPE_PUBLIC_KEY as string,
  }
}
