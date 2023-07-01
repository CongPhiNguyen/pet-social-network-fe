import React, { useEffect } from "react"
import { Col, Row, Button, Form, Input, Typography, Radio, message } from "antd"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { registerApi } from "../api/authen"
import Logo from "../images/logo.png"
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
                Register to join PetLove
              </Title>
            </div>

            <Form.Item
              name="fullname"
              style={{
                width: "100%"
              }}
              label="Fullname"
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
              label="User Name"
              name="username"
              style={{ marginTop: -20, width: "100%" }}
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
              style={{ marginTop: -20, width: "100%" }}
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
              style={{ marginTop: -20 }}
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
              style={{ marginTop: -20 }}
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
            <Form.Item style={{ marginTop: -20 }} name="gender">
              <Radio.Group onChange={() => {}}>
                <Radio value={"male"}>Male</Radio>
                <Radio value={"female"}>Female</Radio>
                <Radio value={"other"}>Other</Radio>
              </Radio.Group>
            </Form.Item>

            {/* <p style={{ marginBottom: "20px", marginTop: -20 }}>
              <Link
                to="/forgot-password"
                className="forgot-password"
                style={{
                  color: "#f39161",
                  cursor: "pointer"
                }}
              >
                Forgot your password?
              </Link>
            </p> */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  background: "#f39161",
                  borderColor: "#f39161"
                }}
              >
                Register
              </Button>
            </Form.Item>
            <p style={{ textAlign: "center", marginTop: -12 }}>
              Have an account?{" "}
              <Link to="/" style={{ color: "#f39161", fontWeight: "700" }}>
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
