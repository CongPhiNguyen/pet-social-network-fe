import React, { useState, useMemo } from "react"
import { Link, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Tooltip, Badge, Popover, Divider } from "antd"
import {
  HomeFilled,
  MessageFilled,
  StarFilled,
  BellFilled
} from "@ant-design/icons"
import { Avatar } from "antd"
import { GLOBALTYPES } from "../../redux/actions/globalTypes"
import { logout } from "../../redux/actions/authAction"
import NotifyModal from "../NotifyModal"

const navLinks = [
  {
    label: "Home",
    icon: <HomeFilled />,
    path: "/"
  },
  {
    label: "Message",
    icon: <MessageFilled />,
    path: "/message"
  },
  {
    label: "Discover",
    icon: <StarFilled />,
    path: "/discover"
  }
]

const Menu = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const role = useSelector((state) => state.auth?.user?.role)
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const { auth, theme, notify } = useSelector((state) => state)
  const [showArrow, setShowArrow] = useState(true)
  const [arrowAtCenter, setArrowAtCenter] = useState(false)
  const isActive = (pn) => {
    if (pn === pathname) return "active"
    return ""
  }
  const mergedArrow = useMemo(() => {
    if (arrowAtCenter) return { arrowPointAtCenter: true }
    return showArrow
  }, [showArrow, arrowAtCenter])

  const handleOpenChange1 = (newOpen) => {
    setOpen1(newOpen)
  }

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen)
  }

  const content = (
    <div aria-labelledby="navbarDropdown">
      <Link
        style={{ fontWeight: "600" }}
        className="dropdown-item"
        to={`/profile/${auth.user._id}`}
      >
        Profile
      </Link>
      <label
        style={{ fontWeight: "600" }}
        htmlFor="theme"
        className="dropdown-item"
        onClick={() =>
          dispatch({
            type: GLOBALTYPES.THEME,
            payload: !theme
          })
        }
      >
        {theme ? "Light mode" : "Dark mode"}
      </label>
      <Link
        style={{ fontWeight: "600" }}
        className="dropdown-item"
        to="/setting"
      >
        Setting
      </Link>
      {role === "admin" && (
        <Link
          style={{ fontWeight: "600" }}
          className="dropdown-item"
          to="/admin"
        >
          Admin
        </Link>
      )}

      <Divider style={{ margin: 0 }} />

      <Link
        style={{ fontWeight: "600" }}
        className="dropdown-item"
        to="/"
        onClick={() => dispatch(logout())}
      >
        Logout
      </Link>
    </div>
  )

  console.log("Kia", open1)
  return (
    <div className="menu">
      {navLinks.map((link, index) => (
        <Link
          key={index}
          className={`nav-link${isActive(link.path)}`}
          to={link.path}
        >
          <span className="material-icons">
            <Tooltip placement="bottom" title={link.label} arrow={mergedArrow}>
              {link.icon}
            </Tooltip>
          </span>
        </Link>
      ))}
      <Popover
        className="popover-notify"
        onOpenChange={handleOpenChange1}
        placement="bottomRight"
        content={<NotifyModal />}
        trigger="click"
        open={open1}
      >
        <Link onClick={handleOpenChange1} className={`nav-link`}>
          <span className="material-icons">
            <Badge count={notify.data.length}>
              <BellFilled className="icon" />
            </Badge>
          </span>
        </Link>
      </Popover>
      <Popover
        onOpenChange={handleOpenChange}
        placement="bottomRight"
        content={content}
        trigger="click"
        open={open}
      >
        <Link onClick={handleOpenChange} className={`nav-link`}>
          <span className="material-icons">
            <Avatar
              style={{
                backgroundColor: "#f56a00",
                verticalAlign: "middle"
              }}
              src={
                auth.user.avatar ===
                "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
                  ? null
                  : auth.user.avatar
              }
              size="default"
            >
              {auth.user.username[0].toUpperCase()}
            </Avatar>
          </span>
        </Link>
      </Popover>
    </div>
  )
}

export default Menu
