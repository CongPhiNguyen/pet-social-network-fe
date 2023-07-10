import { Typography, Table, message } from "antd"
import React, { useEffect } from "react"
import { useState } from "react"
import { getLogsAccumulationApi } from "../../../../api/log"
import SortableColumnTitle from "./SortableColumnTitle"

export default function LogAccumulation() {
  const [listLogAccumulation, setListLogAccumulation] = useState([])
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
      title: "API name",
      dataIndex: "_id",
      key: "apiName"
      // render: (val) => convertTime(val)
    },
    {
      title: (
        <SortableColumnTitle
          title="Call times"
          sorting={sortValue.sortColumn === "count"}
          sortType={sortValue.sortType}
        />
      ),
      onHeaderCell: (column) => onHeaderCell(column),
      dataIndex: "count",
      key: "count"
    },
    {
      title: (
        <SortableColumnTitle
          title="AVG Responsetime"
          sorting={sortValue.sortColumn === "responseTime"}
          sortType={sortValue.sortType}
        />
      ),
      onHeaderCell: (column) => onHeaderCell(column),
      dataIndex: "responseTime",
      key: "responseTime",
      render: (val) => val + " ms"
    }
  ]

  const getLogAccumulation = async () => {
    setIsLoading(true)
    const response = await getLogsAccumulationApi({
      currentPage: currentPage,
      pageSize: pageSize,
      filter: filter,
      sortValue: sortValue
    })
    const { data, status } = response
    if (status === 200) {
      setListLogAccumulation(data.listLogAccumulation)
      // const { total } = data.meta
      // setTotal(total)
    } else {
      message.error("Some error happended!!")
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getLogAccumulation()
  }, [sortValue])

  return (
    <div>
      <Typography.Title level={4}>LogAccumulation</Typography.Title>{" "}
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={listLogAccumulation}
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
