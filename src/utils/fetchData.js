import axios from "axios"
const API_ENDPOINT = process.env.REACT_APP_BE_URL || "http://localhost:5000/api"

export const getDataAPI = async (url, token) => {
  const res = await axios.get(`${API_ENDPOINT}/${url}`, {
    headers: { Authorization: token }
  })
  return res
}

export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(`${API_ENDPOINT}/${url}`, post, {
    headers: { Authorization: token }
  })
  return res
}

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(`${API_ENDPOINT}/${url}`, post, {
    headers: { Authorization: token }
  })
  return res
}

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(`${API_ENDPOINT}/${url}`, post, {
    headers: { Authorization: token }
  })
  return res
}

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`${API_ENDPOINT}/${url}`, {
    headers: { Authorization: token }
  })
  return res
}
