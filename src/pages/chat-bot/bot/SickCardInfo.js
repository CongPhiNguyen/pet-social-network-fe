import { Card } from "antd"
import React from "react"

export default function SickCardInfo({ sickName }) {
  return (
    <div>
      <Card
        bodyStyle={{ padding: "4px 14px" }}
        style={{ maxWidth: 200, textAlign: "justify" }}
      >
        <p style={{ textAlign: "left" }}>
          Thông tin về bệnh {sickName} trên google{" "}
          <a
            href={`https://www.google.com/search?q=bệnh thú cưng ${sickName}`}
            target="_blank"
            rel="noreferrer"
          >
            {sickName}
          </a>
        </p>
      </Card>
    </div>
  )
}
