import axios from "axios"

const API_ENDPOINT = process.env.BE_URL || "http://localhost:5000/api/"

export const baseApi = axios.create({
  baseURL: API_ENDPOINT,
  withCredentials: true
})

baseApi.defaults.headers.common["Content-Type"] = "application/json"
