export default function ExpenseList({ proexpenses, deleteExpenses, editExpenses }) {
  if (!Array.isArray(proexpenses)) {
    return <p>No expenses found</p>;
  }

  return (
    <ul>
      {proexpenses.map((exp) => (
        <li key={exp.id}>
          {exp.title} - {exp.amount}
          <button onClick={() => deleteExpenses(exp._id)}>Delete</button>
          <button onClick={() => editExpenses(exp)}>Edit</button>
        </li>
      ))}
    </ul>
  );
}
