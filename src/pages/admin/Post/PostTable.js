import { Table, Input, Col, Button, Form, Row, Select } from "antd"
import React, { useEffect, useState } from "react"
import { getAllPostApi } from "../../../api/post"
const REGEX_INVALID_CHAR = new RegExp(
    /^(?!.*[\\^\\$\\*\\(\\)\\[\]<>'"\\/\\;`%+])/,
)
const { Item } = Form


export default function PostTable() {
    const [userList, setUserList] = useState([])
    const [filters, setFilters] = useState({})
    const [loading, setLoading] = useState(false)
    const getAllUser = async () => {
        setLoading(true)
        const response = await getAllPostApi(filters)
        const { data, } = response
        setUserList(data)
        setLoading(false)
    }
    useEffect(() => {
        getAllUser()
    }, [filters])

    const columns = [
        {
            title: "Post Id",
            dataIndex: "_id",
            key: "_id"
        },
        {
            title: "Full Name",
            dataIndex: "fullname",
            key: "fullname",
            render: (_, record) => {
                return record?.user?.fullname
            }
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
            render: (_, record) => {
                return record?.user?.username
            }
        },
        {
            title: "Content",
            dataIndex: "content",
            key: "content",
        },
        {
            title: "Created At",
            dataIndex: "created",
            key: "created",
            render: (_, record) => {
                return new Date(record.createdAt).toString()
            }
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
                            name="username"
                            rules={[
                                {
                                    pattern: REGEX_INVALID_CHAR,
                                    message: 'Username string invalid',
                                },
                            ]}
                        >
                            <Input id="segment-filter-segmentName" placeholder="Username" />
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
            <Table columns={columns} loading={loading} dataSource={userList} />
        </div>
    )
}
