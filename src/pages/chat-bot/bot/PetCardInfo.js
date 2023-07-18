import { Card } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"

export default function PetCardInfo({ info, name, type }) {
  const navigate = useNavigate()
  if (!info) {
    return (
      <Card
        bodyStyle={{ padding: "4px 14px" }}
        style={{ maxWidth: 200, textAlign: "justify" }}
      >
        <p
          style={{ marginBottom: 0 }}
        >{`Hiện không có thông tin về ${name} trên hệ thống`}</p>
        <p style={{ textAlign: "left" }}>
          Thông tin trên google{" "}
          <a
            href={`https://www.google.com/search?q=${name}`}
            target="_blank"
            rel="noreferrer"
          >
            {name}
          </a>
        </p>
      </Card>
    )
  } else
    return (
      <div>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={info?.image?.url} />}
          onClick={() => {
            navigate(`/pet-wiki/${type}/${info.id}`)
          }}
        >
          <Card.Meta
            title={info?.name}
            description={info?.bred_for || info?.alt_names}
          ></Card.Meta>
        </Card>
        {/* <pre>{JSON.stringify(info, null, 4)}</pre> */}
      </div>
    )
}
