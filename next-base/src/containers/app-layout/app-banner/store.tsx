import { namespaceConfig } from 'fast-redux'
import produce from 'immer'
import { handleImageDomain } from 'src/common/helpers/image'

export type appBannerProps = {
  vendor: any
}

const DEFAULT_STATE: appBannerProps = {
  vendor: {},
}

const { action, getState } = namespaceConfig('banner', DEFAULT_STATE)

export const getRoot = (state: any): appBannerProps | undefined => getState(state)

export const setVendor = action('setVendor', (state: appBannerProps, data: any) => {
  return produce(state, (draft) => {
    draft.vendor = {
      coverImage: handleImageDomain(data?.attributes?.cover_image_url) || '/images/farmer.jpg',
    }
  })
})
