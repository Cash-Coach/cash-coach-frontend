import { ArrowRight } from "lucide-react";
import TransactionCard from "./TransactionCard";
import moment from "moment";

const RecentTransactions = ({transactions, onMore}) => {
    return (
        <div className="card bg-[#f3f1e3] rounded-lg shadow-slate-400 shadow-sm p-4">
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Recent Transactions</h4>
                <button
                    onClick={onMore}
                    className="flex items-center justify-center shadow-sm shadow-slate-400 bg-[#f7fffa] w-40 h-8 
                            rounded-lg gap-2 transform transition-transform duration-200 hover:bg-emerald-600 
                            hover:text-sky-100  hover:scale-105 group-hover:opacity-100 cursor-pointer"
                >
                    More <ArrowRight className="text-base" size={15} />
                </button>
            </div>

            <div className="mt-6">
                {transactions?.slice(0, 5).map(item => (
                    <TransactionCard 
                        key={item.id}
                        title={item.name}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type={item.type}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    )
}

export default RecentTransactions;