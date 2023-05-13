import React, { useState, useEffect } from "react"
import { Col, Row, Button, Form, Input, Typography, Radio, message } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getEmailWithIdApi, sendCodeVerifyApi } from "../api/authen"
const { Title } = Typography

export default function Verify() {
  const history = useNavigate()
  const params = useParams()
  const { id } = params
  const [form] = Form.useForm()
  const [disableCode, setDisableCode] = useState(true)
  const [disableSendCode, setDisableSendCode] = useState(false)
  const [count, setCount] = useState(10)
  const [isCounting, setIsCounting] = useState(false)
  const [timer, setTimer] = useState(null)

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

  useEffect(() => {
    if (count === 0) {
      clearInterval(timer)
      setIsCounting(false)
      setDisableSendCode(false)
    }
  }, [count])

  useEffect(() => {
    const getUserWithEmail = async () => {
      const response = await getEmailWithIdApi(id)
      const { data, status } = response

      if (status === 200) {
        form.setFieldValue("email", data.email)
      }
      if (status === 404) {
        message.error("Not found user with this email")
        const timeoutId = setTimeout(() => {
          history("/")
        }, 2000)

        return () => clearTimeout(timeoutId)
      }
    }
    getUserWithEmail()
  }, [])

  const onFinish = (value) => {}

  const sendCodeVerify = async () => {
    const response = await sendCodeVerifyApi(id)
    const { status, data } = response
    if (status === 200) {
      setCount(10)
      setDisableCode(false)
      setDisableSendCode(true)
      setIsCounting(true)
    }
  }
  return (
    <div>
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
            <Title level={2}>Verify email</Title>
            <Form.Item
              label="Email"
              name="email"
              style={{
                width: "100%"
              }}
              rules={[
                {
                  required: true,
                  message: "Please input your name!"
                }
              ]}
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item
              label="Code"
              name="code"
              rules={[
                {
                  required: true,
                  message: "Please input your code!"
                }
              ]}
            >
              <div style={{ display: "flex" }}>
                <Input disabled={disableCode} />
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
            <p style={{ marginTop: -20 }}>Code available in: {count}</p>
            <Form.Item>
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
              >
                Verify email
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  )
}
