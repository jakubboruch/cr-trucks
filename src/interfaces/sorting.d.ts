type OrderType = 'ASC' | 'DESC' | undefined
type OrderTypeTable = undefined | null | 0 | 1 | -1
interface Params {
  sort: undefined | string | Function
  order: OrderType
  [key: string]: string | undefined | Function | OrderType
}

export { OrderType, OrderTypeTable, Params }
