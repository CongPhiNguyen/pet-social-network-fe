import axios from "../service/axios"
import axios2 from "axios"
const API_ENDPOINT = process.env.REACT_APP_BE_URL || "http://localhost:5000/api"

export const changeRole = (role, id) => {
  return axios.post(`${API_ENDPOINT}/change-role`, {
    role,
    id
  })
}

export const getAllUserApi = (filters) => {
  return axios.get(
    `${API_ENDPOINT}/get-all-user?id=${filters?.id}&username=${filters?.username}&role=${filters?.role}`
  )
}

export const getUserInfoApi = (userId) => {
  return axios.get(`${API_ENDPOINT}/get-user-info/` + userId)
}

export const getFollowersApi = (id) => {
  return axios.get(`${API_ENDPOINT}/follower/${id}`)
}

export const getFollowingApi = (id) => {
  return axios.get(`${API_ENDPOINT}/following/${id}`)
}

export const uploadImageApi = (formData) => {
  return axios2.post(
    "https://api.cloudinary.com/v1_1/databaseimg/image/upload",
    formData
  )
}

export const updateProfileApi = (userId, userData) => {
  return axios.post(`${API_ENDPOINT}/user/` + userId, userData)
}

export const getUserWithPatternApi = (pattern) => {
  return axios.get(`${API_ENDPOINT}/user?pattern=${pattern}`)
}

export const loginTokenApi = (userData, token) => {
  return axios.post(`${API_ENDPOINT}/login`, userData, {
    headers: { Authorization: token }
  })
}

export const getSuggestionsApi = (userId) => {
  return axios.get(`${API_ENDPOINT}/user-service/suggest`, {
    params: { userId }
  })
}
