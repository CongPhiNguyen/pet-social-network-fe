import { Table, Input, Col, Button, Form, Row, Select, Space } from "antd"
import React, { useEffect, useState } from "react"
import { changeRole, getAllUserApi } from "../../../api/user"
import { FaExchangeAlt } from 'react-icons/fa'
import LanguageContext from "../../../context/LanguageContext"
import { useContext } from "react"

const REGEX_INVALID_CHAR = new RegExp(
  /^(?!.*[\\^\\$\\*\\(\\)\\[\]<>'"\\/\\;`%+])/,
)
const { Item } = Form


export default function TableUser() {
  const [userList, setUserList] = useState([])
  const [filters, setFilters] = useState({})
  const { language } = useContext(LanguageContext);
  const [loading, setLoading] = useState(false)
  const getAllUser = async () => {
    setLoading(true)
    const response = await getAllUserApi(filters)
    const { data, status } = response
    setUserList(data)
    setLoading(false)
  }
  useEffect(() => {
    getAllUser()
  }, [filters])

  const columns = [
    {
      title: language === 'en' ? "User Id" : "ID",
      dataIndex: "_id",
      key: "_id"
    },
    {
      title: language === 'en' ? "Full Name" : "Tên đầy đủ",
      dataIndex: "fullname",
      key: "fullname"
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: language === 'en' ? "Role" : "Quyền",
      dataIndex: "role",
      key: "role"
    },
    {
      title: language === 'en' ? "Gender" : "Giới tính",
      dataIndex: "gender",
      key: "gender"
    },
    {
      title: language === 'en' ? 'Action' : "Thao tác",
      dataIndex: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" shape="round" onClick={async () => {
            if (record.role === 'admin') {
              await changeRole('user', record._id)
            } else {
              await changeRole('admin', record._id,)
            }
            await getAllUser()
          }} icon={<FaExchangeAlt />} />
        </Space>
      ),
    },
  ]

  const handleSearch = (search) => {
    setFilters({ ...search })
  }

  return (
    <div style={{ margin: 20 }}>
      <Form onFinish={handleSearch}>
        <Row gutter={20}>
          <Col>
            <Item
              name="id"
              rules={[
                {
                  pattern: REGEX_INVALID_CHAR,
                  message: language === 'en' ? 'ID string invalid' : "ID không đúng định dạng",
                },
              ]}
            >
              <Input
                id="segment-filter-segmentName"
                placeholder="ID"
              />
            </Item>
          </Col>
          <Col>
            <Item
              name="username"
              rules={[
                {
                  pattern: REGEX_INVALID_CHAR,
                  message: language === 'en' ? 'Username string invalid' : "Username không đúng định dạng",
                },
              ]}
            >
              <Input id="segment-filter-segmentName" placeholder="Username" />
            </Item>
          </Col>
          <Col>
            <Item name="role">
              <Select
                showSearch
                style={{ width: '120px' }}
                placeholder="Role"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                allowClear
                options={[
                  {
                    label: 'Admin',
                    value: 'admin',
                  },
                  {
                    label: 'User',
                    value: 'user',
                  },
                ]}
              />
            </Item>
          </Col>
          <Col>
            <Item>
              <Button
                type="primary"
                id="segment-button-search"
                htmlType="submit"
              >
                {
                  language === 'en' ? "Search" : "Tìm kiêm"
                }
              </Button>
            </Item>
          </Col>
        </Row>
      </Form>
      <Table columns={columns} loading={loading} dataSource={userList} />
    </div>
  )
}
