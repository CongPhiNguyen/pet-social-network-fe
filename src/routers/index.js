import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
  useLocation,
  useNavigate,
  useRoutes
} from "react-router-dom"
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
// import { setCurrentUserInfo, handleLogin } from "../features/authen/authenSlice"
const CustomRouters = () => {
  const { auth, status, modal, call } = useSelector((state) => state)
  const role = useSelector((state) => state.auth?.user?.role)
  const dispatch = useDispatch()
  const location = useLocation()
  const [isAdminRoute, setIsAdminRoute] = useState(false)

  useEffect(() => {
    setIsAdminRoute(location.pathname.startsWith("/admin"))
  }, [location])

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
    <>
      {/* đã đăng nhập */}
      {auth.token && !isAdminRoute && <SocketClient />}
      {auth.token && !isAdminRoute && <HeaderLayout />}
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
