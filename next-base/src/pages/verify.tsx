import { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import AuthLayout from 'src/containers/auth-layout'

import Verify from '../containers/verify'

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Oisie - 通知</title>
      </Helmet>
      <Verify />
    </>
  )
}

Page.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}
