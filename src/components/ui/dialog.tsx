"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 duration-150",
        "data-open:animate-in data-open:fade-in-0",
        "data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50",
          "-translate-x-1/2 -translate-y-1/2",
          "w-full max-w-[calc(100%-2rem)] sm:max-w-md",
          "flex flex-col",
          "rounded-2xl outline-none",
          "duration-150",
          "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
          "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
          maxHeight: '80vh',    // ← pakai inline style, bukan class
          overflow: 'hidden',  // ← cegah content bocor keluar
        }}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({
  className, 
  titleValue,
  description}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
  titleValue: string
  description?: string
}) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1 px-6 pt-6 pb-4 shrink-0", className)}
      style={{ borderBottom: '1px solid var(--border-default)' }}
    >
      <div className="flex flex-row items-center justify-between">
        <div>
          <DialogTitle>
            {titleValue}
          </DialogTitle>
          {description === null ? null : <DialogDescription>{description}</DialogDescription>}
        </div>

        <DialogPrimitive.Close data-slot="dialog-close" asChild>
          <Button
            variant="primaryOutline"
            size="icon"
            type="button"
          >
            <XIcon size={16} />
            <span className="sr-only">Close</span>
          </Button>
        </DialogPrimitive.Close>
      </div>
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      style={{ color: 'var(--text-primary)' }}
      className={cn("font-semibold text-base", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      style={{ color: 'var(--text-secondary)' }}
      className={cn("text-sm", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      className={cn(
        "flex flex-row gap-2 px-6 py-4 shrink-0",
        className
      )}
      style={{ borderTop: '1px solid var(--border-default)' }}
      {...props}
    >
      {children}
    </div>
  )
}

function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-body"
      className={cn("px-6 py-5 flex flex-col", className)}
      style={{
        flex: '1 1 0',        // ← flex-1 yang lebih eksplisit
        overflowY: 'auto',    // ← scroll
        minHeight: 0,         // ← PENTING! tanpa ini flex-1 tidak bekerja
      }}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
  DialogBody,
}