export interface State {
  currentUser: User | undefined
  showOverlay: boolean
  categories?: {
    categories: ICategory[]
    treeCategories: ICategory[]
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
