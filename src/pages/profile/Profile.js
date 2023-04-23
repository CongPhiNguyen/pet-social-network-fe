import React, { useEffect, useState } from "react"
import Info from "./components/Info"
import { useSelector, useDispatch } from "react-redux"
import { getProfileUsers } from "../../redux/actions/profileAction"
import { useParams } from "react-router-dom"
import { Card, Col, Row } from "antd"
import Following from "./components/Following"
import ImageAlbum from "./components/ImageAlbum"

const Profile = () => {
  const { profile, auth } = useSelector((state) => state)
  const dispatch = useDispatch()
  const { id } = useParams()
  const [saveTab, setSaveTab] = useState(false)

  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }))
    }
  }, [id, auth, dispatch, profile.ids])

  return (
    <div className="profile" style={{ marginTop: 64 }}>
      <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
      <Row
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "auto",
          marginTop: -10,
          padding: "0px 10px"
        }}
      >
        <Col span={8}>
          {!profile?.loading && (
            <>
              <Card>
                <Following />
              </Card>
              <div style={{ marginLeft: 20 }}>
                <ImageAlbum isLoading={profile?.loading} />
              </div>
            </>
          )}
        </Col>
        <Col span={16}></Col>
      </Row>
    </div>
  )
}

export default Profile
