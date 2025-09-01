import { addThousandsSeparator } from "../util/util";
import CustomPieChart from "./CustomPieChart";

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {
    
    const colors = ["#0EA5E9", "#059669", "#A21CAF"];

    const balanceData = [
        {name: "Total Balance", amount: totalBalance},
        {name: "Total Income", amount: totalIncome},
        {name: "Total Expense", amount: totalExpense}
    ]
    
    return (
        <div className="card bg-[#f3f1e3] rounded-lg shadow-slate-400 shadow-sm p-4">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold">Financial Overview</h5>
            </div>

            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalBalance={`$${addThousandsSeparator(totalBalance)}`}
                colors={colors}
                showTextAnchor
            />
        </div>
    )
}

export default FinanceOverview;