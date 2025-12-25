import "../styles/auth.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../services/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);
      login(data.token);
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

return (
  <div className="auth-page">
    <div className="auth">
      <h2>Login</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  </div>
);

}
