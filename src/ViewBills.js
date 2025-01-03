import { useContext } from "react";
import DataContext from "./context/DataContext";
import { Link } from "react-router-dom";

export default function ViewBills() {
  const { bills } = useContext(DataContext);
  return (
    <div className="list-container">
      <h2>Bills List</h2>
      <ul className="item-list">
        {bills.map((bill) => (
          <li key={bill.id} className="list-item">
            <Link to={`/bills/${bill.id}`}>
              <h2>Bill no: {bill.id}</h2>
              <h3>Name: {bill.name}</h3>
              <p>Date: {bill.date}</p>
            </Link>
            <p>Loan amount: {bill.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
