"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { RxMoon, RxSun } from "react-icons/rx"

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <>
      <Button className="!ring-0 select-none" variant="outline" size="icon" onClick={()=>setTheme(theme=='light'?'dark':'light')}>
        <RxSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <RxMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  )
}
