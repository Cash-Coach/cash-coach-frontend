import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const LandingPage = () => {

    const navigate = useNavigate();


    return (
        <>
            <div className="flex items-center justify-between gap-5 text-yellow-400 shadow-slate-600 bg-emerald-600 border border-b border-emerald-900/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
                <button className="text-amber-50">
                    <a onClick={() => navigate("/about")} className="hover:cursor-pointer">About</a>
                </button>
                <div className="flex items-center justify-center gap-2">
                    <img src={assets.cash_coach_logo} alt="logo" className="h-10 w-10" />
                    <button onClick={() => navigate("/cashcoach")} className="text-lg font-medium truncate hover:cursor-pointer" >Cash Coach</button>
                    
                </div>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => navigate("/login")}
                        className="add-btn bg-emerald-100 border-1 border-emerald-500 text-emerald-600 font-bold w-24 h-10 rounded-lg shadow-sm shadow-slate-400 transform transition-transform duration-200 hover:scale-105 hover:cursor-pointer flex items-center justify-center gap-1 ">
                        Login
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                
                <div className="flex items-center">
                    <div className="flex flex-col items-center">
                        <h1 className="text-5xl text-shadow-sm text-shadow-slate-300 text-emerald-700 mt-10 font-bold">
                            Manage your finances with
                        </h1>
                        <h1 className="text-9xl text-shadow-sm text-shadow-slate-400 text-yellow-400 py-3 font-bold">
                            Cash Coach
                        </h1>
                    </div>
                    <motion.img
                        src={assets.cash_coach_logo_dos}
                        alt="Piggy Bank"
                        className="h-120 "
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
                <button
                    onClick={() => navigate("/signup")}
                    className="text-7xl bg-emerald-600 border-1 border-emerald-600 text-white font-bold m-10 px-10 h-30 rounded-lg shadow-sm shadow-slate-400 transform transition-transform duration-200 hover:scale-105 hover:cursor-pointer flex items-center justify-center gap-1">
                    Get Started!
                </button>
                <img src={assets.sample_dashboard} alt="dashboard pic" className="w-9/16 mt-10 mb-20 shadow-lg shadow-slate-600/50 flex items-center justify-center" />
            </div>
        </>
    );
}

export default LandingPage;