import axios from "axios"

const BASE_URL = "https://api.thedogapi.com/v1"
const CAT_URL = "https://api.thecatapi.com/v1"
const API_KEY = process.env.REACT_APP_CAT_API_KEY
const API_ENDPOINT = process.env.REACT_APP_BE_URL || "http://localhost:5000/api"

export const fetchBreeds = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/breeds`, {
      headers: {
        "x-api-key": API_KEY
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const searchBreeds = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/breeds/search?q=${query}`, {
      headers: {
        "x-api-key": API_KEY
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const fetchImagesByBreed = async (breedId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/images/search?breed_id=${breedId}`,
      {
        headers: {
          "x-api-key": API_KEY
        }
      }
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getCatApi = async () => {
  try {
    const response = await axios.get(`${CAT_URL}/breeds`, {
      headers: {
        "x-api-key": API_KEY
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getDogMongoApi = async () => {
  return axios.get(`${API_ENDPOINT}/pet-wiki/dogs`)
}

export const getCatMongoApi = async () => {
  return axios.get(`${API_ENDPOINT}/pet-wiki/cats`)
}
