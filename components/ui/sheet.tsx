"use client"

import * as React from "react"
import { X } from "lucide-react"

interface SheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

interface SheetContentProps {
  side?: "left" | "right" | "top" | "bottom"
  className?: string
  children: React.ReactNode
}

const Sheet = ({ open, onOpenChange, children }: SheetProps) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      {children}
    </>
  )
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ side = "right", className = "", children }, ref) => {
    const sideClasses = {
      right: "right-0 top-0 h-full w-3/4 sm:w-80 border-l",
      left: "left-0 top-0 h-full w-3/4 sm:w-80 border-r",
      top: "top-0 left-0 right-0 h-3/4 border-b",
      bottom: "bottom-0 left-0 right-0 h-3/4 border-t",
    }

    return (
      <div
        ref={ref}
        className={`fixed z-50 bg-[var(--background)] p-6 shadow-lg transition-all duration-300 ease-in-out ${sideClasses[side]} ${className}`}
      >
        {children}
      </div>
    )
  }
)
SheetContent.displayName = "SheetContent"

const SheetHeader = ({
  className = "",
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div className={`flex flex-col space-y-2 text-center sm:text-left ${className}`}>
      {children}
    </div>
  )
}

const SheetTitle = ({
  className = "",
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <h2 className={`text-lg font-semibold text-[var(--foreground)] ${className}`}>
      {children}
    </h2>
  )
}

const SheetClose = ({
  className = "",
  onClick,
}: {
  className?: string
  onClick?: () => void
}) => {
  return (
    <button
      onClick={onClick}
      className={`absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 disabled:pointer-events-none ${className}`}
    >
      <X className="h-4 w-4 text-[var(--foreground)]" />
      <span className="sr-only">Close</span>
    </button>
  )
}

const SheetTrigger = ({
  onClick,
  className = "",
  children,
}: {
  onClick: () => void
  className?: string
  children: React.ReactNode
}) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose, SheetTrigger }
