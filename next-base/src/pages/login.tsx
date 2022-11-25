import { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import AuthLayout from 'src/containers/auth-layout'
import LoginContainer from 'src/containers/login'

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Oisie - ログイン</title>
      </Helmet>
      <LoginContainer />
    </>
  )
}

Page.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}
