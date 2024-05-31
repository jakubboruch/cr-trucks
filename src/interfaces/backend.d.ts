export type TruckStatuses = 'OUT_OF_SERVICE' | 'LOADING' | 'TO_JOB' | 'AT_JOB' | 'RETURNING'

interface Truck {
  id?: string
  name?: string
  description?: string
  code?: string
  status?: TruckStatuses
}

export { Truck }
