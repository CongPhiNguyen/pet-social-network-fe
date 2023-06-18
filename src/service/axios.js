import axios from "axios"

const API_ENDPOINT = process.env.REACT_APP_BE_URL || "http://localhost:5000/api"

const instance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
})

instance.defaults.headers.common["Content-Type"] = "application/json"
export default instance
