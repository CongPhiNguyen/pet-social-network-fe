import { Table } from "antd"
import React, { useEffect, useState } from "react"
import { getAllUserApi } from "../../../api/user"

export default function TableUser() {
  const [userList, setUserList] = useState([])
  const getAllUser = async () => {
    const response = await getAllUserApi()
    const { data, status } = response
    setUserList(data)
  }
  useEffect(() => {
    getAllUser()
  }, [])
  const columns = [
    {
      title: "User Id",
      dataIndex: "_id",
      key: "_id"
    },
    {
      title: "Full Name",
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
      title: "Role",
      dataIndex: "role",
      key: "role"
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender"
    }
  ]
  return (
    <div style={{ margin: 20 }}>
      <Table columns={columns} dataSource={userList} />
    </div>
  )
}
