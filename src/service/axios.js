import axios from "axios"

const API_ENDPOINT =
  "https://pet-social-be.onrender.com/api" || "http://localhost:5000/api/"

const instance = axios.create({
  baseURL: API_ENDPOINT
  // withCredentials: true
})

instance.defaults.headers.common["Content-Type"] = "application/json"
export default instance
