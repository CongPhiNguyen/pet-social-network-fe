import React, { useEffect } from "react"
import { Col, Row, Button, Form, Input, Typography, Radio, message } from "antd"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { registerApi } from "../api/authen"
const { Title } = Typography

const Register = () => {
  const { auth } = useSelector((state) => state)
  const navigate = useNavigate()
  const [form] = Form.useForm()

  // Init
  useEffect(() => {
    form.setFieldValue("gender", "male")
  }, [form])

  useEffect(() => {
    if (auth.token) navigate("/")
  }, [auth.token, navigate])

  // const onFinish = (values) => {
  //   const { email, password } = values
  //   dispatch(login({ email, password }))
  // }

  const onFinish = async (values) => {
    try {
      const response = await registerApi(values)
      const { data, status } = response
      console.log(response)
      if (status === 200) {
        message.success(
          "Create account successfully. Verify email and sign in into your account!"
        )
        navigate("/verify/" + data.user._id)
      }
    } catch (err) {
      message.error(err?.response?.data?.msg)
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
          >
            <Title level={2}>Register to Pet Love</Title>
            <Form.Item
              name="fullname"
              style={{
                width: "100%"
              }}
              label='Fullname'
              rules={[
                {
                  required: true,
                  message: "Please input your name!"
                }
              ]}
            >
              <Input placeholder="Fullname" />
            </Form.Item>
            <Form.Item
              label="User Name"
              name="username"
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
              <Input />
            </Form.Item>
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
                  message: "Your mail is not invalid"
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
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    )
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name="gender">
              <Radio.Group onChange={() => { }}>
                <Radio value={"male"}>Male</Radio>
                <Radio value={"female"}>Female</Radio>
                <Radio value={"other"}>Other</Radio>
              </Radio.Group>
            </Form.Item>

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
                Register
              </Button>
            </Form.Item>
            <p style={{ textAlign: "center" }} className="my-2">
              Have an account?{" "}
              <Link to="/" style={{ color: "crimson", fontWeight: "700" }}>
                Login
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Register
