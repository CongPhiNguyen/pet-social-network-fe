import axios from "../service/axios"

export const registerApi = (data) => {
  return axios.post("/register", data)
}
