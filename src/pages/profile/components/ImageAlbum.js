import React, { useEffect, useState } from "react"
import Saved from "./Saved"
import Posts from "./Posts"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import LoadIcon from "../../../images/loading.gif"
import { getProfileUsers } from "../../../redux/actions/profileAction"

export default function ImageAlbum({ isLoading }) {
  const { profile, auth } = useSelector((state) => state)
  const dispatch = useDispatch()
  const { id } = useParams()
  const [saveTab, setSaveTab] = useState(false)

  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }))
    }
  }, [id, auth, dispatch, profile.ids])
  if (isLoading)
    <img className="d-block mx-auto" src={LoadIcon} alt="loading" />
  return (
    <div>
      <>
        {saveTab ? (
          <Saved auth={auth} dispatch={dispatch} />
        ) : (
          <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
        )}
      </>
    </div>
  )
}
