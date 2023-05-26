import React from "react"
import { Link } from "react-router-dom"
import Menu from "./Menu"
import Search from "./Search"
import { Image } from "antd"
import Logo from "../../images/logo.jpg"
import { Breadcrumb, Layout, theme, Row, Col } from "antd"
const { Header } = Layout

const HeaderLayout = () => {
  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1029
      }}
    >
      <Row style={{ maxWidth: "1200px", width: "100%" }}>
        <Col xs={2}>
          <Link to="/" className="logo">
            <Image
              className="header-logo"
              width={50}
              src={Logo}
              preview={false}
              onClick={() => window.scrollTo({ top: 0 })}
            />
          </Link>
        </Col>
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          xs={10}
        >
          <Search />
        </Col>
        <Col xs={12}>
          <Menu />
        </Col>
      </Row>
    </Header>
  )
}

export default HeaderLayout
