import { Col, Row, Menu, Typography, Card } from "antd"
import React from "react"
import { useState } from "react"
import { AiOutlineAccountBook } from "react-icons/ai"
import { Link } from "react-router-dom"
import ChatBot from "./bot/ChatBot"

const { Title } = Typography

export default function ChatBotPage() {
  const [currentChatbot, setCurrentChatbot] = useState({})
  const [chatBotList, setChatBotList] = useState([
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsK1MOGA1qihG3A-dzf9jV2aYAhJOKb3-gontQdDKjLtqnBhGVd55zsulTS3Zx4JJbE-A&usqp=CAU",
      name: "Dialogflow",
      key: "dialogflow"
    },
    {
      img: "https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec",
      name: "Duumy",
      key: "duumy"
    }
  ])
  const chooseBot = () => {}

  return (
    <div style={{ marginTop: 84 }}>
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "auto",
          marginTop: -10,
          padding: "0px 10px"
        }}
      >
        <Row>
          <Col xl={8} md={8} sm={24} xs={24}>
            <Title level={2}>Chatbot</Title>
            <div style={{ padding: "4px" }}>
              {chatBotList.map((val, index) => {
                return (
                  <Card
                    hoverable
                    key={val?.key}
                    onClick={() => {
                      setCurrentChatbot(chatBotList[index])
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <img
                        src={val?.img}
                        alt={val?.key}
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
                        {val.name}
                      </Typography>
                    </div>
                  </Card>
                )
              })}
            </div>
          </Col>
          <Col xl={16} md={16} sm={24} xs={24}>
            <ChatBot currentBot={currentChatbot} />
          </Col>
        </Row>
      </div>
    </div>
  )
}
