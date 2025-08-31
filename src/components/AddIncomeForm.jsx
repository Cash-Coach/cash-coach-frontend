import { useEffect, useState } from "react";
import EmojiTing from "./EmojiTing";
import Input from "./Input";
import { LoaderCircle } from "lucide-react";

const AddIncomeForm = ({onAddIncome, categories}) => {
    const [income, setIncome] = useState({
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
        setIncome({...income, [key]: value});
    }

    const handleAddIncome = async () => {
        setLoading(true);
        try {
            await onAddIncome(income);
        } finally {
            setLoading(false);  
        }
    }

    useEffect(() => {
        if (categories.length > 0 && !income.categoryId) {
            setIncome((prev) => ({...prev, categoryId: categories[0].id}))
        }
    }, [categories, income.categoryId]);

    return (
        <div>
            <EmojiTing 
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />

            <Input 
                value={income.name}
                onChange={({target}) => handleChange('name', target.value)}
                label="Income Source"
                placeholder="e.g. Weekly check, Mid-year bonus, Realized stock gains etc."
                type="text"
            />

            <Input
                label="Category"
                value={income.categoryId}
                onChange={({target}) => handleChange('categoryId', target.value)}
                isSelect={true}
                categoryTypes={categoryOpts}
            />

            <Input
                value={income.amount}
                onChange={({target}) => handleChange('amount', target.value)}
                label="Amount"
                placeholder="e.g., 500.00"
                type="number"
            />

            <Input
                value={income.date}
                onChange={({target}) => handleChange('date', target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="flex justify-center mt-6">
                <button 
                    type="button"
                    onClick={handleAddIncome}
                    disabled={loading}
                    className="bg-emerald-600 px-3 py-2 rounded-lg text-white">
                    {loading ? (
                        <>
                            <LoaderCircle className="animate-spin w-5 h-5" />
                            "Adding Income..."
                        </>
                    ):(
                        <>
                            Add Income
                        </>
                    )}
                </button>
            </div>

        </div>
    )
}

export default AddIncomeForm;