import { Table, Typography, message } from "antd"
import React, { useEffect, useState, useContext } from "react"
import { getLogsApi } from "../../../api/log"
import moment from "moment"
import SearchLog from "./components/SearchLog"
import SortableColumnTitle from "./components/SortableColumnTitle"
import LogAccumulation from "./components/LogAccumulation"
import LanguageContext from "../../../context/LanguageContext"

function convertTime(timestamp) {
  const date = moment(timestamp)
  const formattedTime = date.format("HH:mm:ss")
  const formattedDate = date.format("DD/MM/YYYY")
  return `${formattedTime}, ${formattedDate}`
}

export default function LogTable() {
  const { language } = useContext(LanguageContext)

  const [logList, setLogList] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [filter, setFilter] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [sortValue, setSortValue] = useState({
    sortColumn: "",
    sortType: "asc"
  })

  const handleSort = (value) => {
    setIsLoading(true)
    let sortType
    if (sortValue.sortType === "asc") {
      sortType = "desc"
    } else {
      sortType = "asc"
    }
    const sortColumn = value.dataIndex
    setSortValue({ sortColumn, sortType })
  }

  function onHeaderCell(column) {
    return {
      onClick() {
        handleSort(column)
      }
    }
  }

  const columns = [
    {
      title: language === "en" ? "Time" : "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val) => convertTime(val)
    },
    {
      title: language === "en" ? "Method" : "Phương thức",
      dataIndex: "method",
      key: "method"
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url"
    },
    {
      title: language === "en" ? "Status" : "Trạng thái",
      dataIndex: "status",
      key: "status"
    },
    {
      title: (
        <SortableColumnTitle
          title={language === "en" ? "Response time" : "Phản hồi"}
          sorting={sortValue.sortColumn === "responseTime"}
          sortType={sortValue.sortType}
        />
      ),
      onHeaderCell: (column) => onHeaderCell(column),
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
    setIsLoading(true)
    const response = await getLogsApi({
      currentPage: currentPage,
      pageSize: pageSize,
      filter: filter,
      sortValue: sortValue
    })
    const { data, status } = response
    if (status === 200) {
      setLogList(data.listLogs)
      const { total } = data.meta
      setTotal(total)
    } else {
      message.error("Some error happended!!")
    }
    setIsLoading(false)
  }

  const searchLogs = (value) => {
    const searchPattern = {}
    if (value?.url && value.url.length !== 0) {
      searchPattern["url"] = value.url
    }
    if (value?.method && value.method.length !== 0) {
      searchPattern["method"] = value.method
    }

    setFilter(searchPattern)
  }

  useEffect(() => {
    getLogs()
  }, [currentPage, filter, sortValue])

  return (
    <div style={{ margin: 20 }}>
      <Typography.Title level={4}>Log list</Typography.Title>
      <SearchLog onSearch={searchLogs} />
      <Table
        loading={isLoading}
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
      <LogAccumulation></LogAccumulation>
    </div>
  )
}
