import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { CommonButton, FormContainer, FormRow, FormTitle } from 'common-ui/components'
import { FormButton } from 'common-ui/components/forms/form-button'
import LogoIcon from 'public/svg/logo.svg'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useLoginController } from './controller'

export default function Login(): JSX.Element {
  const { control, handleSubmit } = useForm()
  const [loginError, setLoginError] = useState<string>()
  const controller = useLoginController()

  const onSubmit = async (data) => {
    try {
      await controller.onLogin(data)
    } catch (error) {
      setLoginError('メールアドレス、またはパスワードが違います。再度正しく入力してください。')
    }
  }

  return (
    <FormContainer>
      <FormTitle>
        <FormRow className="text-center">
          <LogoIcon width={200} />
        </FormRow>

        {/*<FormRow>
          <div className="text-center">
            出品者申請は
            <Link href="/register">
              <a className="font-bold underline link">こちら</a>
            </Link>
          </div>
        </FormRow>*/}

        {loginError && (
          <FormRow>
            <div className="flex items-center text-center justify-center ecm-error">
              <ExclamationCircleOutlined />
              <span className="ml-[10px]">{loginError}</span>
            </div>
          </FormRow>
        )}
      </FormTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="ログインID">
          <Controller
            control={control}
            name="username"
            render={({ field: { ref: _, ...others } }) => <Input {...others} placeholder={'ログインID'} />}
          />
        </FormRow>

        <FormRow label="パスワード">
          <Controller
            control={control}
            name="password"
            render={({ field: { ref: _, ...others } }) => (
              <Input type="password" {...others} placeholder={'パスワード'} />
            )}
          />
        </FormRow>
        <FormButton>
          <CommonButton type="primary" minWidth="280px">
            ログイン
          </CommonButton>
        </FormButton>
        {/*<div className="text-center mt-5">
          <Link href="/forgot-password">
            <a className="underline link">パスワードをお忘れの方はこちら</a>
          </Link>
        </div>*/}
      </form>
    </FormContainer>
  )
}
