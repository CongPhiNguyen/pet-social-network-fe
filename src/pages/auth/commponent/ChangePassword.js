import React from "react"
import { Col, Row, Button, Form, Input, Typography, message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { changePasswordApi } from "../../../api/authen"
import Logo from "../../../images/logo.png"
const { Title } = Typography
export default function ChangePassword({ pattern, language }) {
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
    <div className="changepass-container" style={{ width: "100%" }}>
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
          <Title style={{ marginTop: 10, fontSize: 36 }}>{language === 'en' ? "Change password" : "Cập nhật mật khẩu"}</Title>
        </div>
        <Form.Item
          label={language === 'en' ? "Password" : "Mật khẩu"}
          name="password"
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
          style={{ marginTop: -20 }}
        >
          <Input.Password />
        </Form.Item>
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
          {language === 'en' ? "You don't have an account?" : "Bạn chưa có tài khoản?"}{" "}
          <Link to="/register" style={{ color: "#f39161", fontWeight: "700" }}>
            {
              language === 'en' ? " Register Now " : "Đăng ký ngay"
            }
          </Link>
        </p>
      </Form>
    </div>
  )
}
