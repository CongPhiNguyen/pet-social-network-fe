import React, { useEffect, useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginGoogleAction } from "../redux/actions/authAction"
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
import { logInGoogleApi, loginApi } from "../api/authen"
import { GLOBALTYPES } from "../redux/actions/globalTypes"
import { setRefreshToken } from "../utils/cookies"
import LanguageContext from "../context/LanguageContext"
import { useContext } from "react"

const { Title } = Typography

const Login = () => {
  const { language } = useContext(LanguageContext);
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
    const sendData = { pattern: pattern, password, token: otp }
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
      const res = await loginApi(sendData)
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user
        }
      })
      localStorage.setItem("firstLogin", true)
      setRefreshToken(res?.data?.refresh_token)
      message.success(res?.data?.msg)
    } catch (err) {
      message.error(err?.response?.data?.msg)
      if (
        err?.response?.data?.msg ===
        "Unverified account. Verify account to login"
      ) {
        navigate(`/verify/${err?.response?.data?.userId}`)
      }
    }
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } })
  }

  const getUserWithPattern = async (email) => {
    const response = await getUserWithPatternApi(email)
    if (response?.data?.user?.otpEnabled) {
      setUserOTPEnable(true)
      message.info(
        "You have set up your otp so you have to input your otp inorder to login"
      )
      // message.info(
      //   "You have set up your otp so you have to input your otp inorder to login"
      // )
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
                {language === 'en' ? "Login to discover!" : "Đăng nhập để khám phá nào!"}
              </Title>
            </div>

            <Form.Item
              label={language === 'en' ? "Email or username" : "Email hoặc username"}
              name="pattern"
              style={{
                width: "100%",
                marginTop: 50
              }}
              rules={[
                {
                  required: true,
                  message: language === 'en' ? "Please input your mail!" : "Hãy nhập mail của bạn!"
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
              label={language === 'en' ? "Password" : "Mật khẩu"}
              name="password"
              rules={[
                {
                  required: true,
                  message: language === 'en' ? "Please input your password!" : "Hãy nhập mật khẩu"
                },
                {
                  min: 6,
                  message: language === 'en' ? "Password at least 6 characters!" : "Mật khẩu tối thiếu 6 ký tự!"
                }
              ]}
              style={{ marginTop: -20 }}
            >
              <Input.Password style={{ marginTop: -20 }} />
            </Form.Item>

            <p style={{ marginBottom: "10px", marginTop: -20 }}>
              <Link
                to="/forgot-password"
                className="forgot-password"
                style={{ color: "#f39161", fontWeight: "700" }}
              >
                {language === 'en' ? "Forgot your password?" : "Tìm lại mật khẩu?"}
              </Link>
            </p>
            {userOTPEnable && (
              <Form.Item
                label="OTP (You have set up your otp so you have to input your otp inorder to login)"
                name="otp"
                rules={[
                  {
                    required: true,
                    message: "Please input otp!"
                  }
                ]}
                style={{ marginTop: 0 }}
              >
                <Input style={{ marginTop: -20 }} />
              </Form.Item>
            )}
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
                {language === 'en' ? "Login" : "Đăng nhập"}
              </Button>
            </Form.Item>
            <p style={{ textAlign: "center", marginTop: -20 }} className="my-2">
              {language === 'en' ? "You don't have an account?" : "Bạn chưa có tài khoản?"}
              <Link
                to="/register"
                style={{ color: "#f39161", fontWeight: "700" }}
              >
                {language === 'en' ? " Register Now" : " Đăng ký ngay nào"}
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
            <div
              style={{
                textAlign: "center",
                marginTop: 20,
                display: "flex",
                justifyContent: "center"
              }}
            >
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
