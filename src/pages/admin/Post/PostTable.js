import { Table, Input, Col, Button, Form, Row, Select, Space, Tag } from "antd"
import React, { useEffect, useState } from "react"
import { getAllPostApi } from "../../../api/post"
import LimitedWords from './LimitedWords'
import LanguageContext from "../../../context/LanguageContext"
import { useContext } from "react"
const REGEX_INVALID_CHAR = new RegExp(
    /^(?!.*[\\^\\$\\*\\(\\)\\[\]<>'"\\/\\;`%+])/,
)
const { Item } = Form


export default function PostTable() {
    const { language } = useContext(LanguageContext);
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
            title: language === 'en' ? "Post Id" : "ID",
            dataIndex: "_id",
            key: "_id"
        },
        {
            title: language === 'en' ? "Full Name" : "Tên đầy đủ",
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
            title: language === 'en' ? "Content" : "Nội dung",
            dataIndex: "content",
            key: "content",
        },
        {
            title: language === 'en' ? "Created At" : "Thời gian tạo",
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
            <LimitedWords language={language}></LimitedWords>
            <Form style={{ marginTop: "30px" }} onFinish={handleSearch}>

                <Row gutter={20}>
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
                        <Item>
                            <Button
                                type="primary"
                                id="segment-button-search"
                                htmlType="submit"
                            >
                                {language === 'en' ? "Search" : "Tìm kiếm"}
                            </Button>
                        </Item>
                    </Col>
                </Row>
            </Form>
            <Table columns={columns} loading={loading} dataSource={userList} />
        </div>
    )
}
