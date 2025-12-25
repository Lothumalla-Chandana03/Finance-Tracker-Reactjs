import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import InputField from "../components/InputField";
import ToggleSwitch from "../components/ToggleSwitch";
import { useDataSource } from "../context/DataSourceContext";
import { apiFetch } from "../services/api";
import "../styles/home.css";

export default function Home() {
  const { useApi } = useDataSource();
  const location = useLocation();
  const editTx = location.state?.transaction;

  const [transactions, setTransactions] = useState([]);

  const [description, setDescription] = useState(editTx?.description || "");
  const [amount, setAmount] = useState(editTx?.amount || "");
  const [category, setCategory] = useState(editTx?.category || "");
  const [type, setType] = useState(editTx?.type || "expense");
  const [date, setDate] = useState(editTx?.date || "");

  const [editId, setEditId] = useState(editTx?._id || editTx?.id || null);

  // Load transactions
  useEffect(() => {
    const loadTransactions = () => {
      if (useApi) {
        apiFetch("/api/transactions/all")
          .then(res => setTransactions(res.transactions || []));
      } else {
        setTransactions(JSON.parse(localStorage.getItem("transactions")) || []);
      }
    };

    loadTransactions();
  }, [useApi]);

  const submitTransaction = () => {
    if (!description || !amount) return;

    const tx = { description, amount, category, type, date };

    if (editId) {
      // UPDATE
      if (useApi) {
        apiFetch(`/api/transactions/update/${editId}`, {
          method: "PUT",
          body: JSON.stringify(tx)
        }).then(() => {
          // reload after update
          if (useApi) {
            apiFetch("/api/transactions/all")
              .then(res => setTransactions(res.transactions || []));
          }
        });
      } else {
        const updated = transactions.map(t =>
          t.id === editId ? { ...t, ...tx } : t
        );
        localStorage.setItem("transactions", JSON.stringify(updated));
        setTransactions(updated);
      }
    } else {
      // ADD
      if (useApi) {
        apiFetch("/api/transactions/add", {
          method: "POST",
          body: JSON.stringify(tx)
        }).then(() => {
          if (useApi) {
            apiFetch("/api/transactions/all")
              .then(res => setTransactions(res.transactions || []));
          }
        });
      } else {
        const newTx = {
          id: Date.now(),
          ...tx,
          date: date || new Date().toISOString().split("T")[0]
        };
        const updated = [...transactions, newTx];
        localStorage.setItem("transactions", JSON.stringify(updated));
        setTransactions(updated);
      }
    }

    // Reset form
    setDescription("");
    setAmount("");
    setCategory("");
    setType("expense");
    setDate("");
    setEditId(null);
  };

  const deleteTransaction = (id) => {
    if (useApi) {
      apiFetch(`/api/transactions/delete/${id}`, { method: "DELETE" })
        .then(() => {
          if (useApi) {
            apiFetch("/api/transactions/all")
              .then(res => setTransactions(res.transactions || []));
          }
        });
    } else {
      const updated = transactions.filter(t => t.id !== id);
      localStorage.setItem("transactions", JSON.stringify(updated));
      setTransactions(updated);
    }
  };

  return (
    <div className="content">
      <h2>{editId ? "Edit Transaction" : "Add Transaction"}</h2>

      <InputField
        description={description}
        amount={amount}
        category={category}
        type={type}
        date={date}
        setDate={setDate}
        setDescription={setDescription}
        setAmount={setAmount}
        setCategory={setCategory}
        setType={setType}
        onSubmit={submitTransaction}
        isEdit={editId}
      />

      <ToggleSwitch />

      {transactions.map(t => (
        <Card
          key={t._id || t.id}
          {...t}
          onEdit={() => {
            setDescription(t.description);
            setAmount(t.amount);
            setCategory(t.category);
            setType(t.type);
            setDate(t.date || "");
            setEditId(t._id || t.id);
          }}
          onDelete={() => deleteTransaction(t._id || t.id)}
        />
      ))}
    </div>
  );
}
