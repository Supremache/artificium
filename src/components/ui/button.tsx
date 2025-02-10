import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-stem-green-400 active:bg-stem-green-300",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border-[3px] border-primary bg-background text-primary shadow-sm hover:border-stem-green-400 active:border-stem-green-300 hover:text-stem-green-400 active:text-stem-green-300",
        secondary:
          "text-noble-black-300 hover:text-noble-black-200 active:text-noble-black-100 bg-gradient-to-br from-secondary to-secondary/50  border-gradient-to-tr from-noble-black-500 to-transparent border-t shadow-sm",
        ghost: "text-noble-black-400 hover:text-noble-black-300 active:text-noble-black-200",
        tertiary: "text-noble-black-300 hover:text-noble-black-200 active:text-noble-black-100 bg-noble-black-600 hover:bg-noble-black-500 active:bg-noble-black-400 shadow-sm",
        //link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
