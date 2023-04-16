import React, { useEffect, useState } from "react"
import { Avatar, Typography, Card, Divider, Tooltip, Modal } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { getFollowingApi } from "../../api/user"
import UserCard from "../UserCard"
import FollowBtn from "../FollowBtn"
export default function Following() {
  const { id } = useParams()
  const [followings, setFollowings] = useState([])
  const [openFollowingModel, setOpenFollowingModel] = useState(false)
  const { auth } = useSelector((state) => state)
  const history = useHistory()

  const getFollowings = async () => {
    const response = await getFollowingApi(id)
    const { data, status } = response
    if (status == 200) setFollowings(data.following)
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
        This user is following:
      </Typography>
      <div>
        {followings && followings.length === 0 && (
          <p>This user don't follow any user</p>
        )}
        {followings &&
          followings.map((val) => (
            <Avatar.Group>
              <Tooltip title={val.fullname} placement="top">
                <Avatar
                  src={val.avatar}
                  size={60}
                  onClick={() => {
                    history.push("/profile/" + val._id)
                    console.log(val._id)
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
              Followings
            </div>
            <Divider></Divider>
          </React.Fragment>
        }
        open={openFollowingModel}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {followings.map((user) => (
          <UserCard key={user?._id} user={user}>
            {auth?.user?._id !== user?._id && <FollowBtn user={user} />}
          </UserCard>
        ))}
      </Modal>
    </div>
  )
}
