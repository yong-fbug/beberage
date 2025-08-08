
import Header from "../../Components/Header";
import MainTable from "./MainTable";
import '../../App.css'
import { useState } from "react";
import { ProductType } from "./ProductType";
import { generateUniqueId, sampleData } from "../../data/sampleData";
import { X } from "lucide-react";


const tableNavigation = ['All', "Coffee", "Tea", "Dairy", "Juice"] as const;
type TableType = typeof tableNavigation[number];

const InventoryPage = () => {
  const [selected, setSelected] = useState<TableType>("All")
  const [products, setProducts] = useState<ProductType[]>(sampleData);
  const [showAddForm, setShowAddForm] = useState<boolean>(false)

  const [newProduct, setNewProduct] = useState<Omit<ProductType, 'id'>>({
    idCategory: 100,
    Category: "",
    Product: "",
    Quantity: 0,
    Volume: "",
    datePurchase: "",
    expiration: ""
  });

  const handleAddProduct = () =>  {
    setProducts(prev => [...prev, { ...newProduct, id: generateUniqueId() }]);
    setShowAddForm(false);

    setNewProduct({
      idCategory: 100,
      Category: "",
      Product: "",
      Quantity: 0,
      Volume: "",
      datePurchase: "",
      expiration: ""
    });
  };

  const handleUpdateProduct = (updatedProduct: ProductType) => {
    setProducts(prev =>
      prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    )
  };

  const handleRemoveProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  };

  const filtetedProducts = selected === 'All' 
  ? products
  : products.filter(p => p.Category === selected)

  const volumeOptions = ['250ml', '200ml', '150ml'];
  const categoryOptions = ["Coffee", "Tea", "Dairy", "Juice"];

  return (

    <div className="bg-white dark:bg-slate-950 min-h-screen">
      <Header />

      <div className="flex items-center space-x-10 p-2 ml-2">
        {tableNavigation.map((tab) => (
        <button 
          key={tab}
          onClick={() => setSelected(tab)}
          className={`pb-2 font-semibold ${
            selected === tab ? "border-b-3 border-amber-600 text-black dark:text-white"
            : "text-gray-800 dark:text-gray-200 hover:text-gray-600 "
          }`}
        >
          {tab}
        </button>
        
      ))}

        <div className="flex justify-end w-full p-3">
          <button onClick={() => setShowAddForm(prev => !prev)}>
            { showAddForm ? "Cancel" : "Add"}
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
          <div className="bg-white p-6 rounded shadow-lg relative w-[40%] max-w-m space-y-3">
    
              <X onClick={() => setShowAddForm(false)}
                className="absolute top-4 right-4"
              />
 
              <p className="text-2xl font-bold">Add Product</p>

            <form
              onSubmit={handleAddProduct}
              className="space-y-2"
            >
              <input
                className="border rounded p-2 w-full"
                placeholder="Product Name"
                value={newProduct.Product}
                onChange={(e) => setNewProduct({ ...newProduct, Product: e.target.value })}
                required
              />
              <input
                className="border rounded p-2 w-full"
                placeholder="Quantity"
                type="number"
                value={newProduct.Quantity}
                onChange={(e) => setNewProduct({ ...newProduct, Quantity: Number(e.target.value) })}
                required
                min={1}
              />
              <select
                className="border rounded p-2 w-full"
                value={newProduct.Volume}
                onChange={(e) => setNewProduct({ ...newProduct, Volume: e.target.value })}
                required
              >
                <option value="" disabled hidden>Choose Volume</option>
                {volumeOptions.map((vol) => (
                  <option key={vol} value={vol}>{vol}</option>
                ))}
              </select>
              <input
                className="border rounded p-2 w-full"
                placeholder="Expiration"
                type="date"
                value={newProduct.expiration}
                onChange={(e) => setNewProduct({ ...newProduct, expiration: e.target.value })}
                required
              />
              <select
                className="border rounded p-2 w-full"
                value={newProduct.Category}
                onChange={(e) => setNewProduct({ ...newProduct, Category: e.target.value })}
                required
              >
                <option value="" disabled hidden>Choose Category</option>
                { categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

             <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save Product
              </button>
              <button 
                onClick={() => setShowAddForm(false)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >Close</button>

              </div>
            </form>

          </div>
        </div>
      )}

       <MainTable 
        byCategorySelection={selected} 
        data={filtetedProducts}
        onUpdateProduct={handleUpdateProduct}
        onRemoveProduct={handleRemoveProduct}
        /> 
        
    </div>
  )
}

export default InventoryPage