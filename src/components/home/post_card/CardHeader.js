import React, { useState, useEffect } from "react"
import { Avatar } from "antd"
import { Link, useHistory, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import moment from "moment"
import { GLOBALTYPES } from "../../../redux/actions/globalTypes"
import { deletePost } from "../../../redux/actions/postAction"
import { BASE_URL } from "../../../utils/config"
import { SlOptions } from "react-icons/sl"
import { Dropdown } from "antd"
import { CopyOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { Modal } from "antd"
import { DeleteFilled } from "@ant-design/icons"

const { confirm } = Modal

const CardHeader = ({ post }) => {
  const { auth, socket } = useSelector((state) => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleEditPost = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } })
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`)
  }
  const handleDeletePost = () => {
    confirm({
      title: "Are you sure want to delete this post?",
      icon: <DeleteFilled />,
      onOk() {
        dispatch(deletePost({ post, auth, socket }))
        return navigate.to("/")
      },
      onCancel() {}
    })
  }

  const [items, setItems] = useState([])
  useEffect(() => {
    if (auth.user._id === post.user._id) {
      setItems([
        {
          key: "1",
          label: (
            <div onClick={handleEditPost}>
              <EditOutlined
                style={{ transform: "translateY(-4px)", marginRight: "6px" }}
              />{" "}
              <span style={{ fontWeight: "600" }}>Edit</span>
            </div>
          )
        },
        {
          key: "2",
          label: (
            <div onClick={handleDeletePost}>
              <DeleteOutlined
                style={{ transform: "translateY(-4px)", marginRight: "6px" }}
              />{" "}
              <span style={{ fontWeight: "600" }}>Delete</span>
            </div>
          )
        },
        {
          key: "3",
          label: (
            <div onClick={handleCopyLink}>
              <CopyOutlined
                style={{ transform: "translateY(-4px)", marginRight: "6px" }}
              />{" "}
              <span style={{ fontWeight: "600" }}>Copy</span>
            </div>
          )
        }
      ])
    } else {
      setItems([
        {
          key: "3",
          label: (
            <div onClick={handleCopyLink}>
              <CopyOutlined
                style={{ transform: "translateY(-4px)", marginRight: "6px" }}
              />{" "}
              <span style={{ fontWeight: "600" }}>Copy</span>
            </div>
          )
        }
      ])
    }
  }, [post.user._id, auth.user._id])

  return (
    <div className="card_header">
      <div className="d-flex">
        <Avatar
          style={{
            backgroundColor: "#f56a00",
            verticalAlign: "middle",
            marginRight: "5px"
          }}
          src={
            auth?.user?.avatar ===
            "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
              ? null
              : auth?.user?.avatar
          }
          size="large"
        >
          {auth?.user?.username[0]?.toUpperCase()}
        </Avatar>
        <div className="card_name">
          <h6 className="m-0">
            <Link to={`/profile/${post.user._id}`} className="text-dark">
              {post.user.fullname}
            </Link>
          </h6>
          <small className="text-muted">
            {moment(post.createdAt).fromNow()}
          </small>
        </div>
      </div>
      <div className="nav-item dropdown">
        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
        >
          <SlOptions />
        </Dropdown>
      </div>
    </div>
  )
}

export default CardHeader
