import axios from "axios"

const BASE_URL = "http://localhost:5000/api/"

export const baseApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})

baseApi.defaults.headers.common["Content-Type"] = "application/json"
