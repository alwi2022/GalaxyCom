import React, { useState } from "react";
import axios from "../config/AxiosInstance";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const { data } = await axios.post("/chat", { message: input });
      const aiMessage = { text: data.response, sender: "bot" };
      console.log(aiMessage);
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Error processing your request.", sender: "bot" },
      ]);
    }

    setInput("");
  };

  return (
    <div className="flex items-center justify-center border border-blue-800">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
      <div className="chat-display h-80 overflow-y-auto space-y-4 p-4 border border-gray-300 rounded-lg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message p-2 rounded-lg max-w-xs ${
              msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-100 text-gray-700"
            }`}
          >
            {msg.sender === "bot" ? (
              <div
                dangerouslySetInnerHTML={{ __html: msg.text }} 
              />
            ) : (
              msg.text 
            )}
          </div>
        ))}
      </div>

      <div className="chat-input flex items-center space-x-2">
  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Ask me anything..."
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
  />
  <button
    onClick={handleSend}
    className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow hover:from-green-500 hover:to-blue-600 transition-all"
  >
    Send
  </button>
</div>

    </div>
  </div>  );
};

export default Chatbot;
