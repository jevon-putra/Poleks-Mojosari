import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        // Orange gradient — aksi utama
        primary: [
          "rounded-xl font-semibold text-white",
          "bg-gradient-to-br from-[#f97316] to-[#ea580c]",
          "shadow-[0_4px_20px_rgba(249,115,22,0.35)]",
          "hover:-translate-y-px hover:shadow-[0_6px_28px_rgba(249,115,22,0.45)]",
          "active:translate-y-0",
        ],
        primaryOutline: [
          "rounded-lg border",
          "text-[#F97316] border-[rgba(249,115,22,0.25)]",
          "bg-[rgba(249,115,22,0.08)] hover:bg-[rgba(249,115,22,0.15)]",
          "hover:shadow-[0_0_0_3px_rgba(249,115,22,0.1)]",
        ],
        // Blue outline — navigasi / aksi sekunder
        secondary: [
          "rounded-lg border",
          "text-[var(--blue-medium)] border-[var(--blue-medium)]",
          "bg-transparent hover:bg-[rgba(46,134,171,0.12)]",
        ],
        // Teal/sky — edit
        edit: [
          "rounded-lg border",
          "text-[#38BDF8] border-[rgba(56,189,248,0.25)]",
          "bg-[rgba(56,189,248,0.08)] hover:bg-[rgba(56,189,248,0.15)]",
          "hover:shadow-[0_0_0_3px_rgba(56,189,248,0.1)]",
        ],
        // Merah — hapus / destruktif
        destructive: [
          "rounded-lg border",
          "text-[#F87171] border-[rgba(248,113,113,0.25)]",
          "bg-[rgba(248,113,113,0.08)] hover:bg-[rgba(248,113,113,0.15)]",
          "hover:shadow-[0_0_0_3px_rgba(248,113,113,0.1)]",
        ],
        // Transparan — navigasi / icon button
        ghost: [
          "rounded-lg",
          "text-[var(--text-secondary)]",
          "bg-transparent hover:bg-[var(--border-default)] hover:text-[var(--text-primary)]",
        ],
        // Link
        link: "text-[var(--blue-medium)] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-12 px-4 py-2",
        sm:      "h-7 px-3 text-xs rounded-md",
        md:      "h-10 px-4 py-2.5",
        lg:      "h-12 px-6 text-base",
        xl:      "h-14 px-8 text-base",
        icon:    "h-9 w-9 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "default",
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }