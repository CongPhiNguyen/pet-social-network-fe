import React, { useEffect, useState } from "react"
import Status from "../components/home/Status"
import Posts from "../components/home/Posts"
import RightSideBar from "../components/home/RightSideBar"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import LoadIcon from "../images/loading.gif"
import { Row, Col, Result, Card, Menu } from "antd"
import LeftNavigation from "../components/navigation/LeftNavigation"
import { RiProfileLine, RiFindReplaceLine } from "react-icons/ri"
import { AiOutlineHome, AiOutlineMessage, AiOutlineBook } from "react-icons/ai"
import { BiBasket, BiMessage } from "react-icons/bi"

let scroll = 0

const Home = () => {
  const { homePosts } = useSelector((state) => state)

  window.addEventListener("scroll", () => {
    if (window.location.pathname === "/") {
      scroll = window.pageYOffset
      return scroll
    }
  })

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: "smooth" })
    }, 100)
  }, [])

  const onClick = (val) => {
    setCurrentSetting(val.key)
  }
  const [currentSetting, setCurrentSetting] = useState("")
  const currentUserId = useSelector((state) => state?.auth?.user?._id)

  const items = [
    {
      label: <Link to={`/`}></Link>,
      key: "home",
      icon: <AiOutlineHome style={{ transform: "translateX(-10px)" }} size={22} />
    },
    {
      label: <Link to={'/message'}></Link>,
      key: "message",
      icon: <AiOutlineMessage style={{ transform: "translateX(-10px)" }} size={22} />
    },
    {
      label: <Link to={`/profile/${currentUserId}`}></Link>,
      key: "profile",
      icon: <RiProfileLine style={{ transform: "translateX(-10px)" }} size={22} />
    },
    {
      label: <Link to={`/find-pet`}></Link>,
      key: "find-losted",
      icon: <RiFindReplaceLine style={{ transform: "translateX(-10px)" }} size={22} />
    },
    {
      label: <Link to={`/adopt-pet`}></Link>,
      key: "adopt-pet",
      icon: <BiBasket style={{ transform: "translateX(-10px)" }} size={22} />
    },
    {
      label: <Link to={`/chat-bot`}></Link>,
      key: "chat-bot",
      icon: <BiMessage style={{ transform: "translateX(-10px)" }} size={22} />
    },
    {
      label: <Link to={`/wiki`}></Link>,
      key: "wiki",
      icon: <AiOutlineBook style={{ transform: "translateX(-10px)" }} size={22} />
    }
  ]

  return (
    <div style={{ width: "100%", maxWidth: 1200, margin: "auto" }}>
      <Row style={{ marginTop: "64px" }} className="home">
        <Col xs={4} sm={4} md={0} lg={0}>
          <div style={{ position: "fixed", left: 0, top: 64, bottom: 0, borderRight: "1px solid #0000001a", width: "60px" }}>
            <Menu
              onClick={onClick}
              style={{ borderRadius: 10 }}
              mode="inline"
              items={items}
            />
          </div>
        </Col>

        <Col xs={0} sm={0} md={6} lg={6}>
          <LeftNavigation />
        </Col>
        <Col xs={{ span: 0 }} md={{ span: 14 }} lg={{ span: 10 }}>
          <Status />
          {homePosts.loading ? (
            <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
          ) : homePosts.result === 0 && homePosts.posts.length === 0 ? (
            <Card>
              <Result
                status="404"
                title="NO POST"
                subTitle="You can follow someone or create new post!"
              />
            </Card>
          ) : (
            <Posts />
          )}
        </Col>

        <Col xs={{ span: 18 }} md={{ span: 0 }} >
          <Status />
          {homePosts.loading ? (
            <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
          ) : homePosts.result === 0 && homePosts.posts.length === 0 ? (
            <Card>
              <Result
                status="404"
                title="NO POST"
                subTitle="You can follow someone or create new post!"
              />
            </Card>
          ) : (
            <Posts />
          )}
        </Col>
        <Col xs={0} sm={0} md={0} lg={{ span: 6, offset: 2 }}>
          <RightSideBar />
        </Col>
      </Row>
    </div>
  )
}

export default Home
