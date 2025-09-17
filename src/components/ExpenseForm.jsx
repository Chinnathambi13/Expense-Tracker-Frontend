import React, { useEffect, useState } from "react";

export default function ExpenseForm({ addExpense, itemToEdit }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (itemToEdit) {
      setTitle(itemToEdit.title);
      setAmount(itemToEdit.amount.toString());
    } else {
      setTitle("");
      setAmount("");
    }
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    addExpense(title, amount, itemToEdit?._id); // pass id if editing
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title</label>&nbsp;
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <br />
        <label>Amount</label>&nbsp;
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit"> {itemToEdit ? "Update Expense" : "Add Expense"}
        </button>
        {itemToEdit &&(<button>cancel</button>)}
        
      </form>
    </div>
);
}
