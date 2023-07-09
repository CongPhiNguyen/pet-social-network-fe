import { Table, message } from "antd"
import React, { useContext, useEffect, useState } from "react"
import { getLogsApi } from "../../../api/log"
import moment from "moment"
import LanguageContext from "../../../context/LanguageContext"

function convertTime(timestamp) {
  const date = moment(timestamp)
  const formattedTime = date.format("HH:mm:ss")
  const formattedDate = date.format("DD/MM/YYYY")
  return `${formattedTime}, ${formattedDate}`
}

export default function LogTable() {
  const { language } = useContext(LanguageContext);

  const [logList, setLogList] = useState([])
  const columns = [
    {
      title: language === 'en' ? "Time" : "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val) => convertTime(val)
    },
    {
      title: language === 'en' ? "Method" : "Phương thức",
      dataIndex: "method",
      key: "method"
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url"
    },
    {
      title: language === 'en' ? "Status" : "Trạng thái",
      dataIndex: "status",
      key: "status"
    },
    {
      title: language === 'en' ? "Response time" : "Phản hồi",
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
