import React, { useState, useEffect } from "react"
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Typography, Card, Divider, Tooltip } from "antd"
import EditProfile from "./EditProfile"
import FollowBtn from "../FollowBtn"
import Followers from "./Followers"
import Following from "./Following"
import { GLOBALTYPES } from "../../redux/actions/globalTypes"
import { Row, Col } from "antd"

const Info = ({ id, auth, profile, dispatch }) => {
  const [userData, setUserData] = useState([])
  const [onEdit, setOnEdit] = useState(false)

  const [showFollowers, setShowFollowers] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)

  useEffect(() => {
    if (id === auth?.user?._id) {
      setUserData([auth?.user])
    } else {
      const newData = profile.users.filter((user) => user._id === id)
      setUserData(newData)
    }
  }, [id, auth, dispatch, profile?.users])

  useEffect(() => {
    if (showFollowers || showFollowing || onEdit) {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true })
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false })
    }
  }, [showFollowers, showFollowing, onEdit, dispatch])

  return (
    <div className="info">
      {userData.map((user) => (
        <React.Fragment>
          <Card>
            <Row>
              <Col span={24}>
                <div style={{}}>
                  <img
                    src="https://kienthucbonphuong.com/images/202006/pet-la-gi/pet-la-gi.jpg"
                    alt=""
                    style={{ objectFit: "cover", width: "100%", height: 200 }}
                  />
                </div>
                <img
                  style={{
                    marginTop: -80,
                    marginLeft: 40,
                    border: "6px solid #fff",
                    width: 180,
                    borderRadius: "100%"
                  }}
                  src={user.avatar}
                  alt=""
                ></img>
              </Col>
              <Col span={24}>
                <div style={{ marginLeft: 60, marginTop: 20 }}>
                  <Typography.Title level={2}>
                    {user.fullname} (@{user?.username})
                  </Typography.Title>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ marginLeft: 60 }}>
                  <Typography style={{ fontSize: 18, width: "50%" }}>
                    The greatness of a nation and its moral progress can be
                    judged by the way its animals are treated. - Mahatma Gandhi,
                    Indian Soci
                  </Typography>
                </div>
              </Col>
              <Col span={24}>
                <Avatar.Group>
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                  <a href="https://ant.design">
                    <Avatar
                      style={{
                        backgroundColor: "#f56a00"
                      }}
                    >
                      K
                    </Avatar>
                  </a>
                  <Tooltip title="Ant User" placement="top">
                    <Avatar
                      style={{
                        backgroundColor: "#87d068"
                      }}
                      icon={<UserOutlined />}
                    />
                  </Tooltip>
                  <Avatar
                    style={{
                      backgroundColor: "#1890ff"
                    }}
                    icon={<AntDesignOutlined />}
                  />
                </Avatar.Group>
              </Col>
            </Row>
          </Card>

          <Row>
            {/* Follower render */}

            <div
              className="info_container"
              key={user._id}
              style={{ borderWidth: 1 }}
            >
              <div className="info_content">
                <div className="info_content_title">
                  <h2>{user?.username}</h2>
                  {user?._id === auth?.user?._id ? (
                    <button
                      className="btn btn-outline-info"
                      onClick={() => setOnEdit(true)}
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <FollowBtn user={user} />
                  )}
                </div>

                <div className="follow_btn">
                  <span className="mr-4" onClick={() => setShowFollowers(true)}>
                    {user.followers.length} Followers
                  </span>
                  <span className="ml-4" onClick={() => setShowFollowing(true)}>
                    {user.following.length} Following
                  </span>
                </div>
                <a href={user.website} target="_blank" rel="noreferrer">
                  {user.website}
                </a>
                <p>{user.story}</p>
              </div>

              {onEdit && <EditProfile setOnEdit={setOnEdit} />}

              {showFollowers && (
                <Followers
                  users={user.followers}
                  setShowFollowers={setShowFollowers}
                />
              )}
              {showFollowing && (
                <Following
                  users={user.following}
                  setShowFollowing={setShowFollowing}
                />
              )}
            </div>
            <Col></Col>
          </Row>
        </React.Fragment>
      ))}
    </div>
  )
}

export default Info
