import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import UserCard from "../UserCard"
import FollowBtn from "../FollowBtn"
import LoadIcon from "../../images/loading.gif"
import { getSuggestions } from "../../redux/actions/suggestionsAction"
import { Spin, Typography } from "antd"
import { Link } from "react-router-dom"
import { getSuggestionsApi } from "../../api/user"
const { Title } = Typography

const RightSideBar = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector((state) => state)
  const { user } = useSelector((state) => state.auth)
  const [suggestions, setSuggestion] = useState([])

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

  return (
    <div className="mt-3">
      <UserCard user={auth.user} />
      <div className="d-flex justify-content-between align-items-center my-2">
        <Link style={{ color: "#f07c4b", cursor: "pointer" }} to="/suggestion">
          <Title style={{ color: "#f07c4b" }} level={4}>
            Suggestions for you
          </Title>
        </Link>
        {!suggestions.loading && (
          <i
            className="fas fa-redo"
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(getSuggestions(auth.token))}
          />
        )}
      </div>

      <div className="suggestions">
        {suggestions.map((user, index) => (
          <UserCard key={index} user={user?.userInfo} cardType={"NoClick"}>
            <FollowBtn user={user?.userInfo} />
          </UserCard>
        ))}
      </div>
      <div style={{ opacity: 0.5 }} className="my-2">
        <small className="d-block">
          Welcome to our social media "PET LOVE"
        </small>

        <small>&copy; 2023 UIT FROM 19522006 & 19522055</small>
      </div>
    </div>
  )
}

export default RightSideBar
