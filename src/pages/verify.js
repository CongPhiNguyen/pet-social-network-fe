import React from "react"
import { useParams } from "react-router-dom"

export default function Verify() {
  const param = useParams
  console.log(param)
  return <div>verify</div>
}
