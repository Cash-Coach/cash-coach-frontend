import { Trash, Upload, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef = useRef(null);
    const [previewURL, setPreviewURL] = useState(null);

    useEffect(() => {
        if (image) {
            if (typeof image === 'string') {
                setPreviewURL(image);
            } else {
                // It's a File object, create preview
                const preview = URL.createObjectURL(image);
                setPreviewURL(preview);
                
                // Cleanup function to revoke object URL
                return () => URL.revokeObjectURL(preview);
            }
        } else {
            setPreviewURL(null);
        }
    }, [image]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            setImage(file);

            const preview = URL.createObjectURL(file);
            setPreviewURL(preview);
        }
    }

    const handleRemoveImage = (e) => {
        e.preventDefault();
        setImage(null);
        setPreviewURL(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    const onChooseFile = (e) => {
        e.preventDefault();
        inputRef.current?.click();
    }

    return (
        <div className="flex justify-center mb-6">
            <input type="file" 
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {!image ? (
                <div className="w-20 h-20 flex items-center justify-center bg-green-200 rounded-full relative">
                    <User className="text-green-600" size={35} />
                    <button 
                        onClick={onChooseFile}
                        className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1">
                        <Upload size={15} className="text-green-600 hover:cursor-pointer"/>
                    </button>
                </div>
            ):(
                <div className="relative">
                    <img src={previewURL} alt="profile photo" className="w-20 h-20 rounded-full object-cover"/>
                    <button 
                        onClick={handleRemoveImage}
                        className="w-8 h-8 flex items-center justify-center bg-red-800 text-white rounded-full absolute -bottom-1 -right-1 opacity-0 hover:opacity-100">
                        <Trash size={15} className="hover:cursor-pointer"/>
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfilePhotoSelector;