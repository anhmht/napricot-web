export interface State {
  currentUser: User | undefined
}


export const states = defineStore({
  id: 'state',

  state: (): State => {
    return {
      currentUser: undefined
    }
  }
})
