import React from "react"
import "antd/dist/reset.css"
import "./styles/app.css"
import "./styles/scss/main.scss"
import "./styles/antd.less"
import CustomRouters from "./routers"
import { BrowserRouter } from "react-router-dom"
function App() {
  return (
    <React.Fragment>
      <React.Suspense>
        <BrowserRouter>
          <CustomRouters />
        </BrowserRouter>
      </React.Suspense>
    </React.Fragment>
  )
}

export default App
