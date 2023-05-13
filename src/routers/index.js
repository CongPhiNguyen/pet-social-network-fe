import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import routes from "./router"
import { useSelector } from "react-redux"
import io from "socket.io-client"
import { refreshToken } from "../redux/actions/authAction"
import { GLOBALTYPES } from "../redux/actions/globalTypes"
import { getPosts } from "../redux/actions/postAction"
import { getSuggestions } from "../redux/actions/suggestionsAction"
import { getNotifies } from "../redux/actions/notifyAction"
import SocketClient from "../SocketClient"
import CallModal from "../components/message/CallModal"
import HeaderLayout from "../components/header/Header"
// import { setCurrentUserInfo, handleLogin } from "../features/authen/authenSlice"
const CustomRouters = () => {
  const { auth, status, modal, call } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
    const socket = io()
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket })
    return () => socket.close()
  }, [dispatch])

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
      dispatch(getNotifies(auth.token))
    }
  }, [dispatch, auth.token])

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification")
    } else if (Notification.permission === "granted") {
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
        }
      })
    }
  }, [])
  // useEffect(() => {
  //   axios.get(URL.URL_REFRESH)
  //     .then((data) => {
  //       if (data?.data?.success) {
  //         dispatch(setCurrentUserInfo({ username: data?.data?.username }))
  //         dispatch(handleLogin({ info: data?.data?.data }))
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("err", err)
  //     })
  // }, [dispatch])
  return (
    <React.Suspense>
      <BrowserRouter>
        {/* đã đăng nhập */}
        {auth.token && <SocketClient />}
        {auth.token && <HeaderLayout />}
        <Routes>
          {!auth.token &&
            routes.publicRoute.map((route, index) => {
              return (
                route.element && (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                )
              )
            })}

          {call && <CallModal />}
          {auth.token &&
            routes.protectedRoute.map((route, index) => {
              return (
                route.element && (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                )
              )
            })}
          {routes.commonRoute.map((route, index) => {
            return (
              route.element && (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              )
            )
          })}
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  )
}

export default CustomRouters
