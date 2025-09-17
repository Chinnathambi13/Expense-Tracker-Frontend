
export default function ExpenseSummary({proexpenses}) {
    const income = proexpenses
    .filter((e) => e.amount > 0)
    .reduce((acc, curr) => acc + curr.amount, 0);

    const expense = proexpenses
    .filter((e) => e.amount < 0)
    .reduce((acc, curr) => acc + curr.amount, 0);

    const balance=income+expense;
    return (
    <div>ExpenseSummary<br/><br/>
      INCOME:  {income} <br/><br/>
      EXPENSES:  {Math.abs(expense)} <br/><br/>
      Balance:  {balance}
    </div>
  )
}