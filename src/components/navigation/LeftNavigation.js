import { Badge, Card, Menu } from "antd"
import React, { useState } from "react"
import { SiAuth0 } from "react-icons/si"
import { AiOutlineBook, AiOutlineHome } from "react-icons/ai"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { RiProfileLine, RiFindReplaceLine } from "react-icons/ri"
import { BiBasket, BiMessage } from "react-icons/bi"
export default function LeftNavigation({ language }) {
  const [currentSetting, setCurrentSetting] = useState("")
  const currentUserId = useSelector((state) => state?.auth?.user?._id)
  const onClick = (val) => {
    setCurrentSetting(val.key)
  }
  const items = [
    {
      label: <Link to={`/`}>{language === 'en' ? "Home" : "Trang chủ"}</Link>,
      key: "home",
      icon: <AiOutlineHome size={22} />
    },
    {
      label: <Link to={`/profile/${currentUserId}`}>{language === 'en' ? "Profile" : "Hồ sơ"}</Link>,
      key: "profile",
      icon: <RiProfileLine size={22} />
    },
    {
      label: <Link to={`/find-pet`}>{language === 'en' ? "Find losted pet" : "Tìm thú cưng"}</Link>,
      key: "find-losted",
      icon: <RiFindReplaceLine size={22} />
    },
    // {
    //   label: <Link to={`/adopt-pet`}>Adopt pet</Link>,
    //   key: "adopt-pet",
    //   icon: <BiBasket size={22} />
    // },
    {
      label: <Link to={`/chat-bot`}>{language === 'en' ? "Chat bot" : "Tư vấn"}</Link>,
      key: "chat-bot",
      icon: <BiMessage size={22} />
    },
    {
      label: (
        <Link to={`/pet-wiki`}>
          <div
            style={{ display: "flex", alignItems: "baseline", marginTop: 16 }}
          >
            <p style={{ marginRight: 10 }}>{language === 'en' ? "Pet wiki" : "Pet wiki"} </p>
            {/* <Badge count={10}></Badge> */}
          </div>
        </Link>
      ),
      key: "wiki",
      icon: <AiOutlineBook size={22} />
    }
  ]
  return (
    <div style={{ marginLeft: 20, marginRight: 40, marginTop: 17 }}>
      <Menu
        onClick={onClick}
        style={{ borderRadius: 10 }}
        mode="inline"
        items={items}
      />
    </div>
  )
}
