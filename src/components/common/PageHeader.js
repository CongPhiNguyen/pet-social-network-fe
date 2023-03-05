import { Typography } from "antd"
import React from "react"
import { IoChevronBackOutline } from "react-icons/io5"
import { useHistory } from "react-router"

export default function PageHeader(props) {
  const history = useHistory()
  return (
    <div style={{ marginTop: 20, marginLeft: 20, display: "flex" }}>
      <div style={{ marginRight: 10 }}>
        <IoChevronBackOutline
          onClick={() => {
            history.goBack()
          }}
        />
      </div>
      <Typography.Title level={4}>{props.title}</Typography.Title>
    </div>
  )
}
