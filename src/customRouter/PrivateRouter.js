import { Route, Navigate } from "react-router-dom"

const PrivateRouter = (props) => {
  const firstLogin = localStorage.getItem("firstLogin")
  return firstLogin ? <Route {...props} /> : <Navigate replace to="/" />
}

export default PrivateRouter
