import React from "react"
import LeftSide from "../../components/message/LeftSide"
import RightSide from "../../components/message/RightSide"
import { useParams } from "react-router"
import BotMessage from "../../components/message/BotMessage"
import { Card, Col, Row } from "antd"

const Conversation = () => {
  const param = useParams()
  const { id } = param
  return (
    <Row gutter={[24, 0]} style={{ marginTop: 96, overflow: "hidden" }} >
      <Col style={{ height: 'calc(100vh - 124px)' }} span={6} offset={2}>
        <Card style={{ height: "100%", overflowY: "scroll" }}>
          <LeftSide />
        </Card>
      </Col>
      <Col style={{ height: 'calc(100vh - 124px)' }} span={14}>
        <Card className="right-side" style={{ height: "100%", display: "flex", justifyContent: "center", width: "100%" }}>
          {id !== "bot" ? <RightSide /> : <BotMessage />}
        </Card>
      </Col>
    </Row>
    // <div style={{ marginTop: 64 }} className="message d-flex">
    //   <div className="col-md-4 border-right px-0 left_mess">
    //     <LeftSide />
    //   </div>

    //   <div className="col-md-8 px-0">
    //     {id !== "bot" ? <RightSide /> : <BotMessage />}
    //   </div>
    // </div>
  )
}

export default Conversation
