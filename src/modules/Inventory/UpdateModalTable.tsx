import { X } from 'lucide-react';
import { useState } from 'react';
import { ProductType } from './ProductType';


type DataProps = {
    data: ProductType;
    onClose: () => void;
    onUpdate: (updatedProduct: ProductType) => void;
    categories: string[];
}

const UpdateModalTable = ({ data, onClose, onUpdate, categories }: DataProps ) => {

    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({...data})

    const categoryId: Record<string, number> = {
      Coffee: 100, 
      Tea: 200,
      Dairy: 300,
      Juice: 400,
    }

    const handleChange = (e: 
        React.ChangeEvent<HTMLSelectElement> | 
        React.ChangeEvent<HTMLInputElement> , 
        field: keyof ProductType) => {

            const value = e.target.value
            
        setFormData((prev) => {
            const updated = {...prev, [field]: value };

            if (field === 'Category') {
                updated.idCategory = categoryId[value] ?? 0;
            }
            return updated;
        })
    };

    const handleUpdate = () => {
        if (editMode) {
            onUpdate(formData);
            setEditMode(false);
        } else {
            setEditMode(true);
        }
    }

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/60'>
        <div className='bg-white p-6 rounded shadow-lg relative w-[90%] max-w-md'>
            <button
              onClick={(onClose)}
              className='absolute top-4 right-4 text-gray-950 hover:text-gray-700'
            > <X />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
               Product Details
            </h2>

            <div className="space-y-4 text-sm text-gray-700 ">
            {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center pb-1">
                <span className="font-medium">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>

                {editMode && key === 'Category' ? (
                    
                    <select
                    value={value as string}
                    onChange={(e) => handleChange(e, key as keyof typeof formData)}
                    className=" border-gray-300 rounded px-2 py-1 text-sm w-1/2
                    focus:outline-none"
                    >
                    {categories.map((category, idx) => (
                        <option key={idx} value={category}>
                        {category}
                        </option>
                    ))}
                    </select>
                ) : (
                    // For other fields, use an input
                    editMode && key !== 'id' && key !== 'idCategory' ? (
                    <input
                        type={typeof value === 'number' ? 'number' : 'text'}
                        value={value}
                        onChange={(e) => handleChange(e, key as keyof typeof formData)}
                        className="border-b border-gray-900 rounded-sm px-2 py-1 text-sm text-right w-1/2
                        focus:outline-none focus:border-b-teal-500 "
                    />
                    ) : (
                    // If not in edit mode, just show the value
                    <span>{value}</span>
                    )
                )}
                </div>
            ))}
            </div>


            <div className='flex justify-center p-3 text-black bold gap-10 '>
                <button
                  onClick={handleUpdate}
                  className='px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 text-sm'
                >
                    { editMode ? "Save" : "Update"}
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className='px-4 py-2 border text-sm rounded hover:bg-gray-100'
                >
                    { editMode ? "Cancel" : "Remove"}
                </button>
            </div>
        </div>
    </div>
  )
}

export default UpdateModalTable