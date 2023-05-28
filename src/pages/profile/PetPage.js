import React, { useEffect, useState } from "react"
import PetInfoCard from "./components/pet/PetInfoCard"
import { getPetByIdApi } from "../../api/pet"
import { useParams } from "react-router-dom"
import { message } from "antd"

export default function PetPage() {
  const { id } = useParams()
  const [petInfo, setPetInfo] = useState({})

  const getPetInfo = async () => {
    const response = await getPetByIdApi(id)
    const { data, status } = response
    if (data.success) {
      setPetInfo(data.petInfo)
    } else {
      message.error("Error when get pet")
    }
  }

  useEffect(() => {
    getPetInfo()
  }, [id])

  const updatePet = () => {
    getPetInfo()
  }

  console.log("petInfo", petInfo)

  return (
    <div>
      <div style={{ marginTop: 60 }}></div>
      <PetInfoCard petInfo={petInfo} updatePet={updatePet} />
    </div>
  )
}
