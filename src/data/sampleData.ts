import { ProductType } from "../modules/Inventory/ProductType";

export const generateUniqueId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`

export const sampleData: ProductType[] = [
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Espresso", Quantity: 12, Volume: "250ml", expiration: "2025-08-10" },
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Latte", Quantity: 8, Volume: "300ml", expiration: "2025-06-15" },
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Espresso", Quantity: 12, Volume: "250ml", expiration: "2025-08-10" },
  { id: generateUniqueId(), idCategory: 200, Category: "Tea", Product: "Green Tea", Quantity: 20, Volume: "200ml", expiration: "2026-01-01" },
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Espresso", Quantity: 12, Volume: "250ml", expiration: "2025-08-10" },
  { id: generateUniqueId(), idCategory: 300, Category: "Dairy", Product: "Milk", Quantity: 15, Volume: "500ml", expiration: "2025-05-20" },
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Espresso", Quantity: 12, Volume: "250ml", expiration: "2025-08-10" },
  { id: generateUniqueId(), idCategory: 400, Category: "Juice", Product: "Orange Juice", Quantity: 10, Volume: "350ml", expiration: "2025-07-30" },
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Espresso", Quantity: 12, Volume: "250ml", expiration: "2025-08-10" },
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Americano", Quantity: 18, Volume: "250ml", expiration: "2025-08-01" },
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Espresso", Quantity: 12, Volume: "250ml", expiration: "2025-08-10" },
  { id: generateUniqueId(), idCategory: 200, Category: "Tea", Product: "Black Tea", Quantity: 25, Volume: "200ml", expiration: "2026-03-15" },
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Espresso", Quantity: 12, Volume: "250ml", expiration: "2025-08-10" },
  { id: generateUniqueId(), idCategory: 300, Category: "Dairy", Product: "Yogurt", Quantity: 10, Volume: "150ml", expiration: "2025-06-05" },
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Espresso", Quantity: 12, Volume: "250ml", expiration: "2025-08-10" },
  { id: generateUniqueId(), idCategory: 400, Category: "Juice", Product: "Apple Juice", Quantity: 14, Volume: "350ml", expiration: "2025-07-10" },
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Espresso", Quantity: 12, Volume: "250ml", expiration: "2025-08-10" },
  { id: generateUniqueId(), idCategory: 100, Category: "Coffee", Product: "Cappuccino", Quantity: 9, Volume: "300ml", expiration: "2025-08-18" },
];
