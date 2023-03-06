import React, { useState } from "react"
import { SiAuth0 } from "react-icons/si"
import { Menu, Card, Row, Col } from "antd"
import PageHeader from "../common/PageHeader"
import PageSection from "../common/PageSection"
import "./setting.scss"
import TwoFactor from "./TwoFactorAuthen/TwoFactor"

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type
  }
}

const items = [
  getItem("Authentication", "authen", <SiAuth0 />, [
    getItem("Two Factor Authenticator", "2Factor")
  ]),
  {
    type: "divider"
  }
]

export default function Setting() {
  const [currentSetting, setCurrentSetting] = useState("")
  const onClick = (val) => {
    console.log(val)
    setCurrentSetting(val.key)
  }
  return (
    <div className="page-container">
      <PageHeader title={"Setting"}></PageHeader>
      <PageSection>
        <Card>
          <Row>
            <Col span={6}>
              <Menu
                onClick={onClick}
                style={{
                  width: 256
                }}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                items={items}
              />
            </Col>
            <Col span={18}>{currentSetting === "2Factor" && <TwoFactor />}</Col>
          </Row>
        </Card>
      </PageSection>
    </div>
  )
}
