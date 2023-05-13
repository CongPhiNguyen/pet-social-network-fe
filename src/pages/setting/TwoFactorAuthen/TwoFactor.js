import { Button, Typography, Modal } from "antd"
import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import axios from "axios"
import TwoFactorConfigModal from "./TwoFactorConfigModal"
import { GLOBALTYPES } from "../../../redux/actions/globalTypes"

export default function TwoFactor() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const { auth, status, modal, call } = useSelector((state) => state)
  // const store = useStore()
  // const user = store.authUser
  const [secret, setSecret] = useState({
    otpauth_url: "",
    base32: ""
  })
  const [isOpenModal, setIsOpenModal] = useState(false)

  const generateQrCode = async ({ userId, email }) => {
    const response = await axios.post("api/auth/otp/generate", {
      userId,
      email
    })
    setSecret(response.data)
    setIsOpenModal(true)
  }

  const disableTwoFactorAuth = async (userId) => {
    const response = await axios.post("api/auth/otp/disable", {
      userId: userId
    })
    const { status, data } = response

    if (status === 200) {
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: { ...auth, user: data.updateUser }
      })
    }
  }
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
              <Button onClick={() => disableTwoFactorAuth(user?._id)}>
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
              <TwoFactorConfigModal
                {...secret}
                closeModal={() => {
                  setIsOpenModal(false)
                }}
              />
            </Modal>
          </div>
        </div>
      </section>
    </div>
  )
}
