import React from "react";
import { cn } from "../utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-none text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d4b896] disabled:pointer-events-none disabled:opacity-50",
          {
            'bg-[#2d4a3e] text-white hover:bg-[#2d4a3e]/90': variant === 'default',
            'border border-[#d4b896] bg-transparent hover:bg-[#d4b896] hover:text-[#2d4a3e]': variant === 'outline',
            'hover:bg-[#d4b896]/20 hover:text-[#2d4a3e]': variant === 'ghost',
            'text-[#2d4a3e] underline-offset-4 hover:underline': variant === 'link',
            'h-10 px-4 py-2': size === 'default',
            'h-9 rounded-md px-3': size === 'sm',
            'h-14 px-8 text-lg': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";