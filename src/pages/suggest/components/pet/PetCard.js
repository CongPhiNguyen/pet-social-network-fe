import Typography from "antd/es/typography/Typography"
import React from "react"
import { AiFillDelete } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"

export default function PetCard({
  image,
  name,
  description,
  isShowDelete,
  _id
}) {
  const navigate = useNavigate()
  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      <div
        style={{
          position: "relative",
          width: 80,
          height: 80,
          margin: "auto",
          textAlign: "center",
          marginBottom: 10
        }}
      >
        <img
          src={image}
          style={{
            width: "100%",
            height: "100%",
            marginBottom: 10,
            borderRadius: 10
          }}
          alt={`${name}`}
        />

        {false && (
          <AiFillDelete
            style={{ position: "absolute", top: -10, right: -10 }}
            color="red"
            size={20}
          />
        )}
      </div>
      <Link to={"/profile/pet/" + _id}>
        <Typography style={{ fontWeight: 600 }}>{name}</Typography>
        <p>{description}</p>
      </Link>
    </div>
  )
}
