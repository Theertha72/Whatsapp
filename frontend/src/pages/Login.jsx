import { useState } from "react";
import API from "../services/api";
import "../styles/whatsapp.css";

export default function Login({ setUser, setPage }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { phone, password });
      setUser(res.data.user);
      setError("");
    } catch (err) {
      setError("Invalid phone or password");
    }
  };

  return (
    <div className="auth">
      <h2>WhatsApp Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Phone number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

      <p onClick={() => setPage("register")} style={{ cursor: "pointer" }}>
        New user? Register
      </p>
    </div>
  );
}
