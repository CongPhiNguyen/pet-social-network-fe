import React, { useState, useEffect } from "react"
import { Avatar, Typography, Card, Divider, Tooltip, Button } from "antd"
import FollowBtn from "../FollowBtn"
import { GLOBALTYPES } from "../../redux/actions/globalTypes"
import { Row, Col } from "antd"
import Follower from "./Follower"
import PetProfile from "./pet/PetProfile"

const Info = ({ id, auth, profile, dispatch }) => {
  const [userData, setUserData] = useState([])
  const [onEdit, setOnEdit] = useState(false)

  useEffect(() => {
    if (id === auth?.user?._id) {
      setUserData([auth?.user])
    } else {
      const newData = profile.users.filter((user) => user._id === id)
      setUserData(newData)
    }
  }, [id, auth, dispatch, profile?.users])

  useEffect(() => {
    if (onEdit) {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true })
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false })
    }
  }, [onEdit, dispatch])

  return (
    <div className="info">
      {userData.map((user) => (
        <React.Fragment>
          <Card>
            <Row>
              <Col span={24}>
                <div>
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
                <div
                  style={{ marginLeft: 60, marginTop: 20, marginBottom: 10 }}
                >
                  <Typography.Title level={2}>
                    {user.fullname} (@{user?.username})
                  </Typography.Title>
                  <div>
                    {user?._id === auth?.user?._id ? (
                      <Button onClick={() => setOnEdit(true)}>
                        Edit Profile
                      </Button>
                    ) : (
                      <FollowBtn user={user} />
                    )}
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginLeft: 60 }}>
                  <Typography style={{ fontSize: 16 }}>
                    The greatness of a nation and its moral progress can be
                    judged by the way its animals are treated. - Mahatma Gandhi,
                    Indian Soci
                  </Typography>
                  <div style={{ marginTop: 20 }}>
                    <Follower id={id} />
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginLeft: 60 }}>
                  <PetProfile />
                </div>
              </Col>
              <Col span={24}></Col>
            </Row>
          </Card>
        </React.Fragment>
      ))}
    </div>
  )
}

export default Info
