export interface State {
  currentUser: User | undefined
  showOverlay: boolean
  categories?: {
    categories: Category[]
    treeCategories: Category[]
  }
}


export const states = defineStore({
  id: 'state',

  state: (): State => {
    return {
      currentUser: undefined,
      showOverlay: false,
      categories: undefined
    }
  }
})
