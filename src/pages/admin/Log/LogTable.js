import { Table, Typography, message } from "antd"
import React, { useEffect, useState } from "react"
import { getLogsApi } from "../../../api/log"
import moment from "moment"

function convertTime(timestamp) {
  const date = moment(timestamp)
  const formattedTime = date.format("HH:mm:ss")
  const formattedDate = date.format("DD/MM/YYYY")
  return `${formattedTime}, ${formattedDate}`
}

export default function LogTable() {
  const [logList, setLogList] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)

  const columns = [
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val) => convertTime(val)
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method"
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status"
    },
    {
      title: "Response time",
      dataIndex: "responseTime",
      key: "responseTime",
      render: (val) => val + " ms"
    },
    {
      title: "UserId",
      dataIndex: "userId",
      key: "userId"
    }
  ]

  const getLogs = async () => {
    const response = await getLogsApi({
      currentPage: currentPage,
      pageSize: pageSize
    })
    console.log(response)
    const { data, status } = response
    if (status === 200) {
      setLogList(data.listLogs)
      const { total } = data.meta
      setTotal(total)
    } else {
      message.error("Some error happended!!")
    }
  }

  useEffect(() => {
    getLogs()
  }, [currentPage])

  return (
    <div style={{ margin: 20 }}>
      <Typography.Title level={4}>Log list</Typography.Title>

      <Table
        columns={columns}
        dataSource={logList}
        pagination={{
          pageSize: pageSize,
          current: currentPage,
          onChange: setCurrentPage,
          total: total,
          showSizeChanger: false
        }}
      />
    </div>
  )
}
