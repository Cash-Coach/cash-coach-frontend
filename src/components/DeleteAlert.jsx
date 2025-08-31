import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const DeleteAlert = ({content, onDelete}) => {

    const[loading, setLoading] = useState(false);
    const handleDelete = async () => {
        setLoading(true);
        try {
            await onDelete();
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <p className="text-sm">{content}</p>
            <div className="flex justify-end mt-6">
                <button 
                    onClick={handleDelete}
                    disabled={loading}
                    type="button"
                    className="bg-rose-500 text-white rounded-lg hover:cursor-pointer hover:bg-white hover:text-rose-500 
                                hover:ring-2 hover:ring-rose-500 hover: px-3 py-2 flex justify-center">
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <LoaderCircle className="h-4 w-4 animated-spin"/>
                            Deleting...
                        </div>
                    ) : (
                        <>
                            Delete
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default DeleteAlert;