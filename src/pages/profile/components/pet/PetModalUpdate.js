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
import React, { useEffect, useState } from "react"
import { AiFillCamera } from "react-icons/ai"
import { checkImage } from "../../../../utils/imageUpload"
import { useSelector } from "react-redux"
import { uploadImageApi } from "../../../../api/user"
import { addPetApi, getPetByIdApi, updatePetByIdApi } from "../../../../api/pet"
import moment from "moment"

export default function PetModalAddUpdate({
  isEdit,
  setIsEditPet,
  petInfo,
  refreshPetInfo
}) {
  const [form] = Form.useForm()
  const userInfo = useSelector((state) => state.auth.user)
  const [avatar, setAvatar] = useState("")
  const [showconfirmDiscard, setShowConfirmDiscard] = useState(false)

  // load init value
  useEffect(() => {
    form.setFieldValue("name", petInfo?.name)
    form.setFieldValue("description", petInfo?.description)
    form.setFieldValue("weight", petInfo?.weight)
    form.setFieldValue("petType", petInfo?.petType)
    form.setFieldValue("dateOfBirth", moment(new Date(petInfo?.dateOfBirth)))
    try {
      setAvatar(petInfo?.image)
    } catch (err) {
      console.log(err)
    }

    console.log("petInfo?.image", petInfo)
  }, [petInfo])

  const changeAvatar = (e) => {
    const file = e.target.files[0]
    const err = checkImage(file)
    if (!err) setAvatar(file)
  }

  const editPet = async (value) => {
    let avatarUrl = avatar
    if (avatarUrl !== "" && typeof avatarUrl !== "string") {
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

    const response = await updatePetByIdApi(petInfo._id, sendData)
    const { data, status } = response
    if (status === 200) {
      setIsEditPet(false)
      form.resetFields()
      message.success("Edit pet infomation ok!")
      refreshPetInfo()
    } else {
      setAvatar("")
      setIsEditPet(false)
      message.error("Some errors happened. Wait and try again")
    }
  }

  return (
    <div>
      <Modal
        title="Confirm Modal"
        open={showconfirmDiscard}
        onOk={() => {
          setShowConfirmDiscard(false)
          form.resetFields()
          setIsEditPet(false)
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
        Do you want to discard change ?
      </Modal>
      <Modal
        open={isEdit}
        title={"Edit pet profile"}
        maskClosable={false}
        onOk={() => {
          setAvatar("")
          setIsEditPet(false)
        }}
        onCancel={() => {
          setAvatar("")
          setIsEditPet(false)
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
            editPet(value)
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
                    ? typeof avatar === "string"
                      ? avatar
                      : URL.createObjectURL(avatar)
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
