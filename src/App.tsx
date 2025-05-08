import { BrowserRouter, Routes, Route } from "react-router-dom";
import InventoryPage from "./modules/Inventory/InventoryPage";
import DashboardPage from "./modules/Dashboard/DashboardPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <BrowserRouter basename="/beberage">
      <main className="min-h-screen bg-slate-950 text-white">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/inventoryPage" element={<InventoryPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
