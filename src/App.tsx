
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Nav from "./Components/Nav"
import InventoryPage from "./Pages/InventoryPage"
import DashboardPage from "./Pages/DashboardPage"


const App = () => {
  return (
    <Router>
      <Nav />
      <div>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/inventoryPage" element={<InventoryPage />} />
        </Routes>
      </div> 
    </Router>
    
  )
}

export default App