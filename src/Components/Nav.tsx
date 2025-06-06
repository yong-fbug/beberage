    import { useEffect, useRef, useState } from "react";
    import { Menu, X, LayoutDashboard, Settings, BoxIcon, BarChart2, LogOut } from "lucide-react";
    import { Link } from "react-router-dom";

    const Nav = () => {
      const [isOpen, setIsOpen] = useState(false);
      const asideRef = useRef<HTMLDivElement>(null)

      const toggleNav = () => setIsOpen(!isOpen);

      const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard'},
        { label: 'Inventory', icon: BoxIcon, href: '/inventoryPage'},
        { label: 'Report', icon: BarChart2, href: '#'},
        { label: 'Setting', icon: Settings, href: '#'},
         { label: 'Logout', icon: LogOut, href: '/'},
      ];

      useEffect(() => {
        const handleClickOutSide = (event: MouseEvent) => {
          if (
            asideRef.current &&
            !asideRef.current.contains(event.target as Node)
          ) {
            setIsOpen(false)
          }
        };
        if (isOpen) {
          document.addEventListener('mousedown', handleClickOutSide);
        }
        return () => {
          document.removeEventListener('mousedown', handleClickOutSide);
        }
      }, [isOpen]);
      

      return (
        <div className="">
          {/* Toggle Button */}
          <button
            onClick={toggleNav}
            className="fixed top-4 right-4 z-49 mt-6 bg-white dark:bg-slate-950 text-black dark:text-white rounded-md dark:shadow hover:text-teal-400 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>


          {/* Sidebar */}
          <aside
            ref={asideRef}
            className={`fixed top-0 right-0 p-3 h-full w-54 bg-white dark:bg-slate-950 text-gray-800 dark:text-white shadow-xl 
              border-l-2 dark:border-gray-600 border-teal-400 rounded
              transition-transform duration-300 z-40
            ${isOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="p-6 space-y-9">
              <h2 className="text-xl bold uppercase mb-6 text-teal-400">Navigation</h2>
              <ul className="space-y-9">
                {navItems.map(({ label, icon: Icon, href}) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 hover:text-teal-400 transition"
                  >
                    <Icon size={18} />
                    <Link 
                      to={href} 
                      onClick={() => setIsOpen(false)}
                      className="hover:text-teal-400">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      );
    };

    export default Nav;
