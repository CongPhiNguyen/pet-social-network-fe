import Typography from "antd/es/typography/Typography"
import React from "react"

export default function PetCard({ img, name, description }) {
  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={img}
        style={{ width: 80, height: 80, marginBottom: 10, borderRadius: 10 }}
      />
      <Typography style={{ fontWeight: 600 }}>{name}</Typography>
      <p>{description}</p>
    </div>
  )
}
