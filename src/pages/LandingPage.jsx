import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const LandingPage = () => {

    const navigate = useNavigate();

    return (
        <>
            {/* Header/Navigation */}
            <div className="flex items-center justify-between gap-2 sm:gap-5 text-yellow-400 shadow-slate-600 bg-emerald-600 border border-b border-emerald-900/50 backdrop-blur-[2px] py-3 sm:py-4 px-3 sm:px-4 lg:px-7 sticky top-0 z-30">
                <button className="text-amber-50">
                    <a onClick={() => navigate("/about")} className="hover:cursor-pointer text-sm sm:text-base">About</a>
                </button>
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                    <img src={assets.cash_coach_logo} alt="logo" className="h-8 w-8 sm:h-10 sm:w-10" />
                    <button onClick={() => navigate("/cashcoach")} className="text-base sm:text-lg font-bold truncate hover:cursor-pointer" >Cash Coach</button>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={() => navigate("/login")}
                        className="add-btn bg-emerald-100 border-1 border-emerald-500 text-emerald-600 font-bold w-16 h-8 sm:w-24 sm:h-10 text-sm sm:text-base rounded-lg shadow-sm shadow-slate-400 transform transition-transform duration-200 hover:scale-105 hover:cursor-pointer flex items-center justify-center">
                        Login
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                
                {/* Hero Section */}
                <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl">
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:flex-1">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-shadow-sm text-shadow-slate-300 text-emerald-700 mt-6 sm:mt-8 lg:mt-10 font-bold leading-tight">
                            Manage your finances with
                        </h1>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl text-shadow-sm text-shadow-slate-400 text-yellow-400 py-2 sm:py-3 font-bold leading-tight">
                            Cash Coach
                        </h1>
                    </div>
                    
                    {/* Animated Logo */}
                    <div className="lg:flex-1 flex justify-center lg:justify-end mt-4 lg:mt-0">
                        <motion.img
                            src={assets.cash_coach_logo_dos}
                            alt="Piggy Bank"
                            className="h-32 sm:h-48 md:h-64 lg:h-80 xl:h-96 max-w-full object-contain"
                            animate={{
                                y: [0, -20, 0], // float up, then back down
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </div>
                </div>

                {/* CTA Button */}
                <button
                    onClick={() => navigate("/signup")}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl bg-emerald-600 border-1 border-emerald-600 text-white font-bold mt-6 sm:mt-8 lg:mt-10 mb-6 sm:mb-8 lg:mb-10 px-6 sm:px-8 lg:px-10 py-4 sm:py-6 lg:py-8 rounded-lg shadow-lg shadow-slate-400 transform transition-transform duration-200 hover:scale-105 hover:cursor-pointer flex items-center justify-center">
                    Get Started!
                </button>

                {/* Dashboard Image */}
                <div className="w-full max-w-5xl px-4 sm:px-0">
                    <img 
                        src={assets.sample_dashboard} 
                        alt="dashboard pic" 
                        className="w-full h-auto mt-6 sm:mt-8 lg:mt-10 mb-12 sm:mb-16 lg:mb-20 shadow-lg shadow-slate-600/50 rounded-lg object-contain" 
                    />
                </div>
            </div>
        </>
    );
}

export default LandingPage;