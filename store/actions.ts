import { states } from './state'

export const actions = defineStore('actions', () => {
  const state = states()

  const setCurrentUser = (user?: User) => {
    state.currentUser = user
  }

  const displayOverlay = () => {
    state.showOverlay = !state.showOverlay
  }

  const setCategories = (cat: any) => {
    state.categories = {
      categories: cat.categories,
      treeCategories: cat.treeCategories
    }
  }

  return {
    setCurrentUser,
    displayOverlay,
    setCategories
  }
})
