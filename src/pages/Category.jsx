import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import axiosConfig from "../util/axiosConfig";
import toast from "react-hot-toast";
import Model from "../components/Model";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
    useUser();
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModel, setOpenAddCategoryModel] = useState(false);
    const [openEditCategoryModel, setOpenEditCategoryModel] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);


    const fetchCategoryDetails = async () => { // i think sumns wrong herwe
        if (loading) return;
        setLoading(true);
        try {
            const resp = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            if (resp.status === 200) {
                console.log('categories', resp.data);
                setCategoryData(resp.data);
            }
            
        } catch(error_ting) {
            console.error('sumn wrong, try again', error_ting);
            toast.error(error_ting.message);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchCategoryDetails();
    }, []);

    const handleAddCategory = async (category) => {
        const {name, type, icon} = category;

        if (!name.trim()) {
            toast.error("Please provide the name for your category");
            return;
        }

        //check if category already exists
        const categoryAlreadyExists = categoryData.some((category) => {
            return category.name.toLowerCase() === name.trim().toLowerCase();
        })

        if (categoryAlreadyExists) {
            toast.error(`The '${name}' category already exists.`);
            return;
        }

        try {
            const resp = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {name, type, icon});
            console.log(resp.status);
            if (resp.status === 201) {
                toast.success(`'${name}' category added successfully!`);
                setOpenAddCategoryModel(false);
                fetchCategoryDetails();
            }
            //console.log(axiosConfig);
        } catch (error_ting) {
            console.error('Error adding category', error_ting);
            toast.error(error_ting.response?.data?.message || "failed to add category");
        }
    }

    const handleEditCategory = (categoryToEdit) => {
        setSelectedCategory(categoryToEdit);
        setOpenEditCategoryModel(true);
    }

    const handleUpdateCategory = async (updatedCategory) => {
        const {id, name, type, icon} = updatedCategory;
        if (!name.trim()) {
            toast.error("Category name is required");
            return;
        }

        if (!id) {
            toast.error("Category ID is missing for update");
            return;
        }

        try {
            await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {name, type, icon});
            setOpenEditCategoryModel(false);
            setSelectedCategory(null);
            toast.success(`'${name}' category updated successfully`);
            fetchCategoryDetails();
        } catch (error_ting) {
            console.error("Error updating 'name' category: ", error_ting.response?.data?.message || error_ting.message);
            toast.error(("Bitch: " + error_ting.response?.data?.message) || `Unable to update the '${name}' category`);
        }
    }

    return (
        <Dashboard activeMenu="Category">
            <div className="my-5 mx-auto">
                {/* Add button to add category*/}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold">All Categories</h2>
                    <button 
                        onClick={() => setOpenAddCategoryModel(true)}
                        className="add-btn bg-emerald-100 border-1 border-emerald-600 text-emerald-600 font-bold p-2 rounded-lg shadow-sm shadow-slate-400 transform transition-transform duration-200 hover:scale-105 hover:cursor-pointer flex items-center gap-1">
                        <Plus size={15} />
                        Add Category
                    </button>
                </div>

                {/* Category list */}
                <CategoryList categories={categoryData} onEditCategory={handleEditCategory}/>

                {/* Adding category model*/}
                <Model
                    isOpen={openAddCategoryModel}
                    onClose={() => setOpenAddCategoryModel(false)}
                    title="Add Category" 
                >
                    <AddCategoryForm onAddCategory={handleAddCategory}/>
                </Model>

                {/* Updating category model*/}
                <Model
                    isOpen={openEditCategoryModel}
                    onClose={() => {
                        setOpenEditCategoryModel(false)
                        setSelectedCategory(null)
                    }}
                    title="Update Category"
                >
                    <AddCategoryForm 
                        onAddCategory={handleUpdateCategory}
                        initialCategoryData={selectedCategory}
                        isEditing={true}
                    />
                </Model>

            </div>
        </Dashboard>
    )
}

export default Category;