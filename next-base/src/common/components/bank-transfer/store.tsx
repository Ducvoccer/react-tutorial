import { namespaceConfig } from 'fast-redux'
import produce from 'immer'

export type bankAccountPageStoreProps = {
  listBankAccount: any
  bankAccount: any
  loading: boolean
}

const DEFAULT_STATE: bankAccountPageStoreProps = {
  bankAccount: {},
  listBankAccount: [],
  loading: false,
}

const { action, getState } = namespaceConfig('bankAccountPage', DEFAULT_STATE)

export const getRoot = (state: any): bankAccountPageStoreProps | undefined => getState(state)

export const setGetListBankAccount = action(
  'setGetListBankAccount',
  (state: bankAccountPageStoreProps, bankAccounts: any) => {
    return produce<bankAccountPageStoreProps>(state, (draft) => {
      draft.listBankAccount = bankAccounts
    })
  }
)

export const setGetBankAccount = action('setGetBankAccount', (state: bankAccountPageStoreProps, bankAccount: any) => {
  return produce(state, (draft) => {
    draft.bankAccount = bankAccount
  })
})

export const setUpdateBankAccount = action(
  'setUpdateBankAccount',
  (state: bankAccountPageStoreProps, bankAccount: any, id: string) => {
    return produce(state, (draft) => {
      const bankAccountIndex = draft.listBankAccount.findIndex((item) => item.id === id)
      draft.listBankAccount[bankAccountIndex] = { ...draft.listBankAccount[bankAccountIndex], ...bankAccount }
    })
  }
)

export const setLoading = action('setLoading', (state: bankAccountPageStoreProps, loading: boolean) => {
  return { ...state, loading }
})
