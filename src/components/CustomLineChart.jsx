import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const CustomLineChart = ({data}) => {
    // Handle undefined or null data
    if (!data || !Array.isArray(data)) {
        return (
            <div className="w-full h-80 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">No data available</p>
            </div>
        );
    }

    // Debug logs to check the data
    console.log("Raw data received:", data);
    console.log("Current date:", new Date());
    console.log("Current month:", new Date().getMonth());
    console.log("Current year:", new Date().getFullYear());

    // Filter data for current month only
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const currentMonthData = data.filter(item => {
        // Parse the date string more reliably
        const [year, month, day] = item.date.split('-').map(Number);
        
        // Create date in local timezone to avoid timezone issues
        const itemDate = new Date(year, month - 1, day); // month is 0-indexed
        
        console.log(`Checking date: ${item.date} -> Month: ${itemDate.getMonth()}, Year: ${itemDate.getFullYear()}`);
        
        return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
    });

    console.log("Filtered current month data:", currentMonthData);

    // Sort data by date in ascending order
    const sortedData = currentMonthData.sort((a, b) => {
        // Parse dates more reliably for sorting
        const [yearA, monthA, dayA] = a.date.split('-').map(Number);
        const [yearB, monthB, dayB] = b.date.split('-').map(Number);
        
        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);
        
        return dateA - dateB;
    });

    // Transform data for recharts format
    const chartData = sortedData.map(item => ({
        date: item.date,
        month: item.month,
        totalAmount: item.totalAmount,
        items: item.items,
        transaction_type: item.transaction_type // Include transaction_type in chart data
    }));

    // Get transaction type from first item (all items should have same type)
    const transactionType = chartData.length > 0 ? chartData[0].transaction_type : 'income';
    const colorway = transactionType === 'income' ? "text-emerald-600" : "text-rose-600";

    // Custom tooltip component
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            
            // Group items by category and sum amounts
            const categoryTotals = data.items.reduce((acc, item) => {
                const category = item.categoryName;
                acc[category] = (acc[category] || 0) + item.amount;
                return acc;
            }, {});

            
            console.log(data);
            return (
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-48">
                    <p className="font-semibold text-gray-800 mb-2">{data.month}</p>
                    <p className={`text-lg font-bold ${colorway} mb-2`}>
                        Total: ${data.totalAmount.toLocaleString()}
                    </p>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-700">Details:</p>
                        {Object.entries(categoryTotals).map(([category, amount]) => (
                            <div key={category} className="flex justify-between text-sm">
                                <span className="text-gray-600">{category}:</span>
                                <span className="font-medium">${amount.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return null;
    };

    // Format Y-axis labels to show dollar amounts
    const formatYAxis = (value) => {
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            return `$${(value / 1000).toFixed(0)}K`;
        }
        return `$${value}`;
    };

    // If no data for current month, show empty state
    if (chartData.length === 0) {
        return (
            <div className="w-full h-80 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">No {transactionType} data for current month</p>
            </div>
        );
    }

    // Dynamic colors based on transaction type
    const strokeColor = transactionType === 'income' ? '#059669' : '#A21CAF';
    const gradientId = transactionType === 'income' ? 'incomeGradient' : 'expenseGradient';
    const gradientColor = transactionType === 'income' ? '#059669' : '#A21CAF';

    return (
        <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 20,
                    }}
                >
                    <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={gradientColor} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={gradientColor} stopOpacity={0.05}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        dy={10}
                    />
                    <YAxis 
                        tickFormatter={formatYAxis}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        width={60}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="totalAmount"
                        stroke={strokeColor}
                        strokeWidth={3}
                        fill={`url(#${gradientId})`}
                        dot={{ fill: strokeColor, strokeWidth: 2, r: 5 }}
                        activeDot={{ r: 7, fill: strokeColor, strokeWidth: 2 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomLineChart;