import React, { useState, useMemo } from "react"
import { Link, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Tooltip, Badge, Popover, Divider, Col, Row } from "antd"
import {
  HomeFilled,
  MessageFilled,
  StarFilled,
  BellFilled
} from "@ant-design/icons"
import { Avatar } from "antd"
import { logout } from "../../redux/actions/authAction"
import NotifyModal from "../NotifyModal"
import LanguageContext from "../../context/LanguageContext"
import { useContext } from "react"
import LanguageImg from '../../assets/images/language.png'
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
  }
  // {
  //   label: "Discover",
  //   icon: <StarFilled />,
  //   path: "/discover"
  // }
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
  const { language, switchLanguage } = useContext(LanguageContext);
  const countUnreadNoti = (notify) => {
    let val = 0
    for (const noti of notify.data) {
      if (!noti.isRead) val++
    }
    return val
  }

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
        {language === 'en' ? "Profile" : "Hồ sơ"}
      </Link>
      <label
        style={{ fontWeight: "600", marginBottom: 0, position: "relative" }}
        htmlFor="theme"
        className="dropdown-item"
        onClick={() =>
          switchLanguage(language === "en" ? "vni" : "en")
        }
      >
        <img src={LanguageImg} style={{
          position: "absolute",
          content: "",
          left: '-4px'
        }} height={24} width={24} /> {language === 'en' ? "English" : "Việt Nam"}
      </label>
      <Link
        style={{ fontWeight: "600" }}
        className="dropdown-item"
        to="/setting"
      >

        {language === 'en' ? "Setting" : "Cài đặt"}
      </Link>
      {role === "admin" && (
        <Link
          style={{ fontWeight: "600" }}
          className="dropdown-item"
          to="/admin"
        >
          {language === 'en' ? "Admin" : "Quản lý"}
        </Link>
      )}

      <Divider style={{ margin: 0 }} />

      <Link
        style={{ fontWeight: "600" }}
        className="dropdown-item"
        to="/"
        onClick={() => dispatch(logout())}
      >
        {language === 'en' ? "Logout" : "Đăng xuất"}
      </Link>
    </div>
  )
  return (
    <div className="menu">
      <Row>
        <Col xs={0} lg={2}>
          <Link key={0} className={`nav-link${isActive("/")}`} to={"/"}>
            <span className="material-icons">
              <Tooltip placement="bottom" title={"Home"} arrow={mergedArrow}>
                <HomeFilled />
              </Tooltip>
            </span>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs={0} sm={0} md={2} lg={2}>
          <Link
            key={1}
            className={`nav-link${isActive("/message")}`}
            to={"/message"}
          >
            <span className="material-icons">
              <Tooltip placement="bottom" title={"Message"} arrow={mergedArrow}>
                <MessageFilled />
              </Tooltip>
            </span>
          </Link>
        </Col>
      </Row>

      {/* {navLinks.map((link, index) => (
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
      ))} */}
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
            <Badge count={countUnreadNoti(notify)}>
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
