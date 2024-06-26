export interface RuntimeConfig {
  apiBaseUrl: string
  apiVersion: string

}

export const getRunTimeConfig = (env: string): RuntimeConfig => {
  return {
    apiBaseUrl: process.env.API_URL as string,
    apiVersion: 'v1',
  }
}