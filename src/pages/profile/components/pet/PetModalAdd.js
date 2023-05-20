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

export default function PetModalAdd({ isAddPet, setIsAddPet }) {
  const [form] = Form.useForm()
  const userInfo = useSelector((state) => state.auth.user)
  const [avatar, setAvatar] = useState("")
  const [showconfirmDiscard, setShowConfirmDiscard] = useState(false)

  const changeAvatar = (e) => {
    const file = e.target.files[0]
    const err = checkImage(file)
    if (!err) setAvatar(file)
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
      console.log(response)
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
    } else {
      setAvatar("")
      setIsAddPet(false)
      message.error("Some errors happened. Wait and try again")
    }

    console.log(sendData)
  }

  return (
    <div>
      <Modal
        title="Confirm Modal"
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
        style={{ top: 20 }}
      >
        Do you want to discard change ?
      </Modal>
      <Modal
        open={isAddPet}
        title="Adding pet profile"
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
            <Button onClick={() => setShowConfirmDiscard(true)}>Close</Button>
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
            label="Choose type:"
            name="petType"
            rules={[{ required: true, message: "Please input your pet type!" }]}
            style={{ marginBottom: 10 }}
          >
            <Radio.Group>
              <Radio value={"dog"}>Dog</Radio>
              <Radio value={"cat"}>Cat</Radio>
              <Radio value={"other"}>Other</Radio>
            </Radio.Group>
            {/* <Input readOnly /> */}
          </Form.Item>
          <Form.Item label="Image">
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
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            style={{ marginBottom: 5 }}
            rules={[
              { required: true, message: "Please input your pet's name!" }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 10 }}
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your pet's description!"
              }
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Date of birth"
            name="dateOfBirth"
            rules={[{ required: true, message: "Please input your pet's DOB" }]}
            style={{ marginBottom: 0 }}
          >
            <DatePicker
              getPopupContainer={(triggerNode) => {
                return triggerNode.parentNode
              }}
            />
          </Form.Item>
          <Form.Item
            label="Weight"
            name="weight"
            style={{ marginBottom: 10 }}
            rules={[
              { required: true, message: "Please input your pet's weight!" }
            ]}
          >
            <InputNumber style={{ width: "50%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
