<script setup lang="ts">
import Button from 'primevue/button'
import { required, alphaNum, helpers } from '@vuelidate/validators'
import { computed, reactive, ref } from 'vue'
const { withAsync, withMessage } = helpers

import { useRoute, useRouter } from 'vue-router'
import { useTruckStatuses } from '@/composables/useTruckStatuses'
import { useTrucksAPI } from '@/composables/useTrucksAPI'
import CrForm from '@/components/common/CrForm.vue'
import { TruckRoutes } from '@/enums/routes.enum'
import type { Truck } from '@/interfaces/backend'

const route = useRoute()
const router = useRouter()
const { fetchTruck, fetchTrucks, createTruck, updateTruck } = useTrucksAPI()

const truck = ref<Truck>()

const state = ref<Truck>({ ...truck.value })

const isCreate = computed(() => route.name === TruckRoutes.TRUCK_ADD)
const isUpdate = computed(() => route.name === TruckRoutes.TRUCK_EDIT)

const allStatuses = ref()

const getTruck = async () => {
  try {
    const id = route.params.id as string
    truck.value = (await fetchTruck(id))?.data
    allStatuses.value = useTruckStatuses(isUpdate.value, truck.value?.status).allStatuses.value
    state.value = { ...truck.value }
  } catch (e) {
    console.error(e)
  }
}

if (isCreate.value) {
  allStatuses.value = useTruckStatuses(isUpdate.value, '').allStatuses.value
}

if (isUpdate.value) {
  getTruck()
}

// LABELS
const label = computed(() => {
  return isCreate.value ? `Add Truck` : `Edit Truck: ${truck.value?.id}`
})

const actionLabel = computed(() => {
  return isCreate.value ? `Add` : `Update`
})

// VALIDATION
const isUnique = async (code: string) => {
  if (code === truck.value?.code || !code) {
    return true
  }
  const response = (await fetchTrucks(1, 1, { code }))?.data
  return !response.length
}

const fields = reactive([
  ...(isUpdate.value
    ? [
        {
          name: 'id',
          label: 'Id',
          rule: isUpdate.value ? { required } : {},
          type: 'InputText',
          disabled: true
        }
      ]
    : []),
  {
    name: 'name',
    label: 'Name',
    rule: { required },
    type: 'InputText',
    disabled: false
  },
  {
    name: 'code',
    label: 'Code',
    rule: {
      required,
      alphaNum,
      unique: withMessage('The value must be unique', withAsync(isUnique))
    },
    type: 'InputText',
    disabled: false
  },
  {
    name: 'description',
    label: 'Description',
    rule: {},
    type: 'Textarea',
    disabled: false
  },
  {
    name: 'status',
    label: 'Status',
    rule: { required },
    type: 'Dropdown',
    options: allStatuses,
    disabled: false
  }
])

// ACTIONS
const onMainAction = async () => {
  const { id, name, code, description, status } = state.value
  if (isCreate.value) {
    truck.value = (await createTruck(name, code, description, status))?.data
  }
  if (isUpdate.value) {
    truck.value = (await updateTruck(id, name, code, description, status))?.data
  }
  goBack()
}

const goBack = () => {
  router.push({ name: TruckRoutes.LIST_OF_TRUCKS })
}
</script>

<template>
  <CrForm
    :fields="fields"
    :state="state"
    :label="label"
    :actionLabel="actionLabel"
    @action="onMainAction"
  >
    <template #beforeTitle>
      <Button icon="pi pi-angle-left" text rounded aria-label="Go Back" @click="goBack()" />
    </template>
  </CrForm>
</template>

<style scoped lang="scss"></style>
