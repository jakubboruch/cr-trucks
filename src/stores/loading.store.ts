import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

enum ERROR {
  TIMEOUT = 10000
}

export const useLoadingStore = defineStore('loadingStore', () => {
  const loadingState = ref<string[]>([])
  const isLoading = computed(() => loadingState.value.length > 0)
  const error = ref<string | undefined>(undefined)

  function addToLoadingState(url: string | undefined): void {
    if (!url) {
      return
    }
    loadingState.value.push(url)
  }

  function removeFromLoadingState(url: string | undefined): void {
    if (!url) {
      return
    }
    loadingState.value.splice(loadingState.value.indexOf(url), 1)
  }

  function setError(newError: string) {
    error.value = newError
    setTimeout(() => {
      error.value = undefined
    }, ERROR.TIMEOUT)
  }

  return { isLoading, error, loadingState, addToLoadingState, removeFromLoadingState, setError }
})
