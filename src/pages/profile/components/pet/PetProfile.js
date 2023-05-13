import React, { useEffect, useState } from "react"
import PetCard from "./PetCard"
import { Button } from "antd"
import { AiOutlinePlusCircle } from "react-icons/ai"
import PetModalAdd from "./PetModalAdd"
import { getPetApiByUserId } from "../../../../api/pet"
import { useSelector } from "react-redux"
import PetModalShowAll from "./PetModalShowAll"

export default function PetProfile() {
  const userInfo = useSelector((state) => state.auth.user)
  const [pets, setPets] = useState([])
  const [isAddPet, setIsAddPet] = useState(false)
  const [isShowAllPet, setIsShowAllPet] = useState(false)

  const getPetList = async () => {
    const response = await getPetApiByUserId(userInfo._id)
    const { data, status } = response
    if (status === 200) {
      setPets(data.listPet)
    }
    console.log(response)
  }

  useEffect(() => {
    getPetList()
  }, [userInfo._id])

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
        onClick={() => {
          setIsShowAllPet(true)
        }}
      >
        Xem toàn bộ thú cưng
      </p>
      <PetModalShowAll
        isShowAllPet={isShowAllPet}
        setIsShowAllPet={setIsShowAllPet}
        userInfo={userInfo}
        petList={pets}
      />
    </div>
  )
}
