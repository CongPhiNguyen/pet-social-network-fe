import React, { useEffect, useState } from "react"
import { Avatar, Typography, Card, Divider, Tooltip, Modal } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getFollowersApi } from "../../../api/user"
import UserCard from "../../../components/UserCard"
import FollowBtn from "../../../components/FollowBtn"
export default function Follower() {
  const { id } = useParams()
  const [followers, setFollower] = useState([])
  const [openFollowerModel, setOpenFollowerModel] = useState(false)
  const { auth } = useSelector((state) => state)
  const navigate = useNavigate()

  const getFollowers = async () => {
    const response = await getFollowersApi(id)
    const { data, status } = response
    if (status == 200) setFollower(data.followers)
  }

  useEffect(() => {
    getFollowers()
  }, [id])

  const handleOk = () => {
    setOpenFollowerModel(false)
  }

  const handleCancel = () => {
    setOpenFollowerModel(false)
  }

  return (
    <div>
      <Typography
        title={"Click to view all followers"}
        style={{
          cursor: "pointer",
          color: "teal",
          fontWeight: 600,
          fontSize: 18,
          marginBottom: 10
        }}
        onClick={() => {
          setOpenFollowerModel(true)
        }}
      >
        Follower:
      </Typography>
      <div>
        {followers && followers.length === 0 && (
          <p>This user don't have any follower</p>
        )}
        {followers &&
          followers.map((val) => (
            <Avatar.Group>
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
            <div style={{ textAlign: "center", fontWeight: 600, fontSize: 20 }}>
              Followers
            </div>
            <Divider></Divider>
          </React.Fragment>
        }
        open={openFollowerModel}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {followers.map((user) => (
          <UserCard key={user?._id} user={user}>
            {auth?.user?._id !== user?._id && <FollowBtn user={user} />}
          </UserCard>
        ))}
      </Modal>
    </div>
  )
}
