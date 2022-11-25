import { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import AppLayout from 'src/containers/app-layout'
import HomeContainer from 'src/containers/home'

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Oisie - TOP</title>
      </Helmet>
      <HomeContainer />
    </>
  )
}

Page.getLayout = (page: ReactElement) => {
  return <AppLayout showMenu={true}>{page}</AppLayout>
}
