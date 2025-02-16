import useAxiosFetch from "../hooks/useAxiosFetch";
import { useState, useEffect, createContext } from "react";
import api from "../api/bills";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [bills, setBills] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/bills"
  );
  useEffect(() => {
    setBills(data);
  }, [data]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filteredBills = bills.filter(
      (bill) =>
        bill.name.toLowerCase().includes(search.toLowerCase()) ||
        bill.amount.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredBills);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/bills/${id}`);
      const billsList = bills.filter((bill) => bill.id !== id);
      setBills(billsList);
      navigate("/bills");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datetime = format(new Date(), "MM-dd-yyyy");
    const id = bills.length + 1;
    const newBill = {
      id: id.toString(),
      name: name,
      amount: amount,
      date: datetime,
    };
    try {
      const response = await api.post("/bills", newBill);
      const allBills = [...bills, response.data];
      setBills(allBills);
      setName("");
      setAmount("");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <DataContext.Provider
      value={{
        bills,
        setBills,
        handleDelete,
        name,
        amount,
        setName,
        setAmount,
        handleSubmit,
        handleSearch,
        searchResults,
        search,
        setSearchResults,
        fetchError,
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
