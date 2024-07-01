'use client'; // Error components must be Client components

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Error({
    error,
    // reset,
}: {
    error: Error;
    // reset: () => void;
}) {
    let router = useRouter()

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
    <main style={{"fontFamily":"arial"}} className="flex flex-col justify-start items-center mt-16 gap-4 w-full h-screen">
            <div className="title2">{error?.message || 'Something went wrong!'}</div>
            <Button className=""
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => router.back()
                }
            >
                Go Back
            </Button>
            <p className="text-xl">
                Or go back to <Link href="/" className="underline text-indigo-500">Home 🏠</Link>
            </p>
        </main>
    );
}