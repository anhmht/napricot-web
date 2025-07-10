export const useLoading = () => {
  const loading = useState<boolean>('loading', () => true)

  const startLoading = () => {
    loading.value = true
  }

  const stopLoading = () => {
    loading.value = false
  }

  return {
    loading,
    startLoading,
    stopLoading
  }
}
