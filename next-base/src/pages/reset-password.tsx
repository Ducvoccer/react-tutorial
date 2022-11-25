import { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import AuthLayout from 'src/containers/auth-layout'
import ResetPassword from 'src/containers/reset-password'
export default function Page() {
  return (
    <>
      <Helmet>
        <title>Oisie - パスワード再設定</title>
      </Helmet>
      <ResetPassword />
    </>
  )
}

Page.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}
