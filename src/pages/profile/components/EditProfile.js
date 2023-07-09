import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { checkImage } from "../../../utils/imageUpload"
import { Form, Input, Radio, Select, Modal, Button, message } from "antd"
import { AiFillCamera } from "react-icons/ai"
import { updateProfileApi, uploadImageApi } from "../../../api/user"
import { GLOBALTYPES } from "../../../redux/actions/globalTypes"
const EditProfile = ({ isEdit, setIsEdit, language }) => {
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
    console.log(value)
    // Validate các value ở đây
    if (value?.fullname?.length <= 6 || value?.fullname?.length >= 200) {
      message.error(
        language === 'en' ?
          "Full name must have more than 6 characters and less than 200 characters" : "Tên phải nhiều hơn 6 ký tự và ít hơn 200 ký tự"
      )
      return
    }
    if (value?.story?.length <= 6 || value?.story?.length >= 200) {
      message.error(
        language === 'en' ?
          "Story must have more than 6 characters and less than 200 characters" : "Tiểu sử phải nhiều hơn 6 ký tự và ít hơn 200 ký tự"
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
        title={language === 'en' ? "Confirm modal" : "Xác nhận"}
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
        style={{ top: 120 }}
      >
        {
          language === 'en' ? "Do you want to discard change ?" : "Bạn có muốn bỏ thay đổi?"
        }

      </Modal>
      <Modal
        title={language === 'en' ? "Change user profile" : "Thay đổi thông tin"}
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
              {
                language === 'en' ? "Close" : "Đóng"
              }
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
                  <p>
                    {
                      language === 'en' ? "Change" : "Thay đổi"
                    }
                  </p>
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
            label={language === 'en' ? "Full name" : "Tên đầy đủ"}
            name="fullname"
            rules={[
              { required: true, message: language === 'en' ? "Please input your Full name!" : "Hãy nhập tên đầy đủ của bạn" }
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
            label={language === 'en' ? "Gender" : "Giới tính"}
            name="gender"
            rules={[{ required: true, message: language === 'en' ? "Please input your gender!" : "Hãy nhập giới tính của bạn!" }]}
            style={{ marginBottom: 10 }}
          >
            <Radio.Group>
              <Radio value={"male"}>{
                language === 'en' ? "Male" : "Nam"
              }</Radio>
              <Radio value={"female"}>

                {
                  language === 'en' ? "Female" : "Nữ"
                }
              </Radio>
              <Radio value={"other"}>

                {
                  language === 'en' ? "Orther" : "Khác"
                }
              </Radio>
            </Radio.Group>
            {/* <Input readOnly /> */}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default EditProfile
