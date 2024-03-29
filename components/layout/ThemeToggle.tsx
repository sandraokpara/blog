"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/common/Button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-4 dark:hidden lg:h-[1.5rem] lg:w-[1.3rem]" />
      <Moon className="hidden h-4 w-4 dark:block lg:h-5 lg:w-5" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
