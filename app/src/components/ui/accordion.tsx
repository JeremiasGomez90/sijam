import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";

export const Accordion = AccordionPrimitive.Root;
export const AccordionItem = AccordionPrimitive.Item;

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
  <AccordionPrimitive.Header className="AccordionHeader w-[1000px]">
    <AccordionPrimitive.Trigger
      className={cn("AccordionTrigger flex items-center bg-[#c2e1ff]", className)}
      {...props}
      ref={forwardedRef}
    >
      <div className="w-[1000px] bg-white m-4">{children}</div>
      <ChevronDownIcon className="AccordionChevron mr-4" aria-hidden />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, className, ...props }, forwardedRef) => (
  <AccordionPrimitive.Content
    className={cn("AccordionContent w-[1000px] mx-4 border-r border-l border-r-[#e4e4e7] border-l-[#e4e4e7]", className)}
    {...props}
    ref={forwardedRef}
  >
    <div className="AccordionContentText">{children}</div>
  </AccordionPrimitive.Content>
));
