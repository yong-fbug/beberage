import { X } from 'lucide-react';
import { useState } from 'react';
import { ProductType } from './ProductType';
import Loading from '../../Components/Loading';



type DataProps = {
    data: ProductType;
    onClose: () => void;
    onUpdate: (updatedProduct: ProductType) => void;
    onRemove: (id: string) => void;
    categories: string[];
}

const UpdateModalTable = ({ data, onClose, onUpdate, categories, onRemove }: DataProps ) => {

    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({...data})
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [loading, setLoading] = useState(false)

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

    const openDeleteModal = () => setShowDeleteModal(true);
    
    const cancelDeletionProcess = () => setShowDeleteModal(false)

    const handleRemove = () => {
       setLoading(true);
       setTimeout(() => {
             onRemove(formData.id);
             setLoading(false);
             onClose();
       }, 1000);
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
                  onClick={openDeleteModal}
                  className='px-4 py-2 border text-sm rounded hover:bg-gray-100'
                >
                   Delete
                </button>
            </div>

            {showDeleteModal && (
                <div className='fixed inset-0 flex justify-center items-center bg-black/70'>
                    <div className='relative w-full max-w-md bg-white border rounded shadow-xl p-6'>
                        <X onClick={cancelDeletionProcess}
                        className='absolute top-4 right-4 hover:text-gray-500 cursor-pointer'
                        />
                        { loading ? (
                             <div className='bg-white w-full fixed inset-0 flex items-center justify-center'>
                                    <Loading />
                                </div>
                        ) : (
                            <>

                            <div className='flex flex-col text-center text-gray-800 mt-5'>
                            <p className='>text-lg font-semibold'>Are you sure you want to delete this product?</p>
                            <p className='text-sm text-gray-600 mt-2'>This action cannot be undone.</p>
                            </div>
                            <div className='mt-6 flex justify-center gap-4'>
                                <button onClick={handleRemove}
                                    className='bg-red-700 hover:bg-red-800 text-white text-sm font-medium rounded px-4 py-2'>
                                    Proceed
                                </button>
                                <button onClick={cancelDeletionProcess}
                                    className='bg-gray-200 hover:bg-gray-300 text-sm font-medium rounded px-4 py-2'>
                                    Cancel
                                </button>
                            </div>
                            </>
                        )}
                        
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default UpdateModalTable