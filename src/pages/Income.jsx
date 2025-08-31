import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import axiosConfig from "../util/axiosConfig";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import Model from "../components/Model";
import { Plus } from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";

const Income = () => {
    useUser();
    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    // fetch income details
    const fetchIncomeDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const resp = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            if (resp.status === 200) {
                setIncomeData(resp.data);
            }
        } catch (error_ting) {
            console.error("You got finessed ma boi, ", error_ting);
            toast.error(error_ting.response?.data?.message || "Failed to fetch income details");
        } finally {
            setLoading(false);
        }
    }

    // fetch categories for income
    const fetchIncomeCategories = async () => {
        try {
            const resp = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
            if (resp.status === 200) {
                console.log('income categories', resp.data);
                setCategories(resp.data);
            }
        } catch(error_ting) {
            console.log('Failed to fetch income categories', error_ting);
            toast.error(error_ting.data?.message || 'Failed to fetch income categories');
        }
    }

    // save income details
    const handleAddIncome = async (income) => {
        const {name, amount, date, icon, categoryId} = income;

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
            const resp = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId
            })
            if (resp.status === 201) {
                setOpenAddIncomeModel(false);
                toast.success("Income added successfully");
                fetchIncomeDetails();
                fetchIncomeCategories();
            }
        } catch (error_ting) {
            console.log("error adding income", error_ting);
            toast.error(error_ting.response?.data?.message || "Failed to add income");
        }


    }

    const deleteIncome = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
            setOpenDeleteAlert({show: false, data: null});
            toast.success("Income record was deleted successfully.");
            fetchIncomeDetails();
        } catch(error_ting) {
            console.log('Error deleting income record', error_ting);
            toast.error(error_ting.response?.data?.message || "Failed to delete income record");
        } 
    }

    const handleEmailIncomeDetails = async () => {
        try {
            const resp = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
            if (resp.status === 200) {
                toast.success("Income details emailed successfully");
            }
        } catch (error_ting) {
            console.error('Error emailing the income details:', error_ting);
            toast.error(error_ting.response?.data?.message || 'Failed to email income details');
        } 
    }

    const handleDownloadIncomeDetails = async () => {
        try {
            const resp = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, {responseType: "blob"});
            let filename = "income_details.xlsx";
            const url = window.URL.createObjectURL(new Blob(resp.data));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Downloaded income details successfully");
        } catch (error_ting) {
            console.error('Error downloading the income details:', error_ting);
            toast.error(error_ting.response?.data?.message || 'Failed to download income');
        } 
    }

    useEffect(() => {
        fetchIncomeDetails();
        fetchIncomeCategories();
    },[])

    return (
        <Dashboard activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-1 gap-6">
                        <IncomeOverview transactions={incomeData} onAddIncome={() => setOpenAddIncomeModel(true)}/>
                    </div>
                    <IncomeList 
                        transactions={incomeData}
                        onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
                        onEmail={handleEmailIncomeDetails}
                        onDownload={handleDownloadIncomeDetails}
                    />

                    {/* Add Income Model */}
                    <Model
                        isOpen={openAddIncomeModel}
                        onClose={() => setOpenAddIncomeModel(false)}
                        title="Add Income"
                    >
                        <AddIncomeForm
                            onAddIncome={(income) => handleAddIncome(income)}
                            categories={categories}
                        />
                    </Model>

                    {/* Delete income model */}
                    <Model
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({show: false, data: null})}
                        title="Delete Income"
                    >
                        <DeleteAlert
                            content="Are you sure you want to delete this income record?"
                            onDelete={() => deleteIncome(openDeleteAlert.data)}
                        />
                    </Model>
                </div>
            </div>
        </Dashboard>
    )
}

export default Income;