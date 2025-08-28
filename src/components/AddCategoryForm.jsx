import { useEffect, useState } from "react";
import Input from "./Input.jsx"
import EmojiTing from "./EmojiTing.jsx";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({onAddCategory, initialCategoryData, isEditing}) => {

    const [category, setCategory] = useState({
        name: "",
        type: "income",
        icon: ""
    });

    const [loading, setLoading] = useState(false);

    const categoryTypes = [
        {value: "income", label: "Income"},
        {value: "expense", label: "Expense"},
    ]

    const handleChange = (key, value) => {
        setCategory({...category, [key]: value})
    }

    useEffect(() => {
        if (isEditing && initialCategoryData) {
            setCategory(initialCategoryData);
        } else {
            setCategory({name: "", type: "income", icon: ""})
        }
    }, [isEditing, initialCategoryData]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await onAddCategory(category);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-4">

            <EmojiTing 
                icon={category.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon) }
            />

            <Input 
                value={category.name}
                onChange={({target}) => handleChange("name", target.value)}
                label="Category Name"
                placeholder="e.g., Rent, Groceries, Salary, Bonus, etc."
                type="text"
            />

            <Input 
                value={category.type}
                onChange={({target}) => handleChange("type", target.value)}
                label="Category Type"
                isSelect={true}
                categoryTypes={categoryTypes}
            />

            <div className="flex justify-center mt-6">
                <button 
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-emerald-600 px-3 py-2 rounded-lg text-white">
                    {loading ? (
                        <>
                            <LoaderCircle className="animate-spin w-5 h-5" />
                            {isEditing ? "Updating..." : "Adding..."}
                        </>
                    ):(
                        <>
                            {isEditing ? "Update Category" : "Add Category"}
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default AddCategoryForm;