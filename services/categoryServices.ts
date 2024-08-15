

const getAllCategories = async (): Promise<Category[]> => {
  try {
    const data = await $api('/categories')
    return data as Category[]
  } catch (error: any) {
    throw errorHandler(error)
  }
}

interface CategoryService {
  getAllCategories: () => Promise<Category[]>
}

export const $categoryService: CategoryService = {
  getAllCategories: () => getAllCategories()
}
