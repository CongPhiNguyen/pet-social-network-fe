import { Card } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"

export default function PetCardItem({ info, type }) {
  const navigate = useNavigate()

  const renderTextLimit = (text) => {
    if (text.length >= 29) {
      return text.split("").slice(0, 26).join("") + "..."
    } else return text
  }
  if (!info) {
    return (
      <Card
        bodyStyle={{ padding: "4px 14px" }}
        style={{ maxWidth: 200, textAlign: "justify" }}
      >
        <p
          style={{ marginBottom: 0 }}
        >{`Hiện không có thông tin về ${1} trên hệ thống`}</p>
        <p style={{ textAlign: "left" }}>
          Thông tin trên google{" "}
          <a
            href={`https://www.google.com/search?q=${1}`}
            target="_blank"
            rel="noreferrer"
          >
            {}
          </a>
        </p>
      </Card>
    )
  }
  return (
    <div style={{ padding: 20 }}>
      <Card
        hoverable
        style={{ width: "100%" }}
        cover={
          <img
            alt="example"
            src={info?.image?.url}
            width={"100%"}
            height={140}
          />
        }
        onClick={() => {
          navigate(`/pet-wiki/${type}/${info.id}`)
        }}
      >
        <Card.Meta
          title={info?.name}
          description={renderTextLimit(
            info?.bred_for || info?.alt_names || "No description"
          )}
        ></Card.Meta>
      </Card>
      {/* <pre>{JSON.stringify(info, null, 4)}</pre> */}
    </div>
  )
}
