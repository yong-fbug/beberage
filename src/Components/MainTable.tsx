const MainTable = () => {

  const sampleData = [
    { id: 100, Category: "Coffee", Product: "Espresso", Quantity: 12, Volume: "250ml", expiration: "2025-08-10" },
    { id: 100, Category: "Coffee",  Product: "Latte", Quantity: 8, Volume: "300ml", expiration: "2025-06-15" },
    { id: 101, Category: "Tea",  Product: "Green Tea", Quantity: 20, Volume: "200ml", expiration: "2026-01-01" },
    { id: 102, Category: "Dairy", Product: "Milk", Quantity: 15, Volume: "500ml", expiration: "2025-05-20" },
    { id: 103, Category: "Juice", Product: "Orange Juice", Quantity: 10, Volume: "350ml", expiration: "2025-07-30" },
    { id: 100, Category: "Coffee", Product: "Americano", Quantity: 18, Volume: "250ml", expiration: "2025-08-01" },
    { id: 101, Category: "Tea", Product: "Black Tea", Quantity: 25, Volume: "200ml", expiration: "2026-03-15" },
    { id: 102, Category: "Dairy", Product: "Yogurt", Quantity: 10, Volume: "150ml", expiration: "2025-06-05" },
    { id: 103, Category: "Juice", Product: "Apple Juice", Quantity: 14, Volume: "350ml", expiration: "2025-07-10" },
    { id: 100, Category: "Coffee", Product: "Cappuccino", Quantity: 9, Volume: "300ml", expiration: "2025-08-18" },
  ];
  const keys = ['id', 'Product', 'Category', 'Quantity', 'Volume', 'expiration'];
  
    return (
      <div className="p-6">
        <div className="overflow-x-auto rounded-t-lg shadow-md">
          <table className="min-w-full text-sm text-left bg-slate-800 text-slate-200">
            <thead className="bg-slate-700 text-slate-300">
              <tr>
                <th className="p-3 font-medium">ID</th>
                <th className="p-3 font-medium">Category</th>
                <th className="p-3 font-medium">Product</th>             
                <th className="p-3 font-medium">Quantity</th>
                <th className="p-3 font-medium">Volume</th>
                <th className="p-3 font-medium">Expiration</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              { sampleData.map((product) => (
                <tr key={product.id}>
                  {keys.map((key) => (
                    <td key={key} className="p-3">
                      {product[key as keyof typeof product]}
                    </td>
                  ))}
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default MainTable;
  