import { Col, Row, Menu, Typography, Card, message } from "antd"
import React from "react"
import { useState } from "react"
import { AiOutlineAccountBook } from "react-icons/ai"
import { Link } from "react-router-dom"
import ChatBot from "./bot/ChatBot"
import { MdArrowBack } from "react-icons/md"
import "./bot/Chat.css"

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
      name: "Dummy",
      key: "dummy"
    }
  ])
  const chooseBot = () => {}

  return (
    <div style={{ marginTop: -40 }}>
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "auto",
          marginTop: -10,
          padding: "0px 10px"
        }}
      >
        <Row
          gutter={[24, 0]}
          style={{ paddingTop: 128, overflow: "hidden", marginRight: 0 }}
        >
          <Col
            // style={{ height: "calc(100vh - 192px)" }}
            xs={0}
            md={6}
            offset={2}
          >
            <Card style={{ overflowY: "scroll" }}>
              <Title level={2} style={{ fontSize: 16 }}>
                Chatbot
              </Title>
              <div style={{ padding: "4px 20px" }}>
                {chatBotList.map((val, index) => {
                  return (
                    <Card
                      hoverable
                      key={val?.key}
                      onClick={() => {
                        setCurrentChatbot(chatBotList[index])
                      }}
                      style={{ marginBottom: 10, padding: "0" }}
                      bodyStyle={{ padding: "10px 10px" }}
                    >
                      <div style={{ display: "flex" }}>
                        <img
                          src={val?.img}
                          alt={val?.key}
                          style={{
                            borderRadius: "100%",
                            width: 24,
                            height: 24
                          }}
                        ></img>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontSize: 14,
                            lineHeight: "24px",
                            marginLeft: 20
                          }}
                          className="chatbot-name"
                        >
                          {val.name}
                        </Typography>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </Card>
          </Col>
          <Col
            style={{ height: "calc(100vh - 192px)", position: "relative" }}
            xs={2}
            md={0}
          >
            <div
              // onClick={() => {
              //   navigate("/message")
              // }}
              className="btn-back"
            >
              <MdArrowBack
                style={{ fontSize: "1.4rem", transform: "translate(9px, 8px)" }}
              ></MdArrowBack>
            </div>
          </Col>
          <Col
            style={{ height: "calc(100vh - 192px)" }}
            xs={{ span: 20 }}
            md={14}
          >
            <Card
              className="right-side"
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                width: "100%"
              }}
            >
              <ChatBot currentBot={currentChatbot} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}
