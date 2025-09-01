const InfoCard = ({icon, label, value, color}) => {
    return (
        <div className="flex gap-6 bg-[#f3f1e3] p-6 rounded-2xl shadow-sm shadow-slate-400">
            <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
                {icon}
            </div>
            <div>
                <h6 className="text-sm text-gray-500 mb-1">{label}</h6>
                <span className="text-[22px]">&#36;{value}</span>
            </div>
        </div>
    )
}

export default InfoCard;