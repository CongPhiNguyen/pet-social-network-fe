import React from "react"
import { Avatar, Card } from "antd"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useContext } from "react"
import LanguageContext from "../context/LanguageContext"

const UserCard = ({
  children,
  user,
  border,
  handleClose,
  setShowFollowers,
  setShowFollowing,
  msg,
  cardType,
  language
}) => {
  const { theme } = useSelector((state) => state)
  const handleCloseAll = () => {
    if (handleClose) handleClose()
    if (setShowFollowers) setShowFollowers(false)
    if (setShowFollowing) setShowFollowing(false)
  }

  const showMsg = (user) => {
    return (
      <>
        <div style={{ filter: theme ? "invert(1)" : "invert(0)" }}>
          {user.text}
        </div>
        {user.media.length > 0 && (
          <div>
            {user.media.length} <i className="fas fa-image" />
          </div>
        )}

        {user.call && (
          <span className="material-icons">
            {user.call.times === 0
              ? user.call.video
                ? language === "en"
                  ? "Miss Video Phone"
                  : "Lỡ cuộc gọi video"
                : language === "en"
                ? "Miss Phone"
                : "Lỡ cuộc gọi"
              : user.call.video
              ? language === "en"
                ? "Video Phone"
                : "Cuộc gọi video"
              : language === "en"
              ? "Phone"
              : "Cuộc gọi"}
          </span>
        )}
      </>
    )
  }

  return (
    <Card
      style={{ display: "flex", width: "100%" }}
      bodyStyle={{
        display: "flex",
        alignItems: "center",
        justifyContent: "between",
        width: "100%",
        padding: "4px 10px"
      }}
      className={`d-flex p-2 align-items-center justify-content-between w-100 ${border}`}
    >
      <div style={{ width: "100%" }}>
        <Link
          style={{ textDecoration: "none" }}
          to={cardType === "NoClick" ? null : `/profile/${user?._id}`}
          onClick={handleCloseAll}
          className="d-flex align-items-center user-card__link"
        >
          <Avatar
            style={{
              backgroundColor: "#f56a00",
              verticalAlign: "middle",
              marginRight: "5px"
            }}
            src={
              user.avatar ===
              "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
                ? null
                : user.avatar
            }
            size="large"
          >
            {user.username[0].toUpperCase()}
          </Avatar>
          <div
            className="ml-1"
            style={{
              transform: "translateY(-2px)",
              opacity: 0.7,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start"
            }}
          >
            <span className="d-block user-card__name">
              {msg ? showMsg(user) : user.fullname}
            </span>
            <small style={{ opacity: 0.7 }}>{user.username}</small>
          </div>
        </Link>
      </div>
      {children}
    </Card>
  )
}

export default UserCard
