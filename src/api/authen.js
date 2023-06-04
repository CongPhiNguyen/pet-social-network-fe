import axios from "../service/axios"
const API_ENDPOINT = process.env.REACT_APP_BE_URL || "http://localhost:5000/api"
export const registerApi = (data) => {
  return axios.post(`${API_ENDPOINT}/register`, data)
}

export const getEmailWithIdApi = (userId) => {
  return axios.get(`${API_ENDPOINT}/user/${userId}/email`)
}

export const sendCodeVerifyApi = (userId) => {
  return axios.post(`${API_ENDPOINT}/user/${userId}/send-email`)
}

export const getAccessTokenV2Api = (refreshToken) => {
  return axios.get(`${API_ENDPOINT}/refresh-v2`, { params: { refreshToken } })
}

export const verifyAccountApi = (verifyInfo) => {
  return axios.post(`${API_ENDPOINT}/user/verify-account`, verifyInfo)
}

export const sendEmailWithPatternApi = (pattern) => {
  return axios.post(`${API_ENDPOINT}/user/${pattern}/send-email-by-pattern`)
}

export const forgotPasswordApi = (forgotInfo) => {
  return axios.post(`${API_ENDPOINT}/forgot-password/`, forgotInfo)
}

export const changePasswordApi = (changePassInfo) => {
  return axios.post(`${API_ENDPOINT}/change-password/`, changePassInfo)
}

export const logInGoogleApi = (token) => {
  return axios.post(`${API_ENDPOINT}/login-google/`, { token: token })
}
