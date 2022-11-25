import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { apiInstance, buildUrl } from 'src/common/helpers'

import { appBannerProps, getRoot, setVendor } from './store'

const ctx: Types.ControllerContext<appBannerProps> = {}

export function useAppBannerController() {
  ctx.dispatch = useDispatch()
  ctx.router = useRouter()
  ctx.state = useSelector(getRoot)
  return {
    state: ctx.state,
    getVendorProfile,
  }
}

const getVendorProfile = async () => {
  const url = buildUrl(`${process.env.PATH_VENDOR || ''}/vendor/me`, {})
  const res = await (apiInstance as any).get(url)
  const { data } = res || {}
  ctx.dispatch(setVendor(data.data))
}
