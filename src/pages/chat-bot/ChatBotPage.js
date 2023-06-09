import { Col, Row, Menu } from "antd"
import React from "react"
import { useState } from "react"
import { AiOutlineAccountBook } from "react-icons/ai"
import { Link } from "react-router-dom"
import BotMessage from "./BotMessage"

export default function ChatBotPage() {
  const [currentChatbot, setCurrentChatbot] = useState("")
  const chooseBot = () => {}
  const items = [
    {
      label: "Dialogflow",
      key: "dialogflow",
      icon: (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsK1MOGA1qihG3A-dzf9jV2aYAhJOKb3-gontQdDKjLtqnBhGVd55zsulTS3Zx4JJbE-A&usqp=CAU"
          alt="Dialogflow"
          style={{ borderRadius: "100%" }}
        />
      )
    }
    // {
    //   label: <Link to={`/profile/${currentUserId}`}>Profile</Link>,
    //   key: "profile",
    //   icon: <RiProfileLine size={22} />
    // },
  ]
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
            <div style={{ border: "1px solid #333" }}>
              <Menu
                onClick={chooseBot}
                style={{ borderRadius: 10 }}
                mode="inline"
                items={items}
              />
            </div>
          </Col>
          <Col xl={16} md={16} sm={24} xs={24}>
            <BotMessage />
          </Col>
        </Row>
      </div>
    </div>
  )
}
