import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";

const Category = () => {
    useUser();
    return (
        <Dashboard activeMenu="Category">
            Welcome to the category page muthafuck
        </Dashboard>
    )
}

export default Category;