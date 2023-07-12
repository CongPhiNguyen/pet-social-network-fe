import React from "react"
import "antd/dist/reset.css"
import "./styles/app.css"
import "./styles/scss/main.scss"
import "./styles/antd.less"
import CustomRouters from "./routers"
import { BrowserRouter } from "react-router-dom"
import { LanguageProvider } from "./context/LanguageContext"


function App() {
  console.log("process.env", process.env)

  return (
    <React.Fragment>
      <React.Suspense>
        <LanguageProvider>
          <BrowserRouter>
            <CustomRouters />
          </BrowserRouter>
        </LanguageProvider>
      </React.Suspense>
    </React.Fragment>
  )
}

export default App
