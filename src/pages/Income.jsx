import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";

const Income = () => {
    useUser();
    return (
        <Dashboard activeMenu="Income">
            Welcome to the income page muthafuck
        </Dashboard>
    )
}

export default Income;