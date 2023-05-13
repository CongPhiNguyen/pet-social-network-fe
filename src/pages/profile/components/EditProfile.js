import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { checkImage } from "../../../utils/imageUpload"
import { Form, Input, Radio, Select, Modal, Button, message } from "antd"
import { AiFillCamera } from "react-icons/ai"
import { updateProfileApi, uploadImageApi } from "../../../api/user"
import { GLOBALTYPES } from "../../../redux/actions/globalTypes"
const EditProfile = ({ isEdit, setIsEdit }) => {
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.auth.user)
  const auth = useSelector((state) => state.auth)
  const [form] = Form.useForm()
  const [avatar, setAvatar] = useState("")
  const [showConfirmCloseEditModel, setShowConfirmCloseEditModal] =
    useState(false)
  const [isSendingEditInfo, setIsSendingEditInfo] = useState(false)

  useEffect(() => {
    form.setFieldsValue({ ...userInfo })
  }, [])

  const changeAvatar = (e) => {
    const file = e.target.files[0]
    const err = checkImage(file)
    if (!err) setAvatar(file)
  }

  const editProfile = async (value) => {
    // Validate các value ở đây
    if (value?.fullname?.length <= 6 || value?.fullname?.length >= 200) {
      message.error(
        "Full name must have more than 6 characters and less than 200 characters"
      )
      return
    }
    if (value?.story?.length <= 6 || value?.story?.length >= 200) {
      message.error(
        "Story must have more than 6 characters and less than 200 characters"
      )
      return
    }
    let profileInfo = value
    setIsSendingEditInfo(true)
    if (avatar !== "") {
      // Upload avatar
      const formData = new FormData()
      formData.append("file", avatar)
      formData.append("upload_preset", "qqqhcaa3")
      formData.append("cloud_name", "databaseimg")
      const response = await uploadImageApi(formData)
      let avatarUrl = response.data.url
      profileInfo = {
        ...value,
        avatar: avatarUrl
      }
    }

    const response2 = await updateProfileApi(userInfo._id, profileInfo)
    const { data, status } = response2
    if (status === 200) {
      message.success("Update profile user ok!")
      // Cập nhật redux ở đây
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...data.updateVal
          }
        }
      })
    } else {
      message.error("Đã có lỗi xảy ra")
    }
    setIsEdit(false)
    setIsSendingEditInfo(false)
  }

  return (
    <div>
      <Modal
        title="Confirm modal"
        open={showConfirmCloseEditModel}
        onOk={() => {
          setShowConfirmCloseEditModal(false)
          setIsEdit(false)
        }}
        onCancel={() => {
          setShowConfirmCloseEditModal(false)
        }}
        width={400}
        maskClosable={false}
        style={{ top: 20 }}
      >
        Do you want to discard change ?
      </Modal>
      <Modal
        title="Change user profile"
        open={isEdit}
        maskClosable={false}
        onOk={() => {
          setIsEdit(false)
        }}
        onCancel={() => {
          setIsEdit(false)
        }}
        footer={
          <div>
            <Button onClick={() => setShowConfirmCloseEditModal(true)}>
              Close
            </Button>
            <Button
              type="primary"
              onClick={() => form.submit()}
              loading={isSendingEditInfo}
            >
              OK
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          labelCol={{
            span: 4
          }}
          onFinish={(value) => editProfile(value)}
        >
          {/* Change avatar */}
          <div
            style={{
              width: 150,
              height: 150,
              overflow: "hidden",
              borderRadius: "50%",
              position: "relative",
              margin: "15px auto",
              border: "1px solid #ddd",
              cursor: "pointer",
              textAlign: "center",
              marginBottom: 20
            }}
          >
            <img
              src={avatar ? URL.createObjectURL(avatar) : userInfo.avatar}
              alt="avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div>
              <span
                style={{
                  textAlign: "center",
                  position: "absolute",
                  bottom: -10,
                  left: 50,
                  color: "#fff"
                }}
              >
                <label htmlFor="file_up">
                  <AiFillCamera size={20} color="#fff" />
                  <p>Change</p>
                </label>
                <input
                  style={{ display: "none" }}
                  type="file"
                  name="file"
                  id="file_up"
                  accept="image/*"
                  onChange={changeAvatar}
                />
              </span>
            </div>
          </div>

          <Form.Item
            style={{ marginBottom: 10, marginTop: 30 }}
            label="Email"
            name="email"
          >
            <Input readOnly disabled />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            style={{ marginBottom: 10 }}
          >
            <Input readOnly disabled />
          </Form.Item>
          <Form.Item
            label="Full name"
            name="fullname"
            rules={[
              { required: true, message: "Please input your Full name!" }
            ]}
            style={{ marginBottom: 10 }}
          >
            <Input showCount />
          </Form.Item>
          <Form.Item
            label="Story"
            name="story"
            rules={[{ required: true, message: "Please input your story!" }]}
            style={{ marginBottom: 10 }}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please input your gender!" }]}
            style={{ marginBottom: 10 }}
          >
            <Radio.Group>
              <Radio value={"male"}>Male</Radio>
              <Radio value={"female"}>Female</Radio>
              <Radio value={"other"}>Other</Radio>
            </Radio.Group>
            {/* <Input readOnly /> */}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default EditProfile
