import { computed } from 'vue'
enum INACTIVE_STATUSES {
  OUT_OF_SERVICE = 'OUT_OF_SERVICE'
}
enum ACTIVE_STATUSES {
  LOADING = 'LOADING',
  TO_JOB = 'TO_JOB',
  AT_JOB = 'AT_JOB',
  RETURNING = 'RETURNING'
}

export function useTruckStatuses(isUpdate: boolean, truckStatus?: string) {
  const inactiveStatuses = Object.values(INACTIVE_STATUSES)
  const activeStatuses = Object.values(ACTIVE_STATUSES)
  const allStatuses = computed(() => {
    return [...buildStatuses([...inactiveStatuses, ...activeStatuses])]
  })

  const isNextStatus = (
    statuses: string[],
    currentStatus: string | undefined,
    nextStatus: string
  ) => {
    const arr = [...statuses]
    let isNext = false
    for (let i = 0; i < arr.length; i++) {
      if (arr[0] === currentStatus && arr[1] === nextStatus) {
        isNext = true
        break
      }
      arr.push(<string>arr.shift())
    }

    return isNext
  }

  const isStatusDisabled = (status: string) => { // conditions to disable status in the dropdown
    return (
      isUpdate && // condition only applies for edit action
      status !== truckStatus && // different status from the current one
      !inactiveStatuses.includes(truckStatus as INACTIVE_STATUSES) && // each status can be set if the current status of the Truck is "Out of service"
      !inactiveStatuses.includes(status as INACTIVE_STATUSES) && // "Out Of Service" status can be set regardless of the current status of the Truck
      !isNextStatus(activeStatuses, truckStatus, status) // The remaining statuses can only be changed in the following order: Loading -> To Job -> At Job -> Returning, when Truck has "Returning" status it can start "Loading" again.
    )
  }

  const buildStatuses = (statuses: string[]) => {
    return statuses.map((status: string) => ({
      label: status,
      value: status,
      disabled: isStatusDisabled(status)
    }))
  }

  return { allStatuses, inactiveStatuses, activeStatuses }
}
