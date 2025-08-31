import { useEffect, useState } from "react";
import EmojiTing from "./EmojiTing";
import Input from "./Input";
import { LoaderCircle } from "lucide-react";

const AddExpenseForm = ({onAddExpense, categories}) => {
    const [expense, setExpense] = useState({
        name: '',
        amount: '',
        date: '',
        icon: '',
        categoryId: ''
    })

    const [loading, setLoading] = useState(false);

    const categoryOpts = categories.map(category => ({
        value: category.id,
        label: category.name
    }))

    const handleChange = (key, value) => {
        setExpense({...expense, [key]: value});
    }

    const handleAddExpense = async () => {
        setLoading(true);
        try {
            await onAddExpense(expense);
        } finally {
            setLoading(false);  
        }
    }

    useEffect(() => {
        if (categories.length > 0 && !expense.categoryId) {
            setExpense((prev) => ({...prev, categoryId: categories[0].id}))
        }
    }, [categories, expense.categoryId]);

    return (
        <div>
            <EmojiTing 
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />

            <Input 
                value={expense.name}
                onChange={({target}) => handleChange('name', target.value)}
                label="Expense Source"
                placeholder="e.g. Weekly check, Mid-year bonus, Realized stock gains etc."
                type="text"
            />

            <Input
                label="Category"
                value={expense.categoryId}
                onChange={({target}) => handleChange('categoryId', target.value)}
                isSelect={true}
                categoryTypes={categoryOpts}
            />

            <Input
                value={expense.amount}
                onChange={({target}) => handleChange('amount', target.value)}
                label="Amount"
                placeholder="e.g., 500.00"
                type="number"
            />

            <Input
                value={expense.date}
                onChange={({target}) => handleChange('date', target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="flex justify-center mt-6">
                <button 
                    type="button"
                    onClick={handleAddExpense}
                    disabled={loading}
                    className="bg-emerald-600 px-3 py-2 rounded-lg text-white">
                    {loading ? (
                        <>
                            <LoaderCircle className="animate-spin w-5 h-5" />
                            "Adding Expense..."
                        </>
                    ):(
                        <>
                            Add Expense
                        </>
                    )}
                </button>
            </div>

        </div>
    )
}

export default AddExpenseForm;