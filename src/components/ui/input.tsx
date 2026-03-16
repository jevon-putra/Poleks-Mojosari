import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  variant?: "glass" | "default"
}

function Input({ className, type, variant = "default", ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // ── Base ──
        "w-full rounded-lg text-sm outline-none transition-all duration-200",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",

        // ── Default (light/dark adaptive) ──
        variant === "default" && [
          "h-12 py-3",
          "bg-(--bg-input) text-(--text-primary)",
          "border border-(--border-input)",
          "placeholder:text-(--text-muted)",
          "focus:border-(--orange-glow)",
          "focus:ring-2 focus:ring-(--orange-glow)/20",
        ],

        // ── Glass (login page) ──
        variant === "glass" && [
          "h-12 py-3 rounded-xl",
          "bg-white/6 text-white",
          "border border-white/12",
          "placeholder:text-blue-400/70",
          "focus:border-(--orange-glow)",
          "focus:ring-2 focus:ring-(--orange-glow)/20",
        ],

        className
      )}
      {...props}
    />
  )
}

export { Input }
