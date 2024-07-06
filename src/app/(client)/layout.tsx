import "@/app/globals.css"
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme/theme-provider"
import Nav from "@/components/Nav"
import 'easymde/dist/easymde.min.css'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Link Profile</title>
      </head>
      <body
        suppressHydrationWarning={true}
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={false}
          disableTransitionOnChange={true}
        >
          <Nav />

          <div className="fixed opacity-15 dark:opacity-10 top-[10%] right-[10%] z-[-1] rotate-12 w-[25dvw] aspect-square rounded-3xl bg-gradient-to-l bg bg-violet-500 to-indigo-500 blur-3xl filter block"/>
          <div className="fixed opacity-15 dark:opacity-10 top-[30%] left-[40%] z-[-1] rotate-12 w-[25dvw] aspect-square rounded-3xl bg-gradient-to-l bg bg-blue-600 to-sky-600 blur-3xl filter block"/>
          <div className="fixed opacity-15 dark:opacity-10 top-[50%] left-[10%] z-[-1] rotate-12 w-[25dvw] aspect-square rounded-3xl bg-gradient-to-l bg bg-violet-700 to-indigo-700 blur-3xl filter block"/>

          <main className="container py-4 sm:py-6 md:py-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
