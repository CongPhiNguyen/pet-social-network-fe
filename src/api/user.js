import axios from "../service/axios"

const API_ENDPOINT = process.env.REACT_APP_BE_URL || "http://localhost:5000/api"

export const getAllUserApi = () => {
  return axios.get(`${API_ENDPOINT}/get-all-user`)
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
  return axios.post(
    "https://api.cloudinary.com/v1_1/databaseimg/image/upload",
    formData
  )
}

export const updateProfileApi = (userId, userData) => {
  return axios.post(`${API_ENDPOINT}/user/` + userId, userData)
}

export const getUserWithEmailApi = (email) => {
  return axios.get(`${API_ENDPOINT}/user?email=${email}`)
}

export const loginApi = (userData) => {
  return axios.post(`${API_ENDPOINT}/login`, userData)
}
