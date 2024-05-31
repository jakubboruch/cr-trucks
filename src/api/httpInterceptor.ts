import http from './http'
import { useLoadingStore } from '@/stores/loading.store'

function httpInterceptor() {
  http.interceptors.request.use(async (config) => {
    const { addToLoadingState } = useLoadingStore()
    const { url } = config
    addToLoadingState(url)
    return {
      ...config
    }
  })
  http.interceptors.response.use(
    (response) => {
      const { removeFromLoadingState } = useLoadingStore()
      const { url } = response.config
      removeFromLoadingState(url)

      return response
    },
    (error) => {
      const { removeFromLoadingState } = useLoadingStore()
      const { url } = error.config
      removeFromLoadingState(url)
      return Promise.reject(error)
    }
  )
}

export { httpInterceptor }
