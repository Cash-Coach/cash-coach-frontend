import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Emoji } from "emoji-picker-react";

const About = () => {
    const navigate = useNavigate();
    
    return (
        <>
            {/* Header/Navigation */}
            <div className="flex items-center justify-between gap-2 sm:gap-5 text-yellow-400 shadow-slate-600 bg-emerald-600 border border-b border-emerald-900/50 backdrop-blur-[2px] py-3 sm:py-4 px-3 sm:px-4 lg:px-7 sticky top-0 z-30">
                <button className="text-amber-50">
                    <a className="hover:cursor-pointer text-sm sm:text-base">About</a>
                </button>
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                    <img src={assets.cash_coach_logo} alt="logo" className="h-8 w-8 sm:h-10 sm:w-10" />
                    <button onClick={() => navigate("/cashcoach")} className="text-base sm:text-lg font-medium truncate hover:cursor-pointer">
                        Cash Coach
                    </button>
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
            <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                {/* Background Logo */}
                <img 
                    src={assets.cash_coach_logo_dos} 
                    alt="Background" 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 sm:w-3/4 md:w-2/3 lg:w-5/6 max-w-[800px] lg:max-w-[1100px] h-auto object-contain blur-lg opacity-10 sm:opacity-15 lg:opacity-20 pointer-events-none select-none" 
                />
                
                {/* Quote Content */}
                <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 lg:space-y-8">
                    <blockquote className="text-center space-y-4 sm:space-y-6 lg:space-y-8">
                        
                        {/* Main Quote Text */}
                        <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-base sm:text-sm lg:text-md xl:text-lg leading-relaxed">
                            <p className="italic text-gray-700">
                                Managing finances is never easy. There are a myriad of transactions a person goes through every day, week, and month. It becomes easy to spend your hard earned money, but difficult to see where it all went.
                            </p>
                            
                            <p className="font-semibold text-emerald-700 text-lg sm:text-xl lg:text-2xl xl:text-3xl py-2 sm:py-4">
                                That's where Cash Coach comes along
                            </p>
                            
                            <p className="italic text-gray-700">
                                Make finances ACTIVE, logging your transactions everyday.
                            </p>
                            
                            <p className="italic text-gray-700">
                                Use multiple dashboards to analyze any trends with your earnings and spendings
                            </p>
                            
                            <p className="italic text-gray-700">
                                Become self-reliant financially and become your own{' '}
                                <span className="font-bold text-emerald-700">Cash Coach 💯</span>
                            </p>
                        </div>
                        
                        
                        
                        {/* Attribution */}
                        <div className="pt-4 sm:pt-6 lg:pt-8">
                            <p className="font-semibold text-gray-800 text-lg sm:text-xl lg:text-2xl">
                                - Sibi Tiruchirapalli
                            </p>
                        </div>
                    </blockquote>
                </div>
            </div>
        </>
    );
}

export default About;