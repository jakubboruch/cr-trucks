import axios from 'axios'
import type { AxiosInstance } from 'axios'
const http: AxiosInstance = axios.create({
  baseURL: 'http://qa-api-mock-3.eu-central-1.elasticbeanstalk.com'
})
export default http
