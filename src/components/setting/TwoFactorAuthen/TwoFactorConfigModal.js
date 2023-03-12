import { FC, useEffect, useState } from "react"
import QRCode from "qrcode"
import { Typography, Form, Input, Button, message } from "antd"
import "./TwoFactorConfigModal.scss"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { GLOBALTYPES } from "../../../redux/actions/globalTypes"

export default function TwoFactorConfigModal(props) {
  console.log(props)
  const dispatch = useDispatch()
  const { auth, status, modal, call } = useSelector((state) => state)
  const [qrcodeUrl, setqrCodeUrl] = useState("")
  const [errors, setErrors] = useState("")
  const [form] = Form.useForm()
  const user = useSelector((state) => state.auth.user)
  const verifyOtp = async (token) => {
    try {
      const response = await axios.post("api/auth/otp/verify", {
        token,
        userId: user._id
      })
      message.success("Two-Factor Auth Enabled Successfully")
      props.closeModal()
      const { status, data } = response
      console.log(data)
      if (status === 200) {
        dispatch({
          type: GLOBALTYPES.AUTH,
          payload: { ...auth, user: data.user }
        })
      }
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.detail ||
        error.message ||
        error.toString()
      message.error(resMessage)
    }
  }

  const onSubmitHandler = (values) => {
    // verifyOtp(values.token)
  }

  const onFinish = (values) => {
    console.log(values)
    verifyOtp(values.token)
  }

  useEffect(() => {
    try {
      QRCode.toDataURL(props.otpauth_url).then(setqrCodeUrl)
    } catch (err) {}
  }, [])

  const handleSubmit = () => {}

  return (
    <div>
      <div className="p-6 space-y-4">
        <p className="sub-title">Configuring Google Authenticator or Authy</p>
        <div className="content">
          <li>
            Install Google Authenticator (IOS - Android) or Authy (IOS -
            Android).
          </li>
          <li>In the authenticator app, select "+" icon.</li>
          <li>
            Select "Scan a barcode (or QR code)" and use the phone's camera to
            scan this barcode.
          </li>
        </div>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, marginTop: 20 }}>
            Scan QR Code
          </p>
          <div className="flex justify-center">
            <img
              className="block w-64 h-64 object-contain"
              src={qrcodeUrl}
              alt="qrcode url"
            />
          </div>
        </div>
        <div className="content">
          <p className="sub-title">Or Enter Code Into Your App</p>
          <p className="text-sm">SecretKey: {props?.base32} (Base32 encoded)</p>
        </div>
        <div>
          <p className="sub-title">Verify Code</p>
          <p className="content">
            For changing the setting, please verify the authentication code:
          </p>
        </div>
        <Form onFinish={onFinish} onFinishFailed={() => {}} autoComplete="off">
          <Form.Item
            label="Authentication code"
            name="token"
            rules={[
              {
                required: true,
                message: "Please input your authen code!"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}
