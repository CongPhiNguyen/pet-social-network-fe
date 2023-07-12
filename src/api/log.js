import axios from "../service/axios"
const API_ENDPOINT = process.env.REACT_APP_BE_URL || "http://localhost:5000/api"
export const getLogsApi = () => {
  return axios.get(`${API_ENDPOINT}/log`)
}

export const getLogsAccumulationApi = (query) => {
  return axios.get(`${API_ENDPOINT}/log/accumulation`, { params: query })
}
