import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const CustomPieChart = ({data, label, totalBalance, colors, showTextAnchor}) => {
    
    // Calculate total for percentage calculations
    const total = data.reduce((sum, item) => sum + Math.abs(item.amount), 0);
    
    // Prepare data with colors and percentages
    const chartData = data.map((item, index) => ({
        ...item,
        color: colors[index % colors.length],
        percentage: total > 0 ? ((Math.abs(item.amount) / total) * 100) : 0
    }));

    return (
        <div className="w-full">
            {/* Chart Container */}
            <div className="relative h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={90}
                            outerRadius={120}
                            dataKey="amount"
                            startAngle={90}
                            endAngle={450}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                
                {/* Center Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
                    <p className="text-2xl font-bold text-gray-800">{totalBalance}</p>
                </div>
            </div>

            {/* Legend */}
            {showTextAnchor && (
                <div className="flex items-center justify-center gap-6">
                    {chartData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-sm text-gray-600 font-medium">
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomPieChart;