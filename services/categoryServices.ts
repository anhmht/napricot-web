import { GetCategoryRequest } from "~/models/Category"

const getAllCategories = async (): Promise<{
  categories: Category[],
  treeCategories: Category[]
}> => {
  try {
    const data = await $api('/categories')
    return data as { categories: Category[], treeCategories: Category[] }
  } catch (error: any) {
    throw errorHandler(error)
  }
}

const getCategories = async (request: GetCategoryRequest): Promise<ListCategories> => {
  try {
    const data = await $api('/categories', {
      query: createPayload(request)
    })
    return data as ListCategories
  } catch (error: any) {
    throw errorHandler(error)
  }
}

interface CategoryService {
  getAllCategories: () => Promise<{
    categories: Category[],
    treeCategories: Category[]
  }>
  getCategories: (pagination: Pagination) => Promise<ListCategories>
}

export const $categoryService: CategoryService = {
  getAllCategories: () => getAllCategories(),
  getCategories: (pagination: Pagination) => getCategories(pagination)
}
