import axios from "../service/axios"
const API_ENDPOINT = process.env.REACT_APP_BE_URL || "http://localhost:5000/api"

export const generateQrCodeApi = (data) => {
  return axios.post(`${API_ENDPOINT}/auth/otp/generate`, data)
}

export const disableTwoFactorAuthApi = (data) => {
  return axios.post(`${API_ENDPOINT}/auth/otp/disable`, data)
}

export const verifyOtpApi = (data) => {
  return axios.post(`${API_ENDPOINT}/auth/otp/verify`, data)
}
