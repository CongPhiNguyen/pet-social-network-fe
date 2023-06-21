import React, { useEffect, useState } from "react"
import Status from "../../components/home/Status"
import Posts from "../../components/home/Posts"
import RightSideBar from "../../components/home/RightSideBar"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Row, Col, Result, Card, Menu, Spin, message } from "antd"
import LeftNavigation from "../../components/navigation/LeftNavigation"
import { RiProfileLine, RiFindReplaceLine } from "react-icons/ri"
import { AiOutlineHome, AiOutlineMessage, AiOutlineBook } from "react-icons/ai"
import { BiBasket, BiMessage } from "react-icons/bi"
import axios from "axios"
import { FaLocationArrow } from "react-icons/fa"
import { getPostByLocation } from "../../api/post"
import PostCard from "../../components/PostCard"
import GoogleMap1 from "./GoogleMap"

let scroll = 0
export default function FindPet() {
  const { theme } = useSelector((state) => state)
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState("")
  const [posts, setPosts] = useState([])
  const currentUserId = useSelector((state) => state?.auth?.user?._id)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [geolocation, setGeolocation] = useState({ lat: 0, lon: 0 })

  const getPost = async () => {
    setLoading(true)
    const rs = await getPostByLocation(location)
    const { data } = rs.data
    setPosts(data)
    setLoading(false)
  }

  useEffect(async () => {
    if (location.length !== 0) {
      await getPost()
    }
  }, [location])

  const onGetLocation = async () => {
    setIsModalOpen(true);
    setLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setGeolocation({
            lat: latitude, lon: longitude
          })
          axios
            .get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            )
            .then((response) => {
              const locationName = response.data.display_name
              setLocation(locationName)
            })
            .catch((error) => {
              message.error(error)
            })
        },
        () => {
          message.error("Turn on allow location!")
        }
      )
    }
    setLoading(false)

  }

  const onGetLocation1 = async () => {
    setLoading(true)
    axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${geolocation.lat}&lon=${geolocation.lon}`
      )
      .then((response) => {
        const locationName = response.data.display_name
        setLocation(locationName)
      })
      .catch((error) => {
        message.error(error)
      })

    setLoading(false)

  }

  useEffect(() => {
    onGetLocation()
  }, [])

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

  return <div style={{ width: "100%", maxWidth: 1200, margin: "auto" }}>

    <Row style={{ marginTop: "64px" }} className="home">
      <GoogleMap1 geolocation={geolocation} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onGetLocation1={onGetLocation1} setGeolocation={setGeolocation} />

      <Col xs={4} sm={4} md={0} lg={0}>
        <div style={{ position: "fixed", left: 0, top: 64, bottom: 0, borderRight: "1px solid #0000001a", width: "60px" }}>
          <Menu
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
        {/* <Status /> */}
        <Card style={{ margin: "20px 0" }}>
          <FaLocationArrow onClick={onGetLocation} style={{ color: "#ff4d4f", fontSize: "1.5rem", cursor: "pointer", transform: "translateY(-3px)" }} />   <span style={{ fontWeight: "600", fontSize: "1rem", marginLeft: 5 }}>{location}</span>
        </Card>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", height: 200, alignItems: "center" }}><Spin size="large" tip="Loading..." /></div>
        ) : posts.length === 0 ? (
          <Card>
            <Result
              status="404"
              title="NO POST"
              subTitle="You can follow someone or create new post!"
            />
          </Card>
        ) : (
          <div className="posts">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} theme={theme} />
            ))}
          </div>
        )}
      </Col>

      <Col xs={{ span: 18 }} md={{ span: 0 }} >
        <Card style={{ margin: "20px 0" }}>
          <FaLocationArrow onClick={onGetLocation} style={{ color: "#ff4d4f", fontSize: "1.5rem", cursor: "pointer", transform: "translateY(-3px)" }} />   <span style={{ fontWeight: "600", fontSize: "1rem", marginLeft: 5 }}>{location}</span>
        </Card>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", height: 200, alignItems: "center" }}><Spin size="large" tip="Loading..." /></div>
        ) : posts.length === 0 ? (
          <Card>
            <Result
              status="404"
              title="NO POST"
              subTitle="You can follow someone or create new post!"
            />
          </Card>
        ) : (
          <div className="posts">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} theme={theme} />
            ))}
          </div>
        )}
      </Col>

    </Row>
  </div>
}
