import { createApiPjc } from 'src/common/helpers'

export const apiInstance = createApiPjc
  ? createApiPjc({
      timeout: 10000,
      withCredentials: true,
    })
  : {}
