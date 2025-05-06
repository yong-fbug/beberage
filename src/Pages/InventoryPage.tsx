import Header from "../Components/Header"
import '../App.css';
import MainTable from "../Components/MainTable";

const InventoryPage = () => {
  return (
    
    <div className="bg-slate-950 min-h-screen">
        <Header />
        <main className="">
          <MainTable />
        </main>
    </div>
  )
}

export default InventoryPage