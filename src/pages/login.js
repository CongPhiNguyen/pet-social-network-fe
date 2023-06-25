import React, { useEffect, useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login, loginGoogleAction } from "../redux/actions/authAction"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { Col, Row, Button, Form, Input, Typography, message } from "antd"
import "../styles/login.css"
import { getUserWithPatternApi } from "../api/user"
import Logo from "../images/logo.png"
import { GOOGLE_CLIENT_ID } from "../constants"
import {
  GoogleOAuthProvider,
  GoogleLogin,
  GoogleLoginButton,
  useGoogleLogin
} from "@react-oauth/google"
import { logInGoogleApi } from "../api/authen"

const { Title } = Typography

const Login = () => {
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [userOTPEnable, setUserOTPEnable] = useState("")
  const GoogleButton = useRef(null)
  useEffect(() => {
    if (auth.token) navigate("/")
  }, [auth.token, navigate])

  const onFinish = async (values) => {
    const { pattern, password, otp } = values
    const response = await getUserWithPatternApi(pattern)
    if (response?.data?.user?.otpEnabled && !values.otp) {
      setUserOTPEnable(true)
      return
    } else setUserOTPEnable(false)
    dispatch(login({ pattern: pattern, password, token: otp }))
  }

  const getUserWithPattern = async (email) => {
    const response = await getUserWithPatternApi(email)
    if (response?.data?.user?.otpEnabled) {
      setUserOTPEnable(true)
    } else setUserOTPEnable(false)
  }

  const loginGoogle = async (value) => {
    if (value?.credential) {
      try {
        const response = await logInGoogleApi(value?.credential)
        const { data, status } = response
        dispatch(
          loginGoogleAction({
            msg: data.msg,
            token: data.access_token,
            refresh_token: data.refresh_token,
            user: data.user
          })
        )
      } catch (error) {
        console.error(error)
        message.error(error?.response?.data?.message || "Unexpected Error")
      }
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
                Login to discover!
              </Title>
            </div>

            <Form.Item
              label={"Email or username"}
              name="pattern"
              style={{
                width: "100%",
                marginTop: 50
              }}
              rules={[
                {
                  required: true,
                  message: "Please input your mail!"
                }
              ]}
            >
              <Input
                style={{ marginTop: -20 }}
                onBlur={(e) => {
                  getUserWithPattern(e.target.value)
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
              style={{ marginTop: -20 }}
            >
              <Input.Password style={{ marginTop: -20 }} />
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

            <p style={{ marginBottom: "20px", marginTop: -20 }}>
              <Link to="/forgot-password" className="forgot-password">
                Forgot your password?
              </Link>
            </p>
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
                Login
              </Button>
            </Form.Item>
            <p style={{ textAlign: "center", marginTop: -20 }} className="my-2">
              You don't have an account?{" "}
              <Link
                to="/register"
                style={{ color: "#f39161", fontWeight: "700" }}
              >
                Register Now
              </Link>
            </p>
            {/* <div
              style={{ textAlign: "center" }}
              onClick={() => {
                console.log(GoogleButton.current)
                // GoogleButton.current.click()
              }}
            >
              <Button>Login with google</Button>
            </div> */}
            {/* <label to="#google-login-phiroud">Login with google</label> */}
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <GoogleOAuthProvider
                clientId={GOOGLE_CLIENT_ID}
                ref={GoogleButton}
              >
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    // console.log(credentialResponse)
                    loginGoogle(credentialResponse)
                  }}
                  onError={() => {
                    console.log("Login Failed")
                  }}
                />
              </GoogleOAuthProvider>
              {/* <Button
                icon={<FaGoogle />}
                onClick={() => {
                  loginGoogle()
                }}
              >
                Sign in with Google
              </Button> */}
            </div>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default Login
