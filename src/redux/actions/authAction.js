import { GLOBALTYPES } from "./globalTypes"
import { postDataAPI } from "../../utils/fetchData"
import { message } from "antd"
import { deleteRefreshToken, setRefreshToken } from "../../utils/cookies"

export const loginGoogleAction = (dataCredential) => (dispatch) => {
  console.log(dataCredential)
  localStorage.setItem("firstLogin", true)
  setRefreshToken(dataCredential.refresh_token)
  dispatch({ type: GLOBALTYPES.AUTH, payload: dataCredential })
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
      message.error(err?.response?.data?.msg)
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
    message.error(err?.response?.data?.msg)
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    })
  }
}
