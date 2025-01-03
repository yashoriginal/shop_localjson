import { useContext } from "react";
import DataContext from "./context/DataContext";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "./api/bills";
import { format } from "date-fns";
export default function EditBills() {
  const [editName, setEditName] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const { bills, setBills } = useContext(DataContext);

  const { id } = useParams();
  const bill = bills.find((bill) => bill.id.toString() === id);

  useEffect(() => {
    if (bill) {
      setEditName(bill.name);
      setEditAmount(bill.amount);
    }
  }, [bill, setEditName, setEditAmount]);

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
      setEditName(null);
      setEditAmount(null);
      console.log(editName, editAmount);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  return (
    <div className="form-container">
      {editName && (
        <>
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
          </form>
        </>
      )}

      {!editName && (
        <>
          <h2>Bill Not Found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to="/bills">Visit to View Bils again</Link>
          </p>
        </>
      )}
    </div>
  );
}
