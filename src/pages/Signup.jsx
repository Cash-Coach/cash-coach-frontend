import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { validateEmail } from "../util/validation";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector";
import uploadProfilePicture from "../util/uploadProfilePicture";

const Signup = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);

    const navToLogin = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let profileImageUrl = "";
        setIsLoading(true);

        // basic validation
        if (!fullName.trim()) {
            setError("Please enter your full name");
            setIsLoading(false);
            return;
        }
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

        // sign up api call
        try {

            // upload pfp if present
            if(profilePicture) {
                const pfpURL = await uploadProfilePicture(profilePicture);
                profileImageUrl = pfpURL || "";
            }


            const resp = await axiosConfig.post(API_ENDPOINTS.ADD, {
                fullName,
                email,
                password,
                profileImageUrl
            })
            if (resp.status === 201) {
                toast.success("Welcome to Cash Coach " + fullName + "!");
                navToLogin("/login");
            }
        } catch(error_ting) {
            console.error("oh nah twin.", error_ting);
            setError(error_ting.message);
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
                        Join Cash Coach
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-4">
                        Let's start working on those spending habits!
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex justify-center mb-6">
                            <ProfilePhotoSelector image = {profilePicture} setImage = {setProfilePicture}/>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                            <Input 
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                label="Full Name"
                                placeholder="John Doe"
                                type="text"
                            />
                            <Input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email Address"
                                placeholder="john.doe@example.com"
                                type="text"
                            />
                            <div className="col-span-2">
                                <Input 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    label="Password"
                                    placeholder="*******"
                                    type="password"
                                />
                            </div>
                        </div>
                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}
                        <button disabled={isLoading} className={`bg-green-900 hover:bg-green-700 text-yellow-100 shadow-green-900 shadow-sm rounded-lg w-full py-3 text-lg font-medium flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`} type="submit">
                            {isLoading ? (
                                <>
                                    <LoaderCircle className="animate-spin w-5 h-5"/>
                                    Signing up...                                
                                </>
                            ) : (
                                <>
                                    Sign Up!
                                </>
                            )}
                        </button>
                        <p className="text-sm text-slate-800 text-center mt-6">
                            Have an account already?
                            <Link to="/login" className="px-2 font-medium text-primary underline hover:text-primary-dark transition-colors">Login</Link>
                        </p>

                    </form>
                </div>

                

            </div>
        </div>

    
    )
}

export default Signup;