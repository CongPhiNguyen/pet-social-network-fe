import axios from "../service/axios"

export const addPetApi = (data) => {
  return axios.post("/pet", data)
}

export const getPetApiByUserId = (userId) => {
  return axios.get("/pet-by-userId", { params: { userId: userId } })
}
