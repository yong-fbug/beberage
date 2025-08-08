import Nav from "./Nav"

const Header = () => {
  return (
    <header className="bg-white dark:bg-slate-950 p-3 ">
        <h1 className="text-2xl font-bold text-teal-600 uppercase">Inu-min Inventory</h1>
        <span className="text-sm text-slate-400">Beberage Management System</span>
        <hr className="border-t border-slate-400 my-4" />
        <Nav />
        
    </header>
  )
}

export default Header