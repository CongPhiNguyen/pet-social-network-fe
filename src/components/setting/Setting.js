import { Card } from "antd"
import React from "react"
import PageHeader from "../common/PageHeader"
import PageSection from "../common/PageSection"
import "./setting.scss"

export default function Setting() {
  return (
    <div className="page-container">
      <PageHeader title={"Setting"}></PageHeader>
      <PageSection>
        <Card>Nguyễn Công Phi</Card>
      </PageSection>
    </div>
  )
}
