"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/Button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="w-4 h-[1.2rem] lg:h-[1.5rem] lg:w-[1.3rem] dark:hidden" />
      <Moon className="hidden h-4 w-4 lg:h-5 lg:w-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
