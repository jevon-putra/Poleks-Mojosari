"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "dark" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info:    <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error:   <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={{
        "--normal-bg":      "var(--bg-card)",
        "--normal-text":    "var(--text-primary)",
        "--normal-border":  "var(--border-default)",
        "--border-radius":  "0.75rem",

        "--success-bg":     "rgba(34, 197, 94, 0.1)",
        "--success-text":   "#4ADE80",
        "--success-border": "rgba(34, 197, 94, 0.25)",

        "--error-bg":       "rgba(239, 68, 68, 0.1)",
        "--error-text":     "#FCA5A5",
        "--error-border":   "rgba(239, 68, 68, 0.25)",

        "--warning-bg":     "rgba(249, 115, 22, 0.1)",
        "--warning-text":   "#FB923C",
        "--warning-border": "rgba(249, 115, 22, 0.25)",

        "--info-bg":        "rgba(46, 134, 171, 0.1)",
        "--info-text":      "#60A5FA",
        "--info-border":    "rgba(46, 134, 171, 0.25)",
      } as React.CSSProperties}
      toastOptions={{
        classNames: {
          toast:       "!rounded-xl !text-sm !font-medium !shadow-lg !backdrop-blur-sm",
          title:       "!font-semibold",
          description: "!text-xs !opacity-80",
          actionButton:"!bg-orange-500 !text-white !rounded-lg !text-xs !px-3 !py-1.5",
          cancelButton:"!bg-transparent !border !border-current !rounded-lg !text-xs !px-3 !py-1.5",
          closeButton: "!border !border-current !rounded-lg",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }