import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";
import axios from "axios";

export default function ExpenseTrack() {
  const [expenses, setExpenses] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  // Fetch expenses
  useEffect(() => {
    axios.get("https://expense-tracker-backend-ri41.onrender.com/api")
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Add or Update
  const addExpense = (title, amount, id) => {
    if (id) {
      // Update
      axios.put(`https://expense-tracker-backend-ri41.onrender.com/api/${id}`, { title, amount: Number(amount) })
        .then((res) => {
          const updatedList = expenses.map((exp) =>
            exp._id === id ? res.data : exp
          );
          setExpenses(updatedList);
          setItemToEdit(null);
        })
        .catch((err) => console.error("Update error:", err));
    } else {
      // Add
      axios.post("https://expense-tracker-backend-ri41.onrender.com/api/", { title, amount: Number(amount) })
        .then((res) => setExpenses([...expenses, res.data]))
        .catch((err) => console.error("Add error:", err));
    }
  };

  // Delete
  const deleteExpense = (id) => {
    axios.delete(`https://expense-tracker-backend-ri41.onrender.com/api/${id}`)
      .then(() => setExpenses(expenses.filter((exp) => exp._id !== id)))
      .catch((err) => console.error("Delete error:", err));
  };

  return (
    <div>
      <h2>Expense Tracker</h2>
      <ExpenseForm addExpense={addExpense} itemToEdit={itemToEdit} />
      <ExpenseList
        proexpenses={expenses}
        deleteExpenses={deleteExpense}
        editExpenses={setItemToEdit}
      />
      <ExpenseSummary proexpenses={expenses} />
    </div>
  );
}
