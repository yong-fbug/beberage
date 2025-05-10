
import Header from "../../Components/Header";
import MainTable from "./MainTable";
import '../../App.css'
import { useState } from "react";
import CoffeeTable from "./CoffeeTable";

const tableNavigation = ['All', "Coffee", "Tea", "Dairy", "Juice"] as const;
type TableType = typeof tableNavigation[number];

const InventoryPage = () => {
  const [selected, setSelected] = useState<TableType>("All")
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
      </div>
      {/* <h1 className="page-heading">All Data</h1>
      <MainTable />

       <h1 className="page-heading">Coffe Data</h1> */}
       { selected === "All" && <MainTable />}
       { selected === "Coffee" && <CoffeeTable />}
    </div>
  )
}

export default InventoryPage