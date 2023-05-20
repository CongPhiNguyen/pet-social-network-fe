import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { GLOBALTYPES } from "../../redux/actions/globalTypes"
import { Avatar } from "antd"
import { Card } from "antd"
import StatusModal from "../StatusModal"

const Status = () => {
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()

  return (
    <Card className="card-status" style={{ margin: "16px 0" }}>
      <div className="status my-3 d-flex mt-6">
        <Avatar
          style={{
            backgroundColor: "#f56a00",
            verticalAlign: "middle",
            marginRight: "5px"
          }}
          src={
            auth?.user?.avatar ===
            "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
              ? null
              : auth?.user?.avatar
          }
          size="large"
        >
          {auth?.user?.username[0]?.toUpperCase()}
        </Avatar>

        <button
          className="statusBtn flex-fill"
          onClick={() => {
            dispatch({ type: GLOBALTYPES.STATUS, payload: true })
          }}
        >
          {auth.user.fullname}, what are you thinking?
        </button>
      </div>
      <StatusModal />
    </Card>
  )
}

export default Status
