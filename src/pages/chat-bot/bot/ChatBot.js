import React, { createRef, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import "./Chat.css"
import { message, Col, Row, Card, Typography, Form, Input, Button } from "antd"
import MessageDisplay from "./MessageDisplay"
import {
  addBotGreetMessageApi,
  getBotMessageApi,
  sendDialogflowMessageApi,
  sendDummyMessageApi,
  sendGossipMessageApi
} from "../../../api/chatbot"
import { useEffect } from "react"

const isValidDate = (dateString) => {
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date)
}

function getTimeOfDay() {
  const current = new Date()
  const currentHour = current.getHours()

  if (currentHour >= 5 && currentHour < 12) {
    return "buổi sáng"
  } else if (currentHour >= 12 && currentHour < 18) {
    return "buổi chiều"
  } else {
    return "buổi tối"
  }
}

export default function ChatBot({ currentBot }) {
  const [form] = Form.useForm()

  const messageInputRef = useRef(null)
  const myDivRef = useRef(null)
  const [triggerScroll, setTriggerScroll] = useState(false)
  const [botMessage, setBotMessage] = useState([])
  const [isShowAdvise, setIsShowAdvise] = useState(false)
  const [suggestMessage, setSuggestMessage] = useState([
    "Dự đoán bệnh cho thú cưng",
    "Chọn thú cưng phù hợp",
    "Tìm kiếm thông tin chó mèo"
  ])

  useEffect(() => {
    try {
      setTimeout(() => {
        myDivRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
      }, 50)
    } catch (err) {
      message.error(err.message)
    }
  }, [currentBot.key, triggerScroll])

  const { auth } = useSelector((state) => state)

  const addGreetMessage = async () => {
    const response = await addBotGreetMessageApi({
      userId: auth?.user?._id,
      botName: currentBot.key,
      messageList: [
        `Chào ${getTimeOfDay()} bạn, chúc bạn 1 ngày tốt lành`,
        `Tôi có thể giúp gì cho bạn nào?`
      ]
    })
    const { data, status } = response
    if (status === 200) {
      setBotMessage(data.messageList || [])
      setTriggerScroll((prev) => !prev)
    }
  }

  const showAdvise = () => {}

  const getBotMessage = async (botName) => {
    try {
      const response = await getBotMessageApi({
        userId: auth?.user?._id,
        botName: botName
      })
      const { data, status } = response
      if (status === 200) {
        if (!isValidDate(data.updatedAt) || data?.messageList?.length === 0) {
          addGreetMessage()
          // Then it is ok to show to add the advision
        }
        // Lớn hơn 3 tiếng thì chào tiếp
        if (
          new Date().getTime() - new Date(data.updatedAt).getTime() >
          3 * 1000 * 60 * 60
        ) {
          addGreetMessage()
        }
        setBotMessage(data.messageList || [])
        const lastMessage = data.messageList[data.messageList.length - 1]
        if (lastMessage?.dialogflowFeature?.name === "ask.probality") {
          setIsShowAdvise(true)
        }
        setTriggerScroll((prev) => !prev)
      }
      // message.success("Verify user and TOTP ok")
      // navigate("/set-password?")
    } catch (err) {
      console.log(err)
      message.error(err?.response?.data?.message || "Unexpected Error")
    }
  }

  // Dùng để get mấy message của mấy con bot tại đây
  useEffect(() => {
    if (!currentBot.key) {
      setBotMessage([])
    } else {
      getBotMessage(currentBot.key)
    }
  }, [currentBot.key])

  const sendMessage = async (value) => {
    setIsShowAdvise(false)
    setBotMessage((prevBotMessage) => [
      ...prevBotMessage,
      { text: value.message, sender: auth?.user?._id, createdAt: Date.now() }
    ])
    form.resetFields()
    messageInputRef.current.focus()
    setTriggerScroll((prev) => !prev)
    try {
      if (currentBot.key === "dialogflow") {
        const response = await sendDialogflowMessageApi({
          ...value,
          userId: auth.user._id
        })
        const { text, sender, time, dialogflowFeature } = response.data
        if (dialogflowFeature?.name === "ask.probality") {
          setIsShowAdvise(true)
        }
        // Add the bot's response to the chat
        setBotMessage((prevBotMessage) => [
          ...prevBotMessage,
          {
            text: text,
            sender: sender,
            createdAt: time,
            dialogflowFeature: dialogflowFeature
          }
        ])

        setTriggerScroll((prev) => !prev)
      } else if (currentBot.name === "Dummy") {
        const response = await sendDummyMessageApi({
          ...value,
          userId: auth.user._id
        })
        // Add the bot's response to the chat
        setBotMessage((prevBotMessage) => [
          ...prevBotMessage,
          {
            text: response.data.message,
            sender: "dummy",
            createdAt: Date.now()
          }
        ])
        setTriggerScroll((prev) => !prev)
      } else if (currentBot.key === "gossip") {
        const response = await sendGossipMessageApi({
          ...value,
          userId: auth.user._id
        })
        // Add the bot's response to the chat
        setBotMessage((prevBotMessage) => [
          ...prevBotMessage,
          {
            text: response.data.message,
            sender: "gossip",
            createdAt: Date.now(),
            dialogflowFeature: response.data.dialogflowFeature
          }
        ])
        setTriggerScroll((prev) => !prev)
      } else {
        message.error("This chatbot is not currently supported")
        message.error("This chatbot is not currently supported")
      }
    } catch (error) {
      message.error(error)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#f2f2f2",
        borderRadius: "10px",
        padding: "10px 10px 0px 10px",
        overflowY: "hidden"
      }}
    >
      <Card hoverable bodyStyle={{ padding: 10 }}>
        <div style={{ display: "flex" }}>
          <img
            src={currentBot?.img}
            alt={currentBot?.key}
            style={{ borderRadius: "100%", width: 24, height: 24 }}
          ></img>
          <Typography
            style={{
              fontWeight: 600,
              fontSize: 14,
              lineHeight: "24px",
              marginLeft: 20
            }}
          >
            {currentBot?.name}
          </Typography>
        </div>
      </Card>
      <div
        className="chat_container"
        style={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
          padding: "0 10px"
        }}
      >
        <div
          style={{
            width: "100%",
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end"
          }}
        >
          <div
            style={{
              marginTop: "0",
              opacity: 1,
              width: "100%",
              height: "100%"
            }}
          >
            {botMessage.map((msg, index) => (
              <div key={index}>
                {msg.sender !== auth?.user?._id && (
                  <div className="chat_row other_message">
                    <MessageDisplay msg={msg} />
                  </div>
                )}
                {msg.sender === auth?.user?._id && (
                  <div className="chat_row you_message">
                    <MessageDisplay
                      // user={auth?.user}
                      msg={msg}
                      // theme={theme}
                      // data={data}
                    />
                  </div>
                )}
              </div>
            ))}
            {isShowAdvise && (
              <div style={{ textAlign: "center", margin: "0 20px 20px " }}>
                {suggestMessage.map((val) => (
                  <div style={{ marginBottom: 10 }}>
                    <Button
                      style={{ backgroundColor: "#fff" }}
                      onClick={() => {
                        sendMessage({ message: val })
                      }}
                    >
                      {val}
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div ref={myDivRef}></div>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: -22, paddingBottom: 0 }}>
        <Form
          form={form}
          onFinish={(value) => {
            sendMessage(value)
          }}
        >
          <Form.Item name="message">
            <div style={{ display: "flex" }}>
              <Input ref={messageInputRef} />
              <Button type="primary" htmlType="submit">
                Send
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>

      {/* <form className="chat-input" onSubmit={handleUserMessageSubmit}>
        <input
          type="text"
          placeholder="Type your message here..."
          value={userMessage}
          onChange={handleUserMessageChange}
        />
        <button type="submit">Send</button>
      </form> */}
    </div>
  )
}
