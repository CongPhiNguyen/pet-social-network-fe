import axios from "../service/axios"

const API_ENDPOINT = process.env.REACT_APP_BE_URL || "http://localhost:5000/api"

export const getPostByUserIdApi = (userId) => {
  return axios.get(`${API_ENDPOINT}/post/list/` + userId)
}

export const getPostByLocation = (location) => {
  return axios.post(`${API_ENDPOINT}/location`, { location })
}

export const getAllPostApi = ({ username }) => {
  return axios.get(`${API_ENDPOINT}/get-all-posts?username=${username}`)
}

export const getAllLimitsWord = () => {
  return axios.get(`${API_ENDPOINT}/get-all-limits-word`)
}

export const updateListsWord = (words) => {
  return axios.post(`${API_ENDPOINT}/get-all-limits-word`, { words })
}

export const searchInPageSearch = (search) => {
  return axios.get(`${API_ENDPOINT}/search-in-page${search}`)
}