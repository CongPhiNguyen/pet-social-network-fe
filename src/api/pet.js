import axios from "../service/axios"

const API_ENDPOINT = process.env.REACT_APP_BE_URL || "http://localhost:5000/api"

export const addPetApi = (data) => {
  return axios.post(`${API_ENDPOINT}/pet`, data)
}

export const getPetApiByUserId = (userId) => {
  return axios.get(`${API_ENDPOINT}/pet-by-userId`, {
    params: { userId: userId }
  })
}
