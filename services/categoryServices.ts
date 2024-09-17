
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

const getCategory = async (id: string): Promise<ICategory> => {
  try {
    const data = await $api(`/categories/${id}`)
    return data as ICategory
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
    return data.category as ICategory
  } catch (error: any) {
    throw errorHandler(error)
  }
}

const updateCategory = async (id: string, category: ICategory): Promise<ICategory> => {
  try {
    const data = await $api(`/categories/${id}`, {
      method: 'PUT',
      body: category
    })
    return data.category as ICategory
  } catch (error: any) {
    throw errorHandler(error)
  }
}

const deleteCategories = async (ids: string[]): Promise<void> => {
  try {
    await $api('/categories', {
      method: 'DELETE',
      body: { ids }
    })
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
  getCategory: (id: string) => Promise<ICategory>
  createCategory: (category: ICategory) => Promise<ICategory>
  updateCategory: (id: string, category: ICategory) => Promise<ICategory>
  deleteCategories: (id: string[]) => Promise<void>
}

export const $categoryService: CategoryService = {
  getAllCategories: () => getAllCategories(),
  getCategories: (filter: CategoryFilter, pagination: Pagination) => getCategories(filter, pagination),
  getCategory: (id: string) => getCategory(id),
  createCategory: (category: ICategory) => createCategory(category),
  updateCategory: (id: string, category: ICategory) => updateCategory(id, category),
  deleteCategories: (id: string[]) => deleteCategories(id)
}
