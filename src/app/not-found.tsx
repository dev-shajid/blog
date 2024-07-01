import { Button } from "@/components/ui/button"
import Link from "next/link"
import '@/app/(client)/globals.css'

export default function NotFound() {
    return (
        <div style={{"fontFamily":"arial"}} className="text-center flex flex-col justify-center items-center gap-4 w-full h-screen">
            <p className="title2">404 - Page Not Found! 😑</p>
            <Link href="/">
                <Button>Back to Home</Button>
            </Link>
        </div>
    )
}