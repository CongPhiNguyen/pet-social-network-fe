import { useState, useEffect } from "react"
import { Select, Col, Row, List } from "antd"
import { fetchBreeds, searchBreeds } from "../../../api/dogcat"
import Title from "antd/es/typography/Title"
import { Typography, Tag, Spin } from "antd"

const { Option } = Select

export default function Dogs() {
  const [breeds, setBreeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPet, setCurrentPet] = useState({})

  useEffect(() => {
    const getBreeds = async () => {
      const data = await fetchBreeds()
      setBreeds(data)
      setLoading(false)
    }
    getBreeds()
  }, [])

  const handleSearch = async (value) => {
    const data = await searchBreeds(value)
    setBreeds(data)
  }

  const setCurrentSelectPet = (petName) => {
    const currentPet = breeds.find((val) => val.name === petName)
    setCurrentPet(currentPet)
  }

  const handleImageLoad = () => {
    setLoading(false)
  }

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={8} lg={8} xl={6}>
        <div style={{ display: "flex" }}>
          <p
            style={{
              fontWeight: 600,
              marginTop: 2,
              marginRight: 20,
              width: 128
            }}
          >
            Select breed name:
          </p>
          <Select
            showSearch
            placeholder="Search by breed name"
            loading={loading}
            style={{ width: "80%" }}
            onChange={(e) => {
              console.log(e)
              setCurrentSelectPet(e)
            }}
            value={currentPet.name}
            options={breeds.map((breed, index) => {
              return { value: breed.name, label: breed.name }
            })}
          ></Select>
        </div>

        <List
          size="small"
          dataSource={breeds}
          style={{ maxHeight: "300px", overflowY: "auto" }}
          renderItem={(breed) => (
            <List.Item
              onClick={() => {
                setCurrentSelectPet(breed.name)
              }}
              style={{ cursor: "pointer" }}
            >
              <Typography.Text>{breed.name}</Typography.Text>
            </List.Item>
          )}
        />
      </Col>
      <Col xs={24} sm={24} md={16} lg={16} xl={18}>
        {Object.keys(currentPet).length !== 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f5f5f5",
              padding: "20px",
              borderRadius: "10px"
            }}
          >
            {loading ? (
              <Spin size="large" />
            ) : (
              <img
                src={currentPet?.image?.url}
                alt={currentPet?.name}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  display: loading ? "none" : "block"
                }}
                onLoad={handleImageLoad}
              />
            )}
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
  )
}
