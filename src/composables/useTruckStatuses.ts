import { computed } from 'vue'
enum INACTIVE_STATUSES {
  OUT_OF_SERVICE = 'OUT_OF_SERVICE',
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

  const isNextStatus = (statuses: string[], currentStatus: string | undefined, nextStatus: string) => {
    const arr = [...statuses];
    let isNext = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[0] === currentStatus && arr[1] === nextStatus) {
        isNext = true;
        break;
      }
      arr.push(<string>arr.shift())
    }

    return isNext;
  }

  const isStatusDisabled = (status: string) => {
    return isUpdate
      && status !== truckStatus
      && !inactiveStatuses.includes(truckStatus as INACTIVE_STATUSES)
      && !inactiveStatuses.includes(status as INACTIVE_STATUSES)
      && !isNextStatus(activeStatuses, truckStatus, status)
  }

  const buildStatuses = (statuses: string[]) => {
    return statuses.map((status: string) => ({ label: status, value: status, disabled: isStatusDisabled(status) }))
  }

  return { allStatuses, inactiveStatuses, activeStatuses }
}