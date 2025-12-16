import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/whatsapp.css";

export default function Sidebar({ user, onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/auth/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, []);

  const filtered = users.filter(
    u => u.phone !== user.phone && (u.name.toLowerCase().includes(search.toLowerCase()) || u.phone.includes(search))
  );

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>{user.name}</h3>
        <small>Online</small>
      </div>

      <input
        placeholder="Search contacts..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: "90%", margin: "10px 5%", padding: "8px" }}
      />

      <div style={{ overflowY: "auto", height: "calc(100% - 150px)" }}>
        {filtered.map(u => (
          <div
            key={u.phone}
            className="chat-item"
            onClick={() => onSelectUser(u.phone, u.name)}
            style={{ cursor: "pointer" }}
          >
            <strong>{u.name}</strong>
            <p>{u.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
