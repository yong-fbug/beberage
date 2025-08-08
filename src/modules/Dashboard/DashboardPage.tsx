import { useState } from "react"
import Loading from "../../Components/Loading"
import { ProductType } from "../Inventory/ProductType"
import { sampleData } from "../../data/sampleData"
import Nav from "../../Components/Nav"
import { Temporal } from "@js-temporal/polyfill"
import { useNavigate } from "react-router-dom"




const DashboardPage = () => {
  const [products, setProducts] = useState<ProductType[]>(sampleData)
  
  const lowerInStocks = products.filter(product => product.Quantity >= 1 && product.Quantity <= 10 )
  const outOfStocks = products.filter(product => product.Quantity === 0)

  const date = Temporal.Now.plainDateISO();

  const expiredItems = products.filter((product) => {
    const expiry = Temporal.PlainDate.from(product.expiration)
    return expiry.since(date).days < 0
  });

  const nearExpiredItems = products.filter((product) => {
    const expiry = Temporal.PlainDate.from(product.expiration)
    const daysLeft = expiry.since(date).days
    return daysLeft <= 15 && daysLeft > 0
  });
  const navigate = useNavigate();
  return (
    <div className='bg-white dark:bg-slate-950 min-h-screen'>
      <main className="p-3 pt-18">
        <button onClick={() => navigate("/scanner")}>Go to Scanner</button>
        <Nav />
            <div className="grid gird-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-6 p-4">

              {outOfStocks.length &&(
              <div className="bg-red-600 p-6 rounded-xl shadow-md ">
                <p>Out of Stock({outOfStocks.length}) </p>
              </div>
              )}

              {lowerInStocks.length > 0 && (
                <div className="bg-yellow-500 p-6 rounded-xl shadow-md">
                  <p className="font-semibold text-lg mb-2">Low Stock({lowerInStocks.length}) </p>

                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {lowerInStocks.map((item) => (
                      <li key={item.id}>ID: {item.id} </li>
                    ))}
                  </ul>
                </div>
                )}
              {nearExpiredItems.length > 0 &&(
                <div className="bg-amber-500 p-6 rounded-xl shadow-md">
                  <p>Near Expired({nearExpiredItems.length}) </p>

                  <ul>
                    {nearExpiredItems.map((item) => (
                      <li key={item.id}>
                        {item.Product} (exp: {item.expiration})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {expiredItems.length > 0 && (
                <div className="bg-red-800 p-6 rounded-xl shadow-md text-white">
                  <p className="font-semibold text-lg mb-2">Expired ({expiredItems.length})</p>
                  <ul className="list-disc list-inside text-sm">
                    {expiredItems.map((item) => (
                      <li key={item.id}>
                        {item.Product} (exp: {item.expiration})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
            </div>
            <Loading />
        </main>
    </div>
  )
}

export default DashboardPage