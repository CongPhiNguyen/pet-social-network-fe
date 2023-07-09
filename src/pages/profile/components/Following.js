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

        {
          language === 'en' ? "This user is following:" : "Danh sách đang theo dõi"
        }
      </Typography>
      <div>
        {followings && followings.length === 0 && (
          <p>
            {
              language === 'en' ? "This user don't follow any user" : "Bạn không theo dõi ai"
            }
          </p>
        )}
        {followings &&
          followings.map((val, index) => (
            <Avatar.Group key={index}>
              <Tooltip title={val.fullname} placement="top">
                <Avatar
                  src={val.avatar}
                  size={60}
                  onClick={() => {
                    navigate("/profile/" + val._id)
                  }}
                />
              </Tooltip>
            </Avatar.Group>
          ))}
      </div>
      <Modal
        title={
          <React.Fragment>
            <div
              style={{ textAlign: "centing", fontWeight: 600, fontSize: 20 }}
            >
              {
                language === 'en' ? "Followings" : "Theo dõi"
              }

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
