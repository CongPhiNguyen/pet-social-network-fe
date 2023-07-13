import React, { useEffect, useState } from "react"
import { Avatar, Typography, Card, Divider, Tooltip, Modal, Spin } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getFollowingApi } from "../../../api/user"
import UserCard from "../../../components/UserCard"
import FollowBtn from "../../../components/FollowBtn"
export default function Following({ language }) {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [followings, setFollowings] = useState([])
  const [openFollowingModel, setOpenFollowingModel] = useState(false)
  const { auth } = useSelector((state) => state)
  const navigate = useNavigate()

  const getFollowings = async () => {
    setIsLoading(true)
    const response = await getFollowingApi(id)
    setIsLoading(false)
    const { data, status } = response
    if (status === 200) setFollowings(data.following)
  }

  useEffect(() => {
    getFollowings()
  }, [id])

  const handleOk = () => {
    setOpenFollowingModel(false)
  }

  const handleCancel = () => {
    setOpenFollowingModel(false)
  }

  if (isLoading) {
    return <Spin />
  }

  return (
    <div>
      <Typography
        title={"Click to view all followings"}
        style={{
          cursor: "pointer",
          color: "teal",
          fontWeight: 600,
          fontSize: 18,
          marginBottom: 10
        }}
        onClick={() => {
          setOpenFollowingModel(true)
        }}
      >
        {language === "en"
          ? `This user is following(${followings.length})`
          : `Danh sách đang theo dõi(${followings.length})`}
      </Typography>
      <div>
        {followings && followings.length === 0 && (
          <p>
            {language === "en"
              ? "This user don't follow any user"
              : "Người dùng hiện tại không theo dõi ai"}
          </p>
        )}
        {followings &&
          followings.slice(0, 4).map((val, index) => (
            <Avatar.Group key={index}>
              <Tooltip title={val.fullname} placement="top">
                <Avatar
                  style={{
                    backgroundColor: "#f56a00",
                    fontSize: 28,
                    cursor: "pointer"
                  }}
                  src={
                    val?.avatar ===
                    "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
                      ? null
                      : val?.avatar
                  }
                  size={60}
                  onClick={() => {
                    navigate("/profile/" + val?._id)
                  }}
                >
                  {val?.username ? val?.username[0].toUpperCase() : ""}
                </Avatar>
              </Tooltip>
            </Avatar.Group>
          ))}
        {followings.length && followings.length > 4 && (
          <Avatar.Group key={"plus"}>
            <Tooltip title={""} placement="top">
              <Avatar
                style={{
                  backgroundColor: "#c9c9c9",
                  fontSize: 24,
                  cursor: "pointer",
                  border: "1px solid #333"
                }}
                src={null}
                size={60}
                // onClick={() => {
                //   navigate("/profile/" + val?._id)
                // }}
              >
                <p style={{ marginTop: -4 }}>+{followings.length - 4}</p>
              </Avatar>
            </Tooltip>
          </Avatar.Group>
        )}
      </div>
      <Modal
        title={
          <React.Fragment>
            <div
              style={{ textAlign: "centing", fontWeight: 600, fontSize: 20 }}
            >
              {language === "en" ? "Followings" : "Theo dõi"}
            </div>
            <Divider></Divider>
          </React.Fragment>
        }
        open={openFollowingModel}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {followings.map((user, index) => (
          <UserCard key={index} user={user}>
            {auth?.user?._id !== user?._id && <FollowBtn user={user} />}
          </UserCard>
        ))}
      </Modal>
    </div>
  )
}
