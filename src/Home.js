import { useContext, useState } from "react";
import DataContext from "./context/DataContext";
import { format, differenceInMonths } from "date-fns";

export default function Home() {
  const { bills } = useContext(DataContext);
  const [billNum, setBillNum] = useState("");
  const [sum, setSum] = useState("");
  const handleCalculate = () => {
    const bill = bills.find((bill) => bill.id == billNum);
    const currentdatetime = format(new Date(), "MM-dd-yyyy");
    const currentdate = format(new Date(), "dd");
    const date = format(bill.date, "dd");
    let monthsdiff = 0;
    if (date > currentdate) {
      monthsdiff = monthsdiff + differenceInMonths(currentdatetime, bill.date);
    } else if (date == currentdate) {
      monthsdiff =
        monthsdiff + differenceInMonths(currentdatetime, bill.date) - 1;
    } else {
      monthsdiff = monthsdiff + differenceInMonths(currentdatetime, bill.date);
    }
    setSum(((monthsdiff * 2) / 100) * bill.amount);
    monthsdiff = 0;
  };
  return (
    <div className="form-container">
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="id">Enter Bill no: </label>
          <input
            type="number"
            id="id"
            required
            placeholder="Bill no"
            value={billNum}
            onChange={(e) => setBillNum(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sum">{sum}</label>
        </div>
        <button
          className="submit-btn"
          type="submit"
          onClick={() => handleCalculate()}
        >
          Calculate
        </button>
      </form>
    </div>
  );
}
