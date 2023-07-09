import React from "react"
import { useSelector, useDispatch } from "react-redux"

import UserCard from "../UserCard"
import FollowBtn from "../FollowBtn"
import LoadIcon from "../../images/loading.gif"
import { getSuggestions } from "../../redux/actions/suggestionsAction"
import { Spin, Typography } from "antd"
import { Link } from "react-router-dom"
const { Title } = Typography

const RightSideBar = () => {
  const { auth, suggestions } = useSelector((state) => state)
  const dispatch = useDispatch()

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

      {suggestions.loading ? (
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
      ) : (
        <div className="suggestions">
          {suggestions.users.map((user) => (
            <UserCard key={user._id} user={user}>
              <FollowBtn user={user} />
            </UserCard>
          ))}
        </div>
      )}

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
