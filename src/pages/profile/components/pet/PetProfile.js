import React, { useState } from "react"
import PetCard from "./PetCard"

export default function PetProfile() {
  const [pets, setPets] = useState([
    {
      img: "https://meonhapkhau.com/wp-content/uploads/2021/10/Gia-cho-Golden-bao-nhieu-mua-cho-golden-o-dau.jpg",
      name: "Donny",
      description: "Dog Golden"
    },
    {
      img: "https://pethouse.com.vn/wp-content/uploads/2022/12/Ngoai-hinh-husky-768x1024-1-600x800.jpg",
      name: "Tommy",
      description: "Husky"
    },
    {
      img: "https://nld.mediacdn.vn/2020/2/29/dui-dog-1582946893091786108496.jpg",
      name: "Dúi",
      description: "Dúi"
    }
  ])
  return (
    <div style={{ display: "flex", justifyContent: "flex-start", gap: 40 }}>
      {pets.map((val, index) => (
        <PetCard {...val} key={index} />
      ))}
    </div>
  )
}
