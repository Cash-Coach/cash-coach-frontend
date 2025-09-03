import { Pencil, Trash2, TrendingDown, TrendingUp, UtensilsCrossed } from "lucide-react";
import { addThousandsSeparator } from "../util/util";

const TransactionCard = ({icon, title, date, amount, type, hideEditBtn, onEdit, hideDeleteBtn, onDelete}) => {
    const getAmountStyles = () => type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-200 text-red-800';
    
    return (
        <div className="group relative flex item-center gap-4 mt-2 p-3 rounded-lg shadow-sm shadow-slate-300 bg-[#f7fffa]">
            <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 shadow-sm shadow-slate-600 rounded-full">
                {icon ? (
                    <img src={icon} alt={title} className="w-6 h-6" />
                ) : (
                    <UtensilsCrossed className="text-emerald-600"/>
                )}
            </div>

            <div className="flex-1 flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-700 font-medium">{title}</p>
                    <p className="text-xs text-gray-400 mt-1">{date}</p>
                </div>

                <div className="flex items-center gap-3">
                    {!hideEditBtn && (
                        <button 
                            onClick={onEdit}
                            className="text-gray-400 hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Pencil size={18}/>
                        </button>
                    )}

                    {!hideDeleteBtn && (
                        <button 
                            onClick={onDelete}
                            className="text-gray-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Trash2 size={18}/>
                        </button>
                    )}

                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                        <h6 className="text-xs font-medium">
                            {type === 'income' ? '+' : '-'} ${addThousandsSeparator(amount)}
                        </h6>
                        {type === 'income' ? (
                            <TrendingUp size={15}/>
                        ) : (
                            <TrendingDown size={15}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionCard; 

