import type { OrderTypeTable, OrderType } from '@/interfaces/sorting'

export function useSorting() {
  const getSortOrder = (sortOrder: OrderTypeTable): OrderType => {
    switch (sortOrder) {
      case -1:
        return 'ASC'
      case 1:
        return 'DESC'
      default:
        return undefined
    }
  }
  return { getSortOrder }
}
