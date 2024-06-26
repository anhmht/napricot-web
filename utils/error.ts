import { FetchError } from 'ohmyfetch'

export const errorHandler = (error: Error) => {
  throw createError({
    statusCode: (error as FetchError).response?.status,
    message: (error as FetchError).data.error,
    data: {
      statusCode: (error as FetchError).response?.status,
      responseBody: (error as FetchError).data,
    },
  })
}