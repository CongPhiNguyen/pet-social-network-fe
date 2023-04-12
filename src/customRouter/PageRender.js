import React from "react"
import { useParams } from "react-router-dom"
import NotFound from "../components/NotFound"
import { useSelector } from "react-redux"
import Setting from "../components/setting/Setting"
import ForgotPassword from "../pages/forgotPassword"
import Admin from "../pages/admin/Admin"

const generatePage = (pageName) => {
  const component = () => require(`../pages/${pageName}`).default
  try {
    return React.createElement(component())
  } catch (err) {
    if (pageName === "setting") return <Setting />
    else if (pageName === "forgot-password") return <ForgotPassword />
    return <NotFound />
  }
}

const PageRender = () => {
  const { page, id } = useParams()
  const { auth } = useSelector((state) => state)

  let pageName = ""

  if (auth.token) {
    if (id) {
      pageName = `${page}/[id]`
    } else {
      pageName = `${page}`
    }
  }

  return generatePage(pageName)
}

export default PageRender
