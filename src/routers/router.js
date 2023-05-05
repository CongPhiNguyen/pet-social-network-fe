import Home from "../pages/home"
import Login from "../pages/login"
import NotificationPage from "../pages/notification/NotificationPage"
import PostPage from "../pages/post/PostPage"
import Profile from "../pages/profile/Profile"
import Register from "../pages/register"
import Setting from "../pages/setting/Setting"

const mainRoute = []

// Những route chỉ truy xuất khi chưa đăng nhập
const publicRoute = [
  { path: "/", name: "Login", element: <Login /> },
  { path: "/register", name: "Register", element: <Register /> }
]

// Những route dùng khi đã đăng nhập
const protectedRoute = [
  { path: "/", name: "Home", element: <Home /> },
  { path: "/profile/:id", name: "Profile", element: <Profile /> },
  { path: "/setting", name: "Setting", element: <Setting /> },
  { path: "/notification", name: "Notification", element: <NotificationPage /> }
]

// route dùng cho mọi trường hợp
const commonRoute = [{ path: "/post/:id", name: "Post", element: <PostPage /> }]

// Route dùng cho manager
const managerRoute = []

const routes = {
  publicRoute,
  commonRoute,
  protectedRoute,
  managerRoute,
  mainRoute
}

export default routes