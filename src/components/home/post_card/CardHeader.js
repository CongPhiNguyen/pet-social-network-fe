import React, { useState, useEffect } from "react"
import { Avatar } from "antd"
import { Link, useNavigate } from "react-router-dom"
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
import 'moment/locale/vi';
import 'moment/locale/en-gb'
const { confirm } = Modal

const CardHeader = ({ post, language }) => {
  useEffect(() => {
    if (language === 'en') {
      moment.locale('en-gb');
    } else {
      moment.locale('vi');
    }
  }, [language])
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
      title: language === 'en' ? "Are you sure want to delete this post?" : "Bạn có chắc chắn muốn xóa bài đăng này?",
      icon: <DeleteFilled />,
      onOk() {
        dispatch(deletePost({ post, auth, socket }))
        return navigate("/")
      },
      onCancel() { }
    })
  }

  const [items, setItems] = useState([])
  useEffect(() => {
    if (auth?.user?._id === post?.user?._id) {
      setItems([
        {
          key: "1",
          label: (
            <div onClick={handleEditPost}>
              <EditOutlined
                style={{ marginRight: "6px" }}
              />{" "}
              <span style={{ fontWeight: "600" }}>{language === 'en' ? "Edit" : "Chỉnh sửa"}</span>
            </div>
          )
        },
        {
          key: "2",
          label: (
            <div onClick={handleDeletePost}>
              <DeleteOutlined
                style={{ marginRight: "6px" }}
              />{" "}
              <span style={{ fontWeight: "600" }}>{language === 'en' ? "Delete" : "Xóa"}</span>
            </div>
          )
        },
        {
          key: "3",
          label: (
            <div onClick={handleCopyLink}>
              <CopyOutlined
                style={{ marginRight: "6px" }}
              />{" "}
              <span style={{ fontWeight: "600" }}>{language === 'en' ? "Copy" : "Sao chép"}</span>
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
              <span style={{ fontWeight: "600" }}>{language === 'en' ? "Copy" : "Sao chép"}</span>
            </div>
          )
        }
      ])
    }
  }, [post?.user?._id, auth?.user?._id])

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
            post?.user?.avatar ===
              "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
              ? null
              : post?.user?.avatar
          }
          size="large"
        >
          {post?.user?.fullname ? post?.user?.fullname[0]?.toUpperCase() : "Name"}
        </Avatar>
        <div className="card_name">
          <h6 className="m-0">
            <Link to={`/profile/${post?.user?._id}`} className="text-dark">
              {post?.user?.fullname}
            </Link>
          </h6>
          <small className="text-muted">
            {moment(post?.createdAt).fromNow()}
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
