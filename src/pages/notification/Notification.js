import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Row, Col, Card } from "antd"
import { Link } from "react-router-dom"
import Avatar from "../../components/Avatar"
import moment from "moment"
import LeftNavigation from "../../components/navigation/LeftNavigation"

export default function Notification() {
  const dispatch = useDispatch()
  const { auth, notify } = useSelector((state) => state)

  return (
    <div
      style={{
        marginTop: 64,
        width: "100%",
        maxWidth: "1200px",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <div>
        <Row>
          <Col span={8}>
            <LeftNavigation />
          </Col>
          <Col span={16}>
            <div style={{ marginTop: 17, marginRight: 20 }}>
              <Card>
                <div style={{ overflow: "auto" }}>
                  {notify.data.map((msg, index) => (
                    <div key={index} style={{ marginBottom: 20 }}>
                      <Link
                        to={`${msg.url}`}
                        style={{ display: "flex", alignItems: "center" }}
                        onClick={() => {}}
                      >
                        <Avatar
                          src={msg.user.avatar}
                          size="big-avatar"
                          style={{ marginRight: 20 }}
                        />
                        <div style={{ marginLeft: 20 }}>
                          <div style={{ marginRight: 20 }}>
                            <span style={{ fontWeight: 600 }}>
                              {msg.user.username}{" "}
                            </span>
                            <span>{msg.text}</span>
                          </div>
                          {msg.content && (
                            <span>{msg.content.slice(0, 20)}...</span>
                          )}
                        </div>
                        {msg.image && (
                          <div style={{ width: "30px" }}>
                            {msg.image.match(/video/i) ? (
                              <video src={msg.image} width="100%" />
                            ) : (
                              <Avatar src={msg.image} size="medium-avatar" />
                            )}
                          </div>
                        )}
                        <small className="text-muted d-flex justify-content-between px-2">
                          {moment(msg.createdAt).fromNow()}
                        </small>
                        {!msg.isRead && (
                          <i className="fas fa-circle text-primary" />
                        )}
                      </Link>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
