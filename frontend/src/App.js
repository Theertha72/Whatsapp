import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");

  if (!user) {
    return page === "login"
      ? <Login setUser={setUser} setPage={setPage} />
      : <Register setPage={setPage} />;
  }

  return <Home user={user} />;
}

export default App;
