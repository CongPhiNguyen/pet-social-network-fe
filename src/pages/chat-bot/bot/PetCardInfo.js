import { Card } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"
import { getCatMongoApi, getDogMongoApi } from "../../../api/dogcat"
import { useState } from "react"
import { useEffect } from "react"

export default function PetCardInfo({ info, name, type, cardType }) {
  console.log(cardType)
  const navigate = useNavigate()
  const [petInfo, setPetInfo] = useState([])
  const getDog = async () => {
    const response = await getDogMongoApi()
    const { data, status } = response
    if (status === 200) {
      const dogInfo = data.dogList.find((val) => val.name === name)
      setPetInfo(dogInfo)
    }
  }
  const getCat = async () => {
    const response = await getCatMongoApi()
    const { data, status } = response
    if (status === 200) {
      console.log(name)
      const catInfo = data.catList.find((val) => val.name === name)
      setPetInfo(catInfo)
      console.log(catInfo)
    }
  }
  useEffect(() => {
    if (cardType === "choose_dog") {
      getDog()
    }
    if (cardType === "choose_cat") {
      getCat()
    }
  }, [])

  if (cardType === "choose_dog" || cardType === "choose_cat") {
    return (
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={petInfo?.image?.url} />}
        onClick={() => {
          navigate(
            `/pet-wiki/${cardType === "choose_dog" ? "dog" : "cat"}/${
              petInfo.id
            }`
          )
        }}
      >
        <Card.Meta
          title={petInfo?.name}
          description={petInfo?.bred_for || petInfo?.alt_names}
        ></Card.Meta>
      </Card>
    )
  }
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
