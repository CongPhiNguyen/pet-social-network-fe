import { GLOBALTYPES } from "./globalTypes"
import { postDataAPI } from "../../utils/fetchData"
import { message } from "antd"
import { deleteRefreshToken, setRefreshToken } from "../../utils/cookies"

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
    const res = await postDataAPI("login", data)
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user
      }
    })
    localStorage.setItem("firstLogin", true)
    setRefreshToken(res.data.refresh_token)
    message.success(res.data.msg)
  } catch (err) {
    message.error(err.response.data.msg)
  }
  dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } })
}

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin")
  console.log("firstLogin", firstLogin)
  if (firstLogin) {
    try {
      const res = await postDataAPI("refresh_token")
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user
        }
      })

      dispatch({ type: GLOBALTYPES.ALERT, payload: {} })
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err?.response?.data?.msg
        }
      })
    }
  }
}

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("firstLogin")
    deleteRefreshToken()
    await postDataAPI("logout")
    window.location.href = "/"
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    })
  }
}
