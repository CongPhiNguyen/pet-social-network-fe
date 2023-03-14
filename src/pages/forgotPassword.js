import React from "react"
import { Col, Row, Button, Form, Input, Typography, message } from "antd"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"

const { Title } = Typography

export default function ForgotPassword() {
  const history = useHistory()
  const [form] = Form.useForm()
  const onFinish = async (values) => {
    try {
      const response = await axios.post("api/forgot-password", {
        email: values.email,
        token: values.token
      })
      const { data } = response
      message.success("Verify user and TOTP ok")
      history.push("/set-password")
    } catch (err) {
      message.error(err?.response?.data?.message)
    }
  }
  return (
    <>
      <Row style={{ width: "100vw" }}>
        <Col style={{ height: "100vh" }} xs={0} md={16}>
          <div className="login-background"></div>
        </Col>
        <Col
          className="login-form-warpper"
          style={{ height: "100vh" }}
          xs={24}
          md={8}
        >
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
            <Title level={2}>Forgot password</Title>
            <Form.Item
              label="Email address"
              name="email"
              style={{
                width: "100%"
              }}
              rules={[
                {
                  required: true,
                  message: "Please input your mail!"
                },
                {
                  // eslint-disable-next-line
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Malformed!"
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="OTP"
              name="token"
              rules={[
                {
                  required: true,
                  message: "Please input otp!"
                }
              ]}
            >
              <Input />
            </Form.Item>

            <p style={{ marginBottom: "20px" }}>
              <Link to="/register" className="forgot-password">
                Forgot your password?
              </Link>
            </p>
            <Form.Item>
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
              >
                Continue
              </Button>
            </Form.Item>
            <p style={{ textAlign: "center" }} className="my-2">
              You don't have an account?{" "}
              <Link
                to="/register"
                style={{ color: "crimson", fontWeight: "700" }}
              >
                Register Now
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </>
  )
}
