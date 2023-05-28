import React, { useState, useEffect } from "react"
import { Avatar, Typography, Card, Divider, Tooltip, Button, Modal } from "antd"
import { GLOBALTYPES } from "../../../redux/actions/globalTypes"
import FollowBtn from "../../../components/FollowBtn"
import { Row, Col } from "antd"
import Follower from "./Follower"
import PetProfile from "./pet/PetProfile"
import { getUserInfoApi } from "../../../api/user"
import { useParams } from "react-router-dom"
import EditProfile from "./EditProfile"
import { useSelector } from "react-redux"
import "./scss/Info.scss"

const Info = ({ auth, profile, dispatch }) => {
  const { id } = useParams()
  const [userInfo, setUserInfo] = useState([])
  const currentUser = useSelector((state) => state.auth.user)
  const [isEdit, setIsEdit] = useState(false)

  const getUserId = async () => {
    const response = await getUserInfoApi(id)
    const { data, status } = response
    setUserInfo(data.user)
  }
  useEffect(() => {
    if (id === currentUser._id) {
      setUserInfo(currentUser)
    } else {
      getUserId()
    }
  }, [id, currentUser])
  return (
    <div className="info">
      <React.Fragment>
        <Card>
          <Row>
            <Col xs={24}>
              <div>
                <img
                  src="https://kienthucbonphuong.com/images/202006/pet-la-gi/pet-la-gi.jpg"
                  alt=""
                  style={{ objectFit: "cover", width: "100%", height: 200 }}
                />
              </div>
            </Col>
            <Col xs={24} md={12} xl={12}>
              <img
                style={{
                  marginTop: -80,
                  marginLeft: 40,
                  border: "6px solid #fff",
                  width: 180,
                  height: 180,
                  objectFit: "cover",
                  borderRadius: "100%"
                }}
                src={userInfo.avatar}
                alt=""
              ></img>
              <div style={{ marginLeft: 60, marginTop: 20, marginBottom: 10 }}>
                <Typography.Title level={2}>
                  {userInfo.fullname} (@{userInfo?.username})
                </Typography.Title>
                <div>
                  {userInfo?._id === auth?.user?._id ? (
                    <Button
                      onClick={() => {
                        setIsEdit(true)
                      }}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <FollowBtn user={userInfo} />
                  )}
                </div>
              </div>
              <div style={{ marginLeft: 60 }}>
                <Typography style={{ fontSize: 16 }}>
                  {userInfo.story}
                </Typography>
                <div style={{ marginTop: 20 }}>
                  <Follower id={id} />
                </div>
              </div>
            </Col>
            <Col xs={24} md={12} xl={12}>
              <div className="pet-profile-container">
                <PetProfile userInfo={profile} />
              </div>
            </Col>
          </Row>
        </Card>
        <EditProfile isEdit={isEdit} setIsEdit={setIsEdit} />
      </React.Fragment>
    </div>
  )
}

export default Info
