import React, { useState, useEffect } from "react"
import { Avatar, Typography, Card, Divider, Tooltip, Button, Modal } from "antd"
import { GLOBALTYPES } from "../../../redux/actions/globalTypes"
import FollowBtn from "../../../components/FollowBtn"
import { Row, Col } from "antd"
import Follower from "./Follower"
import PetProfile from "./pet/PetProfile"
import { getUserInfoApi } from "../../../api/user"
import { useNavigate, useParams } from "react-router-dom"
import EditProfile from "./EditProfile"
import { useDispatch, useSelector } from "react-redux"
import { MESS_TYPES } from "../../../redux/actions/messageAction"
import "./scss/Info.scss"

const Info = ({ auth, profile }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [userInfo, setUserInfo] = useState({})
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

  const messageToProfile = () => {
    dispatch({
      type: MESS_TYPES.ADD_USER,
      payload: { ...userInfo, text: "", media: [] }
    })
    navigate(`/message/${userInfo._id}`)
  }
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
              <div>
                <Avatar
                  style={{
                    backgroundColor: "#f56a00",
                    verticalAlign: "middle",
                    marginTop: -80,
                    marginLeft: 40,
                    border: "6px solid #fff",
                    fontSize: 80
                  }}
                  src={
                    userInfo?.avatar ===
                    "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
                      ? null
                      : userInfo?.avatar
                  }
                  size={180}
                >
                  {userInfo?.username
                    ? userInfo?.username[0].toUpperCase()
                    : ""}
                </Avatar>
                {/* <Avatar
                  src={
                    auth.user.avatar ===
                    "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
                      ? null
                      : userInfo?.avatar
                  }
                  size={180}
                >
                  <p style={{ fontSize: 92, marginTop: -10 }}>
                    {auth.user.username[0].toUpperCase()}
                  </p>
                </Avatar> */}
              </div>
              <div style={{ marginLeft: 60, marginTop: 20, marginBottom: 10 }}>
                <Typography.Title level={2}>
                  {userInfo?.fullname} (@{userInfo?.username})
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
                    <>
                      <FollowBtn user={userInfo} />
                      <Button
                        style={{
                          width: 100,
                          height: 38,
                          marginTop: 2,
                          marginLeft: 20
                        }}
                        onClick={() => {
                          messageToProfile()
                        }}
                      >
                        Message
                      </Button>
                    </>
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
