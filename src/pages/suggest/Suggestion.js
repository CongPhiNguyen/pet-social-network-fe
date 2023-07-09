import React, { useState } from "react"
import { useEffect } from "react"
import { getSuggestionsApi } from "../../api/user"

export default function Suggestion() {
  const [suggestions, setSuggestion] = useState([])
  const getSuggestion = async () => {
    const response = await getSuggestionsApi()
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
