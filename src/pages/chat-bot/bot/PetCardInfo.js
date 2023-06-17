import { Card } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"

export default function PetCard({ info, type }) {
  const navigate = useNavigate()
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
        <Card.Meta title={info?.name} description={info?.bred_for}></Card.Meta>
      </Card>
      {/* <pre>{JSON.stringify(info, null, 4)}</pre> */}
    </div>
  )
}
