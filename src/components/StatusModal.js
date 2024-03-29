import React, { useState, useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { GLOBALTYPES } from "../redux/actions/globalTypes"
import { createPost, updatePost } from "../redux/actions/postAction"
import Icons from "./Icons"
import { imageShow, videoShow } from "../utils/mediaShow"
import { Button, Modal, Divider, Card, message, Avatar, Row, Col } from "antd"
import { FaLocationArrow } from "react-icons/fa"
import axios from "axios"
import { AiFillDelete } from "react-icons/ai"
import { useContext } from "react"
import LanguageContext from "../context/LanguageContext"

const StatusModal = () => {
  const { auth, theme, status, socket } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [location, setLocation] = useState("")
  const [content, setContent] = useState("")
  const [images, setImages] = useState([])
  const [stream, setStream] = useState(false)
  const videoRef = useRef()
  const refCanvas = useRef()
  const [tracks, setTracks] = useState("")
  const { language } = useContext(LanguageContext);


  const handleChangeImages = (e) => {
    const files = [...e.target.files]
    let err = ""
    let newImages = []

    files.forEach((file) => {
      if (!file) return (err = "File does not exist.")

      if (file.size > 1024 * 1024 * 5) {
        return (err = "The image/video largest is 5mb.")
      }

      return newImages.push(file)
    })


    // if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
    if (err) message.error(err)
    setImages([...images, ...newImages])
  }

  const deleteImages = (index) => {
    const newArr = [...images]
    newArr.splice(index, 1)
    setImages(newArr)
  }

  const handleStream = () => {
    setStream(true)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream
          videoRef.current.play()

          const track = mediaStream.getTracks()
          setTracks(track[0])
        })
        .catch((err) => message.error(err))
    }
  }

  const handleCapture = () => {
    const width = videoRef.current.clientWidth
    const height = videoRef.current.clientHeight

    refCanvas.current.setAttribute("width", width)
    refCanvas.current.setAttribute("height", height)

    const ctx = refCanvas.current.getContext("2d")
    ctx.drawImage(videoRef.current, 0, 0, width, height)
    let URL = refCanvas.current.toDataURL()
    setImages([...images, { camera: URL }])
  }

  const handleStopStream = () => {
    tracks.stop()
    setStream(false)
  }

  const handleSubmit = () => {
    const newContent = content
    if (images.length === 0) return message.warning("Please add your photo.")
    if (status.onEdit) {
      dispatch(
        updatePost({ content: newContent, location, images, auth, status })
      )
    } else {
      dispatch(
        createPost({ content: newContent, location, images, auth, socket })
      )
    }

    setLocation("")
    setContent("")
    setImages([])
    if (tracks) tracks.stop()
    dispatch({ type: GLOBALTYPES.STATUS, payload: false })
  }

  useEffect(() => {
    if (status.onEdit) {
      setContent(status.content)
      setImages(status.images)
      setLocation(status.location)
    }
  }, [status])
  const handleOk = () => {
    handleSubmit()
  }
  const handleCancel = () => {
    setLocation("")
    setContent("")
    setImages([])
    dispatch({ type: GLOBALTYPES.STATUS, payload: false })
  }
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          axios
            .get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            )
            .then((response) => {
              const locationName = response.data.display_name
              setLocation(locationName)
            })
            .catch((error) => {
              message.error(error)
            })
        },
        () => {
          message.error("Turn on allow location!")
        }
      )
    }
  }

  return (
    <Modal
      title={`${status.onEdit ? language === 'en' ? "Edit Post" : "Chỉnh sửa bài viết" : language === 'en' ? "Create Post" : "Tạo bài viết"} `}
      open={status}
      onOk={handleOk}
      footer={[]}
      onCancel={handleCancel}
    >
      <form onSubmit={handleSubmit}>
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center"
          }}
        >
          <Avatar
            style={{
              backgroundColor: "#f56a00",
              verticalAlign: "middle",
              marginRight: "5px"
            }}
            src={
              auth?.user?.avatar ===
                "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
                ? null
                : auth?.user?.avatar
            }
            size="large"
          >
            {auth?.user?.username[0]?.toUpperCase()}
          </Avatar>
          <div
            className="ml-1"
            style={{ transform: "translateY(-2px)", opacity: 0.7 }}
          >
            <span
              style={{ fontSize: "1rem", fontWeight: "700" }}
              className="d-block"
            >
              {auth?.user?.fullname}
            </span>
            <small style={{ opacity: 0.7 }}>{location}</small>
          </div>
        </div>
        <div className="status_body">
          <textarea
            name="content"
            value={content}
            placeholder={`${auth?.user?.username},${language === 'en' ? "what are you thinking?" : "bạn đang nghĩ gì?"}`}
            onChange={(e) => setContent(e.target.value)}
            style={{
              filter: theme ? "invert(1)" : "invert(0)",
              color: theme ? "white" : "#111",
              background: theme ? "rgba(0,0,0,.03)" : ""
            }}
          />
          <Row gutter={[10, 10]}>
            {images.map((img, index) => (
              <Col span={6} key={index}>
                <Card hoverable style={{ width: "100%" }} id="file_img">
                  {img.camera ? (
                    imageShow(img.camera, theme)
                  ) : img.url ? (
                    <>
                      {img.url.match(/video/i)
                        ? videoShow(img.url, theme)
                        : imageShow(img.url, theme)}
                    </>
                  ) : (
                    <>
                      {img.type.match(/video/i)
                        ? videoShow(URL.createObjectURL(img), theme)
                        : imageShow(URL.createObjectURL(img), theme)}
                    </>
                  )}
                  <AiFillDelete
                    className="remove"
                    onClick={() => deleteImages(index)}
                  />
                </Card>
              </Col>
            ))}
          </Row>
          <Divider />
          {stream && (
            <div className="stream position-relative">
              <video
                autoPlay
                muted
                ref={videoRef}
                width="100%"
                height="100%"
                style={{
                  filter: theme ? "invert(1)" : "invert(0)",
                  borderRadius: "8px"
                }}
              />
              <AiFillDelete className="remove" onClick={handleStopStream} />
              <canvas ref={refCanvas} style={{ display: "none" }} />
            </div>
          )}

          <Card style={{ width: "100%", padding: "0" }}>
            <div className="input_images">
              {stream ? (
                <i className="fas fa-camera" onClick={handleCapture} />
              ) : (
                <>
                  <i className="fas fa-camera" onClick={handleStream} />
                  <div className="file_upload">
                    <i className="fas fa-image" />
                    <input
                      type="file"
                      name="file"
                      id="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleChangeImages}
                    />
                  </div>
                  <FaLocationArrow
                    onClick={handleGetLocation}
                    style={{
                      fontSize: "1.3rem",
                      margin: "0 10px 0 5px",
                      cursor: "pointer"
                    }}
                  />

                  <Icons
                    setContent={setContent}
                    content={content}
                    theme={theme}
                  />
                </>
              )}
            </div>
          </Card>
        </div>
        <div className="status_footer">
          <Button
            style={{ marginLeft: "10px", width: "100%", fontWeight: "700" }}
            size="large"
            key="submit"
            type="primary"
            onClick={handleOk}
          >
            {`${status.onEdit ? language === 'en' ? "SAVE" : "LƯU" : language === 'en' ? "POST" : "TẠO"}`}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default StatusModal
