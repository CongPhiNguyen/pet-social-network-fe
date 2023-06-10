import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import "./Chat.css"
import { message, Col, Row, Card, Typography } from "antd"
import MessageDisplay from "./MessageDisplay"
export default function ChatBot({ currentBot }) {
  const [userMessage, setUserMessage] = useState("")
  const [botMessage, setBotMessage] = useState([])

  const { auth } = useSelector((state) => state)

  const handleUserMessageChange = (event) => {
    setUserMessage(event.target.value)
  }

  const handleUserMessageSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post(
        "http://localhost:5000/api/dialogflow-api",
        {
          message: userMessage
        }
      )
      // Add the user's message to the chat
      setBotMessage((prevBotMessage) => [
        ...prevBotMessage,
        { text: userMessage, sender: auth?.user?._id, createdAt: Date.now() }
      ])

      // Add the bot's response to the chat
      setBotMessage((prevBotMessage) => [
        ...prevBotMessage,
        {
          text: response.data.message,
          sender: "dialogflow",
          createdAt: Date.now()
        }
      ])
      setUserMessage("")
    } catch (error) {
      message.error(error)
    }
  }

  return (
    <div className="chat">
      <Card hoverable>
        <div style={{ display: "flex" }}>
          <img
            src={currentBot?.img}
            alt={currentBot?.key}
            style={{ borderRadius: "100%", width: 48, height: 48 }}
          ></img>
          <Typography
            style={{
              fontWeight: 600,
              fontSize: 18,
              lineHeight: "48px",
              marginLeft: 20
            }}
          >
            {currentBot?.name}
          </Typography>
        </div>
      </Card>
      <div className="chat_container">
        <div className="chat_display">
          <div
            style={{
              marginTop: "0",
              opacity: 1,
              width: "100%",
              height: "10px"
            }}
          ></div>
          {/* {loading && <Spin></Spin>} */}

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

          {/* {loadMedia && (
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Spin></Spin>
            </div>
          )} */}
        </div>
      </div>
      {/* <div style={{ height: "calc(100vh - 200px)" }}>
        {botMessage.map((message, index) => (
          <p
            key={index}
            className={`chat-message ${
              message.sender === "bot"
                ? "chat-message-bot"
                : "chat-message-user"
            }`}
          >
            {message.text}
          </p>
        ))}
      </div> */}

      <form className="chat-input" onSubmit={handleUserMessageSubmit}>
        <input
          type="text"
          placeholder="Type your message here..."
          value={userMessage}
          onChange={handleUserMessageChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
