import { Card, Menu } from "antd"
import React, { useState } from "react"
import { SiAuth0 } from "react-icons/si"
import { AiOutlineHome } from "react-icons/ai"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { RiProfileLine, RiFindReplaceLine } from "react-icons/ri"
import { BiBasket } from "react-icons/bi"
export default function LeftNavigation() {
  const [currentSetting, setCurrentSetting] = useState("")
  const currentUserId = useSelector((state) => state?.auth?.user?._id)
  const onClick = (val) => {
    setCurrentSetting(val.key)
  }
  const items = [
    {
      label: <Link to={`/`}>Home</Link>,
      key: "home",
      icon: <AiOutlineHome size={22} />
    },
    {
      label: <Link to={`/profile/${currentUserId}`}>Profile</Link>,
      key: "profile",
      icon: <RiProfileLine size={22} />
    },
    {
      label: <Link to={`/find-pet`}>Find losted pet</Link>,
      key: "find-losted",
      icon: <RiFindReplaceLine size={22} />
    },
    {
      label: <Link to={`/adopt-pet`}>Adopt pet</Link>,
      key: "adopt-pet",
      icon: <BiBasket size={22} />
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