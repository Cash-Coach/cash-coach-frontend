import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import ProfilePhotoSelector from "./ProfilePhotoSelector";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import uploadProfilePicture from "../util/uploadProfilePicture";
import toast from "react-hot-toast";

const Sidebar = ({activeMenu}) => {

    const {user, setUser} = useContext(AppContext);
    const [ pfp, setPfp ] = useState(user?.profilePicUrl || null);
    const [hasInitialized, setHasInitialized] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.profilePicUrl && !pfp &&!hasInitialized) {
            setPfp(user.profilePicUrl);
        }
        setHasInitialized(true);
    }, [user?.profilePicUrl, pfp]);

    useEffect(() => {
        const updatePfp = async () => {
            if (!hasInitialized) return;
            console.log(user?.profilePicUrl);
            // if (pfp === null && user?.profilePicUrl) {
            //     return; // Don't delete from database
            // }

            if (pfp === null && user?.profilePicUrl !== null) {
                try {
                    const resp = await axiosConfig.put(API_ENDPOINTS.UPDATE_PROFILE(user.id), {
                        profilePicUrl: null
                    });
                    if (resp.status === 200) {
                        setUser(prev => ({...prev, profilePicUrl: null}));
                        toast.success("Profile picture removed!");
                    }
                } catch(error) {
                    console.error("Error removing profile picture:", error);
                    toast.error("Could not remove profile picture, please try again.");
                }
                return;
            }

            if (!pfp || typeof pfp === 'string') return;
            
            let profilePicUrl = "";
            try {
                const pfpURL = await uploadProfilePicture(pfp);
                profilePicUrl = pfpURL || "";
                
                const resp = await axiosConfig.put(API_ENDPOINTS.UPDATE_PROFILE(user.id), {
                    profilePicUrl
                });
                console.log(resp);
                if (resp.status === 200) {
                    setPfp(profilePicUrl);
                    // Update user context
                    setUser(prev => ({...prev, profilePicUrl}));
                    toast.success("Updated profile picture!");
                }
            } catch(error_ting) {
                console.error("oh nah twin.", error_ting);
                toast.error("Could not upload profile picture, please try again.");
            }
        };
        
        updatePfp();
    }, [pfp, hasInitialized]);

    return (
        <div className="w-full sm:w-64 lg:w-72 min-h-[calc(100vh-61px)] max-h-[calc(100vh-61px)] bg-[#f3f1e3] border-gray-200/50 shadow-sm shadow-slate-400 p-3 sm:p-5 sticky top-[61px] z-20 overflow-y-auto">
            <div className="flex flex-col items-center justify-center mt-2 sm:mt-3 mb-6 sm:mb-12">
                <ProfilePhotoSelector image={pfp} setImage={setPfp}/>
                <h5 className="text-gray-950 font-medium leading-6 text-center text-sm sm:text-base px-2 mt-2">{user?.fullName || ""}</h5>
            </div>
            <div className="space-y-2 sm:space-y-3">
                {SIDE_BAR_DATA.map((item, index) => (
                    <button
                        onClick={() => navigate(item.path)} 
                        key={`menu_${index}`}
                        className={`cursor-pointer w-full flex items-center gap-2 sm:gap-4 text-sm sm:text-[15px] py-2 sm:py-3 px-3 sm:px-6 rounded-lg transition-all duration-200 ${
                            activeMenu === item.label 
                                ? "text-white bg-emerald-600" 
                                : "hover:scale-105 hover:border-2 hover:border-emerald-500"
                        }`}>
                            <span className="flex items-center gap-2 sm:gap-3">
                                <item.icon className="text-lg sm:text-xl flex-shrink-0" />
                                <span className="truncate">{item.label}</span>
                            </span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Sidebar;