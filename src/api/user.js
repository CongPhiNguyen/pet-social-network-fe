import axios from "../service/axios"

export const getAllUserApi = () => {
  return axios.get("/get-all-user")
}
