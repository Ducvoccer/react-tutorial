import AppLayout from '../app-layout'

export default function AuthLayout({ children }: React.PropsWithChildren<any>) {
  return (
    <AppLayout showMenu={false}>
      <div className="container px-5 mx-auto mt-10 mb-[100px] md:mb-[130px]">
        <div className="w-full xl:w-1/2 mx-auto">{children}</div>
      </div>
    </AppLayout>
  )
}
