import http from '@/api/http'
import { TrucksEndpoints } from '@/enums/endpoints.enum'
export function useTrucksAPI() {
  const fetchTrucks = async (page: number, limit: number, params?: Record<string, unknown>) => {
    try {
      return await http.get(TrucksEndpoints.TRUCKS, { params: { page, limit, ...params } })
    } catch (e) {
      console.error(e)
    }
  }

  const fetchTruck = async (id: string) => {
    try {
      return await http.get(`${TrucksEndpoints.TRUCKS}/${id}`)
    } catch (e) {
      console.error(e)
    }
  }

  const deleteTruck = async (id: string) => {
    try {
      return await http.delete(`${TrucksEndpoints.TRUCKS}/${id}`)
    } catch (e) {
      console.error(e)
    }
  }

  const createTruck = async (
    name: string | undefined,
    code: string | undefined,
    description: string | undefined,
    status: string | undefined
  ) => {
    try {
      return await http.post(`${TrucksEndpoints.TRUCKS}`, { name, code, description, status })
    } catch (e) {
      console.error(e)
    }
  }

  const updateTruck = async (
    id: string | undefined,
    name: string | undefined,
    code: string | undefined,
    description: string | undefined,
    status: string | undefined
  ) => {
    if (!id) {
      return
    }
    try {
      return await http.put(`${TrucksEndpoints.TRUCKS}/${id}`, { name, code, description, status })
    } catch (e) {
      console.error(e)
    }
  }
  return { fetchTrucks, fetchTruck, createTruck, updateTruck, deleteTruck }
}
