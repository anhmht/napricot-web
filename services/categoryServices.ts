
const getAllCategories = async (): Promise<{
  categories: ICategory[],
  treeCategories: ICategory[]
}> => {
  try {
    const data = await $api('/categories')
    return {
      categories: data.categories,
      treeCategories: data.treeCategories
    } as { categories: ICategory[], treeCategories: ICategory[] }
  } catch (error: any) {
    console.log(error);

    throw errorHandler(error)
  }
}

const getCategories = async (filter: CategoryFilter, pagination: Pagination): Promise<ListCategories> => {
  try {
    const data = await $api('/categories', {
      query: createPayload(filter, pagination)
    })
    return data as ListCategories
  } catch (error: any) {
    throw errorHandler(error)
  }
}

const createCategory = async (category: ICategory): Promise<ICategory> => {
  try {
    const data = await $api('/categories', {
      method: 'POST',
      body: category
    })
    return data as ICategory
  } catch (error: any) {
    throw errorHandler(error)
  }
}

interface CategoryService {
  getAllCategories: () => Promise<{
    categories: ICategory[],
    treeCategories: ICategory[]
  }>
  getCategories: (filter: CategoryFilter, pagination: Pagination) => Promise<ListCategories>
  createCategory: (category: ICategory) => Promise<ICategory>
}

export const $categoryService: CategoryService = {
  getAllCategories: () => getAllCategories(),
  getCategories: (filter: CategoryFilter, pagination: Pagination) => getCategories(filter, pagination),
  createCategory: (category: ICategory) => createCategory(category)
}
