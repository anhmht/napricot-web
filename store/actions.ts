import { states } from './state'

export const actions = defineStore('actions', () => {
  const state = states()

  const setCurrentUser = (user?: User) => {
    state.currentUser = user
  }

  return {
    setCurrentUser,
  }
})
