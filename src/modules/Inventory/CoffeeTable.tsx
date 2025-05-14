import { useReducer } from "react";

type CartItem = { id: string; name: string; qty: number };

type Action =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string } // id
  | { type: "UPDATE_QTY"; payload: { id: string; qty: number } }
  | { type: "RESET" };

const reducer = (state: CartItem[], action: Action): CartItem[] => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];

    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload);

    case "UPDATE_QTY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, qty: action.payload.qty }
          : item
      );

    case "RESET":
      return [];

    default:
      return state;
  }
};

export default function CartReducerExample() {
  const [cart, dispatch] = useReducer(reducer, []);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">🛒 Cart</h1>

      <button
        onClick={() =>
          dispatch({
            type: "ADD_ITEM",
            payload: { id: "coffee1", name: "Coffee", qty: 1 },
          })
        }
        className="px-3 py-1 bg-green-600 text-white rounded"
      >
        Add Coffee
      </button>

      <button
        onClick={() =>
          dispatch({
            type: "UPDATE_QTY",
            payload: { id: "coffee1", qty: 5 },
          })
        }
        className="px-3 py-1 bg-yellow-500 text-white rounded"
      >
        Update Qty to 5
      </button>

      <button
        onClick={() => dispatch({ type: "REMOVE_ITEM", payload: "coffee1" })}
        className="px-3 py-1 bg-red-600 text-white rounded"
      >
        Remove Coffee
      </button>

      <button
        onClick={() => dispatch({ type: "RESET" })}
        className="px-3 py-1 bg-gray-600 text-white rounded"
      >
        Reset Cart
      </button>

      <ul className="mt-4 list-disc pl-6">
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} – Qty: {item.qty}
          </li>
        ))}
      </ul>
    </div>
  );
}
