import { X } from "lucide-react";

const Model = ({isOpen, onClose, children, title}) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-hidden bg-black/40 backdrop-blur-sm">
            <div className="relative p-4 w-full max-w-2xl max-h-[90vh]">
                {/* Model header */}
                <div className="relative bg-white rounded-xl shadow-2xl border border-gray-100">
                    {/* Model content */}
                    <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100 rounded-t-xl">
                        <h3 className="text-xl font-semibold text-gray-800">
                            {title}
                        </h3>

                        <button 
                            onClick={onClose}
                            type="button"
                            className="text-gray-500 bg-gray-50 hover:bg-rose-600 hover:text-white rounded-lg text-sm w-9 h-9 flex justify-center items-center transtion-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    {/* Model body */}
                    <div className="p-5 md:p-6 text-gray-700">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Model;