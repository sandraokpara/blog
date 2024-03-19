import { clsx, type ClassValue } from "clsx"
import { formatDistanceToNowStrict } from "date-fns"
import locale from "date-fns/locale/en-US"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const formatDistanceLocale = {
  lessThanXSeconds: "just now",
  xSeconds: "just now",
  halfAMinute: "just now",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
}

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {}

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result
    } else {
      if (result === "just now") return result
      return result + " ago"
    }
  }

  return result
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  })
}

interface SplitTitle {
  title1: string
  title2: string
}

export const splitTitle = (input: string): SplitTitle => {
  const lastSpaceIndex = input.lastIndexOf(" ")

  if (lastSpaceIndex === -1) {
    return { title1: input, title2: "" }
  }

  const title1 = input.slice(0, lastSpaceIndex)
  const title2 = input.slice(lastSpaceIndex + 1)

  return { title1, title2 }
}

export function truncateString(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text
  } else {
    return text.slice(0, maxLength) + "..."
  }
}

export function getRandomNumber(): number {
  const min = 7
  const max = 28
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min

  return randomNumber
}
