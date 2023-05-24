import axios from "../service/axios"
const API_ENDPOINT = process.env.BE_URL || "http://localhost:5000/api/"
export const getLogsApi = () => {
  return axios.get(`${API_ENDPOINT}/log`)
}
