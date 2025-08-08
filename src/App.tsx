import { BrowserRouter, Routes, Route } from "react-router-dom";
import InventoryPage from "./modules/Inventory/InventoryPage";
import DashboardPage from "./modules/Dashboard/DashboardPage";
import LoginPage from "./pages/LoginPage";
import { Scanner } from "./Components/Scanner";

const App = () => {
  return (
    <BrowserRouter basename="/beberage">
      <main className="min-h-screen bg-white text-gray-800 dark:bg-slate-950 dark:text-white">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/inventoryPage" element={<InventoryPage />} />
          <Route path="/scanner" element={<Scanner />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
