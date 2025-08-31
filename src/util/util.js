export const addThousandsSeparator = (number, separator = ',') => {
    if (number == null || number === '') return '';
    
    let numStr = String(number);
    const isNegative = numStr.startsWith('-');
    if (isNegative) numStr = numStr.slice(1);
    
    const parts = numStr.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1] ? '.' + parts[1] : '';
    
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    
    return (isNegative ? '-' : '') + formattedInteger + decimalPart;
}

export const prepareIncomeLineChartData = (transactions) => {
    // Handle empty or invalid input
    if (!transactions || !Array.isArray(transactions) || transactions.length === 0) {
        return [];
    }

    // Group transactions by date
    const groupedByDate = transactions.reduce((acc, transaction) => {
        const date = transaction.date;
        
        if (!acc[date]) {
            acc[date] = [];
        }
        
        acc[date].push(transaction);
        return acc;
    }, {});

    // Transform grouped data into the desired format
    const result = Object.entries(groupedByDate).map(([date, items]) => {
        // Calculate total amount for this date
        const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
        
        // Format the date for display (e.g., "30th Aug")
        const formatDate = (dateString) => {
            // Parse date string directly without timezone conversion
            const [year, month, day] = dateString.split('-').map(Number);
            
            // Create date object in local timezone
            const dateObj = new Date(year, month - 1, day); // month is 0-indexed
            const dayNum = day; // Use the original day from string
            const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' });
            
            // Add ordinal suffix (st, nd, rd, th)
            const getOrdinalSuffix = (day) => {
                if (day > 3 && day < 21) return 'th';
                switch (day % 10) {
                    case 1: return 'st';
                    case 2: return 'nd';
                    case 3: return 'rd';
                    default: return 'th';
                }
            };
            
            return `${dayNum}${getOrdinalSuffix(dayNum)} ${monthName}`;
        };

        return {
            date: date,
            totalAmount: totalAmount,
            items: items,
            month: formatDate(date)
        };
    });

    // Sort by date (newest first or oldest first - adjust as needed)
    result.sort((a, b) => new Date(a.date) - new Date(b.date));

    return result;
};
