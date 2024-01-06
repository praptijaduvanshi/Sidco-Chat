import { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

//for conditional classes throughout the application 
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}