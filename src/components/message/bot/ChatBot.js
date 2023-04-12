import React, { useState } from "react"
import axios from "axios"
import "./Chat.css"
export default function ChatBot() {
  const [userMessage, setUserMessage] = useState("")
  const [botMessage, setBotMessage] = useState([])

  const handleUserMessageChange = (event) => {
    setUserMessage(event.target.value)
  }

  const handleUserMessageSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post(
        "http://localhost:5000/api/dialogflow-api",
        {
          message: userMessage
        }
      )
      console.log(response)
      // Add the user's message to the chat
      setBotMessage((prevBotMessage) => [
        ...prevBotMessage,
        { text: userMessage, sender: "user" }
      ])

      // Add the bot's response to the chat
      setBotMessage((prevBotMessage) => [
        ...prevBotMessage,
        { text: response.data.message, sender: "bot" }
      ])
      setUserMessage("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="chat">
      {botMessage.map((message, index) => (
        <div
          key={index}
          className={`chat-message ${
            message.sender === "bot" ? "chat-message-bot" : "chat-message-user"
          }`}
        >
          {message.text}
        </div>
      ))}
      <form className="chat-input" onSubmit={handleUserMessageSubmit}>
        <input
          type="text"
          placeholder="Type your message here..."
          value={userMessage}
          onChange={handleUserMessageChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
