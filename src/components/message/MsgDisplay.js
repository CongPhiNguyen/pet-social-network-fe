import React from "react"
import Avatar from "../Avatar"
import { imageShow, videoShow } from "../../utils/mediaShow"
import { useSelector, useDispatch } from "react-redux"
import { deleteMessages } from "../../redux/actions/messageAction"
import { Modal } from 'antd'
import Times from "./Times"
import { ExclamationCircleFilled } from '@ant-design/icons';
import { IoCall } from 'react-icons/io5'
import { FaVideo } from 'react-icons/fa'

const { confirm } = Modal;
const MsgDisplay = ({ user, msg, theme, data }) => {
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()

  const handleDeleteMessages = () => {
    if (!data) return
    confirm({
      icon: <ExclamationCircleFilled />,
      title: 'Do you want to delete this message?',
      onOk() {
        dispatch(deleteMessages({ msg, data, auth }));
      },
      onCancel() {
        console.log('Cancel');
      },
    });

  }

  return (
    <>
      {/* <div className="chat_title">
        <Avatar src={user.avatar} size="small-avatar" />
        <span>{user.username}</span>
      </div> */}

      <div className="you_content">
        {user?._id === auth?.user?._id && (
          <i
            style={{ transform: 'translate(-6px,-10px)' }}
            className="fas fa-trash"
            onClick={handleDeleteMessages}
          />
        )}

        <div>
          {msg.text && (
            <div
              className="chat_text"
              style={{ filter: theme ? "invert(1)" : "invert(0)" }}
            >
              {msg.text}
            </div>
          )}
          {msg.media.map((item, index) => (
            <div key={index}>
              {item.url.match(/video/i)
                ? videoShow(item.url, theme)
                : imageShow(item.url, theme)}
            </div>
          ))}
        </div>

        {msg.call && (
          <button
            className="btn d-flex align-items-center py-3"
            style={{ background: "#eee", borderRadius: "10px" }}
          >
            <span
              className="material-icons font-weight-bold mr-1"
              style={{
                fontSize: "2.5rem",
                color: msg.call.times === 0 ? "crimson" : "green",
                filter: theme ? "invert(1)" : "invert(0)"
              }}
            >
              {msg.call.times === 0
                ? msg.call.video
                  ? <FaVideo style={{ margin: '0 10px 5px 5px' }}></FaVideo>
                  : <IoCall style={{ margin: '0 10px 5px 5px' }}></IoCall>
                : msg.call.video
                  ? <FaVideo style={{ margin: '0 10px 5px 5px' }}></FaVideo>
                  : <IoCall style={{ margin: '0 10px 5px 5px' }}></IoCall>}
            </span>

            <div className="text-left">
              <h6>{msg.call.video ? "Video Call" : "Audio Call"}</h6>
              <small>
                {msg.call.times > 0 ? (
                  <Times total={msg.call.times} />
                ) : (
                  new Date(msg.createdAt).toLocaleTimeString()
                )}
              </small>
            </div>
          </button>
        )}
      </div>

      <div className="chat_time">
        {new Date(msg.createdAt).toLocaleString()}
      </div>
    </>
  )
}

export default MsgDisplay