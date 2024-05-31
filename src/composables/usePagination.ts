import { PaginationEnum } from '@/enums/pagination.enum'
import { computed, ref } from 'vue'
const countOfItemsPerPage = [10, 20, 50, 100]

export function usePagination() {
  const totalItems = ref(0)

  const setTotalItems = (newValue: number) => {
    totalItems.value = newValue
  }

  const getIPPFromLS = () => {
    return (
      Number(JSON.parse(localStorage.getItem(PaginationEnum.ITEMS_PER_PAGE) || '{}')) ||
      countOfItemsPerPage[0]
    )
  }

  const setIPPToLS = (newValue: number) => {
    localStorage.setItem(PaginationEnum.ITEMS_PER_PAGE, String(newValue))
  }

  const itemsPerPage = ref(getIPPFromLS())

  const numberOfPages = computed(() => {
    return Math.ceil(totalItems.value / itemsPerPage.value)
  })

  return {
    countOfItemsPerPage,
    getIPPFromLS,
    setIPPToLS,
    setTotalItems,
    numberOfPages,
    itemsPerPage
  }
}
