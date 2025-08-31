import { useEffect, useState } from "react";
import { prepareLineChartData } from "../util/util";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const ExpenseOverview = ({transactions, onAddExpense}) => {
    
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        const result = prepareLineChartData(transactions, "expense");
        console.log(result);
        setChartData(result);

        return;
    }, [transactions]);
    
    return (
        <div className="card bg-[#f3f1e3] rounded-lg shadow-slate-400 shadow-sm p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg font-semibold">
                        Expense Overview
                    </h5>
                    <p className="text-xs text-gray-400 mt-0 5">
                        Track your spendings over time and analyze your expense trends
                    </p>
                </div>
                <button
                    onClick={onAddExpense}
                    className="add-btn bg-fuchsia-100 border-1 border-fuchsia-700 text-fuchsia-700 font-bold p-2 rounded-lg shadow-sm shadow-slate-400 transform transition-transform duration-200 hover:scale-105 hover:cursor-pointer flex items-center gap-1">
                    <Plus size={15} className="text-lg" />
                    Add Expense
                </button>
            </div>
            <div className="mt-10">
                <CustomLineChart data={chartData} />
            </div>
        </div>
    )
}

export default ExpenseOverview;