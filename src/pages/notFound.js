import React from "react"
import BackGround from "../assets/images/404.png"
import { Button, Image, Row } from "antd"
import { useNavigate } from "react-router-dom"
export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div
      style={{
        backgroundImage: "url()"
      }}
    >
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <img src={BackGround} alt="404 cat" style={{ width: "40%" }} />
        <p>
          You do not have permission to access this page or this page does not
          exist
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            alignItems: "center"
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              navigate(-1)
            }}
          >
            Back
          </Button>
          <Button
            type="primary"
            onClick={() => {
              navigate("/")
            }}
          >
            Go to main page
          </Button>
          <Button type="">Report to admin</Button>
        </div>
      </div>
    </div>
  )
}
