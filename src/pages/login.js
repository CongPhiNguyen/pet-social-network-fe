import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../redux/actions/authAction"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { Col, Row, Button, Form, Input, Typography } from "antd"
import "../styles/login.css"
import { getUserWithEmailApi } from "../api/user"
const { Title } = Typography

const Login = () => {
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [userOTPEnable, setUserOTPEnable] = useState("")

  useEffect(() => {
    if (auth.token) navigate("/")
  }, [auth.token, navigate])

  const onFinish = async (values) => {
    const { email, password, otp } = values
    const response = await getUserWithEmailApi(email)
    if (response?.data?.user?.otpEnabled && !values.otp) {
      setUserOTPEnable(true)
      return
    } else setUserOTPEnable(false)
    dispatch(login({ email, password, token: otp }))
  }

  const getUserWithEmail = async (email) => {
    const response = await getUserWithEmailApi(email)
    if (response?.data?.user?.otpEnabled) {
      setUserOTPEnable(true)
    } else setUserOTPEnable(false)
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
              <Input
                onBlur={(e) => {
                  getUserWithEmail(e.target.value)
                }}
              />
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
            {userOTPEnable && (
              <Form.Item
                label="OTP"
                name="otp"
                rules={[
                  {
                    required: true,
                    message: "Please input otp!"
                  }
                ]}
              >
                <Input />
              </Form.Item>
            )}

            <p style={{ marginBottom: "20px" }}>
              <Link to="/forgot-password" className="forgot-password">
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
