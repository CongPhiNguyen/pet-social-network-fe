import React from "react"
import "antd/dist/reset.css"
import "./styles/app.css"
import "./styles/scss/main.scss"
import "./styles/antd.less"
import CustomRouters from "./routers"

function App() {
  // useEffect(() => {
  //   const newPeer = new Peer(undefined, {
  //     path: "/",
  //     secure: true
  //   })

  //   dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
  // }, [dispatch])

  return (
    <React.Fragment>
      <CustomRouters />
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
