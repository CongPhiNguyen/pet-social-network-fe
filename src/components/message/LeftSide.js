import React, { useState, useEffect, useRef } from "react"
import UserCard from "../UserCard"
import { useSelector, useDispatch } from "react-redux"
import { getDataAPI } from "../../utils/fetchData"
import { Link, useNavigate, useParams } from "react-router-dom"
import { MESS_TYPES, getConversations } from "../../redux/actions/messageAction"
import {
  Typography,
  Input,
  Modal,
  Button,
  message as mese,
  List,
  Avatar,
  Result,
  Badge
} from "antd"
import { MessageFilled } from "@ant-design/icons"
const { Title } = Typography
const { Search } = Input

const LeftSide = ({ language }) => {
  const { auth, message, online } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [search, setSearch] = useState("")
  const [searchUsers, setSearchUsers] = useState([])

  const history = useNavigate()
  const { id } = useParams()

  const pageEnd = useRef()
  const [page, setPage] = useState(0)

  const handleSearch = async (e) => {
    if (!search) return setSearchUsers([])

    try {
      const res = await getDataAPI(`search?username=${search}`, auth.token)
      console.log(res.data.users)
      setSearchUsers(res.data.users)
      setOpen(true)
    } catch (err) {
      mese.error(err.response.data.msg)
    }
  }

  const handleAddUser = (user) => {
    setSearch("")
    setSearchUsers([])
    dispatch({
      type: MESS_TYPES.ADD_USER,
      payload: { ...user, text: "", media: [] }
    })
    dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online })
    setOpen(false)
    return history(`/message/${user._id}`)
  }

  const isActive = (user) => {
    if (id === user._id) return "active"
    return ""
  }

  useEffect(() => {
    if (message.firstLoad) return
    dispatch(getConversations({ auth }))
  }, [dispatch, auth, message.firstLoad])

  // Load More
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1)
        }
      },
      {
        threshold: 0.1
      }
    )

    observer.observe(pageEnd.current)
  }, [setPage])

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(getConversations({ auth, page }))
    }
  }, [message.resultUsers, page, auth, dispatch])

  // Check User Online - Offline
  useEffect(() => {
    if (message.firstLoad) {
      dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online })
    }
  }, [online, message.firstLoad, dispatch])

  const [open, setOpen] = useState(false)
  const handleCancel = () => {
    setOpen(false)
  }
  return (
    <>
      <Modal
        open={open}
        title={language === 'en' ? "List user" : "Danh sách người dùng"}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {
              language === 'en' ? "Cancel" : "Hủy"
            }
          </Button>
        ]}
      >
        {searchUsers.length === 0 ? (
          <Result status="404" title={language === "en" ? "User not found!" : "Không tim thấy người dùng!"} />
        ) : (
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={searchUsers}
            renderItem={(user) => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    onClick={() => handleAddUser(user)}
                    icon={
                      <MessageFilled
                        style={{ transform: "translateY(-3px)" }}
                      />
                    }
                  />
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Badge status="success" dot={isActive(user)}>
                      <Avatar src={user.avatar} />
                    </Badge>
                  }
                  title={user.fullname}
                  description={user.username}
                />
              </List.Item>
            )}
          />
        )}
      </Modal>
      <Title level={2}>{language === 'en' ? "Messager" : "Tin nhắn"}</Title>
      <Search
        style={{ marginBottom: "16px" }}
        onChange={(e) => setSearch(e.target.value)}
        onSearch={handleSearch}
        size="large"
        placeholder={language === 'en' ? "Enter name to search" : "Nhập tên cần tìm kiếm"}
        allowClear
      />

      <div className="message_chat_list">
        <>
          {message.users.map((user) => (
            <div
              key={user._id}
              className={`message_user ${isActive(user)}`}
              onClick={() => handleAddUser(user)}
            >

              <UserCard language={language} user={user} msg={true}>
                {user.online ? (
                  <i className="fas fa-circle text-success" />
                ) : (
                  auth.user.following.find((item) => item._id === user._id) && (
                    <i className="fas fa-circle" />
                  )
                )}
              </UserCard>
            </div>
          ))}
        </>

        {/* <Link to={`/message/bot`}>
          <BotCard />
        </Link> */}
        <button ref={pageEnd} style={{ opacity: 0 }}>
          {
            language === 'en' ? "Load More" : "Tải thêm"
          }
        </button>
      </div>
    </>
  )
}

export default LeftSide
