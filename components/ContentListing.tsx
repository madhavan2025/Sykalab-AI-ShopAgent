"use client";

import { useRouter } from "next/navigation";

type ContentItem = {
  id: string;
  title: string;
  description: string;
};

type ContentListingProps = {
  items: ContentItem[];
  count: number;
};

export function ContentListing({ items, count }: ContentListingProps) {
  const router = useRouter();

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-sm font-semibold text-foreground/70">
        Recommended for you
      </h3>

      {items.slice(0, count).map((item) => (
        <div key={item.id} className="space-y-1">
          <p className="font-medium text-foreground">
            {item.title}
          </p>

          <p className="text-sm text-foreground/80 line-clamp-2">
            {item.description}
          </p>

          <button
            type="button"
            onClick={() => router.push(`/product/${item.id}`)}
            className="text-xs font-semibold text-primary hover:underline"
          >
            View more →
          </button>
        </div>
      ))}

      {items.length === 0 && (
        <p className="text-sm text-foreground/80">
          No content available.
        </p>
      )}
    </div>
  );
}