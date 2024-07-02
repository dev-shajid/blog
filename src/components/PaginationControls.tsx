'use client'

import { FC } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from './ui/button'
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";

interface PaginationControlsProps {
    hasNextPage: boolean
    hasPrevPage: boolean
    per_page: string | string[]
    total: number
}

const PaginationControls: FC<PaginationControlsProps> = (
    {
        hasNextPage,
        hasPrevPage,
        per_page = '2',
        total
    }
) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const page = searchParams.get('page') ?? '1'
    // const per_page = searchParams.get('per_page') ?? per_page_post

    return (
        hasNextPage || hasPrevPage ? 
        <div className='flex gap-3 justify-center items-center mt-12'>
            <Button
                disabled={!hasPrevPage}
                onClick={() => {
                    router.push(`${pathname}?page=${Number(page) - 1}&per_page=${per_page}`)
                }}
                size='icon'
                // variant='outline'
                className='rounded-full text-xl'
            >
                <MdOutlineChevronLeft />
            </Button>

            <div>
                {page} / {Math.ceil(total / Number(per_page))}
            </div>

            <Button
                disabled={!hasNextPage}
                onClick={() => {
                    router.push(`${pathname}?page=${Number(page) + 1}&per_page=${per_page}`)
                }}
                size='icon'
                // variant='outline'
                className='rounded-full text-xl'
            >
                <MdOutlineChevronRight />
            </Button>
        </div> 
        : null
    )
}

export default PaginationControls
