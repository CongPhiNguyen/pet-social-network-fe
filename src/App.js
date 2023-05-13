import React from "react"
import "antd/dist/reset.css"
import "./styles/app.css"
import "./styles/scss/main.scss"
import "./styles/antd.less"
import CustomRouters from "./routers"
import { BrowserRouter } from "react-router-dom"
function App() {
  // const { auth, status, modal, call } = useSelector((state) => state)
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(refreshToken())

  //   const socket = io()
  //   dispatch({ type: GLOBALTYPES.SOCKET, payload: socket })
  //   return () => socket.close()
  // }, [dispatch])

  // useEffect(() => {
  //   if (auth.token) {
  //     dispatch(getPosts(auth.token))
  //     dispatch(getSuggestions(auth.token))
  //     dispatch(getNotifies(auth.token))
  //   }
  // }, [dispatch, auth.token])

  // useEffect(() => {
  //   if (!("Notification" in window)) {
  //     alert("This browser does not support desktop notification")
  //   } else if (Notification.permission === "granted") {
  //   } else if (Notification.permission !== "denied") {
  //     Notification.requestPermission().then(function (permission) {
  //       if (permission === "granted") {
  //       }
  //     })
  //   }
  // }, [])

  // useEffect(() => {
  //   const newPeer = new Peer(undefined, {
  //     path: "/",
  //     secure: true
  //   })

  //   dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
  // }, [dispatch])

  return (
    <React.Fragment>
      <React.Suspense>
        <BrowserRouter>
          <CustomRouters />
        </BrowserRouter>
      </React.Suspense>

      {/* {window.location.pathname !== "/admin" && (
        <Router>
          <Alert />
          <input type="checkbox" id="theme" style={{ display: "none" }} />
          <div className={`App ${(status || modal) && "mode"}`}>
            <div className="main">
              {auth.token && <HeaderLayout />}
              {/* {status && <StatusModal />} */}
      {/* <StatusModal />
              {auth.token && <SocketClient />}
              {call && <CallModal />}
              <Route exact path="/register" component={Register} />
              <Route exact path="/verify/:id" component={Verify} />
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <Route exact path="/set-password" component={SetPassword} />
              <PrivateRouter exact path="/:page" component={PageRender} />
              <PrivateRouter exact path="/:page/:id" component={PageRender} />
              <Route exact path="/" component={auth.token ? Home : Login} /> */}
      {/* </div>
          </div>
        </Router>
      )}
      <div style={{ width: "100%" }}>
        {window.location.pathname === "/admin" && (
          <Router>
            <Admin />
          </Router>
        )} */}
      {/* </div> */}
    </React.Fragment>
  )
}

export default App
