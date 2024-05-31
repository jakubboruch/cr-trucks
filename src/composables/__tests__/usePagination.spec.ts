import { expect, test } from 'vitest'
import { usePagination } from '../usePagination'

test('Creating pagination based on totalItems', () => {
  const { setTotalItems, itemsPerPage, numberOfPages } = usePagination()
  itemsPerPage.value = 10
  setTotalItems(123)
  expect(numberOfPages.value).toBe(13)
})
