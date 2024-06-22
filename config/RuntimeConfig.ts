import { runtimeConfig as staging } from './staging'
import { runtimeConfig as prod } from './prod'
import { runtimeConfig as development } from './development'

export interface RuntimeConfig {
  /**
   * Raksul Pro API endpoint - Base URL
   * @example "https://dm-web.qa1.raksul.com"
   */
  proApiBaseUrl: string

  /**
   * Raksul Pro API endpoint - Version
   * @example "v1"
   */
  proApiVersion: string

}

export const getRunTimeConfig = (env: string): RuntimeConfig => {
  if (env === 'prod') return prod
  if (env === 'staging') return staging
  return development
}