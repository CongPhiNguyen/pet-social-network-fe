import React from "react"
import { Col, Row, Button, Form, Input, Typography, message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { changePasswordApi } from "../../../api/authen"
const { Title } = Typography
export default function ChangePassword({ pattern }) {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onFinish = async (value) => {
    console.log(pattern)
    console.log(value)
    try {
      const response = await changePasswordApi({
        ...value,
        pattern
      })
      const { data } = response
      message.success("Change password success. Login to continue")
      navigate("/")
    } catch (err) {
      message.error(err?.response?.data?.message || "Unexpected Error")
    }
  }
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        name="basic"
        initialValues={{
          remember: true
        }}
        style={{ width: "100%" }}
        onFinish={onFinish}
        autoComplete="off"
        size="large"
      >
        <Title level={2}>Change password</Title>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!"
            },
            {
              min: 6,
              message: "Password at least 6 characters!"
            }
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="cf_password"
          rules={[
            {
              required: true,
              message: "Please input your confirm password!"
            },
            {
              min: 6,
              message: "Password at least 6 characters!"
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                )
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>

        <p style={{ marginBottom: "20px" }}>
          <Link to="/register" className="forgot-password">
            Register?
          </Link>
        </p>
        <Form.Item>
          <Button style={{ width: "100%" }} type="primary" htmlType="submit">
            Continue
          </Button>
        </Form.Item>
        <p style={{ textAlign: "center" }} className="my-2">
          You don't have an account?{" "}
          <Link to="/register" style={{ color: "crimson", fontWeight: "700" }}>
            Register Now
          </Link>
        </p>
      </Form>
    </div>
  )
}
