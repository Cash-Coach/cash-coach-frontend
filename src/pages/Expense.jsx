import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";

const Expense = () => {
    useUser();
    return (
        <Dashboard activeMenu="Expense">
            Welcome to the expense page muthafuck
        </Dashboard>
    )
}

export default Expense;