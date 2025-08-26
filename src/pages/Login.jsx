import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { validateEmail } from "../util/validation";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { AppContext } from "../context/AppContext";
import { LoaderCircle } from "lucide-react";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {setUser} = useContext(AppContext);

    const navToLogin = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // validation
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            setIsLoading(false);
            return;
        }
        if (!password.trim()) {
            setError("Please enter your password");
            setIsLoading(false);
            return;
        }

        setError("");

        // Login api call
        try {
            const resp = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
                email,
                password,
            });
            const {token, user} = resp.data;
            if (token) {
                localStorage.setItem("token", token);
                // localStorage.setItem("user", JSON.stringify(user));
                setUser(user);
                navToLogin("/dashboard");
            }
        } catch(error_ting) {
            if(error_ting.response && error_ting.response.data.message) {
                setError(error_ting.response.data.message);
            } else {
                console.error("oh nah twin.", error_ting);
                setError(error_ting.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
         <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-lg" />
            <div className="relative z-10 w-full max-w-lg px-6">

                <div className="bg-[#fffedf] bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Login
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-4">
                        Welcome Back!
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email Address"
                            placeholder="john.doe@example.com"
                            type="text"
                        />
                        
                        <Input 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            placeholder="*******"
                            type="password"
                        />
                        
                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}
                        <button disabled={isLoading} className={`bg-green-900 hover:bg-green-700 text-yellow-100 shadow-green-900 shadow-sm rounded-lg w-full py-3 text-lg font-medium flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`} type="submit">
                            {isLoading ? (
                                <>
                                    <LoaderCircle className="animate-spin w-5 h-5" />
                                    Logging in...
                                </>
                            ):(
                                <>
                                    Login
                                </>
                            )}
                        </button>
                        <p className="text-sm text-slate-800 text-center mt-6">
                            Don't have and account?
                            <Link to="/signup" className="px-2 font-medium text-primary underline hover:text-primary-dark transition-colors">Sign up here!</Link>
                        </p>

                    </form>
                </div>

                

            </div>
        </div>
    )
}

export default Login;