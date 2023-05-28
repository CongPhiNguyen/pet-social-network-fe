import Admin from "../pages/admin/Admin"
import Home from "../pages/home"
import Login from "../pages/login"
import Message from "../pages/message"
import Conversation from "../pages/message/[id]"
import NotificationPage from "../pages/notification/NotificationPage"
import PostPage from "../pages/post/PostPage"
import PetPage from "../pages/profile/PetPage"
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
  { path: "/profile/pet/:id", name: "Pet", element: <PetPage /> },
  { path: "/setting", name: "Setting", element: <Setting /> },
  {
    path: "/notification",
    name: "Notification",
    element: <NotificationPage />
  },
  { path: "/message", name: "Chat", element: <Message /> },
  { path: "/message/:id", name: "Chat", element: <Conversation /> }
]

// route dùng cho mọi trường hợp
const commonRoute = [{ path: "/post/:id", name: "Post", element: <PostPage /> }]

// Route dùng cho admin
const adminRoute = [{ path: "/admin", name: "Manage", element: <Admin /> }]

const routes = {
  publicRoute,
  commonRoute,
  protectedRoute,
  adminRoute,
  mainRoute
}

export default routes
