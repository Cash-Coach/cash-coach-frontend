import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";

const Filter = () => {
    useUser();
    return (
        <Dashboard activeMenu="Filters">
            Welcome to the filter page muthafuck
        </Dashboard>
    )
}

export default Filter;