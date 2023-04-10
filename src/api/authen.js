import axios from "../service/axios"

export const registerApi = (data) => {
  return axios.post("/register", data)
}

export const getEmailWithIdApi = (userId) => {
  return axios.get(`/user/${userId}/email`)
}
