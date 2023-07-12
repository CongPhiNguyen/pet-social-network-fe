import React, { useContext } from "react"
import LeftSide from "../../components/message/LeftSide"
import { Card, Col, Row } from "antd"
import LanguageContext from "../../context/LanguageContext";

const Message = () => {
  const { language } = useContext(LanguageContext);


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
      <Col style={{ height: 'calc(100vh - 192px)' }} sm={20} md={6} offset={2}>
        <Card style={{ height: "100%", overflowY: "scroll" }}>
          <LeftSide language={language} />
        </Card>
      </Col>
      <Col style={{ height: 'calc(100vh - 192px)' }} sm={0} md={14}>
        <Card style={{ height: "100%", display: "flex", justifyContent: "center" }}>
          <div
            className="d-flex justify-content-center 
            align-items-center flex-column h-100"
          >
            <i
              className="fab fa-facebook-messenger text-primary"
              style={{ fontSize: "5rem" }}
            />
            <h4>{language === 'en' ? "Messenger" : "Tin nhắn"}</h4>
          </div>
        </Card>
      </Col>
    </Row>
  )
}

export default Message
