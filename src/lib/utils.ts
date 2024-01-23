import { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

//For conditional classes throughout the application 
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

//Takes friendsId and userId and seperates them by -- so we can have chatId for the URL
export function chatHrefConstructor(id1: string, id2: string) {
    const sortedIds = [id1, id2].sort()
    return `${sortedIds[0]}--${sortedIds[1]}`
  }

//Replace colon for pusher- recieves key replacing any:globally with __
export function toPusherKey(key: string) {
  return key.replace(/:/g, '__')
}
