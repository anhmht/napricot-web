export interface State {
  currentUser: User | undefined
  showOverlay: boolean
  categories?: {
    categories: ICategory[]
    treeCategories: ICategory[]
  }
}

export const states = defineStore('state', () => {
  return {
    currentUser: ref<User | undefined>(undefined),
    showOverlay: ref(false),
    categories: ref<
      | {
          categories: ICategory[]
          treeCategories: ICategory[]
        }
      | undefined
    >(undefined)
  }
})
