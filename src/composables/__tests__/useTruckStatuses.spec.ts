import { expect, test } from 'vitest'
import { useTruckStatuses } from '../useTruckStatuses'

function outOfServiceIsEnabled(allStatuses) {
  const outOfService = allStatuses.value.find((status) => status.value === 'OUT_OF_SERVICE')
  expect(outOfService.disabled).toBe(false)
}

function nextStatusIsEnabled(allStatuses, nextStatusName: string) {
  const notDisabledStatuses = allStatuses.value.filter((status) => !status.disabled)
  expect(notDisabledStatuses.length).toBe(3)
  const nextStatusIsEnabled = notDisabledStatuses.some((status) => status.value === nextStatusName)
  expect(nextStatusIsEnabled).toBe(true)
}

test('Can use any status for creation flow', async () => {
  const { allStatuses } = useTruckStatuses(false)
  allStatuses.value.forEach((status) => {
    expect(status.disabled).toBe(false)
  })
})

test('"Out Of Service" status can be set regardless of the current status of the Truck', () => {
  let allStatuses
  allStatuses = useTruckStatuses(true, 'LOADING').allStatuses
  outOfServiceIsEnabled(allStatuses)
  allStatuses = useTruckStatuses(true, 'TO_JOB').allStatuses
  outOfServiceIsEnabled(allStatuses)
  allStatuses = useTruckStatuses(true, 'AT_JOB').allStatuses
  outOfServiceIsEnabled(allStatuses)
  allStatuses = useTruckStatuses(true, 'RETURNING').allStatuses
  outOfServiceIsEnabled(allStatuses)
})

test('Each status can be set if the current status of the Truck is "Out of service"', () => {
  const { allStatuses } = useTruckStatuses(true, 'OUT_OF_SERVICE')
  const eachCanBeChanged = allStatuses.value.every((status) => !status.disabled)
  expect(eachCanBeChanged).toBe(true)
})

test(
  'the remaining statuses can only be changed in the following order:\n' +
    'Loading -> To Job -> At Job -> Returning',
  () => {
    let allStatuses
    allStatuses = useTruckStatuses(true, 'LOADING').allStatuses
    nextStatusIsEnabled(allStatuses, 'TO_JOB')
    allStatuses = useTruckStatuses(true, 'TO_JOB').allStatuses
    nextStatusIsEnabled(allStatuses, 'AT_JOB')
    allStatuses = useTruckStatuses(true, 'AT_JOB').allStatuses
    nextStatusIsEnabled(allStatuses, 'RETURNING')
  }
)

test('When Truck has "Returning" status it can start "Loading" again.', () => {
  const { allStatuses } = useTruckStatuses(true, 'RETURNING')
  nextStatusIsEnabled(allStatuses, 'LOADING')
})
