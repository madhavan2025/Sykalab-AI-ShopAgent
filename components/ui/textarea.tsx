import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        // Base layout
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm",
        "ring-offset-background focus:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",

        // ✅ Text colors
        "text-black dark:text-gray-400",

        // Placeholder
        "placeholder:text-gray-500 dark:placeholder:text-gray-500",

        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea"

export { Textarea }