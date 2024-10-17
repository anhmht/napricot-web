export const getters = defineStore('getters', () => {
  const state = states()

  const getCategories = (type: CategoryType = CategoryType.Product): ICategory[] | undefined => {
    return state.categories?.categories.filter(cat => cat.type === type) || []
  }

  const getTreeCategories = (type: CategoryType = CategoryType.Product): ICategory[] | undefined => {
    return state.categories?.treeCategories.filter(cat => cat.type === type) || []
  }

  return {
    getCategories,
    getTreeCategories
  }
})
