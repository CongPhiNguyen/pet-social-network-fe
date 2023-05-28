import React, { useState, useEffect } from "react"
import {
  Avatar,
  Typography,
  Card,
  Divider,
  Tooltip,
  Button,
  Modal,
  message,
  Col,
  Row
} from "antd"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import FollowBtn from "../../../../components/FollowBtn"
import "../scss/Pet.scss"
import moment from "moment"
import { deletePetByIdApi } from "../../../../api/pet"
import BackGround404 from "../../../../assets/images/404.png"
import { getUserInfoApi } from "../../../../api/user"
import PetModalUpdate from "./PetModalUpdate"

function convertTime(timestamp) {
  const date = moment(timestamp)
  return date.format("DD/MM/YYYY")
}

const PetInfoCard = ({ petInfo, updatePet }) => {
  // const [userInfo, setUserInfo] = useState([])
  const navigate = useNavigate()
  const { id } = useParams()
  const currentUser = useSelector((state) => state.auth.user)
  const [isEdit, setIsEdit] = useState(false)
  const [isConfirmDelete, setIsConfirmDelete] = useState(false)
  const [ownerInfo, setOwnerInfo] = useState({})

  const deletePet = async () => {
    const response = await deletePetByIdApi(id)
    const { data } = response
    if (data.success) {
      message.success(`Delete pet ok. Page will refresh in 3 seconds`)
      // Refresh page after countdown ends
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    } else {
      message.error("Error happend!")
    }
  }

  const getOwnerInfo = async () => {
    if (!petInfo.owner) {
      return
    }
    const response = await getUserInfoApi(petInfo.owner)
    const { data, status } = response
    if (status === 200) {
      setOwnerInfo(data.user)
    } else {
      message.error("Can't get owner info")
    }
  }

  useEffect(() => {
    console.log("Ủa adadaad")
    getOwnerInfo()
  }, [petInfo.owner])

  if (!petInfo || Object.keys(petInfo).length === 0) {
    return (
      <div className="info">
        <div style={{ width: "100%", textAlign: "center", marginTop: 40 }}>
          <img src={BackGround404} alt="404 cat" style={{ width: "40%" }} />
          <p>Can't find this pet</p>
          <div style={{ marginTop: 20, marginBottom: 10 }}>
            <Button
              type="primary"
              onClick={() => {
                navigate(-1)
              }}
            >
              Back
            </Button>
          </div>

          <Button
            type="primary"
            onClick={() => {
              navigate("/")
            }}
          >
            Go to main page
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="info">
      <React.Fragment>
        <Card>
          <Row>
            <Col xs={24}>
              <div>
                <img
                  src="https://kienthucbonphuong.com/images/202006/pet-la-gi/pet-la-gi.jpg"
                  alt=""
                  style={{ objectFit: "cover", width: "100%", height: 200 }}
                />
              </div>
            </Col>
            <Col xs={24} md={12} xl={12}>
              <img
                style={{
                  marginTop: -80,
                  marginLeft: 40,
                  border: "6px solid #fff",
                  width: 180,
                  height: 180,
                  objectFit: "cover",
                  borderRadius: "100%"
                }}
                src={petInfo?.image}
                alt=""
              ></img>
              <div style={{ marginLeft: 60, marginTop: 20, marginBottom: 10 }}>
                <Typography.Title level={2}>{petInfo?.name}</Typography.Title>
                <div>
                  {petInfo?.owner === currentUser?._id ? (
                    <>
                      <Button
                        onClick={() => {
                          setIsEdit(true)
                        }}
                      >
                        Edit Pet
                      </Button>
                      <Button
                        style={{ marginLeft: 20 }}
                        danger
                        onClick={() => {
                          setIsConfirmDelete(true)
                        }}
                      >
                        Delete Pet
                      </Button>
                      {/* Model confirm delete */}
                      <Modal
                        title="Confirm modal"
                        open={isConfirmDelete}
                        onOk={() => {
                          setIsConfirmDelete(false)
                          // message.success("ủa alo")
                          deletePet()
                        }}
                        onCancel={() => {
                          setIsConfirmDelete(false)
                        }}
                      >
                        Do you really want to delete this pet?
                      </Modal>
                    </>
                  ) : (
                    false && <FollowBtn user={petInfo} />
                  )}
                </div>
              </div>
              <div style={{ marginLeft: 60 }}>
                <Typography style={{ fontSize: 16 }}>
                  {petInfo?.description + "test reload"}
                </Typography>
                <div style={{ marginTop: 20 }}>
                  {/* <Follower id={id} /> */}
                </div>
              </div>
            </Col>

            {/* Pet info */}
            <Col xs={24} md={12} xl={12}>
              <div className="pet-info-container">
                {/* Owner info */}
                <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 0 }}>
                  Pet owner
                </p>
                <Link
                  to={`/profile/${petInfo.owner}`}
                  style={{ display: "flex" }}
                >
                  <div>
                    <img
                      src={ownerInfo?.avatar}
                      alt={"owner avatar"}
                      style={{
                        width: 36,
                        height: 36,
                        objectFit: "cover",
                        borderRadius: "100%"
                      }}
                    />
                  </div>
                  <p
                    style={{
                      marginTop: 8,
                      fontWeight: 600,
                      marginLeft: 10,
                      marginBottom: 20,
                      color: "#000"
                    }}
                  >
                    {ownerInfo?.fullname}
                  </p>
                </Link>

                <div style={{ display: "flex", fontSize: 16 }}>
                  <p
                    level={5}
                    style={{ margin: "0 10px 0 0", fontWeight: 700 }}
                  >
                    Date of birth:
                  </p>
                  <p style={{ margin: "0" }}>{convertTime(petInfo?.date)}</p>
                </div>
                <div style={{ display: "flex", fontSize: 16 }}>
                  <p
                    level={5}
                    style={{ margin: "0 10px 0 0", fontWeight: 700 }}
                  >
                    Weight:
                  </p>
                  <p style={{ margin: "0" }}>{petInfo?.weight}(kg)</p>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
        <PetModalUpdate
          isEdit={isEdit}
          setIsEditPet={setIsEdit}
          petInfo={petInfo}
          refreshPetInfo={() => {
            console.log("Calling update")
            updatePet()
          }}
        />
        {/* <EditProfile isEdit={isEdit} setIsEdit={setIsEdit} /> */}
      </React.Fragment>
    </div>
  )
}

export default PetInfoCard
