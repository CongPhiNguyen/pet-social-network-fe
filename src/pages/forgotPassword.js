import React, { useState, useEffect } from "react"
import { Col, Row, Button, Form, Input, Typography, message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import {
  forgotPasswordApi,
  sendCodeVerifyApi,
  sendEmailWithPatternApi
} from "../api/authen"
import ChangePassword from "./auth/commponent/ChangePassword"

const { Title } = Typography

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const [disableCode, setDisableCode] = useState(true)
  const [disableSendCode, setDisableSendCode] = useState(false)
  const [isCounting, setIsCounting] = useState(false)
  const [count, setCount] = useState(10)
  const [timer, setTimer] = useState(null)
  const [isChangePassword, setIsChangePassword] = useState(false)
  const [pattern, setPattern] = useState("")

  useEffect(() => {
    if (count === 0) {
      setCount(10)
      clearInterval(timer)
      setIsCounting(false)
      setDisableSendCode(false)
    }
  }, [count])

  useEffect(() => {
    let timer
    if (isCounting) {
      timer = setInterval(() => {
        setCount((count) => {
          if (count === 0) {
            return count
          }
          return count - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isCounting])

  const onFinish = async (values) => {
    try {
      const response = await forgotPasswordApi(values)
      const { data } = response
      message.success("Verify user and TOTP ok")
      setIsChangePassword(true)
      setPattern(values?.pattern)
      // navigate("/set-password?")
    } catch (err) {
      message.error(err?.response?.data?.message || "Unexpected error")
    }
  }

  const sendCodeVerify = async () => {
    try {
      const pattern = form.getFieldValue("pattern")
      if (!pattern) {
        form.validateFields(["pattern"])
        return
      }
      const response = await sendEmailWithPatternApi(pattern)
      const { status, data } = response
      if (status === 200) {
        setDisableCode(false)
        setDisableSendCode(true)
        setIsCounting(true)
      }
      message.info("Verification code is 123456 😋😊😋", 12)
    } catch (err) {
      message.error(err?.response?.data?.message || "Unexpected error")
    }
  }

  return (
    <>
      <Row style={{ width: "100vw" }}>
        <Col style={{ height: "100vh" }} xs={0} md={12} xl={16}>
          <div className="login-background"></div>
        </Col>
        <Col
          className="login-form-warpper"
          style={{ height: "100vh" }}
          xs={24}
          md={12}
          xl={8}
        >
          {!isChangePassword ? (
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
                label="Email or username"
                name="pattern"
                style={{
                  width: "100%"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input your email or username!"
                  }
                ]}
              >
                <div style={{ display: "flex" }}>
                  <Input />
                  <Button
                    disabled={disableSendCode}
                    onClick={() => {
                      sendCodeVerify()
                    }}
                  >
                    Send code
                  </Button>
                </div>
              </Form.Item>
              {isCounting && (
                <p style={{ marginTop: -20 }}>Code available in: {count}</p>
              )}
              <Form.Item
                label="Verify Code"
                name="code"
                rules={[
                  {
                    required: true,
                    message: "Please input code!"
                  }
                ]}
              >
                <Input />
              </Form.Item>

              <p style={{ marginBottom: "20px" }}>
                <Link to="/register" className="forgot-password">
                  Register?
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
          ) : (
            <ChangePassword pattern={pattern} />
          )}
        </Col>
      </Row>
    </>
  )
}
