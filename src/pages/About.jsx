import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Emoji } from "emoji-picker-react";

const About = () => {
    
    const navigate = useNavigate();


    return (
        <>
            <div className="flex items-center justify-between gap-5 text-yellow-400 shadow-slate-600 bg-emerald-600 border border-b border-emerald-900/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
                <button className="text-amber-50">
                    <a className="hover:">About</a>
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
            <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
                <img
                    src={assets.cash_coach_logo_dos}
                    alt="Background"
                    className="
                    absolute left-1/2 top-1/2
                    -translate-x-1/2 -translate-y-1/2
                    w-5/6 max-w-[1100px] h-auto
                    object-contain blur-lg opacity-20
                    pointer-events-none select-none
                    "
                />
                <div className="flex flex-col items-center mb-20">
                    <div className="flex">
                        <p>"</p>
                        <p className="italic">Managing finances is never easy. There are a myriad of transactions</p>
                    </div>
                    <p className="italic">a person goes through every day, week, and month. It becomes easy to spend</p>
                    <p className="italic">your hard earned money, but difficult to see where it all went.</p>
                    <p className="opacity-0">Lorem Ipsum</p>
                    <p className="font-semibold ">That's where Cash Coach comes along</p>
                    <p className="opacity-0">Lorem Ipsum</p>
                    <p className="italic">Make finances ACTIVE, logging your transactions everyday.</p> 
                    <p className="italic">Use multiple dashboards to analyze any trends with your earnings and spendings</p>
                    <div className="flex">
                        <p className="italic">Become self-reliant financially and become your own </p>
                        <p className="opacity-0">I</p>
                        <p className="font-bold italic ">Cash Coach 💯</p>
                        <p>"</p>
                    </div>
                    <p className="opacity-0">Lorem Ipsum</p>
                    <p className="font-semibold">- Sibi Tiruchirapalli</p>
                </div>
            </div>
        </>
    )
}

export default About;