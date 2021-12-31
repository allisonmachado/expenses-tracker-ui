export default function Title({ month, year, expenses }) {

  function sumTotal(expenses) {
    return expenses
      .map(e => e.value)
      .reduce((acc, curr) => acc + curr, 0);
  }

  function sumTotalUnpaid(expenses) {
    return expenses
      .filter(e => !e.payd)
      .map(e => e.value)
      .reduce((acc, curr) => acc + curr, 0);
  }

  return (<>
    <h1>{month} Expenses, {year}</h1>
    <h5>
      Total: {sumTotal(expenses).toFixed(2)}€
      {
        sumTotalUnpaid(expenses) > 0
          ? <>, Unpaid: {sumTotalUnpaid(expenses).toFixed(2)}€</>
          : undefined
      }
    </h5>
  </>);
}
