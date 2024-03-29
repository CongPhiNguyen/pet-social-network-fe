import { Button, Typography, Modal, message } from "antd"
import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import TwoFactorConfigModal from "./TwoFactorConfigModal"
import { GLOBALTYPES } from "../../../redux/actions/globalTypes"
import {
  disableTwoFactorAuthApi,
  generateQrCodeApi
} from "../../../api/setting"

export default function TwoFactor() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const { auth } = useSelector((state) => state)
  const [secret, setSecret] = useState({
    otpauth_url: "",
    base32: ""
  })
  const [isOpenModal, setIsOpenModal] = useState(false)

  const generateQrCode = async ({ userId, email }) => {
    try {
      const response = await generateQrCodeApi({ userId, email })
      const { data } = response
      setSecret(data)
      setIsOpenModal(true)
    } catch (err) {
      message.error(err?.response?.data?.message || "Unexpected Error")
    }
  }

  const disableTwoFactorAuth = async (userId) => {
    try {
      const response = await disableTwoFactorAuthApi({ userId })
      const { data } = response
      // setSecret(data)
      // setIsOpenModal(true)
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: { ...auth, user: data.updateUser }
      })
    } catch (err) {
      message.error(err?.response?.data?.message || "Unexpected Error")
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
