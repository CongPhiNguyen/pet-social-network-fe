import Typography from "antd/es/typography/Typography"
import React from "react"
import { AiFillDelete } from "react-icons/ai"

export default function PetCard({ image, name, description, isShowDelete }) {
  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <img
        src={image}
        style={{ width: 80, height: 80, marginBottom: 10, borderRadius: 10 }}
        alt={`${name}`}
      />
      <Typography style={{ fontWeight: 600 }}>{name}</Typography>
      <p>{description}</p>
      {isShowDelete && (
        <AiFillDelete
          style={{ position: "absolute", top: -10, right: 12 }}
          color="red"
          size={20}
        />
      )}
    </div>
  )
}
