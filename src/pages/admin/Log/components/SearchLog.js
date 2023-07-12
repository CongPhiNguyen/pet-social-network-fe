import React from "react"
import { Button, Col, Form, Input, Row, Select } from "antd"

const { Item } = Form

export default function SearchLog({ onSearch }) {
  const [form] = Form.useForm()
  return (
    <Form
      // form={form}
      onFinish={(value) => {
        console.log("huhu")
        onSearch(value)
      }}
    >
      <Row gutter={20}>
        <Col>
          <Item name="method">
            <Input placeholder="Method" />
          </Item>
        </Col>
        <Col>
          <Item name="url">
            <Input placeholder="URL" />
          </Item>
        </Col>
        <Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Item>
      </Row>
    </Form>
  )
}
