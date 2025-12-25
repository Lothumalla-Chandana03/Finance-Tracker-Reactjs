import "../styles/input.css";

export default function InputField({
  description,
  amount,
  category,
  type,
  date,  
  setDate,
  setDescription,
  setAmount,
  setCategory,
  setType,
  onSubmit,
  isEdit
}) {
  return (
    <div className="input-container">
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={onSubmit}>
        {isEdit ? "Update Transaction" : "Add Transaction"}
      </button>
    </div>
  );
}
