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
          {/* <div className='fixed z-[-1] left-[28%] top-0 h-[150px] w-[200px] rotate-12 rounded-3xl bg-gradient-to-l from-blue-600 to-sky-400 blur-3xl filter block opacity-20 lg:top-32 lg:-right-20 lg:h-72 lg:w-[350px] xl:h-80 xl:w-[500px]'></div>
          <div className='fixed z-[-1] left-[10%] top-50% h-[150px] w-[200px] rotate-12 rounded-3xl bg-gradient-to-l bg-purple-600 to-indigo-600 blur-3xl filter block opacity-20 lg:top-44 lg:-right-20 lg:h-72 lg:w-[350px] xl:h-80 xl:w-[500px]'></div>
          <div className='fixed z-[-1] bottom-44 -left-64 h-[150px] w-[900px] -rotate-45 rounded-3xl bg-gradient-to-r from-violet-500 to-indigo-500 opacity-20 blur-3xl filter block lg:bottom-24 lg:-left-20 lg:h-28 lg:w-[250px] lg:-rotate-12 lg:xl:h-40 xl:w-[400px]'></div> */}
          
          <div className='fixed z-[-1] left-[30%] top-[25%] -translate-x-1/2 h-[150px] max-w-[300px] !w-full rounded-3xl bg-gradient-to-l from-purple-900 to-violet-900 blur-3xl filter block opacity-20 lg:h-72 lg:max-w-[350px] xl:h-80 xl:max-w-[500px]' />
          <div className='fixed z-[-1] left-[50%] top-[15%] -translate-x-1/2 h-[150px] max-w-[300px] !w-full rounded-3xl bg-gradient-to-l from-indigo-700 to-blue-600 blur-3xl filter block opacity-20 lg:h-72 lg:max-w-[350px] xl:h-80 xl:max-w-[500px]' />
          <div className='fixed z-[-1] left-[70%] top-[25%] -translate-x-1/2 h-[150px] max-w-[300px] !w-full rounded-3xl bg-gradient-to-l from-violet-900 to-violet-800 blur-3xl filter block opacity-20 lg:h-72 lg:max-w-[350px] xl:h-80 xl:max-w-[500px]' />
          
          <main className="container py-4 sm:py-6 md:py-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
