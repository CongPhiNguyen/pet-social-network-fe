import React from "react"
import LeftSide from "../../components/message/LeftSide"
import RightSide from "../../components/message/RightSide"
import { useParams } from "react-router"
import { Card, Col, Row } from "antd"
import { useNavigate } from "react-router-dom"
import { DownloadOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { MdArrowBack } from "react-icons/md"

const Conversation = () => {
  const navigate = useNavigate()
  const param = useParams()
  const { id } = param
  return (
    <Row
      gutter={[24, 0]}
      style={{ paddingTop: 128, overflow: "hidden", marginRight: 0 }}
    >
      <Col style={{ height: "calc(100vh - 192px)" }} xs={0} md={6} offset={2}>
        <Card style={{ height: "100%", overflowY: "scroll" }}>
          <LeftSide />
        </Card>
      </Col>
      <Col
        style={{ height: "calc(100vh - 192px)", position: "relative" }}
        xs={2}
        md={0}
      >
        <div
          onClick={() => {
            navigate("/message")
          }}
          className="btn-back"
        >
          <MdArrowBack
            style={{ fontSize: "1.4rem", transform: "translate(9px, 8px)" }}
          ></MdArrowBack>
        </div>
      </Col>
      <Col style={{ height: "calc(100vh - 192px)" }} xs={{ span: 20 }} md={14}>
        <Card
          className="right-side"
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            width: "100%"
          }}
        >
          <RightSide />
        </Card>
      </Col>
    </Row>
  )
}

export default Conversation
