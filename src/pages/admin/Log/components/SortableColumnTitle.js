import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons"
import { Row } from "antd"

function SortableColumnTitle({ title, sortType, sorting }) {
  return (
    <Row justify="space-between" style={{ cursor: "pointer" }}>
      <span>{title}</span>
      <div>
        {sorting ? (
          sortType === "asc" ? (
            <CaretUpOutlined />
          ) : (
            <CaretDownOutlined />
          )
        ) : (
          <CaretUpOutlined style={{ opacity: 0.15 }} />
        )}
      </div>
    </Row>
  )
}

export default SortableColumnTitle
