import axios from "../service/axios"

export const getPostByUserIdApi = (userId) => {
  return axios.get("/post/list/" + userId)
}
