import { message } from 'antd'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { apiPjc } from 'src/common/helpers'

import {
  bankAccountPageStoreProps,
  getRoot,
  setGetBankAccount,
  setGetListBankAccount,
  setLoading,
  setUpdateBankAccount,
} from './store'

const ctx: Types.ControllerContext<bankAccountPageStoreProps> = {}
export function useBankAccountPageController() {
  ctx.dispatch = useDispatch()
  ctx.router = useRouter()
  ctx.state = useSelector(getRoot)
  return {
    state: ctx.state,
    getListBankAccount,
    getBankAccount,
    createBankAccount,
    deleteBankAccount,
    updateBankAccount,
  }
}

const getListBankAccount = async () => {
  try {
    ctx.dispatch(setLoading(true))
    const response = await apiPjc.get(`${process.env.PATH_VENDOR || ''}/account/bank_accounts`)
    ctx.dispatch(setGetListBankAccount(transformBankAccount(response.data.data)))
    ctx.dispatch(setLoading(false))
  } catch (error) {
    message.error('Error when get list bank account')
  }
}

const getBankAccount = async (id: string) => {
  try {
    if (id === '') {
      ctx.dispatch(setGetBankAccount(null))
      return
    }
    ctx.dispatch(setLoading(true))
    const response = await apiPjc.get(`${process.env.PATH_VENDOR || ''}/account/bank_accounts/${id}`)
    ctx.dispatch(setGetBankAccount(transformResponse(response)))
    ctx.dispatch(setLoading(false))
  } catch (error) {
    message.error('Error when get bank account')
  }
}

const transformResponse = (response) => {
  return {
    id: response.data.data.id,
    bankName: response.data.data.attributes.bank_name,
    branchName: response.data.data.attributes.branch_name,
    accountType: response.data.data.attributes.account_type,
    accountNumber: response.data.data.attributes.account_number,
  }
}

const transformBankAccount = (listBankAccount) => {
  return listBankAccount.map((item) => ({
    id: item.id,
    bankName: item?.attributes?.bank_name,
    branchName: item?.attributes?.branch_name,
    accountType: item?.attributes?.account_type,
    accountNumber: item?.attributes?.account_number,
  }))
}

const createBankAccount = async (bankAccount) => {
  try {
    ctx.dispatch(setLoading(true))
    const response = await apiPjc.post(`${process.env.PATH_VENDOR}/account/bank_accounts`, bankAccount)
    ctx.dispatch(setGetListBankAccount([...ctx.state.listBankAccount, transformResponse(response)]))
    ctx.dispatch(setLoading(false))
    message.success('Create successful')
  } catch (error) {
    message.error('Error when create')
  }
}

const deleteBankAccount = async (id: string) => {
  try {
    ctx.dispatch(setLoading(true))
    await apiPjc.delete(`${process.env.PATH_VENDOR}/account/bank_accounts/${id}`)
    ctx.dispatch(setGetListBankAccount(ctx.state.listBankAccount.filter((item) => item.id !== id)))
    ctx.dispatch(setLoading(false))
    message.success('Delete successful')
  } catch (error) {
    message.error('Error when delete')
  }
}

const updateBankAccount = async (id: string, data: any) => {
  try {
    ctx.dispatch(setLoading(true))
    const response = await apiPjc.patch(`${process.env.PATH_VENDOR || ''}/account/bank_accounts/${id}`, data)
    ctx.dispatch(setUpdateBankAccount(transformResponse(response), id))
    ctx.dispatch(setLoading(false))
    message.success('Update successful')
  } catch (error) {
    message.error('Error when update')
  }
}
