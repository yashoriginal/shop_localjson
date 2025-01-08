import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import DataContext from "./context/DataContext";
import { format } from "date-fns";
import api from "./api/bills";

export default function EditBills() {
  const { bills, setBills } = useContext(DataContext);
  const { id } = useParams();
  const bill = bills.find((bill) => bill.id.toString() === id);
  const [editName, setEditName] = useState(bill.name);
  const [editAmount, setEditAmount] = useState(bill.amount);

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MM-dd-yyyy");
    const updatedBill = {
      id,
      name: editName,
      amount: editAmount,
      date: datetime,
    };
    try {
      const response = await api.put(`/bills/${id}`, updatedBill);

      setBills(
        bills.map((bill) => (bill.id === id ? { ...response.data } : bill))
      );
      setEditName("");
      setEditAmount("");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  return (
    <div className="form-container">
      {bill && (
        <>
          {" "}
          <h2>Edit Bill</h2>
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="editName">Bill Name:</label>
              <input
                id="editName"
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="editAmount">Bill Amount:</label>
              <input
                id="editAmount"
                type="number"
                required
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
              />
            </div>
            <button
              className="submit-btn"
              type="submit"
              onClick={() => handleEdit(bill.id)}
            >
              Save
            </button>
          </form>{" "}
        </>
      )}
    </div>
  );
}
