import React, { useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import NoNotice from "../images/notice.png"
import { Link, useHistory, useNavigate } from "react-router-dom"
import Avatar from "./Avatar"
import moment from "moment"
import {
  isReadNotify,
  NOTIFY_TYPES,
  deleteAllNotifies
} from "../redux/actions/notifyAction"
import { Button, Modal } from "antd"
import { DeleteFilled } from "@ant-design/icons"
import LanguageContext from "../context/LanguageContext"

const NotifyModal = () => {
  const navigate = useNavigate()
  const { auth, notify } = useSelector((state) => state)
  const [modal, contextHolder] = Modal.useModal()
  const dispatch = useDispatch()
  const { language } = useContext(LanguageContext);

  const handleIsRead = (msg) => {
    dispatch(isReadNotify({ msg, auth }))
  }

  const handleSound = () => {
    dispatch({ type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound })
  }
  const confirm = () => {
    modal.confirm({
      title: language === 'en' ? "Confirm" : "Xác nhận",
      icon: <DeleteFilled />,
      content: language === 'en' ? `You have ${notify.data.filter((item) => item.isRead === false).length
        } unread notices. Are you sure you want to delete all?` : `Bạn có ${notify.data.filter((item) => item.isRead === false).length
        } thông báo chưa đọc. Bạn có chắc chắn xóa tất cả?`,
      okText: language === 'en' ? "Delete" : "Xóa",
      cancelText: language === 'en' ? "Cancel" : "Hủy",
      onOk: handleDeleteAll
    })
  }
  const handleDeleteAll = () => {
    const newArr = notify.data.filter((item) => item.isRead === false)
    if (newArr.length === 0) return dispatch(deleteAllNotifies(auth.token))
    return dispatch(deleteAllNotifies(auth.token))
  }

  return (
    <div style={{ minWidth: "300px" }}>
      <div className="d-flex justify-content-between align-items-center px-3">
        <h5 style={{ fontWeight: "700", fontSize: "1.4rem" }}>
          {language === 'en' ? "Notifications" : "Thông báo"}
        </h5>
        {notify.sound ? (
          <i
            className="fas fa-bell icon-notify "
            style={{ fontSize: "1.4rem", cursor: "pointer" }}
            onClick={handleSound}
          />
        ) : (
          <i
            className="fas fa-bell-slash icon-notify"
            style={{ fontSize: "1.4rem", cursor: "pointer" }}
            onClick={handleSound}
          />
        )}
      </div>
      <hr className="mt-0" />
      {notify.data.length === 0 && (
        <img src={NoNotice} alt="NoNotice" className="w-80" />
      )}

      <div style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}>
        {notify.data.map((msg, index) => (
          <div key={index} className="px-2 mb-3">
            <Link
              to={`${msg.url}`}
              className="d-flex text-dark align-items-center"
              onClick={() => handleIsRead(msg)}
            >
              <Avatar src={msg.user.avatar} size="big-avatar" />

              <div className="mx-1 flex-fill">
                <div>
                  <strong className="mr-1">{msg.user.username}</strong>
                  <span>{msg.text}</span>
                </div>
                {msg.content && <small>{msg.content.slice(0, 20)}...</small>}
              </div>
              {msg.image && (
                <div style={{ width: "30px" }}>
                  {msg.image.match(/video/i) ? (
                    <video src={msg.image} width="100%" />
                  ) : (
                    <Avatar src={msg.image} size="medium-avatar" />
                  )}
                </div>
              )}
            </Link>
            <small className="text-muted d-flex justify-content-between px-2">
              {moment(msg.createdAt).fromNow()}
              {!msg.isRead && <i className="fas fa-circle text-primary" />}
            </small>
          </div>
        ))}
      </div>
      <hr className="my-1" />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={() => {
            navigate("/notification")
          }}
        >
          {language === 'en' ? "Open in window" : "Mở trong cửa sổ khác"}
        </Button>
        <Button type="primary" onClick={confirm} danger>
          {language === 'en' ? "Delete All" : "Xóa tất cả"}


        </Button>
        {contextHolder}
      </div>
    </div>
  )
}

export default NotifyModal
