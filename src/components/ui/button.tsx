import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

// The shadcn composition pattern, styled with Wander's own semantic tokens.
const buttonVariants = cva("button", {
  variants: {
    variant: {
      default: "button-primary",
      outline: "button-outline",
      ghost: "button-ghost",
    },
    size: { default: "button-default", icon: "button-icon" },
  },
  defaultVariants: { variant: "default", size: "default" },
});

export function Button({
  asChild = false,
  variant,
  size,
  className,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Component = asChild ? Slot.Root : "button";

  return (
    <Component
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
