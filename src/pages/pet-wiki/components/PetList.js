import React, { useEffect, useState } from "react"
import {
  fetchBreeds,
  getDogMongoApi,
  getCatMongoApi
} from "../../../api/dogcat"
import PetCardItem from "./PetCardItem"
import { Col, Row } from "antd"
export default function PetList({ type, searchPattern }) {
  const [breeds, setBreeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [listDog, setListDog] = useState([])
  const [listCat, setListCat] = useState([])

  const getListDog = async () => {
    const response = await getDogMongoApi()
    const { data, status } = response
    if (status === 200) {
      setListDog(data?.dogList)
      setBreeds(data?.dogList)
    }
  }

  const getListCat = async () => {
    const response = await getCatMongoApi()
    const { data, status } = response
    if (status === 200) {
      setListCat(data?.catList)
      setBreeds(data?.catList)
    }
  }

  useEffect(() => {
    if (type === "dog") getListDog()
    else if (type === "cat") getListCat()
  }, [type])

  useEffect(() => {
    if (searchPattern !== "") {
      if (type === "dog") {
        setBreeds(
          listDog.filter((val) => {
            try {
              return val.name
                .toLowerCase()
                .includes(searchPattern.toLowerCase())
            } catch (err) {
              return false
            }
          })
        )
      } else if (type === "cat") {
        setBreeds(
          listCat.filter((val) => {
            try {
              return val.name
                .toLowerCase()
                .includes(searchPattern.toLowerCase())
            } catch (err) {
              return false
            }
          })
        )
      }
    } else {
      if (type === "dog") {
        setBreeds(listDog)
      } else if (type === "cat") {
        setBreeds(listCat)
      }
    }
    console.log("Searching")
  }, [searchPattern])

  return (
    <div
      style={{
        height: "calc(100vh - 280px)",
        overflowY: "auto",
        overflowX: "hidden"
      }}
    >
      <p>
        {breeds.length} informations for {type}s
      </p>
      <Row>
        {breeds.map((val) => (
          <Col sm={12} md={8} xl={6}>
            <PetCardItem info={val} type={type} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
