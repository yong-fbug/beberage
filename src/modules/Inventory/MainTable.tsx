import { useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Edit2 } from "lucide-react";
import UpdateModalTable from "./UpdateModalTable";
import { ProductType } from "./ProductType";
// import { sampleData } from "../../data/sampleData";

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

type MainCategoryProps = {
  byCategorySelection: string;
  data: ProductType[];
  onUpdateProduct: (updatedProduct: ProductType) => void;
  onRemoveProduct: (id: string) => void;
};

const MainTable = ({ byCategorySelection, data, onRemoveProduct, onUpdateProduct }: MainCategoryProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof ProductType>("Product");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectProduct, setSelectProduct] = useState<ProductType | null>(null)


  const filteredData = useMemo(() => {
    if (byCategorySelection === 'All') return data;
    return data.filter((item) => item.Category === byCategorySelection);
  }, [data, byCategorySelection])

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortOrder]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const paginationPage = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-3">
        
      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center mb-4">
        <label className="text-black dark:text-white">Sort by:</label>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as keyof ProductType)}
          className="px-2 py-1 border border-gray-800 text-black dark:bg-slate-700 dark:text-white rounded
          focus:outline focus:bg-gray-100"
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
          className="dark:text-white text-black px-3 py-1 hover:text-gray-600 dark:hover:text-gray-300"
        >
          {sortOrder === "asc" ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      <div className="w-full overflow-x-auto rounded-t-lg shadow-md">
        <table className="min-w-[700px] w-full text-sm text-left text-gray-800 dark:bg-slate-800 dark:text-slate-200 border-collapse">
          <thead className="bg-teal-600 dark:bg-slate-700 text-white">
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
              <tr key={index} className="hover:bg-gray-200 cursor-pointer dark:hover:bg-slate-600">
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
          onUpdate={onUpdateProduct}
          onRemove={onRemoveProduct}
          categories={columns.find(col => col.key === 'Category')?.options ?? []}
        />
        //Here is the props or the way updateModalTable gets it's data from main table
      )}
      </div>

      {/* Pagination */}
      <div className="p-4 flex flex-wrap justify-center gap-10 items-center text-sm sm:text-base
      text-gray-800 dark:text-white">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="disabled:opacity-50"
        >
          <ChevronLeft />
        </button>
        <span className="text-gray-800 dark:text-white">
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
