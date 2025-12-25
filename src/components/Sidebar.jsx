
import "../styles/sidebar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <div className="sidebar">
      <h3>Finance Tracker</h3>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
