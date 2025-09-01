import { Search } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import TransactionCard from "../components/TransactionCard";
import moment from "moment";

const Filter = () => {
    useUser();
    const [type, setType] = useState("income");
    const [prevType, setPrevType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [keyword, setKeyword] = useState("");
    const [sortField, setSortField] = useState("date");
    const [sortOrder, setSortOrder] = useState("asc");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        console.log(type, startDate, endDate, sortField, sortOrder, keyword);
        setLoading(true);
        try {
            const resp = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
                type,
                startDate,
                endDate,
                keyword,
                sortField,
                sortOrder
            });
            setPrevType(type);
            
            console.log('transactions:', resp);
            setTransactions(resp.data);

        } catch(error_ting) {
            console.error('Failed to fetch transactions: ', error_ting);
            toast.error(error_ting.message || "Failed to fetch transactions. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dashboard activeMenu="Filters">
            <div className="my-5 mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Filter Transactions</h2>
                </div>
                <div className="card bg-[#f3f1e3] rounded-lg shadow-slate-400 shadow-sm p-4 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-semibold">Select the filters</h5>
                    </div>
                    <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium mb-1">Type</label>
                            <select 
                                value={type} id="type"
                                onChange={e => setType(e.target.value)}
                                className="w-full h-10 border rounded px-3 bg-white shadow-slate-400 shadow-xs">
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="startdate" className="block text-sm font-medium mb-1">Start Date</label>
                            <input value={startDate} id="startdate" type="date" 
                                    onChange={e => setStartDate(e.target.value)}
                                    className="w-full h-10 border rounded px-3 py-2 bg-white shadow-slate-400 shadow-xs" />
                        </div>
                        <div>
                            <label htmlFor="enddate" className="block text-sm font-medium mb-1">End Date</label>
                            <input value={endDate} id="enddate" type="date" 
                                    onChange={e => setEndDate(e.target.value)}
                                    className="w-full h-10 border rounded px-3 py-2 bg-white shadow-slate-400 shadow-xs" />
                        </div>
                        <div>
                            <label htmlFor="sortfield" className="block text-sm font-medium mb-1">Sort Field</label>
                            <select value={sortField} id="sortfield" 
                                    onChange={e => setSortField(e.target.value)}
                                    className="w-full h-10 border rounded px-3 bg-white shadow-slate-400 shadow-xs">
                                    <option value="date">Date</option>
                                    <option value="amount">Amount</option>
                                    <option value="category">Category</option>    
                            </select>
                        </div>
                        <div>
                            <label htmlFor="sortorder" className="block text-sm font-medium mb-1">Sort Order</label>
                            <select value={sortOrder} id="sortorder" 
                                    onChange={e => setSortOrder(e.target.value)}
                                    className="w-full h-10 border rounded px-3 bg-white shadow-slate-400 shadow-xs">
                                <option value="ascending">Ascending</option>
                                <option value="descending">Descending</option>
                            </select>
                        </div>
                        <div className="sm:col-span-1 md:col-span-1 flex items-end">
                            <div className="w-full">
                                <label htmlFor="keyword" className="block text-sm font-medium mb-1">Search</label>
                                <input value={keyword} id="keyword" type="text" placeholder="Search..." 
                                        onChange={e => setKeyword(e.target.value)}
                                        className="w-full h-10 border rounded px-3  bg-white shadow-slate-400 shadow-xs" />
                            </div>
                            <button 
                                onClick={handleSearch}
                                className="ml-2 p-2 h-10 bg-emerald-600 hover:bg-emerald-600 text-white rounded flex items-center justify-center cursor-pointer">
                                <Search size={20}/>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="card bg-[#f3f1e3] rounded-lg shadow-slate-400 shadow-sm mb-4 p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h5 className="text-lg font-semibold">Transactions</h5>
                    </div>
                    {transactions.length === 0 && !loading ? (
                        <p className="text-gray-500">Select the filters and click apply to filter the transactions</p>
                    ) : ""}
                    {loading ? (
                        <p className="text-gray-500">Loading Transactions...</p>
                    ) : ("")}
                    {transactions.map((transaction) => (
                        <TransactionCard 
                            key={transaction.id}
                            title={transaction.name}
                            icon={transaction.icon}
                            date={moment(transaction.date).format('Do MMM YYYY')}
                            amount={transaction.amount}
                            type={prevType}
                        />
                    ))}
                </div>
            </div>
        </Dashboard>
    )
}

export default Filter;