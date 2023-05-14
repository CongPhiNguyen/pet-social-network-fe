import axios from "../service/axios"

export const getLogsApi = () => {
  return axios.get("/log")
}
