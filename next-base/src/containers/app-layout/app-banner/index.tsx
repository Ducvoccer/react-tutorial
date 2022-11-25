import Image from 'next/image'
import { useEffect } from 'react'

import { useAppBannerController } from './controller'

export function AppBanner({ image }: React.PropsWithChildren<any>): JSX.Element {
  const controller = useAppBannerController()
  const { vendor } = controller.state

  useEffect(() => {
    controller.getVendorProfile()
  }, [])

  return (
    <>
      <div className="ecm-banner">
        {vendor.coverImage ? (
          <Image src={vendor.coverImage} alt="ecm banner" layout="responsive" width={1200} height={300} />
        ) : (
          <Image src={image} alt="ecm banner" layout="responsive" width={1200} height={300} />
        )}
      </div>
      <style jsx>{`
        .ecm-banner {
          background-color: var(--white);
        }

        @media (min-width: 1024px) {
        }
      `}</style>
    </>
  )
}
