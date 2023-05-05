import axios from "../service/axios"

export const addPetApi = (data) => {
  return axios.post("/pet", data)
}
