import { createRouter, createWebHistory } from 'vue-router'
import Trucks from '../views/CrViewTrucks.vue'
import Truck from '../views/CrViewTruck.vue'
import { TruckRoutes } from '@/enums/routes.enum'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: TruckRoutes.LIST_OF_TRUCKS,
      component: Trucks
    },
    {
      path: '/truck/edit/:id',
      name: TruckRoutes.TRUCK_EDIT,
      component: Truck
    },
    {
      path: '/truck/add',
      name: TruckRoutes.TRUCK_ADD,
      component: Truck
    },
  ]
})

export default router
