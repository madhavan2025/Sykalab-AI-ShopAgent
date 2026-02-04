"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Listing = {
  id: string;
  title: string;
  price: string;
  image: string;
};

const DEMO_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Modern Apartment",
    price: "$1,200 / mo",
    image: "https://picsum.photos/400/300?1",
  },
  {
    id: "2",
    title: "Cozy Studio",
    price: "$850 / mo",
    image: "https://picsum.photos/400/300?2",
  },
  {
    id: "3",
    title: "Luxury Condo",
    price: "$2,400 / mo",
    image: "https://picsum.photos/400/300?3",
  },
];

export function ListingsCarousel() {
  const [index, setIndex] = useState(0);
  const total = DEMO_LISTINGS.length;
  const router = useRouter();

  // 🔁 Auto-play every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 3000);

    return () => clearInterval(interval);
  }, [total]);

  const prev = () => {
    setIndex((i) => (i === 0 ? total - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i + 1) % total);
  };

  const listing = DEMO_LISTINGS[index];


  const handleClick = (listing: Listing) => {
  router.push(`/product/${listing.id}`);
};


  return (
    <div className="w-full max-w-4xl rounded-xl border bg-background p-4">
      <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
        Featured Listings (Demo)
      </h3>
      <div className="relative overflow-hidden rounded-lg group">
  <img
    key={listing.id}
    src={listing.image}
    alt={listing.title}
    className="h-64 w-full object-cover transition-opacity duration-500"
     onClick={() => handleClick(listing)}
 />

   <button
    onClick={prev}
    className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    aria-label="Previous"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-gray-700 hover:text-gray-900"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  </button>

  <button
    onClick={next}
    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    aria-label="Next"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-gray-700 hover:text-gray-900"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>

<div className="mt-3 flex items-center justify-between">
  <div>
    <p className="font-medium">{listing.title}</p>
    <p className="text-sm text-muted-foreground">{listing.price}</p>
  </div>

  <span className="text-xs text-muted-foreground">
    {index + 1} / {total}
  </span>
</div>

      
    </div>
  );
}
