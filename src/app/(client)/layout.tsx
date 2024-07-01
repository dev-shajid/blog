import "./globals.css"
import "./prism.css"
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
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <main className="container py-4 sm:py-6 md:py-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
