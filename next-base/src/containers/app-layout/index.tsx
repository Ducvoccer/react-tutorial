import { Layout } from 'src/common/antd'

import { AppHeader } from './app-header'
import { AppMenu } from './app-menu'

type AppLayoutProps = {
  showMenu?: boolean
  nav?: JSX.Element
  searchBox?: boolean
  navWidth?: string | number
  collapsible?: boolean
  fullScreen?: boolean
  showBanner?: boolean
  bannerImage?: any
}

export default function AppLayout({
  showMenu,
  fullScreen = false,
  nav,
  children,
}: React.PropsWithChildren<AppLayoutProps>): JSX.Element {
  return (
    <>
      <AppHeader />
      <Layout className="page-layout pb-2 pt-5 md:py-8">
        <Layout.Content>
          <div className={`${fullScreen ? '' : 'container'} mx-auto flex gap-0 lg:gap-x-9`}>
            {showMenu && (
              <div className="w-0 lg:w-1/4 xl:w-1/5 z-1000 md:z-[1]">{showMenu && (nav ?? <AppMenu />)}</div>
            )}
            <div className={`w-full ${showMenu ? 'lg:w-3/4 xl:w-4/5' : ''} page-layout-children`}>{children}</div>
          </div>
        </Layout.Content>
      </Layout>
      <style jsx global>{`
        .page-layout {
          position: relative;
          background: var(--white);
        }
        .ecm-header__logo {
          height: 30px;
          margin-top: -4px;
        }
        @media (min-width: 1024px) {
          .ecm-header__logo {
            height: 50px;
            margin-top: 0;
          }
        }
      `}</style>
    </>
  )
}
