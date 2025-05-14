import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const users = [
  { email: "admin@site.com", password: "admin123", role: "admin" },
  { email: "manager@site.com", password: "manager123", role: "manager" },
  { email: "staff@site.com", password: "staff123", role: "staff" },
];

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleChangeCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = credentials;

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      switch (user.role) {
        case "admin":
          navigate("/dashboard");
          break;
        case "manager":
          navigate("/dashboard");
          break;
        case "staff":
          navigate("/inventoryPage");
          break;
        default:
          navigate("/");
      }
    } else {
      setError("Incorrect Credentials"); 
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative flex rounded-lg   shadow-xl overflow-hidden w-full max-w-4xl min-h-[500px]"
      >
        {/* Sidebar */}
        <motion.div
          key="loginSidebar"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          exit={{ x: 450 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="relative w-1/2 min-h-full sm:block hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold mb-4 text-teal-500 dark:text-gray-800">Inventory Access</h2>
            <p className="text-lg text-gray-500 dark:text-gray-100">Log in to manage stock, suppliers, and reports</p>
          </div>
        </motion.div>

        {/* Form Section */}
        <div className="relative w-full sm:w-1/2 max-w-lg min-h-full flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key="loginForm"
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              exit={{ x: -450 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="absolute top-0 left-0 w-full h-full p-8 flex flex-col justify-center items-center space-y-6"
            >
              <h2 className="text-3xl font-bold text-center text-teal-500 dark:text-gray-800">Log-in</h2>

              <form onSubmit={handleLogin} className="space-y-4 flex flex-col w-full px-6">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={handleChangeCredentials}
                  autoComplete="email"
                  className="py-2 px-4 w-full rounded border-2 border-gray-400 focus:outline-none focus:border-teal-300 hover:border-gray-500"
                  required
                />

                <div className="relative w-full">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChangeCredentials}
                    onPaste={(e) => e.preventDefault()}
                    autoComplete="current-password"
                    className="py-2 px-4 w-full rounded-md border-2 border-gray-400 focus:outline-none focus:border-teal-300 hover:border-gray-500"
                  />
                  <span
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-2 cursor-pointer text-gray-600 hover:text-gray-800"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </span>
                </div>

                {error && (
                  <p className="text-red-500 text-center">{error}</p> 
                )}

                <button
                  type="submit"
                  className="w-full py-2 bg-amber-500 text-white font-semibold rounded-md hover:bg-amber-600 transition"
                >
                  Log-in
                </button>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
