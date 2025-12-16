import { useState } from "react";
import API from "../services/api";
import "../styles/whatsapp.css";

export default function Register({ setPage }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await API.post("/auth/register", { name, phone, password });
    alert("Registered Successfully");
    setPage("login");
  };

  return (
    <div className="auth">
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Phone" onChange={e => setPhone(e.target.value)} />
      <input type="password" placeholder="Password"
        onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
    </div>
  );
}
