import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";

const Home = () => {
    useUser();
    return (
        <div>
            <Dashboard activeMenu="Dashboard">
                Welcome to the home page muthafuck
            </Dashboard>
        </div>
    )
}

export default Home;