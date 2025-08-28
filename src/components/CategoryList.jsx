import { Pencil, Tag } from "lucide-react";

const CategoryList = ({categories, onEditCategory}) => {
    return (
        <div className="card bg-[#f3f1e3] rounded-lg shadow-slate-400 shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Category Sources</h4>
            </div>

            {/* Category List  */}
            {categories.length === 0 ? (
                <p className="text-gray-500">
                    Add some categories to get started!
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <div 
                            key={category.id}
                            className="group relative flex items-center gap-4 p-5 rounded-lg shadow-sm shadow-slate-300 bg-[#f7fffa]">
                            {/** Icon/emoji display */}
                            <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 shadow-sm shadow-slate-600 rounded-full">
                                {category.icon ? (
                                    <span className="text-2xl">
                                        <img src={category.icon} alt={category.name} className="h-5 w-5"/>
                                    </span>
                                ):(
                                    <Tag className="text-emerald-600" size={24} />
                                )}
                            </div>

                            {/** Category details */}
                            <div className="flex-1 flex items-center justify-between">
                                {/** Category name + type */}
                                <div>
                                    <p className="text-md text-gray-700 font-medium">
                                        {category.name}
                                    </p>
                                    <p className="text-md text-gray-400 mt-1 capitalize">
                                        {category.type}
                                    </p>
                                </div>
                                {/** Action buttons */}
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick = {() => onEditCategory(category)}
                                        className="shadow-sm shadow-slate-600 w-12 h-12 flex justify-center items-center  text-gray-700 bg-gray-200 hover:bg-emerald-600 hover:text-sky-100 rounded-lg transform transition-transform duration-200 hover:scale-115 group-hover:opacity-100 cursor-pointer">
                                        <Pencil size={24}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default CategoryList;