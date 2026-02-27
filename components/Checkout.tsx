"use client";
import { useState, useEffect } from "react";
import PaymentForm from "./Payment";

export default function CheckoutComponent({ goBack, goHome }: any) {
  const [step, setStep] = useState<"details" | "payment">("details");
  const [cart, setCart] = useState<any[]>([]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    const res = await fetch("/api/cart");
    const data = await res.json();
    setCart(data);
  }

  const total = cart.reduce((sum, item) => {
    const price = Number(item.price.replace("$", ""));
    return sum + price * item.quantity;
  }, 0);

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">
          {step === "details" ? "Checkout" : "Payment"}
        </h2>

        {/* ================= CHECKOUT PAGE ================= */}
        {step === "details" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep("payment");
            }}
            className="space-y-10"
          >
            {/* -------- ORDER SUMMARY -------- */}
            <div>
              <h3 className="font-semibold text-lg mb-4">
                Order Summary
              </h3>

              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between border-b pb-3 mb-3"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} × {item.price}
                    </p>
                  </div>
                  <p className="font-semibold">
                    $
                    {(
                      Number(item.price.replace("$", "")) *
                      item.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="flex justify-between font-bold text-lg pt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* -------- BILLING FORM -------- */}
            <div>
              <h3 className="font-semibold mb-4">
                Billing & Shipping Information
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
              </div>

              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="border p-2 rounded w-full mt-4"
                required
              />

              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="border p-2 rounded w-full mt-4"
                required
              />

              <input
                name="address"
                placeholder="Street Address"
                value={form.address}
                onChange={handleChange}
                className="border p-2 rounded w-full mt-4"
                required
              />

              <div className="grid grid-cols-3 gap-4 mt-4">
                <input
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
                <input
                  name="state"
                  placeholder="State"
                  value={form.state}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
                <input
                  name="zip"
                  placeholder="ZIP Code"
                  value={form.zip}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
              </div>

              <input
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleChange}
                className="border p-2 rounded w-full mt-4"
                required
              />
            </div>

            {/* -------- BUTTONS -------- */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded"
              >
                Proceed to Payment
              </button>

              <button
                type="button"
                onClick={goBack}
                className="underline"
              >
                Back to Cart
              </button>
            </div>
          </form>
        )}

        {/* ================= PAYMENT PAGE ================= */}
        {step === "payment" && (
          <PaymentForm
            goBack={() => setStep("details")}
            goHome={goHome}
          />
        )}
      </div>
    </div>
  );
}