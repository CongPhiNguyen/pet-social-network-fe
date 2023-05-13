import React, { useState } from "react"
import PetCard from "./PetCard"
import { Button } from "antd"
import { AiOutlinePlusCircle } from "react-icons/ai"
import PetModalAdd from "./PetModalAdd"

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

  const [isAddPet, setIsAddPet] = useState(false)

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-start", gap: 40 }}>
        {pets.slice(0, 2).map((val, index) => (
          <PetCard {...val} key={index} />
        ))}
        <Button
          style={{ width: 80, height: 80 }}
          icon={<AiOutlinePlusCircle size={30} color="#b3e0dc" />}
          onClick={() => {
            setIsAddPet(true)
          }}
        />
      </div>
      <PetModalAdd isAddPet={isAddPet} setIsAddPet={setIsAddPet} />
      <p
        style={{
          textAlign: "center",
          color: "teal",
          fontWeight: 600,
          cursor: "pointer"
        }}
      >
        Xem toàn bộ thú cưng
      </p>
    </div>
  )
}
