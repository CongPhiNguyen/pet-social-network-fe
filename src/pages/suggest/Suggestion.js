import React, { useState } from "react"
import { useEffect } from "react"
import { getSuggestionsApi } from "../../api/user"
import { useSelector } from "react-redux"
import { Col, Spin, Typography, Row } from "antd"
import UserCard from "../../components/UserCard"
import FollowBtn from "../../components/FollowBtn"
import ProfileComponent from "./components/ProfileComponent"
const { Title } = Typography

export default function Suggestion() {
  const [suggestions, setSuggestion] = useState([])
  const { user } = useSelector((state) => state.auth)
  const [currentUser, setCurrentUser] = useState(null)
  // console.log(user._id)
  const getSuggestion = async () => {
    const response = await getSuggestionsApi(user._id)
    const { data, status } = response
    if (status === 200) {
      const suggestion = data.suggestion
      setSuggestion(suggestion)
    }
  }
  useEffect(() => {
    getSuggestion()
  }, [])

  console.log(currentUser, currentUser?.userId)

  return (
    <div style={{ marginTop: 88 }}>
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "auto",
          marginTop: -10,
          padding: "0px 10px"
        }}
      >
        <Title style={{ color: "#f07c4b" }} level={2}>
          Suggestions for you
        </Title>
        <Row>
          <Col xl={6} md={8} sm={24}>
            <div style={{ marginRight: 20 }}>
              {suggestions.map((user, index) => {
                return (
                  <div
                    onClick={() => {
                      setCurrentUser(user)
                    }}
                  >
                    <UserCard
                      key={index}
                      user={user?.userInfo}
                      cardType={"NoClick"}
                    >
                      <FollowBtn user={user?.userInfo} />
                    </UserCard>
                  </div>
                )
              })}
            </div>
          </Col>
          <Col xl={18} md={16} sm={24}>
            {currentUser ? (
              <ProfileComponent userId={currentUser?.userId} />
            ) : (
              "Chọn 1 user để xem chi tiết"
            )}
          </Col>
        </Row>
      </div>
    </div>
  )
}
