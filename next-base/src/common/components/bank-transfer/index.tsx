import PenIcon from 'public/svg/pen.svg'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, Input, Spin } from 'src/common/antd'
import { useLanguage } from 'src/common/hooks'

import { InfoBox } from '../info-box'
import { PageSpace } from '../page-layout-set'
import { useBankAccountPageController } from './controller'
import { locale } from './locale'

type BankAccount = {
  bankName: string
  branchName: string
  accountType: string
  accountNumber: string
}
export const BankTransfer = ({ className = '' }: React.PropsWithChildren<any>): JSX.Element => {
  const [lang] = useLanguage()
  const messages = locale[lang]
  const controller = useBankAccountPageController()
  const { loading, listBankAccount } = controller.state
  const [id, setId] = useState<string>('')
  const [editBankTransfer, setEditBankTransfer] = useState<boolean>(false)

  useEffect(() => {
    controller.getListBankAccount()
  }, [])

  const handleDeleteAccount = (id: string) => {
    controller.deleteBankAccount(id)
  }

  const handleEditAccount = (id) => {
    setId(id)
    setEditBankTransfer(true)
  }
  return (
    <>
      {editBankTransfer ? (
        <AddTemplateMessage onHandleEdit={setEditBankTransfer} id={id} onSetId={setId} />
      ) : (
        <Spin spinning={loading}>
          <InfoBox color title={messages.title} className="mt-6 update-box">
            <Button
              className="flex my-[50px]"
              style="outline"
              radius={20}
              size="big"
              onClick={() => setEditBankTransfer(true)}
            >
              <PenIcon className="template-message-icon" />
              <span className="ml-3">{messages.add}</span>
            </Button>
            <div className={`ecm-bank-transfer ${className} mb-6`}>
              {listBankAccount?.map(
                (bankTransfer: any, index: number): JSX.Element => (
                  <table className="ecm-bank-transfer__table w-full mb-3" key={index}>
                    <tbody>
                      <tr>
                        <th className="text-left inline-block">{`振込先${index + 1}`}</th>
                      </tr>
                      <tr>
                        <td>
                          <table className="w-full">
                            <tbody>
                              <tr>
                                <td className="w-[150px]">{messages.bank.label}</td>
                                <td>{bankTransfer?.bankName}</td>
                              </tr>
                              <tr>
                                <td className="w-[150px]">{messages.branch.label}</td>
                                <td>{bankTransfer?.branchName}</td>
                              </tr>
                              <tr>
                                <td className="w-[150px]">{messages.accountType.label}</td>
                                <td>{bankTransfer?.accountType}</td>
                              </tr>
                              <tr>
                                <td className="w-[150px]">{messages.accountNumber.label}</td>
                                <td>{bankTransfer?.accountNumber}</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr className="has-border">
                        <td className="action-btn">
                          <div className="flex flex-col lg:flex-row items-center lg:justify-end lg:mt-6 mb-3">
                            <Button
                              radius={20}
                              style="outline"
                              size="medium"
                              onClick={() => handleEditAccount(bankTransfer.id)}
                              className="edit-btn"
                            >
                              <PenIcon />
                              <span className="ml-3">{messages.edit}</span>
                            </Button>
                            <span
                              onClick={() => handleDeleteAccount(bankTransfer.id)}
                              className="f-bold a-standard hoverable mt-3 lg:mt-0 lg:ml-5"
                            >
                              {messages.delete}
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )
              )}
            </div>
          </InfoBox>
        </Spin>
      )}

      <style jsx global>{`
        .ecm-bank-transfer .action-btn .a-standard {
          cursor: pointer;
          color: var(--gray-color);
        }

        .ecm-bank-transfer__table tr.has-border > th,
        .ecm-bank-transfer__table tr.has-border > td {
          border-bottom: 1px solid var(--info-cell-border);
        }

        .ecm-bank-transfer__table > tbody > tr > th,
        .ecm-bank-transfer__table > tbody > tr > td {
          padding: 10px 0;
        }

        .ecm-bank-transfer__table tr td table tr th,
        .ecm-bank-transfer__table tr td table tr td {
          padding: 6px 0;
        }

        .update-box > h2 {
          margin-bottom: 10px;
        }

        .ecm-bank-transfer__table .ecm-button {
          width: 250px;
        }
        @media (min-width: 768px) {
        }
      `}</style>
    </>
  )
}

const AddTemplateMessage = ({ onHandleEdit, id, onSetId }) => {
  const [lang] = useLanguage()
  const messages = locale[lang]
  const { control, handleSubmit, reset } = useForm()
  const controller = useBankAccountPageController()
  const { loading, bankAccount } = controller.state

  useEffect(() => {
    if (id) {
      controller.getBankAccount(id)
    }
  }, [id])

  useEffect(() => {
    if (bankAccount) {
      reset({
        bankName: bankAccount?.bankName,
        branchName: bankAccount?.branchName,
        accountType: bankAccount?.branchName,
        accountNumber: bankAccount?.accountNumber,
      })
    }
  }, [bankAccount])

  const onSubmit = async (data: BankAccount) => {
    const serializeData = {
      banking_vendor: {
        bank_name: data.bankName,
        branch_name: data.branchName,
        account_type: data.accountType,
        account_number: data.accountNumber,
      },
    }
    if (!id) {
      await controller.createBankAccount(serializeData)
    } else {
      await controller.updateBankAccount(id, serializeData)
      controller.getBankAccount('')
      onSetId(null)
    }
    onHandleEdit(false)
  }

  return (
    <PageSpace>
      <Button className="flex my-[50px]" style="outline" radius={20} size="big" onClick={() => onHandleEdit(false)}>
        <PenIcon className="template-message-icon" />
        <span className="ml-3">{messages.add}</span>
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="ecm-vendor-info__table w-full">
          <tbody>
            <tr className="has-border">
              <th>{messages.bank.label}</th>
              <td data-label={messages.bank.label}>
                <div className="flex items-center justify-between">
                  <Controller
                    control={control}
                    name="bankName"
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Input value={value} onChange={onChange} type="input" placeholder={messages.bank.value} />
                    )}
                  />
                </div>
              </td>
            </tr>
            <tr className="has-border">
              <th>{messages.branch.label}</th>
              <td data-label={messages.branch.label}>
                <div className="flex items-center justify-between">
                  <Controller
                    control={control}
                    name="branchName"
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Input value={value} onChange={onChange} type="input" placeholder={messages.branch.label} />
                    )}
                  />
                </div>
              </td>
            </tr>
            <tr className="has-border">
              <th>{messages.accountType.label}</th>
              <td data-label={messages.accountType.label}>
                <div className="flex items-center justify-between">
                  <Controller
                    control={control}
                    name="accountType"
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Input value={value} onChange={onChange} type="input" placeholder={messages.accountType.value} />
                    )}
                  />
                </div>
              </td>
            </tr>
            <tr className="has-border">
              <th>{messages.accountNumber.label}</th>
              <td data-label={messages.accountNumber.label}>
                <div className="flex items-center justify-between">
                  <Controller
                    control={control}
                    name="accountNumber"
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        value={value}
                        onChange={onChange}
                        type="input"
                        placeholder={messages.accountNumber.value}
                      />
                    )}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="ecm-vendor-info__btn flex items-center justify-center my-6">
          <Button type="primary" size="big" radius={30} htmlType="submit" disabled={loading}>
            {messages.save}
          </Button>
        </div>
      </form>
    </PageSpace>
  )
}
