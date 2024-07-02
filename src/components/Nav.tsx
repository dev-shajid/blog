import React from 'react'
import ThemeToggle from './theme/them-change'
import Link from 'next/link'
import { SearchBar } from './SearchBar';

export default function Nav() {
    return (
        <div className="border-b">
            <header className="flex container h-14 items-center gap-4 lg:h-[60px] !max-w-[100vw] overflow-hidden">
                <div className="flex h-14 gap-8 items-center lg:h-[60px]">
                    <Link href="/" className="flex items-center justify-center font-semibold w-[45px] aspect-square rounded-full dark:bg-white bg-black text-white dark:text-black">
                        <span className="">NXT</span>
                    </Link>
                    <div className='space-x-4'>
                        {
                            [
                                { name: 'Blog', slug: '/' },
                                { name: 'Tags', slug: '/tags' },
                            ].map((item, i) => (
                                <Link key={i} href={item.slug}>
                                    {item.name}
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <div className="ml-auto flex items-center justify-end gap-4">
                    <SearchBar />
                    <ThemeToggle />
                </div>
            </header>
        </div>
    )
}
