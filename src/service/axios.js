import axios from "axios"

export const API_ENDPOINT =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api/"

const instance = axios.create({
  baseURL: API_ENDPOINT,
  validateStatus: (status) => status >= 200 && status < 600
  // withCredentials: true
})

instance.defaults.headers.common["Content-Type"] = "application/json"
export default instance
