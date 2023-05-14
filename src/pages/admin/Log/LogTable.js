import { Table, message } from "antd"
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
    const response = await getLogsApi()
    console.log(response)
    const { data, status } = response
    if (status === 200) {
      setLogList(data.listLogs)
    } else {
      message.error("Some error happended!!")
    }
  }

  useEffect(() => {
    getLogs()
  }, [])

  return (
    <div style={{ margin: 20 }}>
      <Table columns={columns} dataSource={logList} />
    </div>
  )
}
