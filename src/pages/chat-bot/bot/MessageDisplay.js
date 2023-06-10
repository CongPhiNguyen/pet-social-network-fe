import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Modal } from "antd"
import { ExclamationCircleFilled } from "@ant-design/icons"
import { FaVideo } from "react-icons/fa"
import { IoCall } from "react-icons/io5"
const { confirm } = Modal
const MessageDisplay = ({ user, msg, theme, data }) => {
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()

  // const handleDeleteMessages = () => {
  //   if (!data) return
  //   confirm({
  //     icon: <ExclamationCircleFilled />,
  //     title: "Do you want to delete this message?",
  //     onOk() {
  //       dispatch(deleteMessages({ msg, data, auth }))
  //     },
  //     onCancel() {
  //       console.log("Cancel")
  //     }
  //   })
  // }

  return (
    <>
      {/* <div className="chat_title">
        <Avatar src={user.avatar} size="small-avatar" />
        <span>{user.username}</span>
      </div> */}

      <div className="you_content">
        {/* {user?._id === auth?.user?._id && (
          <i
            style={{ transform: "translate(-6px,-10px)" }}
            className="fas fa-trash"
            onClick={handleDeleteMessages}
          />
        )} */}

        <div>
          {msg.text && (
            <div
              className="chat_text"
              style={{ filter: theme ? "invert(1)" : "invert(0)" }}
            >
              {msg.text}
            </div>
          )}
          {/* {msg.media.map((item, index) => (
            <div key={index}>
              {item.url.match(/video/i)
                ? videoShow(item.url, theme)
                : imageShow(item.url, theme)}
            </div>
          ))} */}
        </div>
      </div>

      <div className="chat_time">
        {new Date(msg.createdAt).toLocaleString()}
      </div>
    </>
  )
}

export default MessageDisplay
