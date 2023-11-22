import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface SplitTitle {
  title1: string;
  title2: string;
}

export const splitTitle = (input: string): SplitTitle => {
  const lastSpaceIndex = input.lastIndexOf(' ');

  if (lastSpaceIndex === -1) {
    // If there is no space, return the entire string as title1 and an empty string as title2
    return { title1: input, title2: '' };
  }

  const title1 = input.slice(0, lastSpaceIndex);
  const title2 = input.slice(lastSpaceIndex + 1);

  return { title1, title2 };
};

