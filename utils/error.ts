import { FetchError } from 'ohmyfetch'

export const errorHandler = (error: FetchError) => {
  const { error: showError } = useNotification()
  const errorData = createError({
    statusCode: error.response?.status,
    message:
      error.data?.message ??
      'An error occurred while processing your request. Please try again later.',
    data: {
      statusCode: error.response?.status,
      responseBody: error.data,
      error: true,
      message:
        error.data?.message ??
        'An error occurred while processing your request. Please try again later.'
    }
  })
  console.log(errorData.statusCode, errorData.message)
  if (import.meta.server) {
    throw errorData
  }

  // Show error notification
  if (errorData.statusCode === 401) {
    showError({
      title: 'Timeout',
      message: 'Your session has expired. Please login again.'
    })
    return errorData.data
  }

  if (errorData.statusCode === 403) {
    showError({
      title: 'Forbidden',
      message: 'You are not authorized to perform this action.'
    })
    return errorData.data
  }

  if (errorData.statusCode === 500) {
    showError({
      title: 'Something went wrong',
      message:
        'An error occurred while processing your request. Please try again later.'
    })
    return errorData.data
  }

  showError({
    title: 'Error',
    message: errorData.message
  })

  return errorData.data
}
