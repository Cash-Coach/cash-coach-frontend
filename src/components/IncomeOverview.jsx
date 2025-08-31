import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/util";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const IncomeOverview = ({transactions, onAddIncome}) => {
    
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        console.log(result);
        setChartData(result);

        return;
    }, [transactions]);
    
    return (
        <div className="card bg-[#f3f1e3] rounded-lg shadow-slate-400 shadow-sm p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg font-semibold">
                        Income Overview
                    </h5>
                    <p className="text-xs text-gray-400 mt-0 5">
                        Track your earnings over time and analyze your income trends
                    </p>
                </div>
                <button
                    onClick={onAddIncome}
                    className="add-btn bg-emerald-100 border-1 border-emerald-600 text-emerald-600 font-bold p-2 rounded-lg shadow-sm shadow-slate-400 transform transition-transform duration-200 hover:scale-105 hover:cursor-pointer flex items-center gap-1">
                    <Plus size={15} className="text-lg" />
                    Add Income
                </button>
            </div>
            <div className="mt-10">
                <CustomLineChart data={chartData} />
            </div>
        </div>
    )
}

export default IncomeOverview;