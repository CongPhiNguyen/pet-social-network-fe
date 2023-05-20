import React, { useEffect, useState } from "react"
import Info from "./components/Info"
import { useSelector, useDispatch } from "react-redux"
import { getProfileUsers } from "../../redux/actions/profileAction"
import { useParams } from "react-router-dom"
import { Card, Col, Row } from "antd"
import Following from "./components/Following"
import { getPostByUserIdApi } from "../../api/post"
import PostCard from "../../components/PostCard"

const Profile = () => {
  const { profile, auth } = useSelector((state) => state)
  const dispatch = useDispatch()
  const { id } = useParams()

  const [postList, setPostList] = useState([])

  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }))
    }
  }, [id, auth, dispatch, profile.ids])

  const getUserPost = async (userId) => {
    const response = await getPostByUserIdApi(userId)
    const { data, status } = response
    if (status === 200) {
      setPostList(data.postList)
    }
  }

  useEffect(() => {
    getUserPost(id)
  }, [])

  console.log("postList", postList)

  return (
    <div className="profile" style={{ marginTop: 64 }}>
      <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
      <Row
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "auto",
          marginTop: -10,
          padding: "0px 10px"
        }}
      >
        <Col span={8}>
          {!profile?.loading && (
            <Card>
              <Following />
            </Card>
          )}
        </Col>
        <Col span={16}>
          {postList.map((val, index) => {
            return <PostCard key={index} post={val} />
          })}
        </Col>
      </Row>
    </div>
  )
}

export default Profile
