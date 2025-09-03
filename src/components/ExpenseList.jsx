import { Download, LoaderCircle, Mail } from "lucide-react";
import TransactionCard from "./TransactionCard";
import moment from "moment";
import { useState } from "react";

const ExpenseList = ({transactions, onEdit, onDelete, onEmail, onDownload}) => {
    const [loaderOne, setLoaderOne] = useState(false);
    const [loaderTwo, setLoaderTwo] = useState(false);
    const handleEmail = async () => {
        setLoaderOne(true);
        try {
            await onEmail();
        } finally {
            setLoaderOne(false);
        }
    }
    const handleDownload = async () => {
        setLoaderTwo(true);
        try {
            await onDownload();
        } finally {
            setLoaderTwo(false);
        }
    }
    return (
        <div className="card bg-[#f3f1e3] rounded-lg shadow-slate-400 shadow-sm p-4">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold">Expenses</h5>
                <div className="flex flex-col md:flex-row items-end gap-3 mr-7">
                    <button 
                        onClick={handleEmail}
                        disabled={loaderOne}
                        className="flex items-center justify-center shadow-sm shadow-slate-400 bg-[#f7fffa] w-40 h-8 
                            rounded-lg gap-2 transform transition-transform duration-200 hover:bg-emerald-600 
                            hover:text-sky-100  hover:scale-105 group-hover:opacity-100 cursor-pointer">
                        {loaderOne ? (
                            <>
                                <LoaderCircle className="animate-spin w-5 h-5" />
                                Emailing...
                            </>
                        ) : (
                            <>
                                <Mail size={15} className="text-base"/>
                                Email
                            </> 
                        )}
                    </button>
                    <button 
                        onClick={handleDownload}
                        disabled={loaderTwo}
                        className="flex items-center justify-center shadow-sm shadow-slate-400 bg-[#f7fffa] w-40 h-8 
                            rounded-lg gap-2 transform transition-transform duration-200 hover:bg-emerald-600 
                            hover:text-sky-100  hover:scale-105 group-hover:opacity-100 cursor-pointer">
                        {loaderTwo ? (
                            <>
                                <LoaderCircle className="animate-spin w-5 h-5" />
                                Downloading...
                            </>
                        ) : (
                            <>
                                <Download size={15} className="text-base"/> 
                                Download
                            </> 
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                {/* display the expenses */}
                {transactions?.map((expense) => (
                    <TransactionCard 
                        key={expense.id}
                        title={expense.name}
                        icon={expense.icon}
                        date={moment(expense.date).format("Do MMM YYYY")}
                        amount={expense.amount}
                        type="expense"
                        onEdit={() => onEdit(expense)}
                        onDelete={() => onDelete(expense.id)}
                    />
                ))}
            </div>

        </div>
    )
}

export default ExpenseList;