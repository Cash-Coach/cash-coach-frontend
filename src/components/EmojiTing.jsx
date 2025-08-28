import EmojiPicker from "emoji-picker-react";
import { SmilePlus, X } from "lucide-react";
import { useState } from "react";

const EmojiTing = ({icon, onSelect}) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleEmojiClick = (emoji) => {
        onSelect(emoji?.imageUrl || "");
        setIsOpen(false);
    }
    return (
        <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
            <div 
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-4 cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-emerald-50 text-emerald-600 rounded-lg">
                    {icon ? (
                        <img src={icon} alt="Icon" className="w-12 h-12"/>
                    ) : (
                        <SmilePlus />
                    )}
                </div>
                <p>{icon ? "Change emoji" : "Add an emoji"}</p>
            </div>
            {isOpen && (
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer">
                        <X />
                    </button>
                    <EmojiPicker
                        open={isOpen}
                        onEmojiClick={handleEmojiClick}
                    />
                </div>
            )}
        
        </div>
    )
}
export default EmojiTing;