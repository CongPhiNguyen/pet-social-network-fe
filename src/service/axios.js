import axios from "axios"

const API_ENDPOINT =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api/"

const instance = axios.create({
  baseURL: API_ENDPOINT
  // withCredentials: true
})

instance.defaults.headers.common["Content-Type"] = "application/json"
export default instance
