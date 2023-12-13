import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import Magnet from "@/hooks/use-magneticism"

const buttonVariants = (isMagnetic: boolean) => {
  let variant = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "underline-offset-4 hover:underline text-primary font-semibold",
  }

  if (isMagnetic) {
    variant = {
      default: "bg-primary text-primary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
      outline: "border border-input hover:bg-accent",
      secondary: "bg-secondary text-secondary-foreground",
      ghost: "",
      link: "underline-offset-4 hover:underline text-primary font-medium",
    }
  }

  return cva(
    "inline-flex items-center justify-center rounded-[50px] text-sm font-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
    {
      variants: {
        variant,
        size: {
          default: "h-10 py-2 px-4",
          thin: "h-8 px-8",
          sm: "h-9 px-2",
          xs: "h-8 px-1.5",
          lg: "h-11 px-8",
          icon: "h-10 w-10",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
  )
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<ReturnType<typeof buttonVariants>> {
  isLoading?: boolean
  isMagnetic?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant,
      isLoading,
      size,
      isMagnetic = false,
      ...props
    },
    ref
  ) => {
    const buttonContent = (
      <>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </>
    )

    const buttonElement = (
      <button
        className={cn(buttonVariants(isMagnetic)({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {buttonContent}
      </button>
    )

    return isMagnetic ? <Magnet>{buttonElement}</Magnet> : buttonElement
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
