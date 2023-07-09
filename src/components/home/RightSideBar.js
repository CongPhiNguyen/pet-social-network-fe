import React from "react"
import { useSelector, useDispatch } from "react-redux"

import UserCard from "../UserCard"
import FollowBtn from "../FollowBtn"
import LoadIcon from "../../images/loading.gif"
import { getSuggestions } from "../../redux/actions/suggestionsAction"
import { Spin } from "antd"

const RightSideBar = ({ language }) => {
  const { auth, suggestions } = useSelector((state) => state)
  const dispatch = useDispatch()

  return (
    <div className="mt-3">
      <UserCard user={auth.user} />

      <div className="d-flex justify-content-between align-items-center my-2">
        <h5 className="text-danger">{language === 'en' ? 'Suggestions for you' : "Gợi ý cho bạn"}</h5>
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
              <FollowBtn language={language} user={user} />
            </UserCard>
          ))}
        </div>
      )}

      <div style={{ opacity: 0.5 }} className="my-2">
        <small className="d-block">
          {language === 'en' ? `Welcome to our social media "PET LOVE"` : 'Chào mừng đến với mạng xã "PET LOVE"'}
        </small>

        <small>&copy; 2023 UIT FROM 19522006 & 19522055</small>
      </div>
    </div>
  )
}

export default RightSideBar
