import React, { useEffect, useState } from "react"
import Info from "./components/Info"
import { useSelector, useDispatch } from "react-redux"
import { getProfileUsers } from "../../redux/actions/profileAction"
import { useParams } from "react-router-dom"
import { Card, Col, Row, Spin, message } from "antd"
import Following from "./components/Following"
import { getPostByUserIdApi } from "../../api/post"
import PostCard from "../../components/PostCard"
import { getUserInfoApi } from "../../api/user"
import "../../styles/home.css"
import NotFoundPage from "../notFound"

const Profile = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { auth } = useSelector((state) => state)
  const [isGettingProfile, setIsGettingProfile] = useState(false)
  const [profile, setProfile] = useState({})
  const [postList, setPostList] = useState([])

  const getUserPost = async (userId) => {
    const response = await getPostByUserIdApi(userId)
    const { data, status } = response
    if (status === 200) {
      setPostList(data.postList)
    }
  }

  const getProfileInfo = async () => {
    setIsGettingProfile(true)
    try {
      const response = await getUserInfoApi(id)
      const { data, status } = response
      if (status === 200) {
        setProfile(data.user)
      } else {
        message.error("User info not found" || "Unexpected Error")
      }
    } catch (err) {
      message.error(err?.response?.data?.message || "Unexpected Error")
      setProfile(null)
    }
    setIsGettingProfile(false)
  }

  useEffect(() => {
    getProfileInfo(id)
    getUserPost(id)
  }, [id])

  console.log("profile", profile)

  if (isGettingProfile) {
    return <Spin loading={isGettingProfile}></Spin>
  } else if (profile) {
    return (
      <div className="profile" style={{ marginTop: 64 }}>
        <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
        <div
          style={{
            width: "100%",
            maxWidth: 1200,
            margin: "auto",
            marginTop: -10,
            padding: "0px 10px"
          }}
        >
          <Row gutter={[16, 16]}>
            <Col xl={8} md={24} sm={24}>
              {!profile?.loading && (
                <Card>
                  <Following />
                </Card>
              )}
            </Col>
            <Col xl={16} md={24} sm={24}>
              <div className="home posts">
                {postList.map((val, index) => {
                  return <PostCard key={index} post={val} />
                })}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  } else {
    return <NotFoundPage />
  }
}

export default Profile
