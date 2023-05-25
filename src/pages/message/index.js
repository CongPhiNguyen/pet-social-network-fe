import React from "react"
import LeftSide from "../../components/message/LeftSide"
import { Card, Col, Row } from "antd"

const Message = () => {
  return (
    // <div style={{ marginTop: 64 }} className="message d-flex">

    //   <div className="col-md-4 border-right px-0">
    //     <LeftSide />
    //   </div>

    //   <div className="col-md-8 px-0 right_mess">
    //     <div
    //       className="d-flex justify-content-center 
    //             align-items-center flex-column h-100"
    //     >
    //       <i
    //         className="fab fa-facebook-messenger text-primary"
    //         style={{ fontSize: "5rem" }}
    //       />
    //       <h4>Messenger</h4>
    //     </div>
    //   </div>
    // </div>

    <Row gutter={[24, 0]} style={{ paddingTop: 128, overflow: "hidden", marginRight: 0 }} >
      <Col style={{ height: 'calc(100vh - 192px)' }} span={6} offset={3}>
        <Card style={{ height: "100%", overflowY: "scroll" }}>
          <LeftSide />
        </Card>
      </Col>
      <Col style={{ height: 'calc(100vh - 192px)' }} span={12}>
        <Card style={{ height: "100%", display: "flex", justifyContent: "center" }}>
          <div
            className="d-flex justify-content-center 
            align-items-center flex-column h-100"
          >
            <i
              className="fab fa-facebook-messenger text-primary"
              style={{ fontSize: "5rem" }}
            />
            <h4>Messenger</h4>
          </div>
        </Card>
      </Col>
    </Row>
  )
}

export default Message
