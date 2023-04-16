import axios from "../service/axios"

export const getAllUserApi = () => {
  return axios.get("/get-all-user")
}

export const getFollowersApi = (id) => {
  return axios.get(`/follower/${id}`)
}

export const getFollowingApi = (id) => {
  return axios.get(`/following/${id}`)
}
