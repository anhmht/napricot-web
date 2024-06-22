import { actions } from './actions'
import { getters } from './getters'
import { states } from './state'
import { extractStore } from '~/store/extractStore'

export const useMainStore = defineStore('main', () => {
  return {
    ...extractStore(states()),
    ...extractStore(getters()),
    ...extractStore(actions())
  }
})
