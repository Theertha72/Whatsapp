import { useEffect, useState } from "react";
import Message from "./Message";
import io from "socket.io-client";
import API from "../services/api";
import "../styles/whatsapp.css";

const socket = io("http://localhost:5000");

export default function ChatWindow({ user, selectedUser, selectedUserName }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user) return;
    socket.emit("join", user.phone);

    socket.on("receiveMessage", msg => {
      if (msg.receiver === user.phone || msg.sender === user.phone) {
        setMessages(prev => [...prev, msg]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [user]);

  useEffect(() => {
    const load = async () => {
      if (!selectedUser || !user) return;
      try {
        const res = await API.get(`/messages/${user.phone}/${selectedUser}`);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [selectedUser, user]);

  const sendMessage = async () => {
    if (!text || !selectedUser) return;

    const msg = {
      sender: user.phone,
      receiver: selectedUser,
      text
    };

    socket.emit("sendMessage", msg);
    try {
      await API.post("/messages", msg);
    } catch (err) {
      console.error("Failed to save message", err);
    }
    setText("");
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div>
          <h3>{selectedUserName || "Select Friend"}</h3>
          <small>Online</small>
        </div>
      </div>

      <div className="chat-body">
        {messages.map((m, i) => (
          <Message key={i} msg={m} me={user.phone} />
        ))}
      </div>

      <div className="chat-input">
        <input
          placeholder="Type a message"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyPress={e => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
}
