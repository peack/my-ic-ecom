import * as React from "react"

import { cn } from "@/lib/utils"
import { UseFormRegister } from "react-hook-form/dist/types/form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

type CustomInputProps = InputProps & {
  register: UseFormRegister<any>;
};
  
const Input = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        register={props.register}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
