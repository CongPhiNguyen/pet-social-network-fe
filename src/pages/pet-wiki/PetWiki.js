import { Card, Select, Space, Tabs, Input } from "antd"
import Title from "antd/es/typography/Title"
import React, { useState } from "react"
import Dogs from "./components/Dogs"
import Cats from "./components/Cats"
import PetList from "./components/PetList"
const { Search } = Input
const { Option } = Select

export default function PetWiki() {
  const [searchPattern, setSearchPattern] = useState()

  const onSearch = (value) => {
    setSearchPattern(value)
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
            <p style={{ width: "100px", marginTop: 4, fontWeight: 600 }}>
              Search pet
            </p>
            <Search
              placeholder="Search by name"
              allowClear
              enterButton="Search"
              onSearch={onSearch}
            />
          </div>

          <Tabs
            items={[
              {
                key: "dogList",
                label: `Dog`,
                children: <PetList type={"dog"} searchPattern={searchPattern} />
              },
              {
                key: "2",
                label: `Cat`,
                children: <PetList type={"cat"} searchPattern={searchPattern} />
              }
            ]}
            // onChange={onChange}
          ></Tabs>

          {/* <div style={{ display: "flex" }}>
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
          {selectedPet === "cats" && <Cats />} */}
        </Card>
      </div>
    </div>
  )
}
