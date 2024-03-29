import React, { useState } from "react"
import { SiAuth0 } from "react-icons/si"
import { Menu, Card, Row, Col } from "antd"
import PageHeader from "../../components/common/PageHeader"
import PageSection from "../../components/common/PageSection"
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
    setCurrentSetting(val.key)
  }
  return (
    <div className="page-container" style={{ marginTop: 64 }}>
      <div style={{ height: 10 }}></div>
      <PageHeader title={"Setting"}></PageHeader>
      <PageSection>
        <Card>
          <Row>
            <Col xl={6} md={12} sm={24}>
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
            <Col xl={18} md={12} sm={24}>
              {currentSetting === "2Factor" && <TwoFactor />}
            </Col>
          </Row>
        </Card>
      </PageSection>
    </div>
  )
}
