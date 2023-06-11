import React, { createRef, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import "./Chat.css"
import { message, Col, Row, Card, Typography, Form, Input, Button } from "antd"
import MessageDisplay from "./MessageDisplay"
import { sendDialogflowMessageApi } from "../../../api/chatbot"
import { useEffect } from "react"

export default function ChatBot({ currentBot }) {
  const [form] = Form.useForm()

  const messageInputRef = useRef(null)
  const myDivRef = useRef(null)
  const [triggerScroll, setTriggerScroll] = useState(false)
  const [botMessage, setBotMessage] = useState([])

  useEffect(() => {
    setTimeout(() => {
      myDivRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }, 50)
    console.log("keso")
  }, [myDivRef.current, message, currentBot, triggerScroll])

  const { auth } = useSelector((state) => state)

  // Dùng để get mấy message của mấy con bot tại đây
  useEffect(() => {
    if (!currentBot.name) {
      setBotMessage([])
    } else {
      setBotMessage([
        {
          text: "wfkodu3bqly5pi07vysp",
          sender: "647e03134cf1723cbc71e714",
          createdAt: 1686472797631
        },
        {
          text: "vi7vfuzo6id2zs1849joms",
          sender: "bot",
          createdAt: 1686472797631
        },
        {
          text: "3jxhs7w9isphgm2y6qtzh",
          sender: "647e03134cf1723cbc71e714",
          createdAt: 1686472797631
        },
        {
          text: "wfkodu3bqly5pi07vysp",
          sender: "647e03134cf1723cbc71e714",
          createdAt: 1686472797631
        },
        {
          text: "vi7vfuzo6id2zs1849joms",
          sender: "bot",
          createdAt: 1686472797631
        },
        {
          text: "3jxhs7w9isphgm2y6qtzh",
          sender: "647e03134cf1723cbc71e714",
          createdAt: 1686472797631
        },
        {
          text: "wfkodu3bqly5pi07vysp",
          sender: "647e03134cf1723cbc71e714",
          createdAt: 1686472797631
        },
        {
          text: "vi7vfuzo6id2zs1849joms",
          sender: "bot",
          createdAt: 1686472797631
        },
        {
          text: "3jxhs7w9isphgm2y6qtzh",
          sender: "647e03134cf1723cbc71e714",
          createdAt: 1686472797631
        },
        {
          text: "llnnir7ankdwxesczivi8",
          sender: "bot",
          createdAt: 1686472797631
        },
        {
          text: "awycn2jz5es4aikkgxh4e",
          sender: "647e03134cf1723cbc71e714",
          createdAt: 1686472797631
        },
        {
          text: "1c19pt5jh6ysn4kty5gpq",
          sender: "bot",
          createdAt: 1686472797631
        },
        {
          text: "62oc877lhoyuwhcsjk0etg",
          sender: "647e03134cf1723cbc71e714",
          createdAt: 1686472797631
        },
        {
          text: "i9lp4i8d0zlolco4vbol9o",
          sender: "bot",
          createdAt: 1686472797631
        },
        {
          text: "1c19pt5jh6ysn4kty5gpq",
          sender: "bot",
          createdAt: 1686472797631
        },
        {
          text: "62oc877lhoyuwhcsjk0etg",
          sender: "647e03134cf1723cbc71e714",
          createdAt: 1686472797631
        },
        {
          text: "i9lp4i8d0zlolco4vbol9o",
          sender: "bot",
          createdAt: 1686472797631
        },
        {
          text: "1c19pt5jh6ysn4kty5gpq",
          sender: "bot",
          createdAt: 1686472797631
        },
        {
          text: "62oc877lhoyuwhcsjk0etg",
          sender: "647e03134cf1723cbc71e714",
          createdAt: 1686472797631
        },
        {
          text: "i9lp4i8d0zlolco4vbol9o",
          sender: "bot",
          createdAt: 1686472797631
        },
        {
          text: "1c19pt5jh6ysn4kty5gpq",
          sender: "bot",
          createdAt: 1686472797631
        },
        {
          text: "62oc877lhoyuwhcsjk0etg",
          sender: "647e03134cf1723cbc71e714",
          createdAt: 1686472797631
        },
        {
          text: "i9lp4i8d0zlolco4vbol9o",
          sender: "bot",
          createdAt: 1686472797631
        }
      ])
    }
  }, [currentBot])

  const sendMessage = async (value) => {
    setBotMessage((prevBotMessage) => [
      ...prevBotMessage,
      { text: value.message, sender: auth?.user?._id, createdAt: Date.now() }
    ])
    form.resetFields()
    form.scrollToField("message")
    messageInputRef.current.focus()
    setTriggerScroll(!triggerScroll)
    try {
      if (currentBot.name === "Dialogflow") {
        const response = await sendDialogflowMessageApi(value)
        // Add the bot's response to the chat
        setBotMessage((prevBotMessage) => [
          ...prevBotMessage,
          {
            text: response.data.message,
            sender: "dialogflow",
            createdAt: Date.now()
          }
        ])
        setTriggerScroll(!triggerScroll)
      } else {
        message.error("Chat bot is not supported now!")
        message.error("Chat bot is not supported now!")
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
        height: "calc(100vh - 200px)",
        backgroundColor: "#f2f2f2",
        borderRadius: "10px",
        padding: "10px",
        overflowY: "scroll"
      }}
    >
      <Card hoverable>
        <div style={{ display: "flex" }}>
          <img
            src={currentBot?.img}
            alt={currentBot?.key}
            style={{ borderRadius: "100%", width: 36, height: 36 }}
          ></img>
          <Typography
            style={{
              fontWeight: 600,
              fontSize: 18,
              lineHeight: "36px",
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
          height: "calc(100% - 120px)",
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
            <div ref={myDivRef}></div>
          </div>
        </div>
      </div>
      <div>
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
