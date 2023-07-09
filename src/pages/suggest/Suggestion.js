import React, { useState } from "react"
import { useEffect } from "react"
import { getSuggestionsApi } from "../../api/user"
import { useSelector } from "react-redux"

export default function Suggestion() {
  const [suggestions, setSuggestion] = useState([])
  const { user } = useSelector((state) => state.auth)
  // console.log(user._id)
  const getSuggestion = async () => {
    const response = await getSuggestionsApi(user._id)
    const { data, status } = response
    if (status === 200) {
      const suggestion = data.suggestion
      setSuggestion(suggestion)
    }
  }
  useEffect(() => {
    getSuggestion()
  }, [])

  console.log("suggestions", suggestions)
  return (
    <div style={{ marginTop: 120 }}>
      {suggestions.map((user) => JSON.stringify(user))}
    </div>
  )
}
