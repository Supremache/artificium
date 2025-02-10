"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"
import { Icons } from "./icons"

type StatusPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right"
type StatusType = "online" | "offline" | "away" | "disturb" | "none"

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  align?: StatusPosition
  status?: StatusType
  statusClassName?: string
}

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, align = "top-right", status, statusClassName, ...props }, ref) => (
    <div className="relative inline-block">
      <AvatarPrimitive.Root
        ref={ref}
        className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
        {...props}
      />
      {status && status !== "none" && (
        <div
          className={cn(
            "absolute flex items-center justify-center ring-4 ring-background rounded-full",
            {
              "top-0 left-0": align === "top-left",
              "top-0 right-0": align === "top-right",
              "bottom-0 left-0": align === "bottom-left",
              "bottom-0 right-0": align === "bottom-right",
            },
            statusClassName,
          )}
        >
          {status === "away" ? (
            <Icons.moon  className="h-2 w-2 text-happy-orange-600 fill-happy-orange-600 drop-shadow-[0_0_3px_#e26f20]" />
          ) : (
            <span
              className={cn("block h-2 w-2 rounded-full", {
                "animate-pulse bg-electric-green-600 drop-shadow-[0_0_3px_green]": status === "online",
                "drop-shadow-[0_0_3px_red] border-2 border-red-power-600": status === "disturb",
                "bg-noble-black-500": status === "offline",
              })}
            />
          )}
        </div>
      )}
    </div>
  ),
)
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }

