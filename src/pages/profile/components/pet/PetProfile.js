import React, { useEffect, useState } from "react"
import PetCard from "./PetCard"
import { Button, Row, Col } from "antd"
import { AiOutlinePlusCircle } from "react-icons/ai"
import PetModalAddUpdate from "./PetModalAddUpdate"
import { getPetApiByUserId } from "../../../../api/pet"
import { useSelector } from "react-redux"
import PetModalShowAll from "./PetModalShowAll"
import { useParams } from "react-router-dom"

export default function PetProfile({ userInfo, language }) {
  const { id } = useParams()
  const currentUser = useSelector((state) => state?.auth?.user)
  const [pets, setPets] = useState([])
  const [isAddPet, setIsAddPet] = useState(false)
  const [isShowAllPet, setIsShowAllPet] = useState(false)

  const getPetList = async () => {
    const response = await getPetApiByUserId(id)
    const { data, status } = response
    if (status === 200) {
      setPets(data.listPet)
    }
    console.log(response)
  }

  useEffect(() => {
    getPetList()
    // eslint-disable-next-line
  }, [id])

  const updateListPet = async () => {
    getPetList()
  }

  return (
    <div>
      <Row>
        {pets.length > 0 &&
          pets.slice(0, 2).map((val, index) => (
            <Col xs={12} sm={6} key={index}>
              <div style={{ textAlign: "center" }}>
                <PetCard language={language} {...val} key={index} isShowDelete={true} />
              </div>
            </Col>
          ))}
        {currentUser?._id === id && (
          <Col xs={12} sm={6}>
            <div style={{ textAlign: "center" }}>
              <Button
                style={{ width: 80, height: 80 }}
                icon={<AiOutlinePlusCircle size={30} color="#b3e0dc" />}
                onClick={() => {
                  setIsAddPet(true)
                }}
              />
            </div>
          </Col>
        )}
      </Row>
      {pets.length === 0 && currentUser?._id === id && (
        <p
          style={{
            // textAlign: "center",
            marginTop: 20,
            color: "teal",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          {language === 'en' ? "You have not added any pets yet. Please press the button above to add a pet" : "Bạn chưa thêm thú cưng nào. hãy ấn nút bên trên để thêm thú cưng thôi nào"}

        </p>
      )}

      <PetModalAddUpdate
        isAddPet={isAddPet}
        setIsAddPet={setIsAddPet}
        updateListPet={updateListPet}
        language={language}
      />

      {pets.length > 0 && (
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
      )}
      <PetModalShowAll
        isShowAllPet={isShowAllPet}
        setIsShowAllPet={setIsShowAllPet}
        userInfo={userInfo}
        petList={pets}
      />
    </div>
  )
}
