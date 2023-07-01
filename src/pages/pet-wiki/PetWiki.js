import { Card, Select, Space } from "antd"
import Title from "antd/es/typography/Title"
import React, { useState } from "react"
import Dogs from "./components/Dogs"
import Cats from "./components/Cats"

const { Option } = Select

export default function PetWiki() {
  const [selectedPet, setSelectedPet] = useState("dogs")

  const handleSelectChange = (value) => {
    setSelectedPet(value)
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
        <Card>
          <Title level={2}>Pet wiki</Title>
          <div style={{ display: "flex" }}>
            <p style={{ fontWeight: 600, marginTop: 2, marginRight: 20 }}>
              Select pet type
            </p>
            <Select
              defaultValue="dogs"
              style={{ width: 120 }}
              onChange={handleSelectChange}
            >
              <Option value="dogs">Dogs</Option>
              <Option value="cats">Cats</Option>
            </Select>
          </div>

          <div style={{ marginTop: 10 }}></div>
          {selectedPet === "dogs" && <Dogs />}
          {selectedPet === "cats" && <Cats />}
        </Card>
      </div>
    </div>
  )
}
