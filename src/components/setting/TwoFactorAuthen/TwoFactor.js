import { Button, Typography, Modal } from "antd"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import axios from "axios"
import TwoFactorConfigModal from "./TwoFactorConfigModal"
export default function TwoFactor() {
  const [secret, setSecret] = useState({
    otpauth_url: "",
    base32: ""
  })
  const [isOpenModal, setIsOpenModal] = useState(false)
  const navigate = useHistory()
  // const store = useStore()
  // const user = store.authUser
  const user = useSelector((state) => state.auth.user)
  const generateQrCode = async ({ userId, email }) => {
    const response = await axios.post("api/auth/otp/generate", {
      userId,
      email
    })
    console.log(response)
    setSecret(response.data)
    setIsOpenModal(true)
    // try {
    //   store.setRequestLoading(true);
    //   const response = await authApi.post<{
    //     otpauth_url: string;
    //     base32: string;
    //   }>("/auth/otp/generate", { user_id, email });
    //   store.setRequestLoading(false);
    //   if (response.status === 200) {
    //     setOpenModal(true);
    //     console.log({
    //       base32: response.data.base32,
    //       otpauth_url: response.data.otpauth_url,
    //     });
    //     setSecret({
    //       base32: response.data.base32,
    //       otpauth_url: response.data.otpauth_url,
    //     });
    //   }
    // } catch (error: any) {
    //   store.setRequestLoading(false);
    //   const resMessage =
    //     (error.response &&
    //       error.response.data &&
    //       error.response.data.message) ||
    //     error.response.data.detail ||
    //     error.message ||
    //     error.toString();
    //   toast.error(resMessage, {
    //     position: "top-right",
    //   });
    // }
  }
  const disableTwoFactorAuth = (userId) => {}
  return (
    <div>
      <section className="bg-ct-blue-600  min-h-screen pt-10">
        <div className="max-w-4xl p-12 mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex gap-20 justify-center items-start">
          <div className="flex-grow-2">
            <Typography.Title level={3}>Profile Info</Typography.Title>
            <div>
              <p>
                ID: <i>{user?._id}</i>
              </p>
              <p>
                Name: <i>{user?.fullname}</i>
              </p>
              <p>
                Email: <i>{user?.email}</i>
              </p>
            </div>
          </div>
          <div>
            <Typography.Title level={3}>
              Mobile App Authentication (2FA)
            </Typography.Title>
            <p className="mb-4">
              Secure your account with TOTP two-factor authentication.
            </p>
            {user?.otpEnabled ? (
              <Button onClick={() => disableTwoFactorAuth(user?.id)}>
                Disable 2FA
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() =>
                  generateQrCode({ userId: user?._id, email: user?.email })
                }
              >
                Setup 2FA
              </Button>
            )}
            <Modal
              title="Two-Factor Authentication (2FA)"
              open={isOpenModal}
              onOk={() => {
                setIsOpenModal(false)
              }}
              onCancel={() => {
                setIsOpenModal(false)
              }}
            >
              <TwoFactorConfigModal {...secret} />
            </Modal>
          </div>
        </div>
      </section>
    </div>
  )
}
