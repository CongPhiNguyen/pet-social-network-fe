import { Col, Modal, Row } from "antd"
import React from "react"
import PetCard from "./PetCard"

export default function PetModalShowAll({
  isShowAllPet,
  setIsShowAllPet,
  userInfo,
  petList
}) {
  return (
    <Modal
      title={`All Pets of ${userInfo.fullname} `}
      open={isShowAllPet}
      onOk={() => {
        setIsShowAllPet(false)
        // setShowConfirmCloseEditModal(false)
      }}
      onCancel={() => {
        setIsShowAllPet(false)
        // setShowConfirmCloseEditModal(false)
      }}
      width={"60%"}
      maskClosable={false}
      style={{ top: 20 }}
    >
      <div style={{ marginTop: 20 }}>
        <Row>
          {petList.map((val, index) => (
            <Col xs={12} sm={6}>
              <div style={{ textAlign: "center" }}>
                <PetCard {...val} key={index} isShowDelete={true} />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Modal>
  )
}
