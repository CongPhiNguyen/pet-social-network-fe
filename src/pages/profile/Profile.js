import React, { useEffect, useState } from "react"
import Info from "./components/Info"
import Posts from "./components/Posts"
import Saved from "./components/Saved"

import { useSelector, useDispatch } from "react-redux"
import LoadIcon from "../../images/loading.gif"
import { getProfileUsers } from "../../redux/actions/profileAction"
import { useParams } from "react-router-dom"
import { Card, Col, Row } from "antd"
import Following from "./components/Following"

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
          <Card>
            <Following />
          </Card>
          <div style={{ marginLeft: 20 }}>
            {auth?.user?._id === id && (
              <div className="profile_tab">
                <button
                  className={saveTab ? "" : "active"}
                  onClick={() => setSaveTab(false)}
                >
                  Posts
                </button>
                <button
                  className={saveTab ? "active" : ""}
                  onClick={() => setSaveTab(true)}
                >
                  Saved
                </button>
              </div>
            )}
            {profile?.loading ? (
              <img className="d-block mx-auto" src={LoadIcon} alt="loading" />
            ) : (
              <>
                {saveTab ? (
                  <Saved auth={auth} dispatch={dispatch} />
                ) : (
                  <Posts
                    auth={auth}
                    profile={profile}
                    dispatch={dispatch}
                    id={id}
                  />
                )}
              </>
            )}
          </div>
        </Col>
        <Col span={16}></Col>
      </Row>
    </div>
  )
}

export default Profile
