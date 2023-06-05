import { ClearOutlined, ReloadOutlined, SendOutlined } from "@ant-design/icons"
import { Affix, Button, Col, Divider, Input, Row, message } from "antd"
import { useCallback, useEffect, useRef, useState } from "react"
import ChatGPTIcon from "../../assets/images/chatgpt.png"
import "./index.scss"
import axios from "axios"
import { EventSourcePolyfill } from "event-source-polyfill"
import { useSelector } from "react-redux"
import { BACKEND_URL } from "../../constants"

const Gpt = ({ setIsOpen }) => {
  const chatRef = useRef(null)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [isReplying, setIsReplying] = useState(false)
  const suggestedMessages = ["Thú cưng là gì?", "Có bao nhiêu loại thú cưng?"]
  const { auth } = useSelector((state) => state)

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleSendMessage = async () => {
    if (inputValue === "") {
      message.warning("Please input something")

      return
    }
    const newMessage = {
      content: inputValue,
      role: "user"
    }
    const newReplyMessage = {
      content: "",
      role: "assistant"
    }
    setMessages([...messages, newMessage, newReplyMessage])
    setIsReplying(true)

    setInputValue("")
    const sse = new EventSourcePolyfill(
      `${BACKEND_URL}/gpt?message=${inputValue}`,
      {
        headers: { Authorization: auth.token }
      }
    )

    sse.onmessage = (event) => {
      newReplyMessage.content += event.data
      setMessages([...messages, newMessage, newReplyMessage])
    }

    sse.onerror = (event) => {
      sse.close()
      setIsReplying(false)
      setIsOpen(false)
      message.error(
        "ChatGPT is receive many request now. Please try again later!"
      )
    }
  }

  // const handleSendMessage = async () => {
  //     if (inputValue === "") {
  //         message.warning("Please input something")

  //         return
  //     }
  //     const newMessage = {
  //         content: inputValue,
  //         role: 'user',
  //     }
  //     const newReplyMessage = {
  //         content: '',
  //         role: 'assistant'
  //     }
  //     setMessages([...messages, newMessage, newReplyMessage])
  //     setIsReplying(true)

  //     setInputValue('')

  //     await axios.post(`http://localhost:5000/api/gpt`, { message: inputValue })
  //         .then(res => {
  //             const newReplyMessage = {
  //                 content: res.data.reply,
  //                 role: 'assistant'
  //             }
  //             setMessages([...messages, newMessage, newReplyMessage])
  //             setIsReplying(false)
  //         })
  //         .catch(err => {
  //             setIsReplying(false)
  //             message.error(err.message)
  //         })

  // }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSendSuggestedMessage = async (suggestedMessage) => {
    const newMessage = {
      content: suggestedMessage,
      role: "user"
    }
    const newReplyMessage = {
      content: "",
      role: "assistant"
    }
    setMessages([...messages, newMessage, newReplyMessage])
    setIsReplying(true)

    setInputValue("")

    const sse = new EventSourcePolyfill(
      `${BACKEND_URL}/gpt?message=${suggestedMessage}`,
      {
        headers: { Authorization: auth.token }
      }
    )

    sse.onmessage = (event) => {
      newReplyMessage.content += event.data
      setMessages([...messages, newMessage, newReplyMessage])
    }

    sse.onerror = (event) => {
      message.error(event.statusText)
      setIsReplying(false)
      sse.close()
      setIsReplying(false)
      setIsOpen(false)
      message.error(
        "ChatGPT is receive many request now. Please try again later!"
      )
    }
  }

  console.log("isReplying", isReplying)

  return (
    <div style={{ width: "400px", height: "600px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "10px",
          borderBottom: "1px solid rgb(235, 235, 240)"
        }}
      >
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          <img
            src={ChatGPTIcon}
            alt=""
            style={{ width: "33px", height: "33px", margin: 0 }}
          />
        </div>
        <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          PetLove ChatGPT
        </div>
      </div>
      <div
        style={{
          marginTop: 10,
          height: "calc(100% - 130px)",
          overflowY: "scroll",
          paddingBottom: 10
        }}
        ref={chatRef}
      >
        {messages.length === 0 && (
          <>
            <div
              style={{
                margin: "20px"
              }}
            >
              Hãy thử hỏi tôi
            </div>
            <div
              style={{
                margin: "20px"
              }}
            >
              {suggestedMessages?.map((message, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    handleSendSuggestedMessage(message)
                  }}
                  style={{
                    margin: "5px"
                  }}
                >
                  {message}
                </Button>
              ))}
            </div>
          </>
        )}
        {messages &&
          messages?.map((message, index) => (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection:
                    message.role === "user" ? "row-reverse" : "row",
                  justifyContent: "flex-start",
                  marginBottom: "10px"
                }}
              >
                <div
                  style={{
                    backgroundColor:
                      message.role === "user" ? "#1890ff" : "#f1f2f2",
                    color: message.role === "user" ? "#fff" : "#000",
                    borderRadius: "12px",
                    padding: "10px",
                    maxWidth: "80%"
                  }}
                >
                  {message.content !== "" ? (
                    <p
                      style={{
                        margin: 0,
                        overflowWrap: "break-word",
                        whiteSpace: "pre-line"
                      }}
                    >
                      {message.content}
                    </p>
                  ) : (
                    <p style={{ margin: 0 }} className="loading">
                      ...
                    </p>
                  )}
                  {message.role === "assistant" &&
                    !isReplying &&
                    message.content !== "" &&
                    index === messages.length - 1 && (
                      <Button
                        style={{
                          float: "right",
                          marginTop: "5px"
                        }}
                      >
                        <ReloadOutlined />
                        Regenerate
                      </Button>
                    )}
                </div>
              </div>
            </div>
          ))}
      </div>
      <Affix offsetBottom={0}>
        <Row style={{ padding: "5px" }}>
          <Col
            span={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Button
              style={{
                backgroundColor: "none",
                border: "none"
              }}
              shape="circle"
              disabled={
                isReplying ||
                messages?.at(-1)?.content === "" ||
                messages?.length === 0
              }
            >
              <ClearOutlined
                style={{
                  fontSize: "20px",
                  color: "#2980b9",
                  transform: "translateY(-2px)"
                }}
              />
            </Button>
          </Col>
          <Col offset={1} span={21}>
            <div>
              <Input.TextArea
                autoSize={{ minRows: 2, maxRows: 15 }}
                style={{
                  borderRadius: "12px",
                  height: "50px",
                  paddingRight: "50px"
                }}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
              />
              <Button
                style={{
                  position: "absolute",
                  right: "10px",
                  bottom: "10px"
                }}
                type="primary"
                shape="circle"
                onClick={handleSendMessage}
              >
                <SendOutlined style={{ transform: "translateY(-3px)" }} />
              </Button>
            </div>
          </Col>
        </Row>
      </Affix>
    </div>
  )
}

export default Gpt
