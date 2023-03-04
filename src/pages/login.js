import React, { useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { login } from "../redux/actions/authAction"
import { useDispatch, useSelector } from "react-redux"
import { Col, Row } from "antd"
import { Button, Form, Input, Typography } from "antd"
import "../styles/login.css"
const { Title } = Typography

const Login = () => {
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()
  const history = useHistory()
  const [form] = Form.useForm()

  useEffect(() => {
    if (auth.token) history.push("/")
  }, [auth.token, history])

  const onFinish = (values) => {
    const { email, password } = values
    dispatch(login({ email, password }))
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
            <Title level={2}>Login to Pet Love</Title>
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
                Login
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

export default Login
