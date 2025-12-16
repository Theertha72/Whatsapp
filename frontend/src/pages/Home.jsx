import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import "../styles/whatsapp.css";

export default function Home({ user }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");

  const handleSelectUser = (phone, name) => {
    setSelectedUser(phone);
    setSelectedUserName(name);
  };

  return (
    <div className="app">
      <Sidebar user={user} onSelectUser={handleSelectUser} />
      <ChatWindow user={user} selectedUser={selectedUser} selectedUserName={selectedUserName} />
    </div>
  );
}
