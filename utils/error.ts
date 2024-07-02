import { FetchError } from 'ohmyfetch'

export const errorHandler = (error: FetchError) => {
  throw createError({
    statusCode: error.response?.status,
    message: error.data.error,
    data: {
      statusCode: error.response?.status,
      responseBody: error.data,
    },
  })
}
