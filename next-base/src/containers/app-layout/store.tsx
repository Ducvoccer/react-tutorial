import { namespaceConfig } from 'fast-redux'
import produce from 'immer'

export type appLayoutStoreProps = {
  isMenuOpen: boolean
}

const DEFAULT_STATE: appLayoutStoreProps = {
  isMenuOpen: false,
}

const { action, getState } = namespaceConfig('appLayout', DEFAULT_STATE)

export const getRoot = (state: any): appLayoutStoreProps | undefined => getState(state)
export const getIsMenuOpen = (state: any): boolean | undefined => getRoot(state)?.isMenuOpen

export const toggleMenu = action('toggleMenu', (state: appLayoutStoreProps) => {
  return produce(state, (draft) => {
    draft.isMenuOpen = !state.isMenuOpen
  })
})