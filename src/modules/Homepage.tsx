import Header from '../Components/Header';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-slate-950 dark:text-white">
      <Header />

      <main className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-amber-600">Welcome to Inu-min Inventory</h2>
        <p className="text-slate-300 max-w-xl mb-8">
          Track, manage, and analyze your beverage stock with precision. Simple interface, powerful features.
        </p>

        <Link
          to="/inventoryPage"
          className="bg-amber-500 text-slate-950 px-6 py-3 font-semibold rounded-lg hover:bg-amber-600 transition"
        >
          Go to Inventory
        </Link>
      </main>
    </div>
  );
};

export default HomePage;
