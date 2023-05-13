import React, { useState } from "react"
import {
  BulbOutlined,
  DatabaseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RobotOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  TransactionOutlined,
  CalculatorOutlined,
  BarcodeOutlined,
  FolderOutlined,
  FolderAddTwoTone
} from "@ant-design/icons"
import { Layout, Menu, Card, Typography, Button } from "antd"
import TableUser from "./User/TableUser"
import { useNavigate } from "react-router-dom"

const { Header, Sider, Content } = Layout

export default function Admin() {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [key, setCurrentKey] = useState("1")

  const pageNavigate = (key) => {
    if (key === "1") {
      return (
        <div>
          <TableUser />
        </div>
      )
    }
  }
  return (
    <Layout style={{ height: "800px" }}>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div style={{ margin: "20px" }}>
          <Typography.Title level={3}>Admin page</Typography.Title>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onSelect={(val) => {
            setCurrentKey(val.key)
          }}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "User"
            }
          ]}
        />
        <Button
          onClick={() => {
            navigate(-1)
          }}
        >
          Back
        </Button>
      </Sider>
      <Layout className="site-layout" theme="light">
        <Header
          className="site-layout-background"
          style={{
            padding: 0
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed)
            }
          )}
        </Header>
        <div className="p-[40px]">{pageNavigate(key)}</div>
      </Layout>
    </Layout>
  )
}
