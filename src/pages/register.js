import React, { useEffect } from "react"
import { Col, Row, Button, Form, Input, Typography, Radio, message } from "antd"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { registerApi } from "../api/authen"
import Logo from "../images/logo.png"
import LanguageContext from "../context/LanguageContext"
import { useContext } from "react"
const { Title } = Typography

const Register = () => {
  const { auth } = useSelector((state) => state)
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { language } = useContext(LanguageContext);

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
                {
                  language === 'en' ? "Register to join PetLove" : "Đăng ký để tham gia PetLove"
                }

              </Title>
            </div>

            <Form.Item
              name="fullname"
              style={{
                width: "100%"
              }}
              label={language === 'en' ? "Fullname" : "Tên đẩy đù"}
              rules={[
                {
                  required: true,
                  message: language === 'en' ? "Please input your name!" : "Hãy nhập tên của bạn!"
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
                  message: language === 'en' ? "Please input your name!" : "Hãy nhập username của bạn!"
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              style={{ marginTop: -20, width: "100%" }}
              rules={[
                {
                  required: true,
                  message: language === 'en' ? "Please input your mail!" : "Hãy nhập mail của bạn!"
                },
                {
                  // eslint-disable-next-line
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: language === 'en' ? "Your mail is not invalid" : "Mail không đúng định dạng"
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={language === 'en' ? "Password" : "Mật khẩu"}
              name="password"
              style={{ marginTop: -20 }}
              rules={[
                {
                  required: true,
                  message: language === 'en' ? "Please input your password!" : "Hãy nhập mật khẩu của bạn!"
                },
                {
                  min: 6,
                  message: language === 'en' ? "Password at least 6 characters!" : "Mật khẩu ít nhất 6 ký tự"
                }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label={language === 'en' ? "Confirm Password" : "Nhập lại mật khẩu"}
              name="cf_password"
              style={{ marginTop: -20 }}
              rules={[
                {
                  required: true,
                  message: language === 'en' ? "Please input your confirm password!" : "Nhập lại mật khẩu"
                },
                {
                  min: 6,
                  message: language === 'en' ? "Password at least 6 characters!" : "Mật khẩu ít nhất 6 ký tự!"
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error(
                        language === 'en' ? "The two passwords that you entered do not match!" : "Nhập lại mật khẩu không chính xác!"
                      )
                    )
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item style={{ marginTop: -20 }} name="gender">
              <Radio.Group onChange={() => { }}>
                <Radio value={"male"}>{language === 'en' ? "Male" : "Nam"}</Radio>
                <Radio value={"female"}>{language === 'en' ? "Female" : "Nữ"}</Radio>
                <Radio value={"other"}>{language === 'en' ? "Orther" : "Khác"}</Radio>
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
                {language === 'en' ? "Register" : "Đăng ký"}

              </Button>
            </Form.Item>
            <p style={{ textAlign: "center", marginTop: -12 }}>
              {language === 'en' ? "Có tài khoản rồi?" : "Have an account?"}{" "}
              <Link to="/" style={{ color: "#f39161", fontWeight: "700" }}>
                {language === 'en' ? "Login" : "Đăng nhập"}
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Register
