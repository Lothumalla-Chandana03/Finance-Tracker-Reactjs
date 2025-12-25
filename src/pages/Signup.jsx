import { useState } from "react";
import { apiFetch } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await apiFetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });

      alert("Signup successful, please login");
      navigate("/login");
    } catch (err) {
      if (err.message.includes("exists")) {
        setError("User already exists. Please login.");
      } else {
        setError(err.message);
      }
    }
  };

return (
  <div className="auth-page">
    <div className="auth">
      <h2>Signup</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={submit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button>Signup</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  </div>
);

}
