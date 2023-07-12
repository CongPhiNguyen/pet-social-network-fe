import {
  Form,
  Modal,
  Input,
  Radio,
  DatePicker,
  Button,
  InputNumber,
  message
} from "antd"
import React, { useState } from "react"
import { AiFillCamera } from "react-icons/ai"
import { checkImage } from "../../../../utils/imageUpload"
import { useSelector } from "react-redux"
import { uploadImageApi } from "../../../../api/user"
import { addPetApi } from "../../../../api/pet"

export default function PetModalAddUpdate({
  isAddPet,
  setIsAddPet,
  updateListPet,
  language
}) {
  const [form] = Form.useForm()
  const userInfo = useSelector((state) => state.auth.user)
  const [avatar, setAvatar] = useState("")
  const [showconfirmDiscard, setShowConfirmDiscard] = useState(false)

  const changeAvatar = (e) => {
    const file = e.target.files[0]
    const err = checkImage(file)
    if (!err) {
      setAvatar(file)
    } else {
      console.log(err)
    }
  }

  const addPet = async (value) => {
    let avatarUrl = avatar
    if (avatarUrl !== "") {
      message.info("Uploading image")
      // Upload avatar
      const formData = new FormData()
      formData.append("file", avatar)
      formData.append("upload_preset", "qqqhcaa3")
      formData.append("cloud_name", "databaseimg")
      const response = await uploadImageApi(formData)
      avatarUrl = response.data.url
      message.success("Upload image success")
    }

    const sendData = {
      ...value,
      image: avatarUrl,
      dateOfBirth: value.dateOfBirth.toDate(),
      owner: userInfo._id
    }

    const response = await addPetApi(sendData)
    const { data, status } = response
    if (status === 200) {
      setIsAddPet(false)
      form.resetFields()
      message.success("Add pet infomation ok!")
      updateListPet()
    } else {
      setAvatar("")
      setIsAddPet(false)
      message.error("Some errors happened. Wait and try again")
    }
  }

  return (
    <div>
      <Modal
        title={language === 'en' ? "Confirm Modal" : "Xác nhận"}
        open={showconfirmDiscard}
        onOk={() => {
          setShowConfirmDiscard(false)
          form.resetFields()
          setIsAddPet(false)
          // setShowConfirmCloseEditModal(false)
        }}
        onCancel={() => {
          setShowConfirmDiscard(false)
          // setShowConfirmCloseEditModal(false)
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
        open={isAddPet}
        title={language === 'en' ? "Adding pet profile" : "Thêm thú cưng"}
        maskClosable={false}
        onOk={() => {
          setAvatar("")
          setIsAddPet(false)
        }}
        onCancel={() => {
          setAvatar("")
          setIsAddPet(false)
          form.resetFields()
        }}
        footer={
          <div>
            <Button onClick={() => setShowConfirmDiscard(true)}>{
              language === 'en' ? "Close" : "Đóng"
            }</Button>
            <Button
              type="primary"
              onClick={() => form.submit()}
            // loading={isSendingEditInfo}
            >
              OK
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          labelCol={{
            span: 6
          }}
          onFinish={(value) => {
            addPet(value)
          }}
        >
          <Form.Item
            label={language === 'en' ? "Choose type:" : "Loại"}
            name="petType"
            rules={[{ required: true, message: language === 'en' ? "Please input your pet type!" : "Hãy chọn loại thú cưng của bạn!" }]}
            style={{ marginBottom: 10 }}
          >
            <Radio.Group>
              <Radio value={"dog"}>
                {
                  language === 'en' ? "Dog" : "Chó"
                }
              </Radio>
              <Radio value={"cat"}>
                {
                  language === 'en' ? "Cat" : "Mèo"
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
          <Form.Item label={language === 'en' ? "Image:" : "Hình ảnh:"}>
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
                textAlign: "left",
                marginLeft: 20,
                marginBottom: 0
              }}
            >
              <img
                src={
                  avatar
                    ? URL.createObjectURL(avatar)
                    : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                }
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
          </Form.Item>

          <Form.Item
            label={language === 'en' ? "Name" : "Tên"}
            name="name"
            style={{ marginBottom: 5 }}
            rules={[
              { required: true, message: language === 'en' ? "Please input your pet's name!" : "Hãy nhập tên thú cưng của bạn!" }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 10 }}
            label={language === 'en' ? "Description" : "Mô tả"}
            name="description"
            rules={[
              {
                required: true,
                message: language === 'en' ? "Please input your pet's description!" : "Hãy nhập mô tả thú cưng của bạn!"
              }
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label={language === 'en' ? "Date of birth" : "Ngày sinh"}
            name="dateOfBirth"
            rules={[{ required: true, message: language === 'en' ? "Please input your pet's DOB" : "Hãy nhập ngày sinh của thú cưng bạn" }]}
            style={{ marginBottom: 0 }}
          >
            <DatePicker
              getPopupContainer={(triggerNode) => {
                return triggerNode.parentNode
              }}
            />
          </Form.Item>
          <Form.Item
            label={language === 'en' ? "Weight" : "Cân nặng"}
            name="weight"
            style={{ marginBottom: 10 }}
            rules={[
              { required: true, message: language === 'en' ? "Please input your pet's weight!" : "Hãy nhập cân nặng của thú cưng bạn!" }
            ]}
          >
            <InputNumber style={{ width: "50%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div >
  )
}
