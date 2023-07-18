import axios from "../service/axios"
const API_ENDPOINT = process.env.REACT_APP_BE_URL || "http://localhost:5000/api"

export const sendDialogflowMessageApi = (data) => {
  return axios.post(`${API_ENDPOINT}/dialogflow-api`, data)
}

export const sendDummyMessageApi = (data) => {
  return axios.post(`${API_ENDPOINT}/chat/dummy`, data)
}

export const sendGossipMessageApi = (data) => {
  return axios.post(`${API_ENDPOINT}/chat/gossip`, data)
}

export const getBotMessageApi = (params) => {
  return axios.get(`${API_ENDPOINT}/bot-message/`, {
    params: params
  })
}

export const addBotGreetMessageApi = (body) => {
  return axios.post(`${API_ENDPOINT}/add-greet-message`, body)
}
