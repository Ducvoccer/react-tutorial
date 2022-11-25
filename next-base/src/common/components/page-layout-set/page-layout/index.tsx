import { Layout } from 'src/common/antd'

const { Content, Sider } = Layout

type PageLayoutProps = {
  nav?: JSX.Element
  navWidth?: string | number
}

export function PageLayout({
  nav,
  navWidth = '272px',
  children,
}: React.PropsWithChildren<PageLayoutProps>): JSX.Element {
  return (
    <Layout hasSider={!!nav}>
      {nav && (
        <Sider width={navWidth} className="sider" theme="light">
          {nav}
        </Sider>
      )}
      <Content>{children}</Content>
    </Layout>
  )
}
