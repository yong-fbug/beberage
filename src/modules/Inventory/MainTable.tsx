import { useState } from "react";
import Header from "../../Components/Header";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Edit2 } from "lucide-react";
import UpdateModalTable from "./UpdateModalTable";
import { ProductType } from "./ProductType";

const generateUniqueId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`

const sampleData: ProductType[] = [
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Espresso", Quantity: 12, Volume: "250ml", expiration: "2025-08-10" },
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Latte", Quantity: 8, Volume: "300ml", expiration: "2025-06-15" },
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Espresso", Quantity: 12, Volume: "250ml", expiration: "2025-08-10" },
  { id: generateUniqueId(), idCategory: 200, Category: "Tea", Product: "Green Tea", Quantity: 20, Volume: "200ml", expiration: "2026-01-01" },
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Espresso", Quantity: 12, Volume: "250ml", expiration: "2025-08-10" },
  { id: generateUniqueId(), idCategory: 300, Category: "Dairy", Product: "Milk", Quantity: 15, Volume: "500ml", expiration: "2025-05-20" },
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Espresso", Quantity: 12, Volume: "250ml", expiration: "2025-08-10" },
  { id: generateUniqueId(), idCategory: 400, Category: "Juice", Product: "Orange Juice", Quantity: 10, Volume: "350ml", expiration: "2025-07-30" },
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Espresso", Quantity: 12, Volume: "250ml", expiration: "2025-08-10" },
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Americano", Quantity: 18, Volume: "250ml", expiration: "2025-08-01" },
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Espresso", Quantity: 12, Volume: "250ml", expiration: "2025-08-10" },
  { id: generateUniqueId(), idCategory: 200, Category: "Tea", Product: "Black Tea", Quantity: 25, Volume: "200ml", expiration: "2026-03-15" },
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Espresso", Quantity: 12, Volume: "250ml", expiration: "2025-08-10" },
  { id: generateUniqueId(), idCategory: 300, Category: "Dairy", Product: "Yogurt", Quantity: 10, Volume: "150ml", expiration: "2025-06-05" },
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Espresso", Quantity: 12, Volume: "250ml", expiration: "2025-08-10" },
  { id: generateUniqueId(), idCategory: 400, Category: "Juice", Product: "Apple Juice", Quantity: 14, Volume: "350ml", expiration: "2025-07-10" },
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Espresso", Quantity: 12, Volume: "250ml", expiration: "2025-08-10" },
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Cappuccino", Quantity: 9, Volume: "300ml", expiration: "2025-08-18" },
];

const columns = [
  { key: "id", label: "ID" },
  { key: "idCategory", label: "ID Category" },
  { key: "Category", label: "Category",
    options: ["Coffee", "Tea", "Dairy", "Juice"],
   },
  { key: "Product", label: "Product" },
  { key: "Quantity", label: "Quantity" },
  { key: "Volume", label: "Volume" },
  { key: "expiration", label: "Expiration" },
];


const itemsPerPage = 5;

const MainTable = () => {
  const [data, setData] = useState<ProductType[]>(sampleData)
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof ProductType>("Product");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectProduct, setSelectProduct] = useState<ProductType | null>(null)

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const paginationPage = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleUpdateProduct = (updatedProduct: ProductType) => {
    setData((prevData) => 
      prevData.map((product) => 
        product.id === updatedProduct.id ? updatedProduct : product));
    setSelectProduct(null) //Close modal after updates
  }

  const categoryOptions = columns.find(col => col.key === 'Category')?.options ?? [];

  return (
    <div className="p-3">
      <Header />     

      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center mb-4">
        <label className="text-white">Sort by:</label>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as keyof ProductType)}
          className="px-2 py-1 bg-slate-700 text-white rounded"
        >
          {columns.map((col) => (
            <option key={col.key} value={col.key}>
              {col.label}
            </option>
          ))}
        </select>
        <button
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
          className="text-white px-3 py-1 hover:text-gray-300"
        >
          {sortOrder === "asc" ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      <div className="w-full overflow-x-auto rounded-t-lg shadow-md">
        <table className="min-w-[700px] w-full text-sm text-left bg-slate-800 text-slate-200 border-collapse">
          <thead className="bg-slate-700 text-slate-300">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="p-3 font-medium whitespace-nowrap">
                  {col.label}
                </th>
              ))}
              <th className="p-3 font-medium whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginationPage.map((product, index) => (
              <tr key={index} className="hover:bg-slate-600">
                {columns.map((col) => (
                  <td key={col.key} className="p-3 whitespace-nowrap">
                    {product[col.key as keyof ProductType]}
                  </td>
                ))}
                <td className="p-3">
                  <button 
                    onClick={() => setSelectProduct(product)}
                   className="hover:text-gray-400"
                  ><Edit2  className="w-5 h-4"/> </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        { selectProduct && (
        <UpdateModalTable 
          data={selectProduct} 
          onClose={() => setSelectProduct(null)}
          onUpdate={handleUpdateProduct}
          categories={categoryOptions}
          
        />
        //Here is the props or the way updateModalTable gets it's data from main table
      )}
      </div>

      {/* Pagination */}
      <div className="p-4 flex flex-wrap justify-between items-center gap-4 text-sm sm:text-base">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="disabled:opacity-50"
        >
          <ChevronLeft />
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="disabled:opacity-50"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default MainTable;
