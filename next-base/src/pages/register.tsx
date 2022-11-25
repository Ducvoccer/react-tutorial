import { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import AuthLayout from 'src/containers/auth-layout'

import Register from '../containers/register'

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Oisie - 生産者登録申請_基本情報</title>
      </Helmet>
      <Register />
    </>
  )
}

Page.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}
