import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import ToggleSwitch from "../components/ToggleSwitch";
import { useDataSource } from "../context/DataSourceContext";
import { apiFetch } from "../services/api";
import "../styles/dashboard.css";

export default function Dashboard() {
  const { useApi } = useDataSource();
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadTransactions();
  }, [useApi]);

  const loadTransactions = () => {
    if (useApi) {
      apiFetch("/api/transactions/all")
        .then(res => setTransactions(res.transactions || []));
    } else {
      setTransactions(JSON.parse(localStorage.getItem("transactions")) || []);
    }
  };

  // ✅ CALCULATIONS
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  const deleteTransaction = (id) => {
    if (useApi) {
      apiFetch(`/api/transactions/delete/${id}`, { method: "DELETE" })
        .then(loadTransactions);
    } else {
      const updated = transactions.filter(t => t.id !== id);
      localStorage.setItem("transactions", JSON.stringify(updated));
      setTransactions(updated);
    }
  };

  return (
    <div className="page">
      <h2>Dashboard</h2>



      {/* 🔹 SUMMARY */}
      <div className="summary-cards">
        <div className="summary-card income">
          Total Income : ₹{totalIncome}
        </div>

        <div className="summary-card expense">
          Total Expense : ₹{totalExpense}
        </div>

        <div className="summary-card balance">
          Balance : ₹{balance}
        </div>
      </div>

      {/* 🔹 TOGGLE */}
      <ToggleSwitch />

      <h3>Recent Transactions</h3>

      {transactions.map(t => (
        <Card
          key={t._id || t.id}
          {...t}
          onEdit={() =>
            navigate("/", { state: { transaction: t } })
          }
          onDelete={() => deleteTransaction(t._id || t.id)}
        />
      ))}
    </div>
  );
}
