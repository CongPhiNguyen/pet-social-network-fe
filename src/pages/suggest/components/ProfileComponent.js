import React, { useState, useEffect } from "react"
import Info from "./Info"
import { useDispatch, useSelector } from "react-redux"
import { getUserInfoApi } from "../../../api/user"
import { message } from "antd"
import { getPostByUserIdApi } from "../../../api/post"
import { getPostsByLocationDispatch } from "../../../redux/actions/postAction"
import { Col, Row, Card, Spin, Result } from "antd"
import Following from "./Following"
import PostCard from "../../../components/PostCard"
export default function ProfileComponent({ userId }) {
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state)
  const { auth } = useSelector((state) => state)
  const [profile, setProfile] = useState({})
  const [isGettingProfile, setIsGettingProfile] = useState(false)
  const [loading, setLoading] = useState(false)
  const { homePosts } = useSelector((state) => state)
  const { posts: postList } = homePosts

  const getUserPost = async (userId) => {
    setLoading(true)
    const response = await getPostByUserIdApi(userId)
    const { data, status } = response
    if (status === 200) {
      dispatch(getPostsByLocationDispatch({ posts: data.postList || [] }))
    }
    setLoading(false)
  }

  const getProfileInfo = async () => {
    setIsGettingProfile(true)
    try {
      const response = await getUserInfoApi(userId)
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
    getProfileInfo(userId)
    getUserPost(userId)
  }, [userId])

  return (
    <div style={{ marginTop: -60 }}>
      <Info auth={auth} profile={profile} dispatch={dispatch} userId={userId} />
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
            <Card>
              <Following id={userId} />
            </Card>
          </Col>
          <Col xl={16} md={24} sm={24}>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: 200,
                  alignItems: "center"
                }}
              >
                <Spin size="large" tip="Loading..." />
              </div>
            ) : postList.length === 0 ? (
              <Card>
                <Result
                  status="404"
                  title="NO POST"
                  subTitle="You can follow someone or create new post!"
                />
              </Card>
            ) : (
              <div className="posts">
                {postList.map((post) => (
                  <PostCard key={post._id} post={post} theme={theme} />
                ))}
              </div>
            )}
            {/* <div className="home posts">
            {postList.map((val, index) => {
              return <PostCard key={index} post={val} />
            })}
          </div> */}
          </Col>
        </Row>
      </div>
    </div>
  )
}
