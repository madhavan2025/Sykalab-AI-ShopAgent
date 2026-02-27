"use client";
import { useEffect, useState } from "react";

export default function CartComponent({ goBack, goCheckout }: any) {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    const res = await fetch("/api/cart");
    const data = await res.json();
    setCart(data);
  }

  async function increase(id: string) {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
    });
    fetchCart();
  }

  async function decrease(id: string) {
    await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchCart();
  }

  const total = cart.reduce((sum, item) => {
    const price = Number(item.price.replace("$", ""));
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Your Order</h2>
        {cart.length === 0 && (
          <p className="text-gray-500">Cart is empty</p>
        )}

        {cart.map((item) => (
          <div key={item._id} className="flex items-center gap-4 mb-5">
            <img src={item.image} className="w-16 h-16 object-cover" />
            <div className="flex-1">
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-gray-500 text-sm">{item.price}</p>

              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => decrease(item._id)}
                  className="px-2 bg-gray-300 rounded"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increase(item._id)}
                  className="px-2 bg-gray-300 rounded"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="border-t px-6 py-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* Example tax 8.75% */}
          {(() => {
            const taxRate = 0.0875;
            const tax = total * taxRate;
            const totalWithTax = total + tax;

            return (
              <>
                <div className="flex justify-between text-gray-600">
                  <span>Sales tax (8.75%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-bold text-base pt-2">
                  <span>Total with tax</span>
                  <span>${totalWithTax.toFixed(2)}</span>
                </div>
              </>
            );
          })()}
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={goCheckout}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Checkout
          </button>

          <button
            onClick={goBack}
            className="underline"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}