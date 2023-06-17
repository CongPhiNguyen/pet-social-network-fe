import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { fetchBreeds } from "../../api/dogcat"
import { useEffect } from "react"
import { Row, Col, Typography, Spin, Tag } from "antd"

export default function PetWikiPage() {
  const { id, type } = useParams()
  const [loading, setLoading] = useState(true)
  const [currentPet, setCurrentPet] = useState({})
  const getPetInfo = async () => {
    const data = await fetchBreeds()
    console.log(data)
    const findPet = data.find((val) => {
      return String(val.id) === String(id)
    })
    setCurrentPet(findPet)
  }

  useEffect(() => {
    getPetInfo()
  }, [id, type])

  const handleImageLoad = () => {
    setLoading(false)
  }

  return (
    <div style={{ marginTop: 80 }}>
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "auto",
          marginTop: -10,
          padding: "0px 10px"
        }}
      >
        <div>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              {Object.keys(currentPet).length !== 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    // backgroundColor: "#f5f5f5",
                    padding: "20px",
                    borderRadius: "10px"
                  }}
                >
                  <img
                    src={currentPet?.image?.url}
                    alt={currentPet?.name}
                    style={{
                      width: "400px",
                      borderRadius: "10px",
                      display: loading ? "none" : "block"
                    }}
                    onLoad={handleImageLoad}
                  />

                  <Typography.Title
                    level={3}
                    style={{
                      margin: "20px 0 10px 0",
                      textAlign: "center"
                    }}
                  >
                    {currentPet?.name}
                  </Typography.Title>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%"
                    }}
                  >
                    <div
                      style={{
                        flex: "1",
                        textAlign: "center"
                      }}
                    >
                      <p
                        style={{
                          fontWeight: "bold",
                          marginBottom: "5px"
                        }}
                      >
                        Weight
                      </p>
                      <p>{currentPet?.weight?.metric}(kg)</p>
                      <p>{currentPet?.weight?.imperial}(lbs)</p>
                    </div>
                    <div
                      style={{
                        flex: "1",
                        textAlign: "center"
                      }}
                    >
                      <p
                        style={{
                          fontWeight: "bold",
                          marginBottom: "5px"
                        }}
                      >
                        Height
                      </p>
                      <p>{currentPet?.height?.metric}(cm)</p>
                      <p>{currentPet?.height?.imperial}(inches)</p>
                    </div>
                  </div>
                  <div
                    style={{
                      margin: "20px 0",
                      textAlign: "center"
                    }}
                  >
                    <Typography.Text strong>Temperament:&nbsp;</Typography.Text>
                    {currentPet?.temperament?.split(",").map((tag) => (
                      <Tag color="blue" key={tag}>
                        {tag}
                      </Tag>
                    ))}
                  </div>
                  <p
                    style={{
                      margin: "0",
                      textAlign: "center"
                    }}
                  >
                    <Typography.Text strong>Lifespan:&nbsp;</Typography.Text>
                    {currentPet?.life_span}
                  </p>
                </div>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
