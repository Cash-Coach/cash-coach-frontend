import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import ExpenseOverview from "../components/ExpenseOverview";
import ExpenseList from "../components/ExpenseList";
import Model from "../components/Model";
import DeleteAlert from "../components/DeleteAlert";
import AddExpenseForm from "../components/AddExpenseForm";

const Expense = () => {
    useUser();
    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);
    const [openUpdateExpenseModel, setOpenUpdateExpenseModel] = useState({
        show: false,
        data: null
    });
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    // fetch expense details
    const fetchExpenseDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const resp = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
            if (resp.status === 200) {
                setExpenseData(resp.data);
            }
        } catch (error_ting) {
            console.error("You got finessed ma boi, ", error_ting);
            toast.error(error_ting.response?.data?.message || "Failed to fetch expense details");
        } finally {
            setLoading(false);
        }
    }

    // fetch categories for expense
    const fetchExpenseCategories = async () => {
        try {
            const resp = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
            if (resp.status === 200) {
                console.log('expense categories', resp.data);
                setCategories(resp.data);
            }
        } catch(error_ting) {
            console.log('Failed to fetch expense categories', error_ting);
            toast.error(error_ting.data?.message || 'Failed to fetch expense categories');
        }
    }

    // save expense details
    const handleAddExpense = async (expense) => {
        const {name, amount, date, icon, categoryId} = expense;

        //validation
        if (!name.trim()) {
            toast.error("Please enter a name");
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) < 0) {
            toast.error("Amount should be a valid number greater than 0");
            return;
        }

        if (!date) {
            toast.error("Please select a date");
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if (date > today) {
            toast.error("Date can't be in the future");
            return;
        }

        if(!categoryId) {
            toast.error("Please select the category");
            return;
        }

        try {
            const resp = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId
            })
            if (resp.status === 201) {
                setOpenAddExpenseModel(false);
                toast.success("Expense added successfully");
                fetchExpenseDetails();
                fetchExpenseCategories();
            }
        } catch (error_ting) {
            console.log("error adding expense", error_ting);
            toast.error(error_ting.response?.data?.message || "Failed to add expense");
        }


    }

    const handleUpdateExpense = async (expense) => {
        const {name, amount, date, icon, categoryId} = expense;

        //validation
        if (!name.trim()) {
            toast.error("Please enter a name");
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) < 0) {
            toast.error("Amount should be a valid number greater than 0");
            return;
        }

        if (!date) {
            toast.error("Please select a date");
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if (date > today) {
            toast.error("Date can't be in the future");
            return;
        }

        if(!categoryId) {
            toast.error("Please select the category");
            return;
        }

        try {
            const resp = await axiosConfig.put(API_ENDPOINTS.UPDATE_EXPENSE(expense.id), {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId
            })
            if (resp.status === 200) {
                setOpenUpdateExpenseModel(false);
                toast.success("Expense updated successfully");
                fetchExpenseDetails();
                fetchExpenseCategories();
            }
        } catch (error_ting) {
            console.log("error updating expense", error_ting);
            toast.error(error_ting.response?.data?.message || "Failed to update expense");
        }
    }

    const deleteExpense = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
            setOpenDeleteAlert({show: false, data: null});
            toast.success("Expense record was deleted successfully.");
            fetchExpenseDetails();
        } catch(error_ting) {
            console.log('Error deleting expense record', error_ting);
            toast.error(error_ting.response?.data?.message || "Failed to delete expense record");
        } 
    }

    const handleEmailExpenseDetails = async () => {
        try {
            const resp = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
            if (resp.status === 200) {
                toast.success("Expense details emailed successfully");
            }
        } catch (error_ting) {
            console.error('Error emailing the expense details:', error_ting);
            toast.error(error_ting.response?.data?.message || 'Failed to email expense details');
        } 
    }

    const handleDownloadExpenseDetails = async () => {
        try {
            const resp = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {responseType: "blob"});
            let filename = "expense_details.xlsx";
            const url = window.URL.createObjectURL(new Blob([resp.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Downloaded expense details successfully");
        } catch (error_ting) {
            console.error('Error downloading the expense details:', error_ting);
            toast.error(error_ting.response?.data?.message || 'Failed to download expense');
        } 
    }

    useEffect(() => {
        fetchExpenseDetails();
        fetchExpenseCategories();
    },[])
    
    return (
        <Dashboard activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <h2 className="text-2xl font-semibold">Your Expense History</h2>

                    <ExpenseOverview transactions={expenseData} onAddExpense={() => setOpenAddExpenseModel(true)}/>
                    
                    <ExpenseList 
                        transactions={expenseData}
                        onEdit={(expense) => setOpenUpdateExpenseModel({show: true, data: expense})}
                        onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
                        onEmail={handleEmailExpenseDetails}
                        onDownload={handleDownloadExpenseDetails}
                    />

                    {/* Add Expense Model */}
                    <Model
                        isOpen={openAddExpenseModel}
                        onClose={() => setOpenAddExpenseModel(false)}
                        title="Add Expense"
                    >
                        <AddExpenseForm
                            onAddExpense={(expense) => handleAddExpense(expense)}
                            categories={categories}
                        />
                    </Model>

                    {/* Update Expense Model */}
                    <Model
                        isOpen={openUpdateExpenseModel.show}
                        onClose={() => setOpenUpdateExpenseModel(false)}
                        title="Update Expense"
                    >
                        <AddExpenseForm
                            onAddExpense={(expense) => handleUpdateExpense(expense)}
                            formerExpense={openUpdateExpenseModel.data}
                            categories={categories}
                        />
                    </Model>

                    {/* Delete expense model */}
                    <Model
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({show: false, data: null})}
                        title="Delete Expense"
                    >
                        <DeleteAlert
                            content="Are you sure you want to delete this expense record?"
                            onDelete={() => deleteExpense(openDeleteAlert.data)}
                        />
                    </Model>
                </div>
            </div>
        </Dashboard>
    )
}

export default Expense;