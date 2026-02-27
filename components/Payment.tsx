"use client";
import { useState } from "react";

export default function PaymentForm({ goBack, goHome }: any) {
  const [card, setCard] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [orderId, setOrderId] = useState<string | null>(null);

  function handleChange(e: any) {
    setCard({ ...card, [e.target.name]: e.target.value });
  }

  function generateOrderId() {
    return Math.floor(100000000 + Math.random() * 900000000).toString();
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    const newOrderId = generateOrderId();

    // ✅ Clear entire cart
    await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clear: true }),
    });

    setOrderId(newOrderId);
  }

  /* ---------------- SUCCESS SCREEN ---------------- */
  if (orderId) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Order #{orderId}
        </h2>

        <p className="text-green-600 text-lg mb-6">
          Your order was placed successfully 🎉
        </p>

        <button
          onClick={goHome}
          className="bg-black dark:bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-900 dark:hover:bg-gray-600 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  /* ---------------- PAYMENT FORM ---------------- */
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Payment Details
      </h3>

      <input
        name="cardName"
        placeholder="Name on Card"
        value={card.cardName}
        onChange={handleChange}
        className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        required
      />

      <input
        name="cardNumber"
        placeholder="Card Number"
        value={card.cardNumber}
        onChange={handleChange}
        className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          name="expiry"
          placeholder="MM/YY"
          value={card.expiry}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          required
        />

        <input
          name="cvv"
          placeholder="CVV"
          value={card.cvv}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          required
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="bg-black dark:bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-900 dark:hover:bg-gray-600 transition"
        >
          Make Payment
        </button>

        <button
          type="button"
          onClick={goBack}
          className="underline text-gray-900 dark:text-gray-100"
        >
          Back to Checkout
        </button>
      </div>
    </form>
  );
}