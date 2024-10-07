import { FetchError } from 'ohmyfetch'
import { ElNotification } from 'element-plus'

export const errorHandler = (error: FetchError) => {
  console.log(error);
  const errorData = createError({
    statusCode: error.response?.status,
    message: error.data?.message ?? 'An error occurred while processing your request. Please try again later.',
    data: {
      statusCode: error.response?.status,
      responseBody: error.data,
      error: true,
      message: error.data?.message ?? 'An error occurred while processing your request. Please try again later.',
    },
  })
  if (import.meta.server) {
    throw errorData
  }

  // Show error notification
  if (errorData.statusCode === 401) {
    ElNotification.error({
      title: 'Timeout',
      message: 'Your session has expired. Please login again.',
    })
    return errorData.data
  }

  if (errorData.statusCode === 403) {
    ElNotification.error({
      title: 'Forbidden',
      message: 'You are not authorized to perform this action.',
    })
    return errorData.data
  }

  if (errorData.statusCode === 500) {
    ElNotification.error({
      title: 'Something went wrong',
      message: 'An error occurred while processing your request. Please try again later.',
    })
    return errorData.data
  }

  ElNotification.error({
    title: 'Error',
    message: errorData.message,
  })

  return errorData.data
}
