<script setup lang="ts">
import DataTable from 'primevue/datatable'
import type { DataTableSortEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import CrPagination from '@/components/common/CrPagination.vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePagination } from '@/composables/usePagination'
import { useTrucksAPI } from '@/composables/useTrucksAPI'
import { useSorting } from '@/composables/useSorting'
import { useLoadingStore } from '@/stores/loading.store'
import { TruckRoutes } from '@/enums/routes.enum'
import type { Params } from '@/interfaces/sorting'

let trucks = ref(undefined)
const router = useRouter()
const pageNumber = ref(1)
const { itemsPerPage } = usePagination()
const { fetchTrucks, deleteTruck } = useTrucksAPI()
const limit = ref(itemsPerPage.value)
const totalItems = ref(0)
const loadingStore = useLoadingStore();
const params: Params = reactive({
  sort: undefined,
  order: undefined
})

// API CALLS
const getTrucks = async (page = pageNumber.value) => {
  try {
    const response = await fetchTrucks(page, limit.value, params)
    totalItems.value = Number(response?.headers['x-total-count'])
    trucks.value = response?.data
    pageNumber.value = page
  } catch (e) {
    console.error(e)
  }
}

const onDeleteTruck = async (id: string) => {
  try {
    await deleteTruck(id)
    await getTrucks(pageNumber.value)
  } catch (e) {
    console.error(e)
  }
}

// NAVIGATION
const goToDetails = (id: string) => {
  router.push({ name: TruckRoutes.TRUCK_EDIT, params: { id } })
}

const onClickCreate = () => {
  router.push({ name: TruckRoutes.TRUCK_ADD })
}

// TABLE CONFIG
const columns = [
  { field: 'id', header: 'ID', sortable: true },
  { field: 'code', header: 'Code', sortable: true },
  { field: 'name', header: 'Name', sortable: true },
  { field: 'description', header: 'Description' },
  { field: 'status', header: 'Status', sortable: true },
  {
    actions: [
      { icon: 'pi pi-pencil', action: goToDetails },
      { icon: 'pi pi-trash', action: onDeleteTruck }
    ]
  }
]

// ACTIONS
const onPageChange = (newPage: number) => {
  getTrucks(newPage)
}

const onItemsPerPageChange = (newLimit: number) => {
  limit.value = newLimit
}

const onSortColumn = (event: DataTableSortEvent) => {
  const { sortField, sortOrder } = event
  const { getSortOrder } = useSorting()
  const order = getSortOrder(sortOrder)
  params.sort = sortField
  params.order = order
  getTrucks()
}

getTrucks()
</script>

<template>
  <div class="flex flex-column gap-3 w-10 mx-auto">
    <header class="flex justify-content-between">
      <div>
        <h1>List of Trucks</h1>
        <h5>{{ 'Total rows' }}: {{ totalItems }}</h5>
      </div>
      <div class="flex align-items-center">
        <Button rounded @click="onClickCreate">Add Truck</Button>
      </div>
    </header>
    <DataTable
      :value="trucks"
      :loading="loadingStore.isLoading"
      scrollable
      scrollHeight="500px"
      lazy
      removable-sort
      @sort="onSortColumn"
      tableStyle="min-width: 50rem"
    >
      <template v-for="column in columns" :key="column.field">
        <Column
          v-if="column.field"
          :field="column.field"
          :header="column.header"
          :sortable="column.sortable"
        ></Column>
        <Column v-if="column.actions" :header="column.header" style="width: 150px">
          <template #body="{ data }">
            <Button
              v-for="action in column.actions"
              :key="action.icon"
              :icon="action.icon"
              @click="action.action(data.id)"
              text
              rounded
              aria-label="Go Next"
            />
          </template>
        </Column>
      </template>
      <template #empty> No data found. </template>
      <template #loading> Loading data. Please wait. </template>
      <template #footer>
        <CrPagination
          :page="pageNumber"
          :itemsPerPage="limit"
          :totalItems="totalItems"
          @update:items-per-page="onItemsPerPageChange"
          @update:page="onPageChange"
        ></CrPagination>
      </template>
    </DataTable>
  </div>
</template>

<style scoped lang="scss">
.jump-to-page {
  width: 50px;
  text-align: center;
}
</style>
