"use client"

import * as React from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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

  return (
    <AnimatePresence mode="wait">
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          {children}
        </>
      )}
    </AnimatePresence>
  )
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ side = "right", className = "", children }, ref) => {
    const sideClasses = {
      right: "right-0 top-0 h-full border-l",
      left: "left-0 top-0 h-full border-r",
      top: "top-0 left-0 right-0 h-3/4 border-b",
      bottom: "bottom-0 left-0 right-0 h-3/4 border-t",
    }

    const getAnimationConfig = () => {
      switch (side) {
        case "right":
          return {
            initial: { x: "100%" },
            animate: { x: 0 },
            exit: { x: "100%" },
          }
        case "left":
          return {
            initial: { x: "-100%" },
            animate: { x: 0 },
            exit: { x: "-100%" },
          }
        case "top":
          return {
            initial: { y: "-100%" },
            animate: { y: 0 },
            exit: { y: "-100%" },
          }
        case "bottom":
          return {
            initial: { y: "100%" },
            animate: { y: 0 },
            exit: { y: "100%" },
          }
      }
    }

    const animationConfig = getAnimationConfig()

    return (
      <motion.div
        ref={ref}
        initial={animationConfig.initial}
        animate={animationConfig.animate}
        exit={animationConfig.exit}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
          duration: 0.3
        }}
        className={`fixed z-50 bg-[var(--background)] p-6 shadow-lg ${sideClasses[side]} ${className}`}
      >
        {children}
      </motion.div>
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
