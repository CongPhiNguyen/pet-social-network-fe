import { Table, Input, Col, Button, Form, Row, Select, Space } from "antd"
import React, { useEffect, useState } from "react"
import { changeRole, getAllUserApi } from "../../../api/user"
import { FaExchangeAlt } from 'react-icons/fa'
import { useSelector } from "react-redux"
import { useContext } from "react"
import LanguageContext from "../../../context/LanguageContext"

const REGEX_INVALID_CHAR = new RegExp(
    /^(?!.*[\\^\\$\\*\\(\\)\\[\]<>'"\\/\\;`%+])/,
)
const { Item } = Form

export default function OnlineTable() {
    const { socket } = useSelector(state => state)
    const [userList, setUserList] = useState([])
    const [filters, setFilters] = useState({})
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        socket.emit("listUserOnline")
    }, [socket])

    useEffect(() => {
        socket.on("getList", (user) => {
            setUserList(user)
            console.log(user)
        })
    }, [socket])


    const columns = [
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: language === 'en' ? "Role" : "Quyền",
            dataIndex: "role",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: language === 'en' ? "Fullname" : "Tên đầy đủ",
            dataIndex: "fullname",
        },
        {
            title: "ID",
            dataIndex: "id",
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
                                Search
                            </Button>
                        </Item>
                    </Col>
                </Row>
            </Form>
            <Table columns={columns} dataSource={userList} />
        </div>
    )
}
