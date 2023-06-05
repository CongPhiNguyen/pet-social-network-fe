import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Route, Routes, useLocation } from "react-router-dom"
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
import NotFoundPage from "../pages/notFound"
import Peer from "peerjs"
import ChatGpt from "../pages/chatGpt"
import StatusModal from "../components/StatusModal"
import { getAccessTokenV2Api } from "../api/authen"
import { getRefreshToken, setRefreshToken } from "../utils/cookies"
import { message } from "antd"
// import { setCurrentUserInfo, handleLogin } from "../features/authen/authenSlice"
const CustomRouters = () => {
  const { auth, call } = useSelector((state) => state)
  const role = useSelector((state) => state.auth?.user?.role)
  const dispatch = useDispatch()
  const location = useLocation()
  const [isAdminRoute, setIsAdminRoute] = useState(false)

  useEffect(() => {
    setIsAdminRoute(location.pathname.startsWith("/admin"))
  }, [location])

  const getRefreshTokenFunction = async () => {
    const refreshToken = getRefreshToken()
    console.log("refreshToken", refreshToken)
    const res = await getAccessTokenV2Api(refreshToken)
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user
      }
    })
    localStorage.setItem("firstLogin", true)
    // setRefreshToken(res.data.refresh_token)
    message.success(res.data.msg)
  }

  useEffect(() => {
    // dispatch(refreshToken())
    // Get access token
    getRefreshTokenFunction()
    const socket = io("http://localhost:5000/", {
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttemps: 10,
      transports: ["websocket"],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false
    })
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

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: "/",

      secure: true
    })

    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
  }, [dispatch])
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
    <>
      {/* đã đăng nhập */}
      {auth.token && !isAdminRoute && <SocketClient />}
      {auth.token && !isAdminRoute && <HeaderLayout />}
      {auth.token && !isAdminRoute && <ChatGpt />}
      <StatusModal></StatusModal>
      {call && !isAdminRoute && <CallModal />}
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
        {auth.token &&
          role === "admin" &&
          routes.adminRoute.map((route, index) => {
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

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default CustomRouters
