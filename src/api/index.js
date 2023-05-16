import axios from "axios"

const BASE_URL = "https://pet-social-be.onrender.com/api/"

export const baseApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})

baseApi.defaults.headers.common["Content-Type"] = "application/json"
