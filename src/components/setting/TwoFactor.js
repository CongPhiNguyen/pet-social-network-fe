import React, { useState } from "react"
import { useHistory } from "react-router"

export default function TwoFactor() {
  const [secret, setSecret] = useState({
    otpauth_url: "",
    base32: ""
  })
  const [openModal, setOpenModal] = useState(false)
  const navigate = useHistory()
  // const store = useStore()
  // const user = store.authUser
  const user = {}
  const generateQrCode = async ({ user_id, email }) => {
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
  return (
    <div>
      <section className="bg-ct-blue-600  min-h-screen pt-10">
        <div className="max-w-4xl p-12 mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex gap-20 justify-center items-start">
          <div className="flex-grow-2">
            <h1 className="text-2xl font-semibold">Profile Page</h1>
            <div className="mt-8">
              <p className="mb-4">ID: {user?.id}</p>
              <p className="mb-4">Name: {user?.name}</p>
              <p className="mb-4">Email: {user?.email}</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">
              Mobile App Authentication (2FA)
            </h3>
            <p className="mb-4">
              Secure your account with TOTP two-factor authentication.
            </p>
            {/* {store.authUser?.otp_enabled ? (
              <button
                type="button"
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                onClick={() => disableTwoFactorAuth(user?.id)}
              >
                Disable 2FA
              </button>
            ) : (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                onClick={() =>
                  generateQrCode({ user_id: user?.id, email: user?.email })
                }
              >
                Setup 2FA
              </button>
            )} */}
          </div>
        </div>
      </section>
    </div>
  )
}
