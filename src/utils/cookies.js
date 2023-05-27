import Cookies from "universal-cookie"

export const setRefreshToken = (refreshToken) => {
  const cookies = new Cookies()
  cookies.set("refreshtoken", refreshToken)
}
