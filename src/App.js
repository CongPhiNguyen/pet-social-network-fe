import { useEffect } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import PageRender from "./customRouter/PageRender"
import PrivateRouter from "./customRouter/PrivateRouter"

import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"

import Alert from "./components/alert/Alert"
import HeaderLayout from "./components/header/Header"
import StatusModal from "./components/StatusModal"

import { useSelector, useDispatch } from "react-redux"
import { refreshToken } from "./redux/actions/authAction"
import { getPosts } from "./redux/actions/postAction"
import { getSuggestions } from "./redux/actions/suggestionsAction"

import io from "socket.io-client"
import { GLOBALTYPES } from "./redux/actions/globalTypes"
import SocketClient from "./SocketClient"

import { getNotifies } from "./redux/actions/notifyAction"
import CallModal from "./components/message/CallModal"
import Peer from "peerjs"
import "antd/dist/reset.css"
import "./styles/app.css"
import "./styles/scss/main.scss"
import "./styles/antd.less"
import ForgotPassword from "./pages/forgotPassword"
import SetPassword from "./pages/setPassword"
import Verify from "./pages/verify"

function App() {
  const { auth, status, modal, call } = useSelector((state) => state)
  const dispatch = useDispatch()
  console.log(window.location)

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
  //   const newPeer = new Peer(undefined, {
  //     path: "/",
  //     secure: true
  //   })

  //   dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
  // }, [dispatch])

  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && "mode"}`}>
        <div className="main">
          {auth.token && <HeaderLayout />}
          {/* {status && <StatusModal />} */}
          <StatusModal />
          {auth.token && <SocketClient />}
          {call && <CallModal />}

          <Route exact path="/register" component={Register} />
          <Route exact path="/verify/:id" component={Verify} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/set-password" component={SetPassword} />
          <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />
          <Route exact path="/" component={auth.token ? Home : Login} />
        </div>
      </div>
    </Router>
  )
}

export default App
