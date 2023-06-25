import axios from "../service/axios"
const API_ENDPOINT = process.env.REACT_APP_BE_URL || "http://localhost:5000/api"

export const registerApi = (data) => {
  return axios.post(`${API_ENDPOINT}/register`, data)
}
