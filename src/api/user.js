import axios from "../service/axios"

export const getAllUserApi = () => {
  return axios.get("/get-all-user")
}

export const getUserInfoApi = (userId) => {
  return axios.get("/get-user-info/" + userId)
}

export const getFollowersApi = (id) => {
  return axios.get(`/follower/${id}`)
}

export const getFollowingApi = (id) => {
  return axios.get(`/following/${id}`)
}

export const uploadImageApi = (formData) => {
  return axios.post(
    "https://api.cloudinary.com/v1_1/databaseimg/image/upload",
    formData
  )
}

export const updateProfileApi = (userId, userData) => {
  return axios.post("/user/" + userId, userData)
}
