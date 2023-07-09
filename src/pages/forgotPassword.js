import React, { useState, useEffect } from "react"
import { Col, Row, Button, Form, Input, Typography, message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import {
  forgotPasswordApi,
  sendCodeVerifyApi,
  sendEmailWithPatternApi
} from "../api/authen"
import Logo from "../images/logo.png"
import ChangePassword from "./auth/commponent/ChangePassword"
import { useContext } from "react"
import LanguageContext from "../context/LanguageContext"

const { Title } = Typography

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { language } = useContext(LanguageContext);

  const [disableCode, setDisableCode] = useState(true)
  const [disableSendCode, setDisableSendCode] = useState(false)
  const [isCounting, setIsCounting] = useState(false)
  const [count, setCount] = useState(120)
  const [timer, setTimer] = useState(null)
  const [isChangePassword, setIsChangePassword] = useState(false)
  const [pattern, setPattern] = useState("")

  useEffect(() => {
    if (count === 0) {
      setCount(120)
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
          {!isChangePassword && (
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img src={Logo} alt="logo-petlove" width={40}></img>
                <Title level={5} style={{ marginTop: 10 }}>
                  PetLove
                </Title>
              </div>
              <div style={{ textAlign: "center" }}>
                <Title style={{ marginTop: 10, fontSize: 36 }}>
                  {
                    language === 'en' ? "Forgot Password" : "Quên mật khẩu"
                  }
                </Title>
              </div>
              <Form.Item
                label={`Email ${language === 'en' ? "or" : "hoặc"} username`}
                name="pattern"
                style={{
                  width: "100%"
                }}
                rules={[
                  {
                    required: true,
                    message: language === 'en' ? "Please input your email or username!" : "Hãy nhập email hoặc username!"
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
                    {
                      language === 'en' ? "Send code" : "Lấy mã"
                    }

                  </Button>
                </div>
              </Form.Item>
              {isCounting && (
                <p style={{ marginTop: -20 }}>{language === 'en' ? "Code avaiable in" : "Mã có hạn trong"}: {count}</p>
              )}
              <Form.Item
                label={language === 'en' ? "Verify Code" : "Xác thực"}
                name="code"
                rules={[
                  {
                    required: true,
                    message: language === 'en' ? "Please input code!" : "Nhập mã!"
                  }
                ]}
                style={{ marginTop: -20 }}
              >
                <Input />
              </Form.Item>

              <p style={{ marginBottom: "20px", marginTop: -10 }}>
                <Link
                  to="/register"
                  style={{ fontSize: 14, color: "#f39161", fontWeight: 600 }}
                >
                  {
                    language === 'en' ? "Register?" : "Đăng ký?"
                  }
                </Link>
              </p>
              <Form.Item>
                <Button
                  style={{
                    width: "100%",
                    background: "#f39161",
                    borderColor: "#f39161"
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  {
                    language === 'en' ? "Continue" : "Tiếp tục"
                  }

                </Button>
              </Form.Item>
              <p style={{ textAlign: "center" }} className="my-2">
                {language === 'en' ? "You don't have an account?" : "Bạn chưa có tài khoản?"}   {" "}
                <Link
                  to="/register"
                  style={{ color: "#f39161", fontWeight: "700" }}
                >
                  {
                    language === 'en' ? " Register Now " : "Đăng ký ngay"
                  }

                </Link>
              </p>
            </Form>
          )}
          {isChangePassword && <ChangePassword language={language} pattern={pattern} />}
        </Col>
      </Row>
    </>
  )
}
