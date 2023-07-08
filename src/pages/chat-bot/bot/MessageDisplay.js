import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Modal, Tooltip, message } from "antd"
import { ExclamationCircleFilled } from "@ant-design/icons"
import { FaVideo } from "react-icons/fa"
import { IoCall } from "react-icons/io5"
import PetCardInfo from "./PetCardInfo"
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
  console.log(msg)

  return (
    <>
      {/* <div className="chat_title">
        <Avatar src={user.avatar} size="small-avatar" />
        <span>{user.username}</span>
      </div> */}
      <Tooltip
        title={new Date(msg.createdAt || msg.time).toLocaleString()}
        style={{ cursor: "pointer" }}
      >
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
                <p style={{ margin: 0, padding: 0 }}>{msg.text}</p>
                <p style={{ margin: 0, padding: 0, fontWeight: 600 }}>
                  {msg?.dialogflowFeature?.name === "ask_pet-fact" &&
                    msg?.dialogflowFeature?.fact}
                </p>
                <p style={{ margin: 0, padding: 0, fontWeight: 600 }}>
                  {msg?.dialogflowFeature?.name === "ask_pet-care-tips" &&
                    msg?.dialogflowFeature?.tip}
                </p>
              </div>
            )}
            {msg?.dialogflowFeature?.name === "ask_find-dog" && (
              <PetCardInfo
                info={msg?.dialogflowFeature?.dogInfo}
                name={msg?.dialogflowFeature?.dogName}
                type="dog"
              />
            )}
            {msg?.dialogflowFeature?.name === "ask_find-cat" && (
              <PetCardInfo
                info={msg?.dialogflowFeature?.catInfo}
                name={msg?.dialogflowFeature?.catName}
                type="cat"
              />
            )}
            {msg?.dialogflowFeature?.name === "choose.pet-by-personal" &&
              (msg?.dialogflowFeature?.dogName ||
                msg?.dialogflowFeature?.catName) && (
                <PetCardInfo
                  cardType={
                    msg?.dialogflowFeature?.dogName
                      ? "choose_dog"
                      : "choose_cat"
                  }
                  name={
                    msg?.dialogflowFeature?.dogName ||
                    msg?.dialogflowFeature?.catName
                  }
                  type="cat"
                />
              )}
            {(msg?.dialogflowFeature?.name === "say_gau" ||
              msg?.dialogflowFeature?.name === "say_meow") && (
              <img
                src={msg?.dialogflowFeature?.imgUrl}
                alt=""
                style={{ maxWidth: 400 }}
              ></img>
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
      </Tooltip>
    </>
  )
}

export default MessageDisplay
